'use client';

import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Music theory data
// ---------------------------------------------------------------------------

/** Krumhansl-Schmuckler key profiles (1990) */
const MAJOR_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const MINOR_PROFILE = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

/** Short names indexed by pitch class 0–11 (C…B). */
const MAJOR_SHORT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const MINOR_SHORT = ['Cm', 'C#m', 'Dm', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'Abm', 'Am', 'Bbm', 'Bm'];

/** Full names for accessible labels / tooltips. */
const MAJOR_FULL = [
  'C major', 'Db major', 'D major', 'Eb major', 'E major', 'F major',
  'F# major', 'G major', 'Ab major', 'A major', 'Bb major', 'B major',
];
const MINOR_FULL = [
  'C minor', 'C# minor', 'D minor', 'Eb minor', 'E minor', 'F minor',
  'F# minor', 'G minor', 'Ab minor', 'A minor', 'Bb minor', 'B minor',
];

// ---------------------------------------------------------------------------
// Key type & utilities (exported for ConverterBox wiring)
// ---------------------------------------------------------------------------

export interface DetectedKey {
  index:      number;            // pitch class 0–11
  mode:       'major' | 'minor';
  confidence: number;            // 0–1
}

export function keyShortName(index: number, mode: 'major' | 'minor'): string {
  return mode === 'major' ? MAJOR_SHORT[index] : MINOR_SHORT[index];
}

export function keyFullName(index: number, mode: 'major' | 'minor'): string {
  return mode === 'major' ? MAJOR_FULL[index] : MINOR_FULL[index];
}

/** Shift a key by semitones, preserving mode. */
export function shiftedKey(
  index: number,
  mode: 'major' | 'minor',
  semitones: number,
): { index: number; mode: 'major' | 'minor' } {
  return { index: ((index + semitones) % 12 + 12) % 12, mode };
}

// ---------------------------------------------------------------------------
// Detection algorithm (pure functions, no side effects)
// ---------------------------------------------------------------------------

/**
 * Goertzel algorithm: computes DFT energy at a single frequency.
 * O(N) per frequency — far cheaper than a full FFT when only a handful of
 * discrete frequencies are needed.
 */
function goertzelEnergy(samples: Float32Array, freq: number, sampleRate: number): number {
  const N = samples.length;
  const k = Math.round((N * freq) / sampleRate);
  const omega = (2 * Math.PI * k) / N;
  const coeff = 2 * Math.cos(omega);
  let s1 = 0, s2 = 0;
  for (let i = 0; i < N; i++) {
    const s0 = samples[i] + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }
  return s1 * s1 + s2 * s2 - coeff * s1 * s2;
}

/**
 * 12-bin chroma vector: sums Goertzel energy over octaves 2–6 for each
 * pitch class, then normalises to sum = 1.
 */
function computeChroma(samples: Float32Array, sampleRate: number): Float32Array {
  const chroma = new Float32Array(12);
  for (let pc = 0; pc < 12; pc++) {
    let energy = 0;
    for (let octave = 2; octave <= 6; octave++) {
      const midiNote = pc + octave * 12;
      const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
      if (freq >= sampleRate / 2) continue; // above Nyquist — skip
      energy += goertzelEnergy(samples, freq, sampleRate);
    }
    chroma[pc] = Math.max(0, energy); // energy is always ≥ 0; guard rounding
  }
  const total = chroma.reduce((a, v) => a + v, 0);
  if (total > 0) for (let i = 0; i < 12; i++) chroma[i] /= total;
  return chroma;
}

/**
 * Krumhansl-Schmuckler key-finding: Pearson correlation between the chroma
 * vector and each of 24 rotated key profiles (12 major + 12 minor).
 * Returns best match + a normalised confidence score.
 */
function detectKeyFromChroma(chroma: Float32Array): DetectedKey {
  function pearson(profile: number[], offset: number): number {
    const n = 12;
    let mA = 0, mB = 0;
    for (let i = 0; i < n; i++) { mA += profile[i]; mB += chroma[(i + offset) % n]; }
    mA /= n; mB /= n;
    let num = 0, dA = 0, dB = 0;
    for (let i = 0; i < n; i++) {
      const a = profile[i] - mA;
      const b = chroma[(i + offset) % n] - mB;
      num += a * b; dA += a * a; dB += b * b;
    }
    return dA > 0 && dB > 0 ? num / Math.sqrt(dA * dB) : 0;
  }

  let best = -Infinity, second = -Infinity;
  let bestIndex = 0;
  let bestMode: 'major' | 'minor' = 'major';

  for (let root = 0; root < 12; root++) {
    const maj = pearson(MAJOR_PROFILE, root);
    const min = pearson(MINOR_PROFILE, root);
    for (const [score, mode] of [[maj, 'major'], [min, 'minor']] as const) {
      if (score > best) { second = best; best = score; bestIndex = root; bestMode = mode; }
      else if (score > second) second = score;
    }
  }

  // Confidence: gap between 1st and 2nd score, scaled to [0, 1].
  // Empirically, a clear key gives a gap of ~0.15–0.25; 0.3 is near-perfect.
  const confidence = Math.min(1, Math.max(0, (best - second) / 0.25));
  return { index: bestIndex, mode: bestMode, confidence };
}

/**
 * Downsample to ~targetRate Hz using a box-filter (averaged decimation).
 * Sufficient anti-aliasing for pitch-class analysis where we only care about
 * frequencies up to ~C6 (≈1047 Hz) — well below the 2048 Hz Nyquist of a
 * 4096 Hz target rate.
 */
function downsampleTo(samples: Float32Array, inRate: number, targetRate: number): Float32Array {
  const factor = Math.max(1, Math.round(inRate / targetRate));
  if (factor === 1) return samples;
  const outLen = Math.floor(samples.length / factor);
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    let sum = 0;
    for (let j = 0; j < factor; j++) sum += samples[i * factor + j];
    out[i] = sum / factor;
  }
  return out;
}

/**
 * Extract the middle `targetDuration` seconds from the buffer as a mono
 * Float32Array at the buffer's native sample rate.
 */
function extractMiddleSegment(buffer: AudioBuffer, targetDuration: number): Float32Array {
  const sr = buffer.sampleRate;
  const segLen = Math.min(Math.floor(targetDuration * sr), buffer.length);
  const start  = Math.floor((buffer.length - segLen) / 2);

  const ch0 = buffer.getChannelData(0);
  if (buffer.numberOfChannels === 1) {
    return ch0.slice(start, start + segLen);
  }
  // Mix down stereo to mono
  const ch1  = buffer.getChannelData(1);
  const mono = new Float32Array(segLen);
  for (let i = 0; i < segLen; i++) mono[i] = (ch0[start + i] + ch1[start + i]) * 0.5;
  return mono;
}

// ---------------------------------------------------------------------------
// Quick-shift button presets
// ---------------------------------------------------------------------------
const QUICK_SHIFTS = [-2, -1, 0, 1, 2] as const;

// ---------------------------------------------------------------------------
// KeyPanel — pure UI, module-level so it is never recreated on re-renders
// ---------------------------------------------------------------------------

/** Reason the detection was skipped or failed — drives the fallback message. */
type FailReason = 'size' | 'long' | 'short' | 'decode' | null;

interface KeyPanelProps {
  detecting:    boolean;
  failReason:   FailReason;
  detectedKey:  DetectedKey | null;
  semitones:    number;
  onSemitones:  (v: number) => void;
}

function KeyPanel({ detecting, failReason, detectedKey, semitones, onSemitones }: KeyPanelProps) {
  // Derived: output key
  const outputKey = detectedKey
    ? shiftedKey(detectedKey.index, detectedKey.mode, semitones)
    : null;

  const shiftLabel = semitones === 0 ? '0' : semitones > 0 ? `+${semitones}` : `${semitones}`;

  // Confidence badge
  const confidenceBadge = (() => {
    if (!detectedKey) return null;
    if (detectedKey.confidence >= 0.55) return null; // high confidence — no badge needed
    if (detectedKey.confidence >= 0.25) return (
      <span className="ml-1.5 text-[10px] text-amber-600 font-medium">(possibly)</span>
    );
    return (
      <span className="ml-1.5 text-[10px] text-gray-400 font-medium">(uncertain)</span>
    );
  })();

  return (
    <div className="space-y-3">

      {/* ── Detected key ──────────────────────────────────────────────── */}
      <div className="flex items-start gap-2">
        <span className="text-xs font-medium text-gray-500 w-[80px] shrink-0 pt-0.5">
          Detected
        </span>
        <div className="flex-1">
          {detectedKey !== null ? (
            <span className="text-xs font-semibold text-gray-700">
              {keyFullName(detectedKey.index, detectedKey.mode)}
              {' '}
              <span className="font-mono text-brand">
                {keyShortName(detectedKey.index, detectedKey.mode)}
              </span>
              {confidenceBadge}
            </span>
          ) : detecting ? (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg
                className="w-3 h-3 animate-spin text-gray-300 flex-shrink-0"
                fill="none" viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analysing…
            </div>
          ) : failReason === 'size' ? (
            <span className="text-xs text-gray-400 italic">
              File too large to analyse — set shift manually
            </span>
          ) : failReason === 'long' ? (
            <span className="text-xs text-gray-400 italic">
              File too long to analyse — set shift manually
            </span>
          ) : failReason === 'short' ? (
            <span className="text-xs text-gray-400 italic">
              File too short to detect key — set shift manually
            </span>
          ) : failReason === 'decode' ? (
            <span className="text-xs text-gray-400 italic">
              Could not read audio — set shift manually
            </span>
          ) : (
            <span className="text-xs text-gray-300 italic">Waiting…</span>
          )}
        </div>
      </div>

      {/* ── Semitone shift ─────────────────────────────────────────────── */}
      <div className="flex items-start gap-2">
        <span className="text-xs font-medium text-gray-500 w-[80px] shrink-0 pt-1">
          Shift
        </span>
        <div className="flex-1 space-y-2">

          {/* Slider + live value */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="-12"
              max="12"
              step="1"
              value={semitones}
              onChange={(e) => onSemitones(parseInt(e.target.value, 10))}
              aria-label={`Pitch shift: ${shiftLabel} semitones`}
              aria-valuemin={-12}
              aria-valuemax={12}
              aria-valuenow={semitones}
              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer
                         bg-gray-200 accent-[#E1483D]
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-brand focus-visible:ring-offset-1"
            />
            <span className="text-xs font-mono font-semibold text-gray-700 w-[42px] text-right shrink-0">
              {shiftLabel === '0' ? '0 st' : `${shiftLabel} st`}
            </span>
          </div>

          {/* Quick-shift buttons */}
          <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Quick shift presets">
            {QUICK_SHIFTS.map((n) => {
              const label = n === 0 ? '0' : n > 0 ? `+${n}` : `${n}`;
              const active = semitones === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onSemitones(n)}
                  aria-pressed={active}
                  aria-label={`Shift ${label} semitones`}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors min-w-[36px] ${
                    active
                      ? 'bg-brand text-white border-brand'
                      : 'text-gray-600 border-[#D9D9D9] hover:border-brand hover:text-brand bg-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Output key ─────────────────────────────────────────────────── */}
      <div className="flex items-start gap-2">
        <span className="text-xs font-medium text-gray-500 w-[80px] shrink-0 pt-0.5">
          Output key
        </span>
        <div className="flex-1">
          {outputKey && semitones !== 0 ? (
            <span className="text-xs font-semibold text-gray-700">
              {keyFullName(outputKey.index, outputKey.mode)}
              {' '}
              <span className="font-mono text-brand">
                {keyShortName(outputKey.index, outputKey.mode)}
              </span>
            </span>
          ) : detectedKey && semitones === 0 ? (
            <span className="text-xs text-gray-400 italic">Same as input (no shift)</span>
          ) : (
            <span className="text-xs text-gray-300 italic">—</span>
          )}
        </div>
      </div>

      {/* Separator + disclaimer */}
      <p className="text-[11px] text-gray-400 leading-relaxed pt-0.5">
        Changes the musical key without affecting track length or tempo.
        Works best on melodic or harmonic content.
      </p>

    </div>
  );
}

// ---------------------------------------------------------------------------
// KeyPitchPanel — decodes the file, runs detection, renders KeyPanel
// ---------------------------------------------------------------------------
export interface KeyPitchPanelProps {
  file:               File;
  detectedKey:        DetectedKey | null;
  semitones:          number;
  onDetectedKeyChange: (key: DetectedKey | null) => void;
  onSemitonesChange:  (v: number) => void;
}

// Files larger than this threshold are skipped to avoid decoding a potentially
// huge PCM buffer in browser RAM.  Web Audio's decodeAudioData always decodes
// the full file — there is no partial / streaming path available in browsers.
// A 50 MB compressed file can expand to ~500 MB PCM (e.g. a high-bitrate MP3);
// above that threshold the risk of OOM or jank on lower-end devices outweighs
// the benefit of auto-detection.  The user can still set any shift manually.
const FILE_SIZE_LIMIT_BYTES = 50 * 1024 * 1024; // 50 MB

export default function KeyPitchPanel({
  file,
  detectedKey,
  semitones,
  onDetectedKeyChange,
  onSemitonesChange,
}: KeyPitchPanelProps) {
  const [detecting,  setDetecting]  = useState(false);
  const [failReason, setFailReason] = useState<FailReason>(null);

  // Tracks the decode-only AudioContext so it can be closed on unmount / file change.
  const decodeCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Panel reopened for the same file — result is already in parent state.
    if (detectedKey !== null) return;

    let cancelled = false;
    setDetecting(false);
    setFailReason(null);

    // Guard: skip detection for large files to avoid excessive browser RAM use.
    // decodeAudioData always buffers the full PCM regardless of how much we use.
    if (file.size > FILE_SIZE_LIMIT_BYTES) {
      setFailReason('size');
      return;
    }

    // Show spinner immediately — arrayBuffer() + decodeAudioData can take
    // several seconds on large files; "Waiting…" during that window is misleading.
    setDetecting(true);

    (async () => {
      try {
        const buf = await file.arrayBuffer();
        if (cancelled) return;

        // Decode audio — only used to extract samples; context closed immediately after.
        decodeCtxRef.current = new (
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        )();
        const decoded = await decodeCtxRef.current.decodeAudioData(buf);

        // Close the context right away — AudioBuffer stays valid after context close.
        if (decodeCtxRef.current) {
          try { decodeCtxRef.current.close(); } catch { /* noop */ }
          decodeCtxRef.current = null;
        }
        if (cancelled) return;

        // Very short files don't carry enough harmonic content to detect reliably.
        if (decoded.duration < 5) {
          if (!cancelled) { setFailReason('short'); onDetectedKeyChange(null); }
          return;
        }

        // Very long files: the decode already happened (unavoidable), but skip
        // the CPU-heavy chroma analysis — it reads only 30 s anyway, but the
        // full PCM buffer stays in RAM until GC.  Guard prevents unnecessary
        // work and signals clearly to the user rather than silently succeeding
        // on a file where the 30 s sample may be unrepresentative.
        // 60 min × 44100 Hz × 2 ch × 4 bytes ≈ 1 GB PCM — well above the size
        // guard, so in practice this only fires for low-bitrate long files that
        // slipped under the 50 MB compressed threshold.
        if (decoded.duration > 60 * 60) {
          if (!cancelled) { setFailReason('long'); onDetectedKeyChange(null); }
          return;
        }

        // Yield so the spinner stays visible before the synchronous CPU work.
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        if (cancelled) return;

        // Extract middle 30 s (max) as mono samples
        const rawMono = extractMiddleSegment(decoded, 30);
        if (cancelled) return;

        // Downsample to ~4096 Hz — covers C2–C7 (~65–2094 Hz) with headroom.
        // Box-filter decimation provides adequate anti-aliasing for chroma work.
        const TARGET_RATE = 4096;
        const mono = downsampleTo(rawMono, decoded.sampleRate, TARGET_RATE);
        const effectiveSampleRate = decoded.sampleRate / Math.max(1, Math.round(decoded.sampleRate / TARGET_RATE));

        if (cancelled) return;

        const chroma = computeChroma(mono, effectiveSampleRate);
        if (cancelled) return;

        const result = detectKeyFromChroma(chroma);
        if (!cancelled) {
          onDetectedKeyChange(result);
          setFailReason(null);
        }
      } catch {
        if (!cancelled) { onDetectedKeyChange(null); setFailReason('decode'); }
      } finally {
        if (!cancelled) setDetecting(false);
      }
    })();

    return () => {
      cancelled = true;
      if (decodeCtxRef.current) {
        try { decodeCtxRef.current.close(); } catch { /* noop */ }
        decodeCtxRef.current = null;
      }
      setDetecting(false);
      setFailReason(null);
    };
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  // Unmount cleanup
  useEffect(() => {
    return () => {
      if (decodeCtxRef.current) {
        try { decodeCtxRef.current.close(); } catch { /* noop */ }
        decodeCtxRef.current = null;
      }
    };
  }, []);

  return (
    <KeyPanel
      detecting={detecting}
      failReason={failReason}
      detectedKey={detectedKey}
      semitones={semitones}
      onSemitones={onSemitonesChange}
    />
  );
}
