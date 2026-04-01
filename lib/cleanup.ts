import fs from 'fs';
import path from 'path';
import { getAllJobs, deleteJob, TEMP_DIR } from './temp-storage';

const TTL_MINUTES = parseInt(process.env.TEMP_FILE_TTL_MINUTES || '5', 10);
const TTL_MS = TTL_MINUTES * 60 * 1000;

/**
 * Removes expired jobs and their associated temp files.
 * Safe to call repeatedly — only removes jobs older than TTL.
 */
export function cleanupExpiredJobs(): number {
  const now = Date.now();
  const jobs = getAllJobs();
  let removed = 0;

  for (const job of jobs) {
    // Never delete a job that is actively being converted — wait for it to finish
    if (job.status === 'processing') continue;

    // For completed jobs, start the TTL clock from completedAt so the user
    // always has a full TTL_MINUTES window to download after conversion finishes,
    // regardless of how long the conversion itself took.  For failed/uploaded
    // jobs (nothing to download) fall back to createdAt.
    const anchor = job.completedAt ?? job.createdAt;
    if (now - anchor > TTL_MS) {
      deleteJob(job.jobId);
      removed++;
    }
  }

  return removed;
}

/**
 * Removes any orphaned files in the tmp directory that are older than TTL.
 * These are files not tracked by a job (e.g., from a crashed process).
 */
export function cleanupOrphanedFiles(): number {
  if (!fs.existsSync(TEMP_DIR)) return 0;

  const now = Date.now();
  let removed = 0;

  const files = fs.readdirSync(TEMP_DIR);
  for (const file of files) {
    const filePath = path.join(TEMP_DIR, file);
    try {
      const stat = fs.statSync(filePath);
      if (now - stat.mtimeMs > TTL_MS) {
        fs.unlinkSync(filePath);
        removed++;
      }
    } catch {
      // File may have been removed already — safe to ignore
    }
  }

  return removed;
}

export function runFullCleanup(): { jobs: number; files: number } {
  const jobs = cleanupExpiredJobs();
  const files = cleanupOrphanedFiles();
  return { jobs, files };
}

export { TTL_MINUTES };

// Periodic background cleanup — runs every 2 minutes while the process is alive.
// Without this, orphaned files accumulate whenever uploads are infrequent (e.g.
// overnight), and files left by a previous crashed process are never removed.
// .unref() prevents this timer from blocking graceful process shutdown.
const _cleanupInterval = setInterval(() => {
  try { runFullCleanup(); } catch {}
}, 2 * 60 * 1000);
if (_cleanupInterval.unref) _cleanupInterval.unref();
