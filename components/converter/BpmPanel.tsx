'use client';

import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// TempoPanel UI — module-level so it is never recreated on parent re-renders
// ---------------------------------------------------------------------------
interface TempoPanelProps {
  bpmDetecting:      boolean;
  bpmFailed:         boolean;
  detectedBpm:       number | null;
  targetBpmStr:      string;
  sourceBpmStr:      string;
  onTargetBpmChange: (v: string) => void;
  onSourceBpmChange: (v: string) => void;
}

function TempoPanel({
  bpmDetecting, bpmFailed, detectedBpm,
  targetBpmStr, sourceBpmStr,
  onTargetBpmChange, onSourceBpmChange,
}: TempoPanelProps) {
  const effectiveSource = detectedBpm !== null
    ? detectedBpm
    : parseFloat(sourceBpmStr);

  const targetVal   = parseFloat(targetBpmStr);
  const targetValid = !isNaN(targetVal) && targetVal >= 20 && targetVal <= 300;
  const sourceValid = !isNaN(effectiveSource) && effectiveSource >= 20 && effectiveSource <= 300;

  const ratio         = sourceValid && targetValid ? targetVal / effectiveSource : null;
  const isLargeChange = ratio !== null && (ratio > 3.0 || ratio < 0.33);

  return (
    <div className="space-y-3">

      {/* Detected BPM row */}
      <div className="flex items-start gap-2">
        <span className="text-xs font-medium text-gray-500 w-[80px] shrink-0 pt-0.5">Detected</span>
        <div className="flex-1 space-y-1.5">
          {detectedBpm !== null ? (
            <span className="text-xs font-mono font-semibold text-gray-700">{detectedBpm.toFixed(1)} BPM</span>
          ) : bpmDetecting ? (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3 h-3 animate-spin text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Detecting…
            </div>
          ) : bpmFailed ? (
            <div className="space-y-1.5">
              <span className="text-xs text-gray-400 italic">Could not detect</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="20"
                  max="300"
                  step="0.5"
                  value={sourceBpmStr}
                  onChange={(e) => onSourceBpmChange(e.target.value)}
                  placeholder="Enter source BPM"
                  className="w-36 px-2 py-1 text-xs font-mono border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-brand bg-white"
                />
              </div>
            </div>
          ) : (
            <span className="text-xs text-gray-300 italic">Waiting…</span>
          )}
        </div>
      </div>

      {/* Target BPM row */}
      <div className="flex items-start gap-2">
        <span className="text-xs font-medium text-gray-500 w-[80px] shrink-0 pt-1">Target BPM</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <input
            type="number"
            min="20"
            max="300"
            step="0.5"
            value={targetBpmStr}
            onChange={(e) => onTargetBpmChange(e.target.value)}
            placeholder="e.g. 140"
            className="w-24 px-2 py-1 text-xs font-mono border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-brand bg-white"
          />
          {sourceValid && (effectiveSource / 2) >= 20 && (
            <button
              type="button"
              onClick={() => onTargetBpmChange((effectiveSource / 2).toFixed(1))}
              title="Set target to half the source BPM"
              className="px-2.5 py-1 text-xs rounded-lg border border-[#D9D9D9] text-gray-600 hover:border-brand hover:text-brand bg-white transition-colors"
            >
              ÷2
            </button>
          )}
          {sourceValid && (effectiveSource * 2) <= 300 && (
            <button
              type="button"
              onClick={() => onTargetBpmChange((effectiveSource * 2).toFixed(1))}
              title="Set target to double the source BPM"
              className="px-2.5 py-1 text-xs rounded-lg border border-[#D9D9D9] text-gray-600 hover:border-brand hover:text-brand bg-white transition-colors"
            >
              ×2
            </button>
          )}
        </div>
      </div>

      {/* Validation / warning messages */}
      {targetBpmStr !== '' && !targetValid && (
        <p className="text-[11px] text-red-500">BPM must be between 20 and 300.</p>
      )}
      {isLargeChange && (
        <p className="text-[11px] text-amber-600">Large tempo change — audio quality may be reduced.</p>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] text-gray-400 leading-relaxed">
        Works best on rhythmic music with a steady beat. Results may vary on speech or ambient audio.
      </p>

    </div>
  );
}

// ---------------------------------------------------------------------------
// BpmPanel — decodes the file, runs BPM detection, renders the tempo UI
// ---------------------------------------------------------------------------
export interface BpmPanelProps {
  file:                File;
  detectedBpm:         number | null;
  targetBpmStr:        string;
  sourceBpmStr:        string;
  onDetectedBpmChange: (bpm: number | null) => void;
  onTargetBpmChange:   (v: string) => void;
  onSourceBpmChange:   (v: string) => void;
}

export default function BpmPanel({
  file,
  detectedBpm,
  targetBpmStr,
  sourceBpmStr,
  onDetectedBpmChange,
  onTargetBpmChange,
  onSourceBpmChange,
}: BpmPanelProps) {
  const [bpmDetecting, setBpmDetecting] = useState(false);
  const [bpmFailed,    setBpmFailed]    = useState(false);

  // Tracks the AudioContext used for the one-time file decode so it can be
  // explicitly closed when the panel unmounts or the file changes.
  const decodeCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // If the parent already has a detected BPM (e.g. panel was closed and
    // reopened for the same file), show it immediately — skip re-decode.
    if (detectedBpm !== null) return;

    let cancelled = false;
    setBpmDetecting(false);
    setBpmFailed(false);

    (async () => {
      try {
        const buf = await file.arrayBuffer();
        if (cancelled) return;

        decodeCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const decoded = await decodeCtxRef.current.decodeAudioData(buf);

        // Close the decode-only AudioContext immediately after getting the
        // AudioBuffer — AudioBuffers remain valid after their context is closed,
        // and we don't need the context for anything else here.
        if (decodeCtxRef.current) {
          try { decodeCtxRef.current.close(); } catch {}
          decodeCtxRef.current = null;
        }
        if (cancelled) return;

        if (decoded.duration < 5) {
          if (!cancelled) { setBpmFailed(true); onDetectedBpmChange(null); }
          return;
        }

        if (!cancelled) setBpmDetecting(true);
        // Yield so the "Detecting…" spinner paints before the synchronous
        // MusicTempo constructor blocks the thread.
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        if (cancelled) return;

        const { default: MusicTempo } = await import('music-tempo');
        if (cancelled) return;

        const ch  = decoded.getChannelData(0);
        const mt  = new MusicTempo(ch);
        const raw = parseFloat(String(mt.tempo));

        if (!cancelled) {
          if (!isNaN(raw) && raw > 0 && raw !== -1) {
            onDetectedBpmChange(Math.round(raw * 10) / 10);
            setBpmFailed(false);
          } else {
            onDetectedBpmChange(null);
            setBpmFailed(true);
          }
        }
      } catch {
        if (!cancelled) { onDetectedBpmChange(null); setBpmFailed(true); }
      } finally {
        if (!cancelled) setBpmDetecting(false);
      }
    })();

    return () => {
      cancelled = true;
      if (decodeCtxRef.current) {
        try { decodeCtxRef.current.close(); } catch {}
        decodeCtxRef.current = null;
      }
      setBpmDetecting(false);
      setBpmFailed(false);
    };
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  // Unmount cleanup — close any lingering decode context
  useEffect(() => {
    return () => {
      if (decodeCtxRef.current) {
        try { decodeCtxRef.current.close(); } catch {}
        decodeCtxRef.current = null;
      }
    };
  }, []);

  return (
    <TempoPanel
      bpmDetecting={bpmDetecting}
      bpmFailed={bpmFailed}
      detectedBpm={detectedBpm}
      targetBpmStr={targetBpmStr}
      sourceBpmStr={sourceBpmStr}
      onTargetBpmChange={onTargetBpmChange}
      onSourceBpmChange={onSourceBpmChange}
    />
  );
}
