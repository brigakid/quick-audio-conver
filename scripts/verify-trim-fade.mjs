#!/usr/bin/env node
/**
 * verify-trim-fade.mjs
 *
 * End-to-end verification for trim + fade in QuickAudioConvert.
 *
 * 1. Generates a 20-second 440 Hz sine-wave test file.
 * 2. Runs the same FFmpeg command pipeline the production server builds via
 *    fluent-ffmpeg (see lib/ffmpeg.ts: -ss before -i, -t after, then -af
 *    "afade=t=in:st=0:d=N,afade=t=out:st=M:d=N").
 * 3. Verifies output duration matches expected.
 * 4. Verifies amplitude (RMS) RISES during fade-in and FALLS during fade-out.
 *
 * Run:  node scripts/verify-trim-fade.mjs
 */

import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const execFileP = promisify(execFile);

// Resolve ffmpeg/ffprobe — fluent-ffmpeg typically uses whatever is on PATH.
const FFMPEG  = process.env.FFMPEG_BIN  || 'ffmpeg';
const FFPROBE = process.env.FFPROBE_BIN || 'ffprobe';

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'qac-fade-'));
process.on('exit', () => {
  try { fs.rmSync(TMP, { recursive: true, force: true }); } catch { /* ignore */ }
});

let passes = 0;
let failures = 0;
function ok(msg)   { console.log(`  ✓ ${msg}`); passes++;   }
function bad(msg)  { console.log(`  ✗ ${msg}`); failures++; }
function info(msg) { console.log(`  → ${msg}`); }

/** Build the same args fluent-ffmpeg would build for our production options. */
function buildArgs({ input, output, trimStart, trimEnd, fadeIn, fadeOut, fadeOutStart }) {
  const args = [];
  if (trimStart !== undefined && trimStart > 0) args.push('-ss', String(trimStart));
  args.push('-i', input);
  if (trimStart !== undefined && trimEnd !== undefined && trimEnd > trimStart) {
    args.push('-t', String(trimEnd - trimStart));
  }
  const filters = [];
  if (fadeIn   && fadeIn   > 0) filters.push(`afade=t=in:st=0:d=${fadeIn}`);
  if (fadeOut  && fadeOut  > 0 && fadeOutStart !== undefined) {
    filters.push(`afade=t=out:st=${fadeOutStart}:d=${fadeOut}`);
  }
  if (filters.length) args.push('-af', filters.join(','));
  args.push('-vn', '-acodec', 'libmp3lame', '-b:a', '192k', '-y', output);
  return args;
}

async function ffmpegRun(args) {
  await execFileP(FFMPEG, args, { maxBuffer: 64 * 1024 * 1024 });
}

async function probeDuration(file) {
  const { stdout } = await execFileP(FFPROBE, [
    '-v', 'quiet', '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1', file,
  ]);
  return parseFloat(stdout.trim());
}

/**
 * Returns an array of RMS dB values, one per windowSec window.
 * Implementation: run an astats filter on a fixed-length window using
 * asetnsamples + reset=1, then capture metadata lines.
 */
async function rmsPerWindow(file, windowSec) {
  const sampleRate = 44100;
  const n = Math.round(windowSec * sampleRate);
  const args = [
    '-i', file,
    '-af', `asetnsamples=${n}:p=0,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level`,
    '-f', 'null', '-',
  ];
  // ffmpeg writes ametadata to stderr — capture it explicitly.
  return await new Promise((resolve, reject) => {
    execFile(FFMPEG, args, { maxBuffer: 64 * 1024 * 1024 }, (err, _stdout, stderr) => {
      if (err) return reject(err);
      const out = [];
      for (const line of stderr.split(/\r?\n/)) {
        const m = line.match(/RMS_level=(-?[\d.]+|-?inf)/);
        if (m) out.push(m[1] === '-inf' ? -Infinity : parseFloat(m[1]));
      }
      resolve(out);
    });
  });
}

/** Strictly increasing? (allows tiny numerical noise) */
function isIncreasing(arr, tol = 0.5) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1] - tol) return false;
  }
  return true;
}
function isDecreasing(arr, tol = 0.5) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1] + tol) return false;
  }
  return true;
}

async function generateInput(file) {
  await ffmpegRun([
    '-f', 'lavfi', '-i', 'sine=frequency=440:duration=20:sample_rate=44100',
    '-ac', '2', '-af', 'volume=0.7', '-y', file,
  ]);
}

async function runCase(name, opts, expected) {
  console.log(`\n[case] ${name}`);
  const out = path.join(TMP, `${name.replace(/[^a-z0-9]+/gi, '_')}.mp3`);
  const args = buildArgs({ input: opts.input, output: out, ...opts });
  info(`ffmpeg ${args.slice(args.indexOf('-i')).join(' ')}`);
  await ffmpegRun(args);

  const dur = await probeDuration(out);
  if (Math.abs(dur - expected.duration) < 0.05) {
    ok(`output duration ${dur.toFixed(3)}s (expected ~${expected.duration}s)`);
  } else {
    bad(`output duration ${dur.toFixed(3)}s (expected ${expected.duration}s)`);
  }

  // 0.5-second windows over the entire output
  const rms = await rmsPerWindow(out, 0.5);
  info(`rms windows (dB): ${rms.map(r => Number.isFinite(r) ? r.toFixed(1) : '-inf').join(', ')}`);

  // Validate fade-in window
  if (expected.fadeInWindows > 0) {
    const seg = rms.slice(0, expected.fadeInWindows);
    if (isIncreasing(seg, 0.5)) ok(`fade-in: amplitude rises across first ${expected.fadeInWindows} window(s)`);
    else                         bad(`fade-in: amplitude did not strictly rise: [${seg.map(v => v.toFixed(1)).join(', ')}]`);
  }

  // Validate fade-out window
  if (expected.fadeOutWindows > 0) {
    const seg = rms.slice(rms.length - expected.fadeOutWindows);
    if (isDecreasing(seg, 0.5)) ok(`fade-out: amplitude falls across last ${expected.fadeOutWindows} window(s)`);
    else                         bad(`fade-out: amplitude did not strictly fall: [${seg.map(v => v.toFixed(1)).join(', ')}]`);
  }

  // Middle stays roughly steady when there's a non-fading middle
  if (expected.steadyRange) {
    const [lo, hi] = expected.steadyRange;
    const mid = rms.slice(lo, hi);
    const span = Math.max(...mid) - Math.min(...mid);
    if (span < 1.0) ok(`middle is steady (${span.toFixed(2)} dB span across ${mid.length} windows)`);
    else            bad(`middle should be steady but spans ${span.toFixed(2)} dB`);
  }
}

(async () => {
  console.log(`Verifying trim + fade FFmpeg pipeline (output dir: ${TMP})`);
  // Sanity-check ffmpeg/ffprobe up-front so we fail with a clear message.
  try {
    execFileSync(FFMPEG,  ['-version'], { stdio: 'ignore' });
    execFileSync(FFPROBE, ['-version'], { stdio: 'ignore' });
  } catch {
    console.error(`\nffmpeg/ffprobe not found on PATH (or via $FFMPEG_BIN/$FFPROBE_BIN).\nInstall FFmpeg or set the env vars to run this verifier.`);
    process.exit(2);
  }

  const input = path.join(TMP, 'input.wav');
  await generateInput(input);
  ok(`generated 20s sine test input: ${input}`);

  // Case 1: trim 5..15 + fade-in 2s + fade-out 2s
  // 10s output, 4 windows fade-in (2s/0.5s), 4 windows fade-out, steady middle 4..16
  await runCase('trim_with_both_fades', {
    input, trimStart: 5, trimEnd: 15, fadeIn: 2, fadeOut: 2, fadeOutStart: 8,
  }, {
    duration: 10,
    fadeInWindows: 4,
    fadeOutWindows: 4,
    steadyRange: [5, 15], // windows 5..14 (2.5s..7.5s) should be steady
  });

  // Case 2: full file + fade-in 2 + fade-out 2 (no trim)
  // 20s output, fade-in over windows 0..3, fade-out over windows 36..39
  await runCase('full_file_both_fades', {
    input, fadeIn: 2, fadeOut: 2, fadeOutStart: 18,
  }, {
    duration: 20,
    fadeInWindows: 4,
    fadeOutWindows: 4,
    steadyRange: [5, 35],
  });

  // Case 3: trim only (no fades)
  await runCase('trim_only', {
    input, trimStart: 3, trimEnd: 7,
  }, {
    duration: 4,
    fadeInWindows: 0,
    fadeOutWindows: 0,
    steadyRange: [1, 7],
  });

  // Case 4: fade-in only
  await runCase('fade_in_only', {
    input, fadeIn: 3,
  }, {
    duration: 20,
    fadeInWindows: 6,
    fadeOutWindows: 0,
    steadyRange: [10, 35],
  });

  // Case 5: fade-out only
  await runCase('fade_out_only', {
    input, fadeOut: 3, fadeOutStart: 17,
  }, {
    duration: 20,
    fadeInWindows: 0,
    fadeOutWindows: 6,
    steadyRange: [5, 30],
  });

  // Case 6: short clip with overlapping fades (clamping path).
  // Trim 5..7 (2s) with fade-in 1 + fade-out 1 — should produce a tent shape.
  await runCase('short_overlap', {
    input, trimStart: 5, trimEnd: 7, fadeIn: 1, fadeOut: 1, fadeOutStart: 1,
  }, {
    duration: 2,
    fadeInWindows: 2,
    fadeOutWindows: 2,
  });

  console.log(`\nResult: ${passes} passed, ${failures} failed`);
  process.exit(failures > 0 ? 1 : 0);
})().catch((err) => {
  console.error('\nUNEXPECTED ERROR:', err);
  process.exit(2);
});
