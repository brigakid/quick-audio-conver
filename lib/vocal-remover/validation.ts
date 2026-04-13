import path from 'path';

const VR_MAX_FILE_SIZE_MB = parseInt(process.env.VR_MAX_FILE_SIZE_MB || '100', 10);
export const VR_MAX_FILE_SIZE_BYTES = VR_MAX_FILE_SIZE_MB * 1_024 * 1_024;

export const VR_ACCEPTED_EXTENSIONS = ['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg'] as const;
export type VRAcceptedExt = typeof VR_ACCEPTED_EXTENSIONS[number];

export interface VRValidationResult {
  valid:            boolean;
  error?:           string;
  detectedFormat?:  VRAcceptedExt;
}

export function validateVRFile(filename: string, sizeBytes: number): VRValidationResult {
  if (sizeBytes > VR_MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File too large. Maximum size for vocal removal is ${VR_MAX_FILE_SIZE_MB} MB.`,
    };
  }

  const ext = path.extname(filename).toLowerCase().replace('.', '') as VRAcceptedExt;
  if (!(VR_ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) {
    return {
      valid: false,
      error: `Unsupported format ".${ext}". Accepted formats: ${VR_ACCEPTED_EXTENSIONS.map((f) => f.toUpperCase()).join(', ')}.`,
    };
  }

  return { valid: true, detectedFormat: ext };
}

export { VR_MAX_FILE_SIZE_MB };
