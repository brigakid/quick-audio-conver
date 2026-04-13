import fs   from 'fs';
import path from 'path';

// All vocal-remover temp files live under tmp/vocal-remover/ so they are
// completely isolated from the main converter's tmp/ tree.
export const VR_ROOT_DIR   = path.join(process.cwd(), 'tmp', 'vocal-remover');
export const VR_STEMS_DIR  = path.join(VR_ROOT_DIR, 'stems');
export const VR_DEMUCS_DIR = path.join(VR_ROOT_DIR, 'demucs');

export function ensureVRDirs(): void {
  for (const dir of [VR_ROOT_DIR, VR_STEMS_DIR, VR_DEMUCS_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

// --------------------------------------------------------------------------
// Path helpers
// --------------------------------------------------------------------------

export function getInputPath(jobId: string, ext: string): string {
  ensureVRDirs();
  return path.join(VR_ROOT_DIR, `${jobId}_input.${ext}`);
}

export function getVocalsPath(jobId: string): string {
  return path.join(VR_STEMS_DIR, `${jobId}_vocals.wav`);
}

export function getInstrumentalPath(jobId: string): string {
  return path.join(VR_STEMS_DIR, `${jobId}_instrumental.wav`);
}

/** Scratch space for one demucs run; deleted after stems are moved. */
export function getDemucsWorkDir(jobId: string): string {
  return path.join(VR_DEMUCS_DIR, jobId);
}

// --------------------------------------------------------------------------
// File operations
// --------------------------------------------------------------------------

export async function writeFile(filePath: string, data: Buffer): Promise<void> {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, data);
}

/**
 * Moves src → dest.  Falls back to copy+unlink when rename fails
 * (e.g. cross-device move on Linux/Docker).
 */
export async function moveFile(src: string, dest: string): Promise<void> {
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  try {
    await fs.promises.rename(src, dest);
  } catch {
    await fs.promises.copyFile(src, dest);
    await fs.promises.unlink(src);
  }
}

/** Recursively removes a directory; ignores errors (already gone, etc.). */
export async function rmDir(dirPath: string): Promise<void> {
  try {
    await fs.promises.rm(dirPath, { recursive: true, force: true });
  } catch {}
}
