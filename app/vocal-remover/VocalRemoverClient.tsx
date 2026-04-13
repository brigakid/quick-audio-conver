'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

type Phase =
  | 'idle'        // waiting for file
  | 'uploading'   // POSTing to /api/vocal-remover/upload
  | 'queued'      // job in BullMQ queue
  | 'processing'  // worker is running demucs
  | 'completed'   // stems ready
  | 'failed';     // permanent failure (all retries exhausted)

interface Stems {
  vocals:       { url: string };
  instrumental: { url: string };
}

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

const POLL_INTERVAL_MS = 2_500;
const MAX_POLL_MS      = 15 * 60 * 1_000; // 15 minutes safety ceiling
const ACCEPTED         = '.mp3,.wav,.flac,.m4a,.aac,.ogg';
const MAX_MB           = 100;

// --------------------------------------------------------------------------
// Small shared UI helpers
// --------------------------------------------------------------------------

function Spinner({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function StemIcon({ type }: { type: 'vocals' | 'instrumental' }) {
  if (type === 'vocals') {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  );
}

// --------------------------------------------------------------------------
// Upload dropzone (self-contained, no dependency on converter components)
// --------------------------------------------------------------------------

function DropZone({ onFile, disabled }: { onFile: (f: File) => void; disabled?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    onFile(files[0]);
  }, [onFile]);

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload audio file"
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) inputRef.current?.click(); }}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) pick(e.dataTransfer.files);
      }}
      className={`
        w-full rounded-2xl border-2 border-dashed transition-colors cursor-pointer select-none
        flex flex-col items-center justify-center gap-3 py-14 px-6 text-center
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
        ${dragging          ? 'border-brand bg-brand/5'          : ''}
        ${!dragging && !disabled ? 'border-[#D9D9D9] hover:border-brand hover:bg-gray-50' : ''}
        ${disabled          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' : ''}
      `}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dragging ? 'bg-brand' : 'bg-gray-100'}`}>
        <svg
          className={`w-7 h-7 ${dragging ? 'text-white' : 'text-gray-400'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">
          {dragging ? 'Drop your file here' : 'Drop your audio file here'}
        </p>
        <p className="text-xs text-gray-400 mt-1">or click to browse</p>
      </div>
      <p className="text-xs text-gray-400">
        MP3, WAV, FLAC, M4A, AAC, OGG &mdash; up to {MAX_MB} MB
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="sr-only"
        onChange={(e) => pick(e.target.files)}
        tabIndex={-1}
        disabled={disabled}
      />
    </div>
  );
}

// --------------------------------------------------------------------------
// Stem result card
// --------------------------------------------------------------------------

function StemCard({
  type,
  url,
  filename,
}: {
  type:     'vocals' | 'instrumental';
  url:      string;
  filename: string;
}) {
  const label    = type === 'vocals' ? 'Vocals' : 'Instrumental';
  const desc     = type === 'vocals'
    ? 'Isolated vocal track — lead and backing vocals only.'
    : 'Instrumental backing track — no vocals.';
  const previewUrl = `${url}&inline=1`;

  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-[#D9D9D9] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
          <StemIcon type={type} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{label}</p>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>

      {/* Audio preview */}
      <audio
        controls
        src={previewUrl}
        className="w-full h-10 rounded-lg"
        preload="none"
      />

      {/* Download */}
      <a
        href={url}
        download={filename}
        className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold
                   bg-brand text-white rounded-xl hover:bg-brand-dark active:bg-brand-active
                   transition-colors focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download {label}
      </a>
    </div>
  );
}

// --------------------------------------------------------------------------
// Main client component
// --------------------------------------------------------------------------

export default function VocalRemoverClient() {
  const [phase,         setPhase]         = useState<Phase>('idle');
  const [jobId,         setJobId]         = useState<string | null>(null);
  const [queuePos,      setQueuePos]      = useState<number | null>(null);
  const [stems,         setStems]         = useState<Stems | null>(null);
  const [error,         setError]         = useState<string | null>(null);
  const [filename,      setFilename]      = useState<string>('');
  const [uploadedName,  setUploadedName]  = useState<string>('');

  // ── polling ────────────────────────────────────────────────────────────────
  const pollRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartMs = useRef<number>(0);
  const errorCount  = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const startPolling = useCallback((id: string) => {
    stopPolling();
    pollStartMs.current = Date.now();
    errorCount.current  = 0;

    async function poll() {
      // Safety: stop after MAX_POLL_MS regardless
      if (Date.now() - pollStartMs.current > MAX_POLL_MS) {
        stopPolling();
        setPhase('failed');
        setError('Processing is taking too long. Please try again with a shorter file.');
        return;
      }

      try {
        const res  = await fetch(`/api/vocal-remover/status?jobId=${id}`);
        const data = await res.json();

        // Clear consecutive error counter on any successful HTTP response
        errorCount.current = 0;

        if (!res.ok || !data.success) {
          if (res.status === 404) {
            stopPolling();
            setPhase('failed');
            setError('Job not found. It may have expired — please try again.');
          }
          return;
        }

        const status: string = data.status;

        if (status === 'queued') {
          setPhase('queued');
          setQueuePos(data.queuePosition ?? null);
        } else if (status === 'processing') {
          setPhase('processing');
          setQueuePos(null);
        } else if (status === 'completed') {
          stopPolling();
          setStems(data.stems);
          setPhase('completed');
        } else if (status === 'failed') {
          stopPolling();
          setPhase('failed');
          setError(data.error ?? 'Separation failed. Please try a different file.');
        }
      } catch {
        // Network hiccup — tolerate up to 5 consecutive failures before giving up
        errorCount.current++;
        if (errorCount.current >= 5) {
          stopPolling();
          setPhase('failed');
          setError('Lost connection to the server. Please check your network and try again.');
        }
      }
    }

    pollRef.current = setInterval(poll, POLL_INTERVAL_MS);
    void poll(); // run immediately on first tick
  }, [stopPolling]);

  // Stop polling on unmount
  useEffect(() => () => stopPolling(), [stopPolling]);

  // ── upload handler ─────────────────────────────────────────────────────────
  const handleFile = useCallback(async (file: File) => {
    stopPolling();
    setPhase('uploading');
    setError(null);
    setStems(null);
    setJobId(null);
    setQueuePos(null);
    setFilename(file.name);
    setUploadedName(file.name);

    const body = new FormData();
    body.append('file', file);

    try {
      const res  = await fetch('/api/vocal-remover/upload', { method: 'POST', body });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setPhase('failed');
        setError(data.error ?? 'Upload failed. Please try again.');
        return;
      }

      setJobId(data.jobId);
      setPhase('queued');
      startPolling(data.jobId);
    } catch {
      setPhase('failed');
      setError('Upload failed. Please check your connection and try again.');
    }
  }, [stopPolling, startPolling]);

  const handleReset = useCallback(() => {
    stopPolling();
    setPhase('idle');
    setJobId(null);
    setQueuePos(null);
    setStems(null);
    setError(null);
    setFilename('');
  }, [stopPolling]);

  // ── render ─────────────────────────────────────────────────────────────────

  const baseName = uploadedName
    ? uploadedName.replace(/\.[^.]+$/, '')
    : 'track';

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 w-full max-w-2xl mx-auto">

      {/* ── IDLE — upload area ──────────────────────────────────────────────── */}
      {phase === 'idle' && (
        <DropZone onFile={handleFile} />
      )}

      {/* ── UPLOADING ───────────────────────────────────────────────────────── */}
      {phase === 'uploading' && (
        <div className="flex flex-col items-center gap-4 py-12">
          <Spinner className="w-8 h-8 text-brand" />
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">Uploading…</p>
            <p className="text-xs text-gray-400 mt-1 truncate max-w-[260px]">{filename}</p>
          </div>
        </div>
      )}

      {/* ── QUEUED ──────────────────────────────────────────────────────────── */}
      {phase === 'queued' && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1">
              <Spinner className="w-5 h-5 text-brand" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">
              {queuePos != null ? `In queue — position ${queuePos}` : 'In queue…'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Your file will be processed shortly
            </p>
            <p className="text-xs text-gray-300 mt-1 truncate max-w-[260px]">{filename}</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── PROCESSING ──────────────────────────────────────────────────────── */}
      {phase === 'processing' && (
        <div className="flex flex-col items-center gap-4 py-12">
          {/* Animated "sound wave" bars */}
          <div className="flex items-end gap-1 h-10" aria-hidden="true">
            {[0.4, 0.7, 1, 0.7, 0.4, 0.6, 0.9, 0.6, 0.3].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-brand rounded-full animate-pulse"
                style={{
                  height:            `${h * 100}%`,
                  animationDelay:    `${i * 80}ms`,
                  animationDuration: '900ms',
                }}
              />
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">Separating vocals…</p>
            <p className="text-xs text-gray-400 mt-1">
              This usually takes 1–3 minutes. The page will update automatically.
            </p>
            <p className="text-xs text-gray-300 mt-1 truncate max-w-[260px]">{filename}</p>
          </div>
        </div>
      )}

      {/* ── COMPLETED ───────────────────────────────────────────────────────── */}
      {phase === 'completed' && stems && (
        <div className="space-y-4">
          {/* Success header */}
          <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Separation complete — two stems ready
          </div>

          {/* Stem cards — side by side on sm+, stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StemCard
              type="vocals"
              url={stems.vocals.url}
              filename={`${baseName}_Vocals.wav`}
            />
            <StemCard
              type="instrumental"
              url={stems.instrumental.url}
              filename={`${baseName}_Instrumental.wav`}
            />
          </div>

          {/* Expiry notice + reset */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-gray-400">Files are deleted from the server after 1 hour.</p>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-brand hover:text-brand-dark font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
            >
              Process another file
            </button>
          </div>
        </div>
      )}

      {/* ── FAILED ──────────────────────────────────────────────────────────── */}
      {phase === 'failed' && (
        <div className="flex flex-col items-center gap-4 py-10">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div className="text-center max-w-sm">
            <p className="text-sm font-semibold text-gray-800">Processing failed</p>
            {error && (
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{error}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 text-sm font-semibold bg-brand text-white rounded-xl
                       hover:bg-brand-dark active:bg-brand-active transition-colors
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Try another file
          </button>
        </div>
      )}

    </div>
  );
}
