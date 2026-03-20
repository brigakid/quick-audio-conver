import { NextRequest, NextResponse } from 'next/server';
import { getJob, updateJob, getTempOutputPath } from '@/lib/temp-storage';
import { convertFile, getOutputExtension } from '@/lib/ffmpeg';
import { buildOutputFilename } from '@/lib/utils';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const identifier = getClientIdentifier(req);
  const rateCheck = checkRateLimit(`convert:${identifier}`);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait before converting again.' },
      { status: 429 }
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
  }).then((result) => {
    if (result.success) {
      updateJob(jobId, { status: 'done', completedAt: Date.now() });
    } else {
      updateJob(jobId, { status: 'failed', error: result.error });
    }
  }).catch(() => {
    updateJob(jobId, { status: 'failed', error: 'An unexpected error occurred during conversion.' });
  });

  return NextResponse.json({ success: true, jobId }, { status: 200 });
}
