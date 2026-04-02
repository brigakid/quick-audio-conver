import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { ConversionJob, InputFormat, OutputFormat, Bitrate, SampleRate, Channels } from '@/types/conversion';

// In-memory job store — fine for single-instance / MVP
// For multi-instance deployments, replace with Redis or a database
const jobStore = new Map<string, ConversionJob>();

export const TEMP_DIR = path.join(process.cwd(), 'tmp');

export function ensureTempDir(): void {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
}

export function createJob(params: {
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  bitrate?: Bitrate;
  sampleRate?: SampleRate;
  channels?: Channels;
  originalName: string;
  inputPath: string;
  trimStart?: number;
  trimEnd?: number;
  fadeIn?: number;
  fadeOut?: number;
  fadeOutStart?: number;
  detectedBpm?: number;
  targetBpm?: number;
  pitchSemitones?: number;
}): ConversionJob {
  const jobId = uuidv4();
  const job: ConversionJob = {
    jobId,
    status: 'uploaded',
    ...params,
    createdAt: Date.now(),
  };
  jobStore.set(jobId, job);
  return job;
}

export function getJob(jobId: string): ConversionJob | undefined {
  return jobStore.get(jobId);
}

export function updateJob(jobId: string, updates: Partial<ConversionJob>): ConversionJob | null {
  const job = jobStore.get(jobId);
  if (!job) return null;
  const updated = { ...job, ...updates };
  jobStore.set(jobId, updated);
  return updated;
}

export function deleteJob(jobId: string): void {
  const job = jobStore.get(jobId);
  if (job) {
    // Clean up files
    try { if (job.inputPath && fs.existsSync(job.inputPath)) fs.unlinkSync(job.inputPath); } catch {}
    try { if (job.outputPath && fs.existsSync(job.outputPath)) fs.unlinkSync(job.outputPath); } catch {}
    jobStore.delete(jobId);
  }
}

export function getTempInputPath(ext: string): string {
  ensureTempDir();
  return path.join(TEMP_DIR, `${uuidv4()}_input.${ext}`);
}

export function getTempOutputPath(ext: string): string {
  ensureTempDir();
  return path.join(TEMP_DIR, `${uuidv4()}_output.${ext}`);
}

export function getAllJobs(): ConversionJob[] {
  return Array.from(jobStore.values());
}

/**
 * Deletes only the input file for a job and clears inputPath from the record.
 * Call this immediately after a successful conversion — the input is no longer
 * needed and keeping it until TTL expiry wastes disk space (and RAM on upload).
 */
export function deleteInputFile(jobId: string): void {
  const job = jobStore.get(jobId);
  if (!job) return;
  try {
    if (job.inputPath && fs.existsSync(job.inputPath)) fs.unlinkSync(job.inputPath);
  } catch {}
  jobStore.set(jobId, { ...job, inputPath: '' });
}
