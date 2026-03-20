export interface UploadResponse {
  success: boolean;
  jobId?: string;
  error?: string;
}

export interface ConvertResponse {
  success: boolean;
  jobId?: string;
  error?: string;
}

export interface StatusResponse {
  success: boolean;
  status?: string;
  error?: string;
  downloadUrl?: string;
  outputFilename?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}
