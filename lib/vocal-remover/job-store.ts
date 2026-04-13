import { getRedisClient } from './redis';
import type { VRJob, VRJobStatus } from '@/types/vocal-remover';

const KEY_PREFIX  = 'vr:job:';
const TTL_SECONDS = parseInt(process.env.VR_JOB_TTL_HOURS || '1', 10) * 3_600;

function key(jobId: string): string {
  return `${KEY_PREFIX}${jobId}`;
}

export async function createVRJob(params: {
  jobId:        string;
  originalName: string;
  inputPath:    string;
}): Promise<void> {
  const redis = getRedisClient();
  const job: VRJob = {
    jobId:        params.jobId,
    status:       'queued',
    originalName: params.originalName,
    inputPath:    params.inputPath,
    createdAt:    Date.now(),
  };
  await redis.hset(key(params.jobId), flatten(job));
  await redis.expire(key(params.jobId), TTL_SECONDS);
}

export async function getVRJob(jobId: string): Promise<VRJob | null> {
  const redis = getRedisClient();
  const data  = await redis.hgetall(key(jobId));
  if (!data || Object.keys(data).length === 0) return null;
  return parse(data);
}

export async function updateVRJob(jobId: string, updates: Partial<VRJob>): Promise<void> {
  const redis = getRedisClient();
  const flat  = flatten(updates);
  if (Object.keys(flat).length === 0) return;
  await redis.hset(key(jobId), flat);
  // Refresh TTL on every meaningful update so active jobs don't silently expire.
  await redis.expire(key(jobId), TTL_SECONDS);
}

export async function deleteVRJob(jobId: string): Promise<void> {
  const redis = getRedisClient();
  await redis.del(key(jobId));
}

// --------------------------------------------------------------------------
// Helpers — serialise/deserialise the flat Redis hash
// --------------------------------------------------------------------------

function flatten(obj: Partial<VRJob>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v);
  }
  return out;
}

function parse(data: Record<string, string>): VRJob {
  return {
    jobId:            data.jobId        ?? '',
    status:           (data.status      ?? 'queued') as VRJobStatus,
    originalName:     data.originalName ?? '',
    inputPath:        data.inputPath    ?? '',
    vocalsPath:       data.vocalsPath,
    instrumentalPath: data.instrumentalPath,
    error:            data.error,
    createdAt:        parseInt(data.createdAt  || '0', 10),
    startedAt:        data.startedAt    ? parseInt(data.startedAt,    10) : undefined,
    completedAt:      data.completedAt  ? parseInt(data.completedAt,  10) : undefined,
  };
}
