import { NextRequest, NextResponse } from 'next/server';
import fs                            from 'fs';
import path                          from 'path';
import { Readable }                  from 'stream';
import { getVRJob }                  from '@/lib/vocal-remover/job-store';
import { isVocalRemoverEnabled }     from '@/lib/vocal-remover/feature-flag';

const STEM_LABELS: Record<string, string> = {
  vocals:       'Vocals',
  instrumental: 'Instrumental',
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isVocalRemoverEnabled()) {
    return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
  }

  const { searchParams } = req.nextUrl;
  const jobId = searchParams.get('jobId');
  const stem  = searchParams.get('stem');
  // ?inline=1 returns Content-Disposition: inline for the audio preview player
  const inline = searchParams.get('inline') === '1';

  if (!jobId || !stem) {
    return NextResponse.json(
      { success: false, error: 'Missing jobId or stem.' },
      { status: 400 },
    );
  }

  if (!['vocals', 'instrumental'].includes(stem)) {
    return NextResponse.json(
      { success: false, error: 'Invalid stem. Use vocals or instrumental.' },
      { status: 400 },
    );
  }

  let job;
  try {
    job = await getVRJob(jobId);
  } catch {
    return NextResponse.json({ success: false, error: 'Service unavailable.' }, { status: 503 });
  }

  if (!job) {
    return NextResponse.json(
      { success: false, error: 'Job not found or expired.' },
      { status: 404 },
    );
  }

  if (job.status !== 'completed') {
    return NextResponse.json(
      { success: false, error: `Job is ${job.status}. Downloads are only available after completion.` },
      { status: 409 },
    );
  }

  const filePath = stem === 'vocals' ? job.vocalsPath : job.instrumentalPath;
  if (!filePath || !fs.existsSync(filePath)) {
    return NextResponse.json(
      { success: false, error: 'Output file not found. It may have expired.' },
      { status: 404 },
    );
  }

  let fileSize: number;
  try {
    fileSize = fs.statSync(filePath).size;
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to read output file.' }, { status: 500 });
  }

  // Build a human-friendly download filename from the original upload name
  const base     = path.basename(job.originalName, path.extname(job.originalName));
  const label    = STEM_LABELS[stem] ?? stem;
  const dlName   = `${base}_${label}.wav`;
  const safeName = dlName.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '\\"');
  const encoded  = encodeURIComponent(dlName);
  const disposition = inline
    ? `inline; filename="${safeName}"; filename*=UTF-8''${encoded}`
    : `attachment; filename="${safeName}"; filename*=UTF-8''${encoded}`;

  const nodeStream = fs.createReadStream(filePath, { highWaterMark: 64 * 1_024 });
  const webStream  = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      'Content-Type':        'audio/wav',
      'Content-Length':      String(fileSize),
      'Content-Disposition': disposition,
      'Cache-Control':       'no-store',
    },
  });
}
