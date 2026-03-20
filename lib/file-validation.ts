import path from 'path';
import type { InputFormat } from '@/types/conversion';
import { FORMAT_MIME_TYPES, SUPPORTED_INPUT_FORMATS } from './conversion-rules';

const MAX_FILE_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || '200', 10);
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detectedFormat?: InputFormat;
}

export function validateFile(
  filename: string,
  mimeType: string,
  sizeBytes: number
): ValidationResult {
  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the ${MAX_FILE_SIZE_MB}MB limit. Please use a smaller file.`,
    };
  }

  const ext = path.extname(filename).toLowerCase().replace('.', '') as InputFormat;

  if (!SUPPORTED_INPUT_FORMATS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file format ".${ext}". Supported formats: ${SUPPORTED_INPUT_FORMATS.map((f) => f.toUpperCase()).join(', ')}.`,
    };
  }

  const allowedMimes = FORMAT_MIME_TYPES[ext] || [];
  const mimeMatch =
    allowedMimes.includes(mimeType) ||
    // Some browsers send generic MIME types
    mimeType === 'application/octet-stream' ||
    mimeType === 'audio/mp4';

  if (!mimeMatch) {
    // Be lenient — trust the extension, just log the discrepancy
    // Some OS/browsers report incorrect MIME types for less common formats
  }

  return { valid: true, detectedFormat: ext };
}

export function sanitizeFilename(filename: string): string {
  // Remove path traversal, null bytes, and limit to safe characters
  return path
    .basename(filename)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .substring(0, 200);
}

export { MAX_FILE_SIZE_MB };
