import fs   from 'fs';
import path from 'path';
import { VR_ROOT_DIR, VR_STEMS_DIR, VR_DEMUCS_DIR } from './storage';

const TTL_MS = parseInt(process.env.VR_JOB_TTL_HOURS || '1', 10) * 60 * 60 * 1_000;

/**
 * Deletes files older than VR_JOB_TTL_HOURS from the vocal-remover temp dirs.
 * Safe to call from the worker on a periodic interval — only removes files,
 * never touches active job records (those are cleaned by Redis TTL).
 */
export async function cleanupExpiredVRFiles(): Promise<number> {
  const now     = Date.now();
  let   removed = 0;

  const dirs = [VR_ROOT_DIR, VR_STEMS_DIR];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    let entries: string[];
    try { entries = await fs.promises.readdir(dir); }
    catch { continue; }

    for (const name of entries) {
      const filePath = path.join(dir, name);
      try {
        const stat = await fs.promises.stat(filePath);
        if (stat.isFile() && now - stat.mtimeMs > TTL_MS) {
          await fs.promises.unlink(filePath);
          removed++;
        }
      } catch {}
    }
  }

  // Also sweep any leftover demucs scratch dirs
  if (fs.existsSync(VR_DEMUCS_DIR)) {
    let entries: string[];
    try { entries = await fs.promises.readdir(VR_DEMUCS_DIR); }
    catch { entries = []; }

    for (const name of entries) {
      const dirPath = path.join(VR_DEMUCS_DIR, name);
      try {
        const stat = await fs.promises.stat(dirPath);
        if (stat.isDirectory() && now - stat.mtimeMs > TTL_MS) {
          await fs.promises.rm(dirPath, { recursive: true, force: true });
          removed++;
        }
      } catch {}
    }
  }

  return removed;
}
