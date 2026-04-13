import { NextRequest, NextResponse } from 'next/server';
import fs                            from 'fs';
import { v4 as uuidv4 }             from 'uuid';
import { isVocalRemoverEnabled }     from '@/lib/vocal-remover/feature-flag';
import { validateVRFile, VR_MAX_FILE_SIZE_MB } from '@/lib/vocal-remover/validation';
import { writeFile, getInputPath, ensureVRDirs } from '@/lib/vocal-remover/storage';
import { createVRJob }              from '@/lib/vocal-remover/job-store';
import { enqueueJob }               from '@/lib/vocal-remover/queue';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { sanitizeFilename }         from '@/lib/file-validation';

// Cap peak RAM from concurrent body buffering.
const MAX_CONCURRENT_UPLOADS = parseInt(process.env.VR_MAX_CONCURRENT_UPLOADS || '3', 10);
let activeUploads = 0;

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isVocalRemoverEnabled()) {
    return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
  }

  const identifier = getClientIdentifier(req);

  // Rate limit: namespaced separately from the main converter
  const rl = checkRateLimit(`vr-upload:${identifier}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait before trying again.' },
      { status: 429 },
    );
  }

  // Reject oversized requests before buffering the body.
  const rawCL = req.headers.get('content-length');
  if (rawCL) {
    const cl = parseInt(rawCL, 10);
    if (!isNaN(cl) && cl > (VR_MAX_FILE_SIZE_MB + 5) * 1_024 * 1_024) {
      return NextResponse.json(
        { success: false, error: `File too large. Maximum size is ${VR_MAX_FILE_SIZE_MB} MB.` },
        { status: 413 },
      );
    }
  }

  if (activeUploads >= MAX_CONCURRENT_UPLOADS) {
    return NextResponse.json(
      { success: false, error: 'Server is busy. Please try again in a moment.' },
      { status: 503, headers: { 'Retry-After': '10' } },
    );
  }

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

  const entry = formData.get('file');
  if (!entry || typeof entry === 'string') {
    return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 });
  }

  const file     = entry as File;
  const safeName = sanitizeFilename(file.name);

  // Pre-validate using reported size (fast path — avoids buffering obviously bad files)
  const preCheck = validateVRFile(safeName, file.size);
  if (!preCheck.valid) {
    return NextResponse.json({ success: false, error: preCheck.error }, { status: 422 });
  }

  const buf = Buffer.from(await file.arrayBuffer());

  // Re-validate against actual byte length in case Content-Length was unreliable
  const validation = validateVRFile(safeName, buf.byteLength);
  if (!validation.valid || !validation.detectedFormat) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 422 });
  }

  const jobId     = uuidv4();
  ensureVRDirs();
  const inputPath = getInputPath(jobId, validation.detectedFormat);

  try {
    await writeFile(inputPath, buf);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to save uploaded file. Please try again.' },
      { status: 500 },
    );
  }

  try {
    await createVRJob({ jobId, originalName: safeName, inputPath });
    await enqueueJob(jobId);
  } catch (err) {
    // Redis / BullMQ unavailable — clean up the uploaded file
    try { fs.unlinkSync(inputPath); } catch {}
    console.error('[vocal-remover/upload] Queue unavailable:', err);
    return NextResponse.json(
      { success: false, error: 'Processing service unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true, jobId }, { status: 200 });
}
