import { Queue } from 'bullmq';
import { getBullMQConnection } from './redis';

export const QUEUE_NAME = 'vocal-remover';

// Cache Queue in the global scope to survive Next.js hot-reload
const g = global as typeof globalThis & { _vrQueue?: Queue };

export function getQueue(): Queue {
  if (g._vrQueue) return g._vrQueue;

  g._vrQueue = new Queue(QUEUE_NAME, {
    connection:        getBullMQConnection(),
    defaultJobOptions: {
      removeOnComplete: { count: 100 },
      removeOnFail:     { count:  50 },
      attempts:         2,
      backoff:          { type: 'fixed', delay: 5_000 },
    },
  });

  return g._vrQueue;
}

/**
 * Adds a job to the queue.  The BullMQ job ID is set to our own jobId so
 * getJobQueuePosition() can look it up without a secondary index.
 */
export async function enqueueJob(jobId: string): Promise<void> {
  const queue = getQueue();
  await queue.add('separate', { jobId }, { jobId });
}

/**
 * Returns 1-based position in the waiting list, or null if the job is no
 * longer waiting (active / completed / not found).  Best-effort: any error
 * returns null rather than throwing.
 */
export async function getJobQueuePosition(jobId: string): Promise<number | null> {
  try {
    const queue   = getQueue();
    const waiting = await queue.getWaiting();
    const idx     = waiting.findIndex((j) => j.id === jobId);
    return idx >= 0 ? idx + 1 : null;
  } catch {
    return null;
  }
}
