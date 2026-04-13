import { NextRequest, NextResponse } from 'next/server';
import { getVRJob }                  from '@/lib/vocal-remover/job-store';
import { getJobQueuePosition }       from '@/lib/vocal-remover/queue';
import { isVocalRemoverEnabled }     from '@/lib/vocal-remover/feature-flag';

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isVocalRemoverEnabled()) {
    return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
  }

  const jobId = req.nextUrl.searchParams.get('jobId');
  if (!jobId) {
    return NextResponse.json({ success: false, error: 'Missing jobId.' }, { status: 400 });
  }

  let job;
  try {
    job = await getVRJob(jobId);
  } catch (err) {
    console.error('[vocal-remover/status] Redis error:', err);
    return NextResponse.json(
      { success: false, error: 'Status service temporarily unavailable.' },
      { status: 503 },
    );
  }

  if (!job) {
    return NextResponse.json(
      { success: false, error: 'Job not found. It may have expired.' },
      { status: 404 },
    );
  }

  const body: Record<string, unknown> = {
    success: true,
    jobId,
    status: job.status,
  };

  if (job.status === 'queued') {
    // Queue position is best-effort — null is fine, the UI handles it gracefully
    const pos = await getJobQueuePosition(jobId).catch(() => null);
    if (pos !== null) body.queuePosition = pos;
  }

  if (job.status === 'completed') {
    body.stems = {
      vocals:       { url: `/api/vocal-remover/download?jobId=${jobId}&stem=vocals` },
      instrumental: { url: `/api/vocal-remover/download?jobId=${jobId}&stem=instrumental` },
    };
  }

  if (job.status === 'failed') {
    body.error = job.error ?? 'Separation failed. Please try a different file.';
  }

  return NextResponse.json(body);
}
