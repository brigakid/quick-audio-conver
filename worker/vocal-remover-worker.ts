/**
 * Vocal Remover Worker
 * ====================
 * Standalone process that consumes the BullMQ "vocal-remover" queue and runs
 * Demucs for each job.  Start separately from the Next.js server:
 *
 *   npx tsx worker/vocal-remover-worker.ts
 *
 * Environment variables are read from .env.local (or the shell environment).
 * See .env.example for the full list of VR_* variables.
 *
 * The worker:
 *   1. Reads job metadata from Redis (written by the upload API route)
 *   2. Runs `demucs --two-stems=vocals` via child_process.spawn
 *   3. Moves output stems to stable paths under tmp/vocal-remover/stems/
 *   4. Updates the Redis job hash with the result
 *   5. Retries once on failure (configurable via VR_JOB_ATTEMPTS env)
 *   6. Runs file cleanup every 30 minutes
 */

// Environment variables are loaded by tsx via --env-file=.env.local
// See the worker:vocal-remover script in package.json.
import fs     from 'fs';
import { Worker, type Job } from 'bullmq';

// Use @/ path aliases — tsx resolves these via tsconfig.json paths
import { getBullMQConnection }       from '@/lib/vocal-remover/redis';
import { getVRJob, updateVRJob }     from '@/lib/vocal-remover/job-store';
import { separateStems }             from '@/lib/vocal-remover/separator';
import { cleanupExpiredVRFiles }     from '@/lib/vocal-remover/cleanup';
import { ensureVRDirs }              from '@/lib/vocal-remover/storage';
import { QUEUE_NAME }                from '@/lib/vocal-remover/queue';

const CONCURRENCY = parseInt(process.env.VR_MAX_CONCURRENT_JOBS || '2', 10);
const ATTEMPTS    = parseInt(process.env.VR_JOB_ATTEMPTS        || '2', 10);

console.log('[vr-worker] Starting — queue:', QUEUE_NAME, '| concurrency:', CONCURRENCY);
ensureVRDirs();

// --------------------------------------------------------------------------
// Job processor
// --------------------------------------------------------------------------

async function processJob(job: Job): Promise<void> {
  const { jobId } = job.data as { jobId: string };
  console.log(`[vr-worker] Job ${jobId} — attempt ${job.attemptsMade + 1}/${ATTEMPTS}`);

  const vrJob = await getVRJob(jobId);
  if (!vrJob) {
    // Job record missing (expired in Redis between enqueue and pickup) — skip silently
    console.warn(`[vr-worker] Job ${jobId} not found in Redis — skipping`);
    return;
  }

  if (!fs.existsSync(vrJob.inputPath)) {
    // Input file gone — fail without retrying
    console.error(`[vr-worker] Input file missing for ${jobId}: ${vrJob.inputPath}`);
    await updateVRJob(jobId, { status: 'failed', error: 'Input file not found on disk.' });
    throw Object.assign(new Error('Input file not found'), { noRetry: true });
  }

  await updateVRJob(jobId, { status: 'processing', startedAt: Date.now() });

  const result = await separateStems(jobId, vrJob.inputPath);

  if (result.success && result.vocalsPath && result.instrumentalPath) {
    // Delete the input file immediately — stems are all we need from here
    try { fs.unlinkSync(vrJob.inputPath); } catch {}

    await updateVRJob(jobId, {
      status:           'completed',
      vocalsPath:       result.vocalsPath,
      instrumentalPath: result.instrumentalPath,
      completedAt:      Date.now(),
    });

    console.log(`[vr-worker] Completed ${jobId}`);
  } else {
    // Do NOT set 'failed' here — BullMQ will retry and we want 'processing'
    // to remain visible during the retry window.
    // The 'failed' state is set by the worker.on('failed') handler below,
    // which only fires after all attempts are exhausted.
    console.error(`[vr-worker] Separation error for ${jobId}: ${result.error}`);
    throw new Error(result.error ?? 'Separation failed');
  }
}

// --------------------------------------------------------------------------
// BullMQ Worker
// --------------------------------------------------------------------------

const worker = new Worker(QUEUE_NAME, processJob, {
  connection:  getBullMQConnection(),
  concurrency: CONCURRENCY,
});

worker.on('failed', (job, err) => {
  const jobId = job?.data?.jobId as string | undefined;
  console.error(`[vr-worker] Job ${jobId ?? job?.id} permanently failed:`, err.message);

  if (jobId) {
    // Persist final failure state so the frontend can surface the error
    updateVRJob(jobId, {
      status: 'failed',
      error:  err.message.slice(0, 500), // cap length for Redis
    }).catch((e) => console.error('[vr-worker] Redis update failed:', e));
  }
});

worker.on('error', (err) => {
  console.error('[vr-worker] Worker error:', err.message);
});

// --------------------------------------------------------------------------
// Periodic cleanup
// --------------------------------------------------------------------------

const CLEANUP_INTERVAL_MS = 30 * 60 * 1_000; // 30 minutes

const cleanupTimer = setInterval(async () => {
  try {
    const removed = await cleanupExpiredVRFiles();
    if (removed > 0) console.log(`[vr-worker] Cleanup removed ${removed} file(s)`);
  } catch (err) {
    console.error('[vr-worker] Cleanup error:', err);
  }
}, CLEANUP_INTERVAL_MS);
cleanupTimer.unref();

// --------------------------------------------------------------------------
// Graceful shutdown
// --------------------------------------------------------------------------

async function shutdown(signal: string): Promise<void> {
  console.log(`[vr-worker] ${signal} received — shutting down`);
  clearInterval(cleanupTimer);
  try { await worker.close(); }
  catch (e) { console.error('[vr-worker] Error closing worker:', e); }
  process.exit(0);
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT',  () => void shutdown('SIGINT'));

console.log('[vr-worker] Ready');
