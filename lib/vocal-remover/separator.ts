import { spawn }       from 'child_process';
import fs               from 'fs';
import path             from 'path';
import { getDemucsWorkDir, getVocalsPath, getInstrumentalPath, moveFile, rmDir } from './storage';

const TIMEOUT_MS    = parseInt(process.env.VR_JOB_TIMEOUT_MS || '600000', 10); // 10 min
const DEMUCS_MODEL  = process.env.DEMUCS_MODEL  || 'htdemucs';
const DEMUCS_BINARY = process.env.DEMUCS_PATH   || 'demucs';

export interface SeparationResult {
  success:           boolean;
  vocalsPath?:       string;
  instrumentalPath?: string;
  error?:            string;
}

/**
 * Runs `demucs --two-stems=vocals` to separate vocals from instrumental.
 *
 * Demucs output structure (model = htdemucs, input = /path/to/{basename}.mp3):
 *   {workDir}/htdemucs/{basename}/vocals.wav
 *   {workDir}/htdemucs/{basename}/no_vocals.wav
 *
 * After a successful run the stem files are moved to their stable job paths
 * and the scratch workDir is deleted.
 */
export async function separateStems(
  jobId:     string,
  inputPath: string,
): Promise<SeparationResult> {
  const workDir       = getDemucsWorkDir(jobId);
  const vocalsOut     = getVocalsPath(jobId);
  const instOut       = getInstrumentalPath(jobId);

  await fs.promises.mkdir(workDir, { recursive: true });

  return new Promise((resolve) => {
    const args = [
      '--two-stems', 'vocals',
      '--model',     DEMUCS_MODEL,
      '--out',       workDir,
      inputPath,
    ];

    const child = spawn(DEMUCS_BINARY, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stderr = '';
    child.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      rmDir(workDir).catch(() => {});
      resolve({
        success: false,
        error: `Separation timed out after ${TIMEOUT_MS / 1_000}s. The file may be too long.`,
      });
    }, TIMEOUT_MS);

    child.on('error', (err) => {
      clearTimeout(timer);
      rmDir(workDir).catch(() => {});
      resolve({
        success: false,
        error: `Failed to start demucs: ${err.message}. Is demucs installed and in PATH?`,
      });
    });

    child.on('close', async (code) => {
      clearTimeout(timer);

      if (code !== 0) {
        await rmDir(workDir).catch(() => {});
        // Keep last 500 chars of stderr for diagnostics without leaking internal paths
        const hint = stderr.slice(-500).replace(new RegExp(inputPath, 'g'), '<input>');
        resolve({ success: false, error: `demucs exited ${code}: ${hint}` });
        return;
      }

      // Locate stems — primary expected path, then fallback scan
      const inputBase   = path.basename(inputPath, path.extname(inputPath));
      const primaryDir  = path.join(workDir, DEMUCS_MODEL, inputBase);
      const rawVocals   = path.join(primaryDir, 'vocals.wav');
      const rawInst     = path.join(primaryDir, 'no_vocals.wav');

      let vocSrc: string | null = null;
      let instSrc: string | null = null;

      if (fs.existsSync(rawVocals) && fs.existsSync(rawInst)) {
        vocSrc  = rawVocals;
        instSrc = rawInst;
      } else {
        // Fallback: scan the entire workDir for the two expected filenames
        const found = scanForStems(workDir);
        if (found) { vocSrc = found.vocals; instSrc = found.instrumental; }
      }

      if (!vocSrc || !instSrc) {
        await rmDir(workDir).catch(() => {});
        resolve({ success: false, error: 'Stem output files not found after separation.' });
        return;
      }

      try {
        await moveFile(vocSrc, vocalsOut);
        await moveFile(instSrc, instOut);
      } catch (err) {
        await rmDir(workDir).catch(() => {});
        resolve({ success: false, error: `Failed to move stem files: ${err}` });
        return;
      }

      await rmDir(workDir).catch(() => {});

      resolve({
        success:           true,
        vocalsPath:        vocalsOut,
        instrumentalPath:  instOut,
      });
    });
  });
}

/** Recursively scans dir for vocals.wav + no_vocals.wav. */
function scanForStems(dir: string): { vocals: string; instrumental: string } | null {
  let vocals: string | null = null;
  let instrumental: string | null = null;

  function walk(d: string) {
    let items: fs.Dirent[];
    try { items = fs.readdirSync(d, { withFileTypes: true }); }
    catch { return; }

    for (const item of items) {
      const full = path.join(d, item.name);
      if (item.isDirectory())               { walk(full); }
      else if (item.name === 'vocals.wav')   { vocals        = full; }
      else if (item.name === 'no_vocals.wav') { instrumental = full; }
    }
  }

  walk(dir);
  return vocals && instrumental ? { vocals, instrumental } : null;
}
