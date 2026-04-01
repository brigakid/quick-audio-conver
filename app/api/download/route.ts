import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { Readable } from 'stream';
import path from 'path';
import { getJob } from '@/lib/temp-storage';

const MIME_TYPES: Record<string, string> = {
  mp3:  'audio/mpeg',
  wav:  'audio/wav',
  m4a:  'audio/mp4',
  flac: 'audio/flac',
  aac:  'audio/aac',
  ogg:  'audio/ogg',
  opus: 'audio/ogg',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json({ success: false, error: 'jobId is required.' }, { status: 400 });
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json(
      { success: false, error: 'Job not found or has expired.' },
      { status: 404 }
    );
  }

  if (job.status !== 'done') {
    return NextResponse.json(
      { success: false, error: 'File is not ready for download yet.' },
      { status: 409 }
    );
  }

  if (!job.outputPath || !fs.existsSync(job.outputPath)) {
    return NextResponse.json(
      { success: false, error: 'Output file not found. It may have been deleted.' },
      { status: 410 }
    );
  }

  const ext = path.extname(job.outputPath).replace('.', '').toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const filename = job.outputFilename || `converted.${ext}`;

  // RFC 5987 encoding for non-ASCII filenames
  const safeAscii = filename.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '\\"');
  const contentDisposition = `attachment; filename="${safeAscii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;

  let fileSize: number;
  try {
    fileSize = fs.statSync(job.outputPath).size;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to read the output file.' },
      { status: 500 }
    );
  }

  // Capture path in a local variable — job record could theoretically be mutated
  // by cleanup between here and stream creation (extremely unlikely, but explicit).
  const outputPath = job.outputPath;

  // Stream the file to the client with proper backpressure via Readable.toWeb().
  // The push-based ReadableStream model (manually wiring 'data' events) lacks
  // backpressure: on a slow connection the entire file buffers in the V8 heap
  // before TCP can drain it.  Readable.toWeb() wires Node.js stream pause/resume
  // to the Web ReadableStream protocol, so peak RAM stays at ~64 KB (one read
  // buffer) regardless of file size.
  const nodeStream = fs.createReadStream(outputPath);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      'Content-Type':        contentType,
      'Content-Disposition': contentDisposition,
      'Content-Length':      String(fileSize),
      'Cache-Control':       'no-store',
    },
  });
}
