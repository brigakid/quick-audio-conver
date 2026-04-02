'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { formatTime, parseTimeInput } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MIN_SEL = 0.1;
const FADE_PRESETS = [0.5, 1, 2, 3];
const WAVE_H = 72;

// ---------------------------------------------------------------------------
// FadeDurationPicker — module-level so it's never recreated
// ---------------------------------------------------------------------------
interface FadeDurationPickerProps {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
}

function FadeDurationPicker({ label, value, onChange }: FadeDurationPickerProps) {
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState('');

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <span className="text-xs font-medium text-gray-500 w-[58px] shrink-0">{label}</span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {FADE_PRESETS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => { setCustomMode(false); onChange(value === d && !customMode ? null : d); }}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
              value === d && !customMode
                ? 'bg-brand text-white border-brand'
                : 'text-gray-600 border-[#D9D9D9] hover:border-brand hover:text-brand bg-white'
            }`}
          >
            {d}s
          </button>
        ))}
        {customMode ? (
          <input
            type="number"
            min="0.1"
            max="30"
            step="0.1"
            value={customText}
            autoFocus
            onChange={(e) => {
              setCustomText(e.target.value);
              const n = parseFloat(e.target.value);
              if (!isNaN(n) && n > 0 && n <= 30) onChange(n);
            }}
            onBlur={() => {
              const n = parseFloat(customText);
              if (isNaN(n) || n <= 0) { setCustomMode(false); onChange(null); }
            }}
            placeholder="sec"
            className="w-16 px-2 py-1 text-xs border border-brand rounded-lg focus:outline-none bg-white font-mono"
          />
        ) : (
          <button
            type="button"
            onClick={() => { setCustomMode(true); setCustomText(''); onChange(null); }}
            className="px-2.5 py-1 text-xs rounded-lg border border-[#D9D9D9] text-gray-400 hover:border-brand hover:text-brand bg-white transition-colors"
          >
            Custom
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TempoPanel — module-level so it is never recreated on parent re-renders
// ---------------------------------------------------------------------------
interface TempoPanelProps {
  bpmDetecting: boolean;
  bpmFailed:    boolean;
  detectedBpm:  number | null;
  targetBpmStr: string;
  sourceBpmStr: string;
  onTargetBpmChange: (v: string) => void;
  onSourceBpmChange: (v: string) => void;
}

function TempoPanel({
  bpmDetecting, bpmFailed, detectedBpm,
  targetBpmStr, sourceBpmStr,
  onTargetBpmChange, onSourceBpmChange,
}: TempoPanelProps) {
  // The effective source BPM is either auto-detected or manually entered.
  const effectiveSource = detectedBpm !== null
    ? detectedBpm
    : parseFloat(sourceBpmStr);

  const targetVal = parseFloat(targetBpmStr);
  const targetValid = !isNaN(targetVal) && targetVal >= 20 && targetVal <= 300;
  const sourceValid = !isNaN(effectiveSource) && effectiveSource >= 20 && effectiveSource <= 300;

  // Warn on large tempo changes — more than 3× faster or slower.
  const ratio = sourceValid && targetValid ? targetVal / effectiveSource : null;
  const isLargeChange = ratio !== null && (ratio > 3.0 || ratio < 0.33);

  return (
    <div className="pt-1 border-t border-gray-100 space-y-3">

      {/* Section header */}
      <div className="flex items-center gap-1.5">
        {/* Metronome icon */}
        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Tempo</span>
        <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-700 rounded">Beta</span>
        {sourceValid && targetValid && (
          <span className="ml-auto text-[10px] text-brand font-medium">
            {effectiveSource.toFixed(1)} → {targetVal.toFixed(1)} BPM
          </span>
        )}
      </div>

      {/* Detected BPM row */}
      <div className="flex items-start gap-2">
        <span className="text-xs font-medium text-gray-500 w-[80px] shrink-0 pt-0.5">Detected</span>
        <div className="flex-1 space-y-1.5">
          {detectedBpm !== null ? (
            // Show the known value immediately — even if re-detection is running in the
            // background (happens when the edit panel is closed and reopened with the same file).
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
              {/* Fallback: manual source BPM entry */}
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

      {/* Target BPM row — always visible so manual entry is possible */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500 w-[80px] shrink-0">Target BPM</span>
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
          {/* ÷2 / ×2 helpers — only shown when the result would be within the valid range */}
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

      {/* Inline validation / warning messages */}
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
// AudioEditor
// ---------------------------------------------------------------------------
export interface AudioEditorProps {
  file: File;
  trimStart: number;
  trimEnd: number;
  duration: number;
  fadeInDuration: number | null;
  fadeOutDuration: number | null;
  onTrimChange: (start: number, end: number) => void;
  onDurationLoaded: (duration: number) => void;
  onFadeInChange: (v: number | null) => void;
  onFadeOutChange: (v: number | null) => void;
  // Tempo / BPM props
  detectedBpm: number | null;
  targetBpmStr: string;
  sourceBpmStr: string;          // fallback when detection fails, user can enter manually
  onDetectedBpmChange: (bpm: number | null) => void;
  onTargetBpmChange: (v: string) => void;
  onSourceBpmChange: (v: string) => void;
}

export default function AudioEditor({
  file,
  trimStart,
  trimEnd,
  duration,
  fadeInDuration,
  fadeOutDuration,
  onTrimChange,
  onDurationLoaded,
  onFadeInChange,
  onFadeOutChange,
  detectedBpm,
  targetBpmStr,
  sourceBpmStr,
  onDetectedBpmChange,
  onTargetBpmChange,
  onSourceBpmChange,
}: AudioEditorProps) {

  // ── Canvas refs ──────────────────────────────────────────────────────────
  const containerRef   = useRef<HTMLDivElement>(null);
  const waveCanvasRef  = useRef<HTMLCanvasElement>(null);  // static layer
  const headCanvasRef  = useRef<HTMLCanvasElement>(null);  // playhead layer

  // ── Waveform loading ─────────────────────────────────────────────────────
  const [peaks,     setPeaks]     = useState<Float32Array | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [waveError, setWaveError] = useState(false);

  // ── BPM detection ─────────────────────────────────────────────────────────
  const [bpmDetecting, setBpmDetecting] = useState(false);
  const [bpmFailed,    setBpmFailed]    = useState(false);

  // ── Stable refs (for callbacks that must not cause re-renders) ───────────
  const stateRef = useRef({ trimStart, trimEnd, duration });
  stateRef.current = { trimStart, trimEnd, duration };

  const fadeRef = useRef({ fadeInDuration, fadeOutDuration });
  fadeRef.current = { fadeInDuration, fadeOutDuration };

  const peaksRef = useRef<Float32Array | null>(null);
  peaksRef.current = peaks;

  // ── Drag handles ─────────────────────────────────────────────────────────
  const dragging = useRef<'start' | 'end' | null>(null);

  // ── Time input local state ───────────────────────────────────────────────
  const [startText,    setStartText]    = useState(formatTime(0));
  const [endText,      setEndText]      = useState(formatTime(0));
  const [editingStart, setEditingStart] = useState(false);
  const [editingEnd,   setEditingEnd]   = useState(false);

  useEffect(() => { if (!editingStart) setStartText(formatTime(trimStart)); }, [trimStart, editingStart]);
  useEffect(() => { if (!editingEnd)   setEndText(formatTime(trimEnd));     }, [trimEnd,   editingEnd]);

  // ── Playback state ───────────────────────────────────────────────────────
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [headTime,   setHeadTime]   = useState(0);   // drives the mini progress bar (state OK, cheap)

  // Audio engine refs — mutated imperatively, never trigger renders
  const audioCtxRef    = useRef<AudioContext | null>(null);
  const decodeCtxRef   = useRef<AudioContext | null>(null); // separate context used only for waveform decode
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef      = useRef<AudioBufferSourceNode | null>(null);
  const gainRef        = useRef<GainNode | null>(null);
  const playCtxStartRef = useRef(0);   // audioCtx.currentTime when playback began
  const playOffsetRef   = useRef(0);   // file offset when playback began
  const isPlayingRef    = useRef(false);
  const headTimeRef     = useRef(0);
  const rafRef          = useRef<number | null>(null);

  // ── Canvas drawing ───────────────────────────────────────────────────────

  /** Draws waveform bars + trim overlays + fade gradient hints. Called when static content changes. */
  const drawWaveform = useCallback(() => {
    const canvas = waveCanvasRef.current;
    const container = containerRef.current;
    const p = peaksRef.current;
    if (!canvas || !container || !p) return;

    const { trimStart: s, trimEnd: e, duration: d } = stateRef.current;
    if (d === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W   = container.offsetWidth || 600;
    const H   = WAVE_H;
    const dpr = window.devicePixelRatio || 1;
    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const startX = (s / d) * W;
    const endX   = (e / d) * W;
    const midY   = H / 2;
    const barW   = W / p.length;

    ctx.clearRect(0, 0, W, H);

    // Bars
    for (let i = 0; i < p.length; i++) {
      const x    = i * barW;
      const bh   = Math.max(2, p[i] * H * 0.82);
      const inSel = x + barW > startX && x < endX;
      ctx.fillStyle = inSel ? '#E1483D' : '#E5E7EB';
      ctx.fillRect(x + 0.5, midY - bh / 2, Math.max(1, barW - 1), bh);
    }

    // Selection tint
    ctx.fillStyle = 'rgba(225,72,61,0.06)';
    ctx.fillRect(startX, 0, endX - startX, H);

    // Fade-in gradient overlay
    const { fadeInDuration: fi, fadeOutDuration: fo } = fadeRef.current;
    if (fi && fi > 0) {
      const fw   = Math.min((fi / d) * W, endX - startX);
      const grad = ctx.createLinearGradient(startX, 0, startX + fw, 0);
      grad.addColorStop(0, 'rgba(225,72,61,0.20)');
      grad.addColorStop(1, 'rgba(225,72,61,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(startX, 0, fw, H);
    }

    // Fade-out gradient overlay
    if (fo && fo > 0) {
      const fw   = Math.min((fo / d) * W, endX - startX);
      const grad = ctx.createLinearGradient(endX - fw, 0, endX, 0);
      grad.addColorStop(0, 'rgba(225,72,61,0)');
      grad.addColorStop(1, 'rgba(225,72,61,0.20)');
      ctx.fillStyle = grad;
      ctx.fillRect(endX - fw, 0, fw, H);
    }

    // Dim regions outside selection
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(0,     0, startX,      H);
    ctx.fillRect(endX,  0, W - endX,    H);
  }, []); // stable — reads from refs

  /** Draws (or clears) the playhead line on its own canvas. */
  const drawPlayhead = useCallback((t: number) => {
    const canvas = headCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const { duration: d } = stateRef.current;
    const W   = container.offsetWidth || 600;
    const H   = WAVE_H;
    const dpr = window.devicePixelRatio || 1;

    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    if (d === 0) return;
    const px = Math.max(0, Math.min(W, (t / d) * W));

    ctx.strokeStyle = '#E1483D';
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = 'rgba(225,72,61,0.35)';
    ctx.shadowBlur  = 4;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, H);
    ctx.stroke();
  }, []);

  // Redraw waveform whenever relevant values change
  useEffect(() => {
    drawWaveform();
  }, [peaks, trimStart, trimEnd, duration, fadeInDuration, fadeOutDuration, drawWaveform]);

  // ResizeObserver — redraw both layers on container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      drawWaveform();
      drawPlayhead(headTimeRef.current);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [drawWaveform, drawPlayhead]);

  // ── Load waveform from file ──────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setWaveError(false);
    setPeaks(null);
    audioBufferRef.current = null;

    const url = URL.createObjectURL(file);
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = url;

    const onMeta = () => {
      if (cancelled) return;
      const dur = isFinite(audio.duration) ? audio.duration : 0;
      onDurationLoaded(dur);

      file.arrayBuffer().then((buf) => {
        if (cancelled) return undefined;
        decodeCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        return decodeCtxRef.current.decodeAudioData(buf);
      }).then(async (decoded) => {
        if (!decoded || cancelled) return;
        audioBufferRef.current = decoded;            // store for playback
        const ch    = decoded.getChannelData(0);
        const N     = 500;
        const block = Math.max(1, Math.floor(ch.length / N));
        const out   = new Float32Array(N);
        for (let i = 0; i < N; i++) {
          let peak = 0;
          for (let j = 0; j < block; j++) {
            const v = Math.abs(ch[i * block + j] || 0);
            if (v > peak) peak = v;
          }
          out[i] = peak;
        }
        if (!cancelled) { setPeaks(out); setLoading(false); }

        // BPM detection runs after the waveform is visible.
        // We require at least 5 seconds of audio — shorter clips rarely have
        // a detectable rhythmic pattern.
        if (cancelled || decoded.duration < 5) {
          if (!cancelled) { setBpmFailed(true); onDetectedBpmChange(null); }
          return;
        }
        if (!cancelled) setBpmDetecting(true);
        // Yield to the browser so the "Detecting…" state paints before the
        // synchronous MusicTempo constructor blocks the thread.
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        if (cancelled) return;
        try {
          const { default: MusicTempo } = await import('music-tempo');
          if (cancelled) return;
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
      }).catch(() => {
        if (!cancelled) { setWaveError(true); setLoading(false); }
      });
    };

    const onErr = () => { if (!cancelled) { setWaveError(true); setLoading(false); } };
    audio.addEventListener('loadedmetadata', onMeta, { once: true });
    audio.addEventListener('error',           onErr, { once: true });

    return () => {
      cancelled = true;
      // Close the decode-only AudioContext to release OS audio handles.
      // Chrome/Firefox cap concurrent contexts at ~6; without this, repeated
      // file loads in the same session will eventually fail to decode.
      if (decodeCtxRef.current) {
        try { decodeCtxRef.current.close(); } catch {}
        decodeCtxRef.current = null;
      }
      stopPlayback();
      audio.src = '';        // release buffered media data from the element
      URL.revokeObjectURL(url);
      // Reset BPM state so a new file starts fresh
      setBpmDetecting(false);
      setBpmFailed(false);
    };
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Audio engine ─────────────────────────────────────────────────────────

  function getAudioCtx(): AudioContext {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }

  const stopPlayback = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch { /* already stopped */ }
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (gainRef.current) { gainRef.current.disconnect(); gainRef.current = null; }
    isPlayingRef.current = false;
  }, []);

  // RAF loop — updates headTimeRef + state + playhead canvas at 60 fps
  const startRaf = useCallback(() => {
    function tick() {
      if (!isPlayingRef.current) return;
      const actx = audioCtxRef.current;
      if (actx) {
        const t       = playOffsetRef.current + (actx.currentTime - playCtxStartRef.current);
        const clamped = Math.min(t, stateRef.current.trimEnd);
        headTimeRef.current = clamped;
        setHeadTime(clamped);
        drawPlayhead(clamped);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [drawPlayhead]);

  /**
   * Core playback function. Starts audio from `startOffset` (absolute file time)
   * to trimEnd, with gain scheduling that correctly reflects fade in/out even
   * when seeking into the middle of a fade region.
   */
  const playFrom = useCallback(async (startOffset: number) => {
    stopPlayback();
    isPlayingRef.current = false;
    setIsPlaying(false);

    const { trimStart: s, trimEnd: e, duration: d } = stateRef.current;
    const remaining = e - startOffset;
    if (remaining <= 0.01 || d === 0) return;

    try {
      const actx = getAudioCtx();

      // Decode audio once, reuse afterwards
      let buffer = audioBufferRef.current;
      if (!buffer) {
        setIsDecoding(true);
        const raw = await file.arrayBuffer();
        buffer = await actx.decodeAudioData(raw);
        audioBufferRef.current = buffer;
        setIsDecoding(false);
      }

      const source = actx.createBufferSource();
      source.buffer = buffer;

      const gain = actx.createGain();
      const now  = actx.currentTime;
      const { fadeInDuration: fi, fadeOutDuration: fo } = fadeRef.current;
      const selDur = e - s;

      // ── Gain scheduling ──────────────────────────────────────────────────
      // Start gain: account for being mid-fade-in or mid-fade-out
      let initGain = 1;
      if (fi && fi > 0 && startOffset < s + fi) {
        initGain = Math.max(0, (startOffset - s) / fi);
      }
      if (fo && fo > 0 && startOffset >= e - fo) {
        const elapsed = startOffset - (e - fo);
        initGain = Math.min(initGain, Math.max(0, 1 - elapsed / fo));
      }

      gain.gain.setValueAtTime(initGain, now);

      // Remaining fade-in ramp
      if (fi && fi > 0 && startOffset < s + fi) {
        const remainFade = (s + fi) - startOffset;
        gain.gain.linearRampToValueAtTime(1, now + remainFade);
      }

      // Fade-out ramp
      if (fo && fo > 0 && selDur > fo) {
        const foAbsStart = e - fo;
        if (startOffset < foAbsStart) {
          gain.gain.setValueAtTime(1, now + (foAbsStart - startOffset));
          gain.gain.linearRampToValueAtTime(0, now + remaining);
        } else {
          gain.gain.linearRampToValueAtTime(0, now + remaining);
        }
      }

      source.connect(gain);
      gain.connect(actx.destination);
      source.start(now, startOffset, remaining);

      source.onended = () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
        // Reset playhead to selection start
        headTimeRef.current = s;
        setHeadTime(s);
        drawPlayhead(s);
      };

      sourceRef.current     = source;
      gainRef.current       = gain;
      playCtxStartRef.current = now;
      playOffsetRef.current   = startOffset;
      isPlayingRef.current    = true;
      setIsPlaying(true);
      startRaf();

    } catch (err) {
      console.error('AudioEditor playback error:', err);
      setIsDecoding(false);
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  }, [file, stopPlayback, startRaf, drawPlayhead]);

  const handlePlayPause = useCallback(() => {
    if (isPlayingRef.current) {
      stopPlayback();
      setIsPlaying(false);
    } else {
      playFrom(stateRef.current.trimStart);
    }
  }, [playFrom, stopPlayback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch { /* ignore */ }
      }
      if (decodeCtxRef.current) {
        try { decodeCtxRef.current.close(); } catch {}
        decodeCtxRef.current = null;
      }
    };
  }, [stopPlayback]);

  // ── Drag / seek interactions ─────────────────────────────────────────────

  const xToTime = useCallback((clientX: number): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect  = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * stateRef.current.duration;
  }, []);

  // Click on waveform → seek (and restart if playing)
  const handleWaveformClick = useCallback((clientX: number) => {
    if (dragging.current) return;
    const { trimStart: s, trimEnd: e } = stateRef.current;
    const t = Math.max(s, Math.min(e, xToTime(clientX)));
    headTimeRef.current = t;
    setHeadTime(t);
    drawPlayhead(t);
    if (isPlayingRef.current) {
      playFrom(t);
    }
  }, [xToTime, drawPlayhead, playFrom]);

  // Global mouse/touch events for dragging trim handles
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

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchmove',  onMove, { passive: false });
    window.addEventListener('touchend',   onUp);
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('touchmove',  onMove);
      window.removeEventListener('touchend',   onUp);
    };
  }, [xToTime, onTrimChange]);

  // ── Derived values ───────────────────────────────────────────────────────
  const startPct  = duration > 0 ? (trimStart / duration) * 100 : 0;
  const endPct    = duration > 0 ? (trimEnd   / duration) * 100 : 100;
  const selDur    = trimEnd - trimStart;
  // Progress fraction within the selection (for the mini progress bar)
  const progressPct = selDur > 0
    ? Math.max(0, Math.min(100, ((headTime - trimStart) / selDur) * 100))
    : 0;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3.5">

      {/* ── Waveform ────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative select-none touch-none rounded-lg overflow-hidden"
        style={{ height: WAVE_H }}
      >
        {/* Static waveform canvas */}
        <canvas
          ref={waveCanvasRef}
          style={{ display: 'block' }}
          className={loading || waveError ? 'invisible' : ''}
        />

        {/* Dynamic playhead canvas — pointer-events-none so clicks pass through */}
        <canvas
          ref={headCanvasRef}
          className={`absolute inset-0 pointer-events-none ${loading || waveError ? 'invisible' : ''}`}
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
            <span className="text-xs text-gray-400">Waveform unavailable — use the time inputs below</span>
          </div>
        )}

        {/* Interactive layer: seek click zone + trim handles */}
        {!loading && !waveError && duration > 0 && (
          <>
            {/* Click-to-seek zone (behind handles) */}
            <div
              className="absolute inset-0"
              style={{ cursor: 'crosshair', zIndex: 5 }}
              onClick={(e) => handleWaveformClick(e.clientX)}
            />

            {/* Start handle */}
            <div
              className="absolute top-0 bottom-0 cursor-ew-resize"
              style={{ left: `calc(${startPct}% - 8px)`, width: 16, zIndex: 10 }}
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); dragging.current = 'start'; }}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); dragging.current = 'start'; }}
              onClick={(e) => e.stopPropagation()}
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
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); dragging.current = 'end'; }}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); dragging.current = 'end'; }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-brand" />
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand rounded-full shadow flex items-center justify-center">
                <div className="w-px h-2 bg-white/80 rounded-full" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Playback controls ────────────────────────────────────────────── */}
      {!loading && !waveError && duration > 0 && (
        <div className="flex items-center gap-3">

          {/* Play / Pause button */}
          <button
            type="button"
            onClick={handlePlayPause}
            disabled={isDecoding}
            aria-label={isPlaying ? 'Pause' : 'Play selection'}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-brand text-white shadow-sm hover:bg-brand/90 active:scale-95 transition-all disabled:opacity-50 flex-shrink-0"
          >
            {isDecoding ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : isPlaying ? (
              /* Pause */
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="4" width="4" height="16" rx="1.5" />
                <rect x="15" y="4" width="4" height="16" rx="1.5" />
              </svg>
            ) : (
              /* Play */
              <svg className="w-3.5 h-3.5 translate-x-px" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          {/* Progress + time */}
          <div className="flex-1 min-w-0 space-y-1">
            {/* Time labels */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-gray-700">
                {formatTime(headTime > 0 || isPlaying ? headTime : trimStart)}
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                {formatTime(trimEnd)}
              </span>
            </div>
            {/* Mini progress track — clickable to seek */}
            <div
              className="h-1 rounded-full bg-gray-100 overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect  = e.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const t     = trimStart + ratio * selDur;
                headTimeRef.current = t;
                setHeadTime(t);
                drawPlayhead(t);
                if (isPlayingRef.current) playFrom(t);
              }}
            >
              <div
                className="h-full bg-brand rounded-full"
                style={{ width: `${progressPct}%`, transition: 'none' }}
              />
            </div>
          </div>

          {/* Selection duration badge */}
          <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap flex-shrink-0">
            {selDur > 0 ? formatTime(selDur) : '—'}
          </span>
        </div>
      )}

      {/* ── Start / End time inputs ──────────────────────────────────────── */}
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

        <div className="pb-1.5 text-[11px] text-gray-400 font-medium whitespace-nowrap flex-shrink-0">
          {selDur > 0 ? formatTime(selDur) : '—'}
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

      {/* ── Fade controls ────────────────────────────────────────────────── */}
      <div className="pt-1 border-t border-gray-100 space-y-3">
        <div className="flex items-center gap-1.5">
          {/* Speaker / fade icon */}
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Fade</span>
          {(fadeInDuration !== null || fadeOutDuration !== null) && (
            <span className="ml-auto text-[10px] text-brand font-medium">
              {[
                fadeInDuration  !== null ? `in ${fadeInDuration}s`  : '',
                fadeOutDuration !== null ? `out ${fadeOutDuration}s` : '',
              ].filter(Boolean).join(' · ')}
            </span>
          )}
        </div>
        <FadeDurationPicker label="Fade In"  value={fadeInDuration}  onChange={onFadeInChange}  />
        <FadeDurationPicker label="Fade Out" value={fadeOutDuration} onChange={onFadeOutChange} />
      </div>

      {/* ── Tempo controls ───────────────────────────────────────────────── */}
      <TempoPanel
        bpmDetecting={bpmDetecting}
        bpmFailed={bpmFailed}
        detectedBpm={detectedBpm}
        targetBpmStr={targetBpmStr}
        sourceBpmStr={sourceBpmStr}
        onTargetBpmChange={onTargetBpmChange}
        onSourceBpmChange={onSourceBpmChange}
      />

    </div>
  );
}
