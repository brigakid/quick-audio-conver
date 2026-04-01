import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { validateFile, MAX_FILE_SIZE_MB } from '@/lib/file-validation';
import { isConversionAllowed } from '@/lib/conversion-rules';
import { createJob, getTempInputPath } from '@/lib/temp-storage';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { runFullCleanup } from '@/lib/cleanup';
import type { InputFormat, OutputFormat, Bitrate, SampleRate, Channels } from '@/types/conversion';

const VALID_OUTPUT_FORMATS: OutputFormat[] = ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg', 'opus'];
const VALID_BITRATES: Bitrate[] = ['128', '192', '320'];
const VALID_SAMPLE_RATES: SampleRate[] = ['22050', '44100', '48000'];
const VALID_CHANNELS: Channels[] = ['mono', 'stereo'];

// Limit simultaneous file uploads to cap peak RAM from request-body buffering.
// Each concurrent upload holds the full file in RAM (via req.formData()).
// At the 200 MB file limit, 3 concurrent uploads = up to ~600 MB of upload RAM.
const MAX_CONCURRENT_UPLOADS = parseInt(process.env.MAX_CONCURRENT_UPLOADS || '3', 10);
let activeUploads = 0;

export async function POST(req: NextRequest) {
  // Rate limiting
  const identifier = getClientIdentifier(req);
  const rateCheck = checkRateLimit(`upload:${identifier}`);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a moment before trying again.' },
      { status: 429 }
    );
  }

  // Reject clearly oversized requests BEFORE buffering the body.
  // req.formData() buffers the entire multipart body into RAM; if a client sends
  // a 1 GB file, all 1 GB is allocated before validateFile() can reject it.
  // Content-Length is always sent by browsers for multipart/form-data POSTs.
  // Multipart boundary/header overhead is a few KB; the 5 MB margin is generous.
  const rawContentLength = req.headers.get('content-length');
  if (rawContentLength) {
    const contentLength = parseInt(rawContentLength, 10);
    if (!isNaN(contentLength) && contentLength > (MAX_FILE_SIZE_MB + 5) * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: `File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.` },
        { status: 413 }
      );
    }
  }

  // Concurrent upload gate — checked BEFORE body parsing to prevent queued
  // requests from buffering the body while waiting for a slot.
  if (activeUploads >= MAX_CONCURRENT_UPLOADS) {
    return NextResponse.json(
      { success: false, error: 'Server is busy. Please try again in a moment.' },
      { status: 503, headers: { 'Retry-After': '5' } }
    );
  }

  // Run cleanup in the background on each upload
  try { runFullCleanup(); } catch {}

  // Increment BEFORE formData parsing — that is the expensive RAM allocation.
  // Use try/finally so the counter always decrements, even on unexpected throws.
  activeUploads++;
  try {
    return await handleUpload(req);
  } finally {
    activeUploads--;
  }
}

async function handleUpload(req: NextRequest): Promise<NextResponse> {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const fileEntry = formData.get('file');
  const rawOutputFormat = formData.get('outputFormat');
  const rawBitrate = formData.get('bitrate');
  const rawSampleRate = formData.get('sampleRate');
  const rawChannels = formData.get('channels');
  const rawTrimStart = formData.get('trimStart');
  const rawTrimEnd = formData.get('trimEnd');
  const rawFadeIn = formData.get('fadeIn');
  const rawFadeOut = formData.get('fadeOut');
  const rawFadeOutStart = formData.get('fadeOutStart');

  // Whitelist-validate all conversion parameters
  const outputFormat: OutputFormat = VALID_OUTPUT_FORMATS.includes(rawOutputFormat as OutputFormat)
    ? (rawOutputFormat as OutputFormat)
    : 'mp3';
  const bitrate: Bitrate = VALID_BITRATES.includes(rawBitrate as Bitrate)
    ? (rawBitrate as Bitrate)
    : '192';
  const sampleRate: SampleRate = VALID_SAMPLE_RATES.includes(rawSampleRate as SampleRate)
    ? (rawSampleRate as SampleRate)
    : '44100';
  const channels: Channels = VALID_CHANNELS.includes(rawChannels as Channels)
    ? (rawChannels as Channels)
    : 'stereo';

  const trimStartRaw = rawTrimStart !== null ? parseFloat(rawTrimStart as string) : undefined;
  const trimEndRaw = rawTrimEnd !== null ? parseFloat(rawTrimEnd as string) : undefined;
  const trimStart = (trimStartRaw !== undefined && !isNaN(trimStartRaw) && trimStartRaw >= 0) ? trimStartRaw : undefined;
  const trimEnd = (trimEndRaw !== undefined && !isNaN(trimEndRaw) && trimEndRaw > 0) ? trimEndRaw : undefined;

  function parseFadeDuration(raw: FormDataEntryValue | null): number | undefined {
    if (!raw) return undefined;
    const n = parseFloat(raw as string);
    if (isNaN(n) || n <= 0 || n > 30) return undefined;
    return n;
  }
  const fadeIn = parseFadeDuration(rawFadeIn);
  const fadeOut = parseFadeDuration(rawFadeOut);
  const fadeOutStartRaw = rawFadeOutStart !== null ? parseFloat(rawFadeOutStart as string) : undefined;
  const fadeOutStart = (fadeOutStartRaw !== undefined && !isNaN(fadeOutStartRaw) && fadeOutStartRaw >= 0) ? fadeOutStartRaw : undefined;

  if (!fileEntry || typeof fileEntry === 'string') {
    return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 });
  }

  const file = fileEntry as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const validation = validateFile(file.name, file.type, buffer.byteLength);
  if (!validation.valid || !validation.detectedFormat) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 422 });
  }

  const inputFormat = validation.detectedFormat as InputFormat;

  if (!isConversionAllowed(inputFormat, outputFormat)) {
    return NextResponse.json(
      {
        success: false,
        error: `Converting ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} is not supported.`,
      },
      { status: 422 }
    );
  }

  // Write file to temp storage asynchronously to avoid blocking the event loop.
  // writeFileSync holds the event loop for the full duration of the write (up to
  // several hundred milliseconds for a large file on a busy disk).
  const inputPath = getTempInputPath(inputFormat);
  try {
    await fs.promises.writeFile(inputPath, buffer);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to save the uploaded file. Please try again.' },
      { status: 500 }
    );
  }

  const job = createJob({
    inputFormat,
    outputFormat,
    // Bitrate applies to all variable-rate lossy formats: mp3, aac, ogg, opus
    bitrate: (['mp3', 'aac', 'ogg', 'opus'] as OutputFormat[]).includes(outputFormat) ? bitrate : undefined,
    sampleRate,
    channels,
    originalName: file.name,
    inputPath,
    trimStart,
    trimEnd,
    fadeIn,
    fadeOut,
    fadeOutStart,
  });

  return NextResponse.json({ success: true, jobId: job.jobId }, { status: 200 });
}
