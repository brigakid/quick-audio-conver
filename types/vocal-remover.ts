// Status lifecycle: queued → processing → completed | failed
// Cleanup sets expired after TTL.
export type VRJobStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'expired';

export interface VRJob {
  jobId:            string;
  status:           VRJobStatus;
  originalName:     string;
  inputPath:        string;
  vocalsPath?:      string;
  instrumentalPath?: string;
  error?:           string;
  createdAt:        number;
  startedAt?:       number;
  completedAt?:     number;
}

/** Shape returned by GET /api/vocal-remover/status */
export interface VRStatusResponse {
  success:        true;
  jobId:          string;
  status:         VRJobStatus;
  queuePosition?: number;   // present only when status === 'queued'
  stems?: {
    vocals:       { url: string };
    instrumental: { url: string };
  };
  error?: string;           // present only when status === 'failed'
}
