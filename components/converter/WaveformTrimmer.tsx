'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { formatTime, parseTimeInput } from '@/lib/utils';

interface WaveformTrimmerProps {
  file: File;
  trimStart: number;
  trimEnd: number;
  duration: number;
  onTrimChange: (start: number, end: number) => void;
  onDurationLoaded: (duration: number) => void;
}

const MIN_SEL = 0.1; // minimum 0.1 s selection

export default function WaveformTrimmer({
  file,
  trimStart,
  trimEnd,
  duration,
  onTrimChange,
  onDurationLoaded,
}: WaveformTrimmerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [peaks, setPeaks] = useState<Float32Array | null>(null);
  const [loading, setLoading] = useState(true);
  const [waveError, setWaveError] = useState(false);

  // Keep a stable ref to the current trim/duration values for use in drag events
  const stateRef = useRef({ trimStart, trimEnd, duration });
  stateRef.current = { trimStart, trimEnd, duration };

  const dragging = useRef<'start' | 'end' | null>(null);

  // --- Text input local state (so typing mid-value doesn't reset the field) ---
  const [startText, setStartText] = useState(formatTime(0));
  const [endText, setEndText] = useState(formatTime(0));
  const [editingStart, setEditingStart] = useState(false);
  const [editingEnd, setEditingEnd] = useState(false);

  useEffect(() => {
    if (!editingStart) setStartText(formatTime(trimStart));
  }, [trimStart, editingStart]);

  useEffect(() => {
    if (!editingEnd) setEndText(formatTime(trimEnd));
  }, [trimEnd, editingEnd]);

  // --- Load duration + waveform ---
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setWaveError(false);
    setPeaks(null);

    const url = URL.createObjectURL(file);
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = url;

    const onMeta = () => {
      if (cancelled) return;
      const dur = isFinite(audio.duration) ? audio.duration : 0;
      onDurationLoaded(dur);

      // Decode audio data for waveform
      file.arrayBuffer().then((buf) => {
        if (cancelled) return undefined;
        const actx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        return actx.decodeAudioData(buf);
      }).then((decoded) => {
        if (!decoded || cancelled) return;
        const ch = decoded.getChannelData(0);
        const N = 500;
        const block = Math.max(1, Math.floor(ch.length / N));
        const out = new Float32Array(N);
        for (let i = 0; i < N; i++) {
          let peak = 0;
          for (let j = 0; j < block; j++) {
            const v = Math.abs(ch[i * block + j] || 0);
            if (v > peak) peak = v;
          }
          out[i] = peak;
        }
        if (!cancelled) {
          setPeaks(out);
          setLoading(false);
        }
      }).catch(() => {
        if (!cancelled) { setWaveError(true); setLoading(false); }
      });
    };

    const onErr = () => {
      if (!cancelled) { setWaveError(true); setLoading(false); }
    };

    audio.addEventListener('loadedmetadata', onMeta, { once: true });
    audio.addEventListener('error', onErr, { once: true });

    return () => {
      cancelled = true;
      URL.revokeObjectURL(url);
    };
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Draw waveform on canvas ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !peaks || duration === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = container.offsetWidth || 600;
    const H = 72;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    const startX = (trimStart / duration) * W;
    const endX = (trimEnd / duration) * W;
    const midY = H / 2;
    const barW = W / peaks.length;

    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < peaks.length; i++) {
      const x = i * barW;
      const bh = Math.max(2, peaks[i] * H * 0.82);
      const inSel = x + barW > startX && x < endX;
      ctx.fillStyle = inSel ? '#E1483D' : '#E5E7EB';
      ctx.fillRect(x + 0.5, midY - bh / 2, Math.max(1, barW - 1), bh);
    }

    // Selection region tint
    ctx.fillStyle = 'rgba(225, 72, 61, 0.06)';
    ctx.fillRect(startX, 0, endX - startX, H);
  }, [peaks, trimStart, trimEnd, duration]);

  // --- Drag logic ---
  const xToTime = useCallback((clientX: number): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * stateRef.current.duration;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      if (e.cancelable) e.preventDefault();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const t = xToTime(clientX);
      const { trimStart: s, trimEnd: en, duration: d } = stateRef.current;
      const clamped = Math.max(0, Math.min(d, t));
      if (dragging.current === 'start') {
        onTrimChange(Math.min(clamped, en - MIN_SEL), en);
      } else {
        onTrimChange(s, Math.max(clamped, s + MIN_SEL));
      }
    };
    const onUp = () => { dragging.current = null; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [xToTime, onTrimChange]);

  const startPct = duration > 0 ? (trimStart / duration) * 100 : 0;
  const endPct = duration > 0 ? (trimEnd / duration) * 100 : 100;
  const selDuration = trimEnd - trimStart;

  return (
    <div className="space-y-3">
      {/* Waveform + handles */}
      <div ref={containerRef} className="relative select-none touch-none rounded-lg overflow-hidden" style={{ height: 72 }}>
        {/* Canvas — hidden until loaded */}
        <canvas
          ref={canvasRef}
          className={loading || waveError ? 'invisible' : ''}
          style={{ display: 'block' }}
        />

        {/* Loading skeleton */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-[#D9D9D9] rounded-lg">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 animate-spin text-gray-300" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading waveform…
            </div>
          </div>
        )}

        {/* Error fallback */}
        {waveError && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-[#D9D9D9] rounded-lg">
            <span className="text-xs text-gray-400">Waveform preview unavailable — use time inputs below</span>
          </div>
        )}

        {/* Dim overlays outside selection */}
        {!loading && !waveError && duration > 0 && (
          <>
            <div
              className="absolute top-0 left-0 bottom-0 bg-white/55 pointer-events-none"
              style={{ width: `${startPct}%` }}
            />
            <div
              className="absolute top-0 right-0 bottom-0 bg-white/55 pointer-events-none"
              style={{ width: `${100 - endPct}%` }}
            />

            {/* Start handle */}
            <div
              className="absolute top-0 bottom-0 cursor-ew-resize"
              style={{ left: `calc(${startPct}% - 8px)`, width: 16, zIndex: 10 }}
              onMouseDown={(e) => { e.preventDefault(); dragging.current = 'start'; }}
              onTouchStart={(e) => { e.preventDefault(); dragging.current = 'start'; }}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-brand" />
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand rounded-full shadow flex items-center justify-center">
                <div className="w-px h-2 bg-white/80 rounded-full" />
              </div>
            </div>

            {/* End handle */}
            <div
              className="absolute top-0 bottom-0 cursor-ew-resize"
              style={{ left: `calc(${endPct}% - 8px)`, width: 16, zIndex: 10 }}
              onMouseDown={(e) => { e.preventDefault(); dragging.current = 'end'; }}
              onTouchStart={(e) => { e.preventDefault(); dragging.current = 'end'; }}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-brand" />
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand rounded-full shadow flex items-center justify-center">
                <div className="w-px h-2 bg-white/80 rounded-full" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Time inputs row */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="text-[11px] font-medium text-gray-500 mb-1 block">Start</label>
          <input
            type="text"
            inputMode="decimal"
            value={startText}
            onChange={(e) => setStartText(e.target.value)}
            onFocus={() => setEditingStart(true)}
            onBlur={() => {
              setEditingStart(false);
              const t = parseTimeInput(startText);
              if (!isNaN(t) && t >= 0 && t < trimEnd - MIN_SEL && t <= duration) {
                onTrimChange(t, trimEnd);
              } else {
                setStartText(formatTime(trimStart));
              }
            }}
            className="w-full px-2.5 py-1.5 text-xs font-mono border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-brand bg-white"
          />
        </div>

        {/* Duration badge */}
        <div className="pb-1.5 text-[11px] text-gray-400 font-medium whitespace-nowrap flex-shrink-0">
          {selDuration > 0 ? formatTime(selDuration) : '—'}
        </div>

        <div className="flex-1">
          <label className="text-[11px] font-medium text-gray-500 mb-1 block">End</label>
          <input
            type="text"
            inputMode="decimal"
            value={endText}
            onChange={(e) => setEndText(e.target.value)}
            onFocus={() => setEditingEnd(true)}
            onBlur={() => {
              setEditingEnd(false);
              const t = parseTimeInput(endText);
              if (!isNaN(t) && t > trimStart + MIN_SEL && t <= duration) {
                onTrimChange(trimStart, t);
              } else {
                setEndText(formatTime(trimEnd));
              }
            }}
            className="w-full px-2.5 py-1.5 text-xs font-mono border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-brand bg-white"
          />
        </div>
      </div>
    </div>
  );
}
