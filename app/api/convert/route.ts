import { NextRequest, NextResponse } from 'next/server';
import { getJob, updateJob, getTempOutputPath, deleteInputFile } from '@/lib/temp-storage';
import { convertFile, getOutputExtension } from '@/lib/ffmpeg';
import { buildOutputFilename } from '@/lib/utils';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

// Limit simultaneous ffmpeg processes.
// Each conversion is CPU-bound and temporarily keeps both the input and output
// file open in the OS buffer cache.  More than 3 concurrent jobs on a 2 GB
// server risks RAM exhaustion with large files.
const MAX_CONCURRENT = parseInt(process.env.MAX_CONCURRENT_CONVERSIONS || '3', 10);
let activeConversions = 0;

export async function POST(req: NextRequest) {
  const identifier = getClientIdentifier(req);
  const rateCheck = checkRateLimit(`convert:${identifier}`);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait before converting again.' },
      { status: 429 }
    );
  }

  if (activeConversions >= MAX_CONCURRENT) {
    return NextResponse.json(
      { success: false, error: 'Server is busy. Please try again in a moment.' },
      { status: 503, headers: { 'Retry-After': '5' } }
    );
  }

  let body: { jobId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { jobId } = body;
  if (!jobId || typeof jobId !== 'string') {
    return NextResponse.json({ success: false, error: 'jobId is required.' }, { status: 400 });
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json(
      { success: false, error: 'Job not found. It may have expired.' },
      { status: 404 }
    );
  }

  if (job.status !== 'uploaded') {
    return NextResponse.json(
      { success: false, error: `Job is already in state: ${job.status}` },
      { status: 409 }
    );
  }

  const outputExt = getOutputExtension(job.outputFormat);
  const outputPath = getTempOutputPath(outputExt);
  const outputFilename = buildOutputFilename(job.originalName, outputExt);

  // Mark as processing
  updateJob(jobId, { status: 'processing', outputPath, outputFilename });

  activeConversions++;

  // Run conversion asynchronously so we can respond immediately
  convertFile({
    inputPath: job.inputPath,
    outputPath,
    inputFormat: job.inputFormat,
    outputFormat: job.outputFormat,
    bitrate: job.bitrate,
    sampleRate: job.sampleRate,
    channels: job.channels,
    trimStart: job.trimStart,
    trimEnd: job.trimEnd,
    fadeIn: job.fadeIn,
    fadeOut: job.fadeOut,
    fadeOutStart: job.fadeOutStart,
    detectedBpm: job.detectedBpm,
    targetBpm: job.targetBpm,
  }).then((result) => {
    if (result.success) {
      updateJob(jobId, { status: 'done', completedAt: Date.now() });
      // Input file is no longer needed — delete it immediately rather than
      // waiting for the TTL cleanup.  Output file stays until TTL or download.
      deleteInputFile(jobId);
    } else {
      updateJob(jobId, { status: 'failed', error: result.error });
    }
  }).catch(() => {
    updateJob(jobId, { status: 'failed', error: 'An unexpected error occurred during conversion.' });
  }).finally(() => {
    activeConversions--;
  });

  return NextResponse.json({ success: true, jobId }, { status: 200 });
}
