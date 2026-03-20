import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/temp-storage';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json({ success: false, error: 'jobId is required.' }, { status: 400 });
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json(
      { success: false, error: 'Job not found. It may have expired.' },
      { status: 404 }
    );
  }

  const response: Record<string, unknown> = {
    success: true,
    status: job.status,
  };

  if (job.status === 'done') {
    response.downloadUrl = `/api/download?jobId=${jobId}`;
    response.outputFilename = job.outputFilename;
  }

  if (job.status === 'failed') {
    response.error = job.error || 'Conversion failed.';
  }

  return NextResponse.json(response, { status: 200 });
}
