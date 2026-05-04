'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { formatTime, parseTimeInput } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MIN_SEL = 0.1;
const MIN_FADE = 0.05;
const MAX_FADE = 30;
const FADE_PRESETS = [0.5, 1, 2, 3];
const WAVE_H = 96;
// Pixel slop around fade handles for grabbing on touch devices.
const HANDLE_HIT = 16;
// Grab-zone width for the playhead drag handle.
const PLAYHEAD_HIT = 16;
// "At end" tolerance — treat headTime within this many seconds of trimEnd as
// "playback finished" for resume / play-from-here decisions.
const END_TOL = 0.02;

type DragKind = 'start' | 'end' | 'fadeIn' | 'fadeOut' | 'playhead';

// ---------------------------------------------------------------------------
// FadeDurationPicker — module-level so it's never recreated
// ---------------------------------------------------------------------------
interface FadeDurationPickerProps {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  maxAllowed: number;
}

function FadeDurationPicker({ label, value, onChange, maxAllowed }: FadeDurationPickerProps) {
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState('');

  // When the value comes from outside (e.g. dragged on waveform) and isn't a preset,
  // treat it as a custom value and reflect it in the input.
  useEffect(() => {
    if (value !== null && !FADE_PRESETS.includes(value)) {
      setCustomMode(true);
      setCustomText(value.toFixed(1));
    } else if (value === null && customMode) {
      setCustomText('');
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <span className="text-xs font-medium text-gray-500 w-[58px] shrink-0">{label}</span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {FADE_PRESETS.map((d) => {
          const disabled = d > maxAllowed;
          const active = value === d && !customMode;
          return (
            <button
              key={d}
              type="button"
              disabled={disabled}
              onClick={() => { setCustomMode(false); onChange(active ? null : d); }}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                active
                  ? 'bg-brand text-white border-brand'
                  : disabled
                  ? 'text-gray-300 border-gray-200 bg-gray-50 cursor-not-allowed'
                  : 'text-gray-600 border-[#D9D9D9] hover:border-brand hover:text-brand bg-white'
              }`}
            >
              {d}s
            </button>
          );
        })}
        {customMode ? (
          <input
            type="number"
            min={MIN_FADE}
            max={MAX_FADE}
            step="0.1"
            value={customText}
            autoFocus
            onChange={(e) => {
              setCustomText(e.target.value);
              const n = parseFloat(e.target.value);
              if (!isNaN(n) && n >= MIN_FADE && n <= MAX_FADE) onChange(n);
            }}
            onBlur={() => {
              const n = parseFloat(customText);
              if (isNaN(n) || n < MIN_FADE) { setCustomMode(false); onChange(null); }
            }}
            placeholder="sec"
            className="w-16 px-2 py-1 text-xs border border-brand rounded-lg focus:outline-none bg-white font-mono"
          />
        ) : (
          <button
            type="button"
            onClick={() => { setCustomMode(true); setCustomText(value !== null ? value.toFixed(1) : ''); }}
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
}: AudioEditorProps) {

  // ── Canvas refs ──────────────────────────────────────────────────────────
  const containerRef   = useRef<HTMLDivElement>(null);
  const waveCanvasRef  = useRef<HTMLCanvasElement>(null);  // static layer
  const headCanvasRef  = useRef<HTMLCanvasElement>(null);  // playhead layer

  // ── Waveform loading ─────────────────────────────────────────────────────
  const [peaks,     setPeaks]     = useState<Float32Array | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [waveError, setWaveError] = useState(false);

  // ── Stable refs (for callbacks that must not cause re-renders) ───────────
  const stateRef = useRef({ trimStart, trimEnd, duration });
  stateRef.current = { trimStart, trimEnd, duration };

  const fadeRef = useRef({ fadeInDuration, fadeOutDuration });
  fadeRef.current = { fadeInDuration, fadeOutDuration };

  const peaksRef = useRef<Float32Array | null>(null);
  peaksRef.current = peaks;

  // ── Drag controller ──────────────────────────────────────────────────────
  // Single source of truth for what's being dragged AND whether playback was
  // active when the drag started. Pause-during-drag, resume-on-drag-end.
  const dragRef = useRef<{ kind: DragKind | null; wasPlaying: boolean }>({ kind: null, wasPlaying: false });

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
  const [headTime,   setHeadTime]   = useState(0);

  // Audio engine refs — mutated imperatively, never trigger renders directly
  const audioCtxRef    = useRef<AudioContext | null>(null);
  const decodeCtxRef   = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef      = useRef<AudioBufferSourceNode | null>(null);
  const gainRef        = useRef<GainNode | null>(null);
  const playCtxStartRef = useRef(0);   // audioCtx.currentTime when playback began
  const playOffsetRef   = useRef(0);   // file offset when playback began
  const isPlayingRef    = useRef(false);
  const headTimeRef     = useRef(0);
  const rafRef          = useRef<number | null>(null);
  // Race protection: each playFrom call gets a fresh seq; awaits abort if it changes.
  const playSeqRef      = useRef(0);
  // Counters for verifying we never leak an active source. Exposed as window.__audioEditorDebug.
  const debugRef        = useRef({ started: 0, stopped: 0 });

  // ── Visual fade gain ─────────────────────────────────────────────────────
  function gainAt(t: number, s: number, e: number, fi: number | null, fo: number | null): number {
    let g = 1;
    if (fi && fi > 0 && t < s + fi) g = Math.max(0, (t - s) / fi);
    if (fo && fo > 0 && t > e - fo) g = Math.min(g, Math.max(0, (e - t) / fo));
    return g;
  }

  // ── Canvas drawing ───────────────────────────────────────────────────────

  /** Draws waveform bars, applying fade as actual amplitude scaling. */
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
    const { fadeInDuration: fi, fadeOutDuration: fo } = fadeRef.current;

    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < p.length; i++) {
      const x      = i * barW;
      const tCenter = ((i + 0.5) / p.length) * d;
      const inSel  = x + barW > startX && x < endX;
      let bh = Math.max(2, p[i] * H * 0.82);

      if (inSel) {
        const g = gainAt(tCenter, s, e, fi, fo);
        bh = Math.max(2, bh * g);
        ctx.fillStyle = '#E1483D';
      } else {
        ctx.fillStyle = '#E5E7EB';
      }
      ctx.fillRect(x + 0.5, midY - bh / 2, Math.max(1, barW - 1), bh);
    }

    ctx.fillStyle = 'rgba(225,72,61,0.05)';
    ctx.fillRect(startX, 0, endX - startX, H);

    if (fi && fi > 0) {
      const fw = Math.min((fi / d) * W, endX - startX);
      const grad = ctx.createLinearGradient(startX, 0, startX + fw, 0);
      grad.addColorStop(0, 'rgba(225,72,61,0.18)');
      grad.addColorStop(1, 'rgba(225,72,61,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(startX, 0, fw, H);
      ctx.strokeStyle = 'rgba(225,72,61,0.65)';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, H - 4);
      ctx.lineTo(startX + fw, 4);
      ctx.stroke();
    }
    if (fo && fo > 0) {
      const fw = Math.min((fo / d) * W, endX - startX);
      const grad = ctx.createLinearGradient(endX - fw, 0, endX, 0);
      grad.addColorStop(0, 'rgba(225,72,61,0)');
      grad.addColorStop(1, 'rgba(225,72,61,0.18)');
      ctx.fillStyle = grad;
      ctx.fillRect(endX - fw, 0, fw, H);
      ctx.strokeStyle = 'rgba(225,72,61,0.65)';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(endX - fw, 4);
      ctx.lineTo(endX, H - 4);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(0,     0, startX,      H);
    ctx.fillRect(endX,  0, W - endX,    H);
  }, []);

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

  useEffect(() => {
    drawWaveform();
  }, [peaks, trimStart, trimEnd, duration, fadeInDuration, fadeOutDuration, drawWaveform]);

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
        audioBufferRef.current = decoded;
        const ch    = decoded.getChannelData(0);
        const N     = 600;
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
      }).catch(() => {
        if (!cancelled) { setWaveError(true); setLoading(false); }
      });
    };

    const onErr = () => { if (!cancelled) { setWaveError(true); setLoading(false); } };
    audio.addEventListener('loadedmetadata', onMeta, { once: true });
    audio.addEventListener('error',           onErr, { once: true });

    return () => {
      cancelled = true;
      if (decodeCtxRef.current) {
        try { decodeCtxRef.current.close(); } catch {}
        decodeCtxRef.current = null;
      }
      stopPlayback();
      audio.src = '';
      URL.revokeObjectURL(url);
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

  /**
   * Stops + disconnects the active audio source and gain node.
   * Always clears `source.onended` BEFORE calling stop() so manual stops do
   * not run the natural-end handler (which would clobber headTime).
   */
  const stopPlayback = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    const src = sourceRef.current;
    if (src) {
      try { src.onended = null; } catch {}
      try { src.stop(); } catch { /* already stopped */ }
      try { src.disconnect(); } catch {}
      sourceRef.current = null;
      debugRef.current.stopped++;
    }
    if (gainRef.current) {
      try { gainRef.current.disconnect(); } catch {}
      gainRef.current = null;
    }
    isPlayingRef.current = false;
  }, []);

  // RAF loop — drives the visual playhead from the *active source's* clock.
  // Runs only while isPlayingRef.current is true, so manual stops kill it.
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
   * Starts playback from `startOffset` (absolute file time) to current trimEnd.
   * Always stops any previous source FIRST. Uses a sequence counter so a slow
   * decode in one call cannot race a faster subsequent call.
   */
  const playFrom = useCallback(async (startOffset: number) => {
    stopPlayback();                 // kills any previous source synchronously
    const seq = ++playSeqRef.current;
    isPlayingRef.current = false;
    setIsPlaying(false);

    const { trimStart: s, trimEnd: e, duration: d } = stateRef.current;
    const sOff = Math.max(s, Math.min(e, startOffset));
    const remaining = e - sOff;
    if (remaining <= 0.01 || d === 0) return;

    try {
      const actx = getAudioCtx();

      let buffer = audioBufferRef.current;
      if (!buffer) {
        setIsDecoding(true);
        const raw = await file.arrayBuffer();
        if (seq !== playSeqRef.current) { setIsDecoding(false); return; }
        buffer = await actx.decodeAudioData(raw);
        if (seq !== playSeqRef.current) { setIsDecoding(false); return; }
        audioBufferRef.current = buffer;
        setIsDecoding(false);
      }
      // Final race check before allocating the source node
      if (seq !== playSeqRef.current) return;

      const source = actx.createBufferSource();
      source.buffer = buffer;

      const gain = actx.createGain();
      const now  = actx.currentTime;
      const { fadeInDuration: fi, fadeOutDuration: fo } = fadeRef.current;

      // Build a gain curve that exactly mirrors FFmpeg's afade chain.
      const samplesPerSec = 100;
      const N = Math.max(2, Math.min(8000, Math.ceil(remaining * samplesPerSec)));
      const curve = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const t = sOff + (i / (N - 1)) * remaining;
        curve[i] = gainAt(t, s, e, fi ?? null, fo ?? null);
      }
      try {
        gain.gain.setValueCurveAtTime(curve, now, remaining);
      } catch {
        gain.gain.setValueAtTime(curve[0], now);
        gain.gain.linearRampToValueAtTime(curve[N - 1], now + remaining);
      }

      source.connect(gain);
      gain.connect(actx.destination);
      source.start(now, sOff, remaining);
      debugRef.current.started++;

      // Natural end: fires only when the source plays through `remaining` sec.
      // Manual stops clear onended first so this is never called for stops.
      source.onended = () => {
        if (sourceRef.current !== source) return; // already replaced
        sourceRef.current = null;
        debugRef.current.stopped++;
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
        isPlayingRef.current = false;
        setIsPlaying(false);
        // Snap visual playhead back to current trim start (so re-pressing Play replays)
        const cs = stateRef.current.trimStart;
        headTimeRef.current = cs;
        setHeadTime(cs);
        drawPlayhead(cs);
      };

      sourceRef.current     = source;
      gainRef.current       = gain;
      playCtxStartRef.current = now;
      playOffsetRef.current   = sOff;
      isPlayingRef.current    = true;
      setIsPlaying(true);
      // Sync the playhead immediately so the UI doesn't lag a frame
      headTimeRef.current = sOff;
      setHeadTime(sOff);
      drawPlayhead(sOff);
      startRaf();

    } catch (err) {
      console.error('AudioEditor playback error:', err);
      setIsDecoding(false);
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  }, [file, stopPlayback, startRaf, drawPlayhead]);

  // Keep a ref to the latest playFrom so cross-effect callbacks can invoke it
  // without putting it in their dep arrays (which would re-run them constantly).
  const playFromRef = useRef(playFrom);
  playFromRef.current = playFrom;
  const stopPlaybackRef = useRef(stopPlayback);
  stopPlaybackRef.current = stopPlayback;

  // ── Drag controller ──────────────────────────────────────────────────────

  const beginDrag = useCallback((k: DragKind) => {
    if (dragRef.current.kind) return; // already dragging — ignore secondary
    dragRef.current.kind = k;
    if (isPlayingRef.current) {
      dragRef.current.wasPlaying = true;
      stopPlaybackRef.current();
      setIsPlaying(false);
    } else {
      dragRef.current.wasPlaying = false;
    }
  }, []);

  const endDrag = useCallback(() => {
    if (!dragRef.current.kind) return;
    const wasPlaying = dragRef.current.wasPlaying;
    dragRef.current.kind = null;
    dragRef.current.wasPlaying = false;
    if (!wasPlaying) return;

    // Snap headTime into [trimStart, trimEnd] then resume from there.
    // If headTime is at/past trimEnd (selection ended before playhead),
    // rewind to trimStart so the user gets a clean replay.
    const { trimStart: s, trimEnd: e } = stateRef.current;
    let h = headTimeRef.current;
    if (h < s || h >= e - END_TOL) h = s;
    if (h !== headTimeRef.current) {
      headTimeRef.current = h;
      setHeadTime(h);
      drawPlayhead(h);
    }
    if (e - h > END_TOL) {
      playFromRef.current(h);
    }
  }, [drawPlayhead]);

  // Global mouse/touch listeners — single handler routes by drag kind
  useEffect(() => {
    function xToTime(clientX: number): number {
      const el = containerRef.current;
      if (!el) return 0;
      const rect  = el.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return ratio * stateRef.current.duration;
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      const k = dragRef.current.kind;
      if (!k) return;
      let clientX: number;
      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }
      if (e.cancelable) e.preventDefault();
      const t = xToTime(clientX);
      const { trimStart: s, trimEnd: en, duration: d } = stateRef.current;
      const clamped = Math.max(0, Math.min(d, t));

      if (k === 'start') {
        onTrimChange(Math.min(clamped, en - MIN_SEL), en);
      } else if (k === 'end') {
        onTrimChange(s, Math.max(clamped, s + MIN_SEL));
      } else if (k === 'fadeIn') {
        const sel = en - s;
        const dur = Math.max(MIN_FADE, Math.min(sel, clamped - s));
        if (dur >= MIN_FADE) onFadeInChange(parseFloat(dur.toFixed(2)));
      } else if (k === 'fadeOut') {
        const sel = en - s;
        const dur = Math.max(MIN_FADE, Math.min(sel, en - clamped));
        if (dur >= MIN_FADE) onFadeOutChange(parseFloat(dur.toFixed(2)));
      } else if (k === 'playhead') {
        const h = Math.max(s, Math.min(en, clamped));
        headTimeRef.current = h;
        setHeadTime(h);
        drawPlayhead(h);
      }
    };
    const onUp = () => { endDrag(); };

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchmove',  onMove, { passive: false });
    window.addEventListener('touchend',   onUp);
    window.addEventListener('touchcancel',onUp);
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('touchmove',  onMove);
      window.removeEventListener('touchend',   onUp);
      window.removeEventListener('touchcancel',onUp);
    };
  }, [onTrimChange, onFadeInChange, onFadeOutChange, drawPlayhead, endDrag]);

  // ── Reactive sync: trim/fade prop changes mid-playback ───────────────────
  // When trim or fade changes from any source (drag, input, preset button, parent
  // reset) clamp headTime into the new selection. If audio is currently playing
  // *and* no drag is in progress, restart playback from the (clamped) headTime
  // so the active source uses the new values — otherwise the old source plays
  // the OLD selection/fade behind a UI showing the new one.
  useEffect(() => {
    let h = headTimeRef.current;
    let changed = false;
    if (h < trimStart)        { h = trimStart; changed = true; }
    else if (h > trimEnd)     { h = trimEnd;   changed = true; }
    if (changed) {
      headTimeRef.current = h;
      setHeadTime(h);
      drawPlayhead(h);
    }

    if (isPlayingRef.current && !dragRef.current.kind) {
      // Need to restart so the source/gain pick up the new trim or fade values.
      if (trimEnd - h > END_TOL) {
        playFromRef.current(h);
      } else {
        stopPlaybackRef.current();
        setIsPlaying(false);
      }
    }
  }, [trimStart, trimEnd, fadeInDuration, fadeOutDuration, drawPlayhead]);

  // ── Play / Pause button ──────────────────────────────────────────────────
  const handlePlayPause = useCallback(() => {
    if (dragRef.current.kind) return; // ignore during drag
    if (isPlayingRef.current) {
      stopPlayback();
      setIsPlaying(false);
      return;
    }
    const { trimStart: s, trimEnd: e } = stateRef.current;
    let h = headTimeRef.current;
    // Use current playhead if it's inside the selection, otherwise from start
    if (h < s || h >= e - END_TOL) h = s;
    playFrom(h);
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

  // ── Debug exposure (for browser tests) ───────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as unknown as { __audioEditorDebug: () => unknown }).__audioEditorDebug = () => ({
      started: debugRef.current.started,
      stopped: debugRef.current.stopped,
      activeSources: debugRef.current.started - debugRef.current.stopped,
      hasSourceRef: !!sourceRef.current,
      isPlaying: isPlayingRef.current,
      headTime: headTimeRef.current,
      trimStart: stateRef.current.trimStart,
      trimEnd: stateRef.current.trimEnd,
      dragKind: dragRef.current.kind,
      seq: playSeqRef.current,
    });
    return () => {
      try {
        delete (window as unknown as { __audioEditorDebug?: unknown }).__audioEditorDebug;
      } catch {}
    };
  }, []);

  // ── Click-to-seek on waveform (no drag) ──────────────────────────────────
  const xToTime = useCallback((clientX: number): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect  = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * stateRef.current.duration;
  }, []);

  const handleWaveformClick = useCallback((clientX: number) => {
    if (dragRef.current.kind) return;
    const { trimStart: s, trimEnd: e } = stateRef.current;
    const t = Math.max(s, Math.min(e, xToTime(clientX)));
    headTimeRef.current = t;
    setHeadTime(t);
    drawPlayhead(t);
    // Click-while-playing: restart from clicked position (replaces source)
    if (isPlayingRef.current) {
      playFrom(t);
    }
  }, [xToTime, drawPlayhead, playFrom]);

  const startDrag = (k: DragKind) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    beginDrag(k);
  };

  // ── Derived values ───────────────────────────────────────────────────────
  const startPct  = duration > 0 ? (trimStart / duration) * 100 : 0;
  const endPct    = duration > 0 ? (trimEnd   / duration) * 100 : 100;
  const headPct   = duration > 0 ? (headTime  / duration) * 100 : 0;
  const selDur    = trimEnd - trimStart;
  const progressPct = selDur > 0
    ? Math.max(0, Math.min(100, ((headTime - trimStart) / selDur) * 100))
    : 0;

  const fadeInPct  = fadeInDuration  !== null && duration > 0
    ? ((trimStart + Math.min(fadeInDuration,  selDur)) / duration) * 100
    : null;
  const fadeOutPct = fadeOutDuration !== null && duration > 0
    ? ((trimEnd   - Math.min(fadeOutDuration, selDur)) / duration) * 100
    : null;

  // Show playhead handle only when playhead is meaningfully inside the selection
  // (otherwise it sits on top of the trim handle and can't be grabbed).
  const showPlayheadHandle =
    !loading && !waveError && duration > 0 &&
    headTime > trimStart + 0.05 && headTime < trimEnd - 0.05;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3.5">

      {/* ── Waveform ────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative select-none touch-none rounded-lg overflow-hidden"
        style={{ height: WAVE_H }}
      >
        <canvas
          ref={waveCanvasRef}
          style={{ display: 'block' }}
          className={loading || waveError ? 'invisible' : ''}
        />

        <canvas
          ref={headCanvasRef}
          className={`absolute inset-0 pointer-events-none ${loading || waveError ? 'invisible' : ''}`}
          style={{ display: 'block' }}
        />

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

        {waveError && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-[#D9D9D9] rounded-lg">
            <span className="text-xs text-gray-400">Waveform unavailable — use the time inputs below</span>
          </div>
        )}

        {!loading && !waveError && duration > 0 && (
          <>
            {/* Click-to-seek zone (lowest z) */}
            <div
              className="absolute inset-0"
              style={{ cursor: 'crosshair', zIndex: 1 }}
              onClick={(e) => handleWaveformClick(e.clientX)}
            />

            {/* Draggable playhead handle (z 7 — under fade/trim) */}
            {showPlayheadHandle && (
              <div
                className="absolute top-0 bottom-0 cursor-ew-resize"
                style={{ left: `calc(${headPct}% - ${PLAYHEAD_HIT / 2}px)`, width: PLAYHEAD_HIT, zIndex: 7 }}
                onMouseDown={startDrag('playhead')}
                onTouchStart={startDrag('playhead')}
                onClick={(e) => e.stopPropagation()}
                aria-label="Drag to scrub playback position"
                role="slider"
              >
                {/* Visible grab dot at top — canvas already draws the line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-brand rounded-full shadow ring-2 ring-white pointer-events-none" />
              </div>
            )}

            {/* Fade-in handle */}
            {fadeInPct !== null && (
              <div
                className="absolute top-0 bottom-0 cursor-ew-resize group"
                style={{ left: `calc(${fadeInPct}% - ${HANDLE_HIT / 2}px)`, width: HANDLE_HIT, zIndex: 8 }}
                onMouseDown={startDrag('fadeIn')}
                onTouchStart={startDrag('fadeIn')}
                onClick={(e) => e.stopPropagation()}
                aria-label="Drag to adjust fade-in duration"
                role="slider"
              >
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-brand/60 group-hover:bg-brand transition-colors" />
                <div className="absolute top-1 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded bg-brand text-white text-[9px] font-mono font-semibold leading-none whitespace-nowrap">
                  {fadeInDuration?.toFixed(1)}s
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand rounded-full shadow border-2 border-white" />
              </div>
            )}

            {/* Fade-out handle */}
            {fadeOutPct !== null && (
              <div
                className="absolute top-0 bottom-0 cursor-ew-resize group"
                style={{ left: `calc(${fadeOutPct}% - ${HANDLE_HIT / 2}px)`, width: HANDLE_HIT, zIndex: 8 }}
                onMouseDown={startDrag('fadeOut')}
                onTouchStart={startDrag('fadeOut')}
                onClick={(e) => e.stopPropagation()}
                aria-label="Drag to adjust fade-out duration"
                role="slider"
              >
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-brand/60 group-hover:bg-brand transition-colors" />
                <div className="absolute top-1 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded bg-brand text-white text-[9px] font-mono font-semibold leading-none whitespace-nowrap">
                  {fadeOutDuration?.toFixed(1)}s
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand rounded-full shadow border-2 border-white" />
              </div>
            )}

            {/* Start trim handle */}
            <div
              className="absolute top-0 bottom-0 cursor-ew-resize"
              style={{ left: `calc(${startPct}% - 10px)`, width: 20, zIndex: 10 }}
              onMouseDown={startDrag('start')}
              onTouchStart={startDrag('start')}
              onClick={(e) => e.stopPropagation()}
              aria-label="Drag to set selection start"
              role="slider"
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-brand" />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand rounded-full shadow flex items-center justify-center">
                <div className="w-px h-2 bg-white/80 rounded-full" />
              </div>
            </div>

            {/* End trim handle */}
            <div
              className="absolute top-0 bottom-0 cursor-ew-resize"
              style={{ left: `calc(${endPct}% - 10px)`, width: 20, zIndex: 10 }}
              onMouseDown={startDrag('end')}
              onTouchStart={startDrag('end')}
              onClick={(e) => e.stopPropagation()}
              aria-label="Drag to set selection end"
              role="slider"
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-brand" />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand rounded-full shadow flex items-center justify-center">
                <div className="w-px h-2 bg-white/80 rounded-full" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Playback controls ────────────────────────────────────────────── */}
      {!loading && !waveError && duration > 0 && (
        <div className="flex items-center gap-3">

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
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="4" width="4" height="16" rx="1.5" />
                <rect x="15" y="4" width="4" height="16" rx="1.5" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 translate-x-px" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-gray-700">
                {formatTime(headTime > 0 || isPlaying ? headTime : trimStart)}
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                {formatTime(trimEnd)}
              </span>
            </div>
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
        <FadeDurationPicker
          label="Fade In"
          value={fadeInDuration}
          onChange={onFadeInChange}
          maxAllowed={Math.min(MAX_FADE, selDur > 0 ? selDur : MAX_FADE)}
        />
        <FadeDurationPicker
          label="Fade Out"
          value={fadeOutDuration}
          onChange={onFadeOutChange}
          maxAllowed={Math.min(MAX_FADE, selDur > 0 ? selDur : MAX_FADE)}
        />
        {(fadeInDuration !== null || fadeOutDuration !== null) && (
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Tip: drag the small dots on the waveform to fine-tune fade duration.
          </p>
        )}
      </div>

    </div>
  );
}
