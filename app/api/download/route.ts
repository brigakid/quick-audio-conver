import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getJob } from '@/lib/temp-storage';

const MIME_TYPES: Record<string, string> = {
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  m4a: 'audio/mp4',
  flac: 'audio/flac',
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

  try {
    const fileBuffer = fs.readFileSync(job.outputPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
        'Content-Length': String(fileBuffer.byteLength),
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to read the output file.' },
      { status: 500 }
    );
  }
}
