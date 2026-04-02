'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import UploadArea from './UploadArea';
import FormatSelector from './FormatSelector';
import BitrateSelector from './BitrateSelector';
import PresetSelector from './PresetSelector';
import ProgressBar from './ProgressBar';
import DownloadResult from './DownloadResult';
import AudioEditor from './AudioEditor';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import { formatFileSize, buildOutputFilename, getExtension } from '@/lib/utils';
import { getAllowedOutputs } from '@/lib/conversion-rules';
import { trackEvent } from '@/lib/analytics';
import type { Preset } from '@/lib/presets';
import type { InputFormat, OutputFormat, Bitrate, SampleRate, Channels, JobStatus } from '@/types/conversion';

function fileSizeBucket(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  if (mb < 1)  return '<1MB';
  if (mb < 10) return '1-10MB';
  if (mb < 50) return '10-50MB';
  return '>50MB';
}

function getErrorType(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('upload'))           return 'upload_failed';
  if (m.includes('taking too long'))  return 'timeout';
  if (m.includes('status check'))     return 'status_check_failed';
  if (m.includes('conversion fail') || m.includes('corrupt')) return 'conversion_failed';
  return 'unknown';
}

interface ConverterBoxProps {
  presetInputFormat?: InputFormat;
  presetOutputFormat?: OutputFormat;
}

type Phase = 'idle' | 'ready' | 'uploading' | 'converting' | 'done' | 'error';

export default function ConverterBox({ presetInputFormat, presetOutputFormat }: ConverterBoxProps) {
  const [file,           setFile]           = useState<File | null>(null);
  const [inputFormat,    setInputFormat]    = useState<InputFormat | null>(presetInputFormat || null);
  const [outputFormat,   setOutputFormat]   = useState<OutputFormat | ''>('');
  const [bitrate,        setBitrate]        = useState<Bitrate>('192');
  const [sampleRate,     setSampleRate]     = useState<SampleRate>('44100');
  const [channels,       setChannels]       = useState<Channels>('stereo');
  const [agreed,         setAgreed]         = useState(false);
  const [phase,          setPhase]          = useState<Phase>('idle');
  const [errorMsg,       setErrorMsg]       = useState<string | null>(null);
  const [jobId,          setJobId]          = useState<string | null>(null);
  const [downloadUrl,    setDownloadUrl]    = useState<string | null>(null);
  const [outputFilename, setOutputFilename] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);

  // ── Edit / trim / fade state ─────────────────────────────────────────────
  // editEnabled controls whether the unified "Edit audio" panel is open.
  // Trim is implicitly active when the handles have been moved from defaults.
  const [editEnabled,     setEditEnabled]     = useState(false);
  const [trimStart,       setTrimStart]       = useState(0);
  const [trimEnd,         setTrimEnd]         = useState(0);
  const [audioDuration,   setAudioDuration]   = useState(0);
  const [fadeInDuration,  setFadeInDuration]  = useState<number | null>(null);
  const [fadeOutDuration, setFadeOutDuration] = useState<number | null>(null);

  // ── BPM / tempo state ────────────────────────────────────────────────────
  // detectedBpm: auto-detected by AudioEditor (or null if detection failed)
  // targetBpmStr: the user's desired output BPM as a raw input string
  // sourceBpmStr: fallback when detection fails — user can enter source BPM manually
  const [detectedBpm,  setDetectedBpm]  = useState<number | null>(null);
  const [targetBpmStr, setTargetBpmStr] = useState('');
  const [sourceBpmStr, setSourceBpmStr] = useState('');

  // Preload audio duration as soon as a file is selected so we have it for the
  // fade-out-start calculation in handleConvert, even before the edit panel opens.
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    const url   = URL.createObjectURL(file);
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = url;
    audio.addEventListener('loadedmetadata', () => {
      if (!cancelled && isFinite(audio.duration) && audio.duration > 0) {
        setAudioDuration(audio.duration);
        setTrimEnd(audio.duration);
      }
      URL.revokeObjectURL(url);
    }, { once: true });
    audio.addEventListener('error', () => { if (!cancelled) URL.revokeObjectURL(url); }, { once: true });
    return () => { cancelled = true; };
  }, [file]);

  // ── Analytics ─────────────────────────────────────────────────────────────
  // Stable tool identifier: "mp4-to-mp3", "wav-to-mp3", etc., or "homepage"
  const toolName =
    presetInputFormat && presetOutputFormat
      ? `${presetInputFormat}-to-${presetOutputFormat}`
      : 'homepage';
  // Records Date.now() at the moment Convert is clicked — used to compute conversion_seconds
  const conversionStartRef = useRef<number | null>(null);

  // ── Polling abort ref ────────────────────────────────────────────────────
  const abortRef = useRef<{ aborted: boolean }>({ aborted: false });
  useEffect(() => {
    const ctrl = abortRef.current;
    return () => { ctrl.aborted = true; };
  }, []);

  // ── Stable handleReset ref for the window event listener ─────────────────
  const handleResetRef = useRef<() => void>(() => {});
  useEffect(() => {
    function onConverterReset() {
      handleResetRef.current();
      setTimeout(() => {
        document.getElementById('convert')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
    window.addEventListener('converter:reset', onConverterReset);
    return () => window.removeEventListener('converter:reset', onConverterReset);
  }, []);

  // ── Auto-select output format ─────────────────────────────────────────────
  useEffect(() => {
    if (!inputFormat) return;
    const allowed = getAllowedOutputs(inputFormat);
    if (presetOutputFormat && allowed.includes(presetOutputFormat)) {
      setOutputFormat(presetOutputFormat);
    } else if (allowed.length === 1) {
      setOutputFormat(allowed[0]);
    }
  }, [inputFormat, presetOutputFormat]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleFileSelected = useCallback((f: File) => {
    setFile(f);
    setInputFormat(getExtension(f.name) as InputFormat);
    setPhase('ready');
    setErrorMsg(null);
    trackEvent('file_selected', {
      file_extension:   getExtension(f.name),
      file_size_bucket: fileSizeBucket(f.size),
      source_format:    getExtension(f.name),
      tool_name:        toolName,
    });
    setJobId(null);
    setDownloadUrl(null);
    setSelectedPreset(null);
    setOutputFormat('');
    setSampleRate('44100');
    setChannels('stereo');
    // Reset edit state
    setEditEnabled(false);
    setTrimStart(0);
    setTrimEnd(0);
    setAudioDuration(0);
    setFadeInDuration(null);
    setFadeOutDuration(null);
    // Reset BPM state
    setDetectedBpm(null);
    setTargetBpmStr('');
    setSourceBpmStr('');
  }, []);

  function handlePresetSelected(preset: Preset) {
    setSelectedPreset(preset);
    setOutputFormat(preset.outputFormat);
    setBitrate(preset.bitrate);
    setSampleRate(preset.sampleRate);
    setChannels(preset.channels);
    trackEvent('format_chosen', {
      output_format: preset.outputFormat,
      source_format: inputFormat || '',
      tool_name:     toolName,
    });
  }

  function handleDirectFormatChange(fmt: OutputFormat) {
    setOutputFormat(fmt);
    setSelectedPreset(null);
    setSampleRate('44100');
    setChannels('stereo');
    trackEvent('format_chosen', {
      output_format: fmt,
      source_format: inputFormat || '',
      tool_name:     toolName,
    });
  }

  const handleTrimChange = useCallback((start: number, end: number) => {
    setTrimStart(start);
    setTrimEnd(end);
  }, []);

  const handleDurationLoaded = useCallback((dur: number) => {
    setAudioDuration(dur);
    setTrimEnd(dur);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditEnabled(false);
    setTrimStart(0);
    setTrimEnd(audioDuration);
    setFadeInDuration(null);
    setFadeOutDuration(null);
    setTargetBpmStr('');
    setSourceBpmStr('');
    // detectedBpm is kept — it reflects the file, not the edit settings
  }, [audioDuration]);

  // Block conversion when the user has typed a target BPM that is out of range.
  // An empty targetBpmStr is fine (means "no tempo change").
  const targetBpmValid =
    !editEnabled ||
    targetBpmStr === '' ||
    (() => { const n = parseFloat(targetBpmStr); return !isNaN(n) && n >= 20 && n <= 300; })();
  const canConvert = !!(file && inputFormat && outputFormat && agreed && phase === 'ready' && targetBpmValid);

  async function handleConvert() {
    if (!file || !inputFormat || !outputFormat) return;
    abortRef.current = { aborted: false };
    conversionStartRef.current = Date.now();
    setPhase('uploading');
    setErrorMsg(null);
    trackEvent('conversion_start', {
      source_format: inputFormat,
      output_format: outputFormat,
      tool_name:     toolName,
    });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('outputFormat', outputFormat);
      formData.append('bitrate', bitrate);
      formData.append('sampleRate', sampleRate);
      formData.append('channels', channels);

      // Trim: only send when edit panel was used and handles were actually moved
      const isTrimmed =
        editEnabled &&
        audioDuration > 0 &&
        (trimStart > 0.01 || trimEnd < audioDuration - 0.01);

      if (isTrimmed) {
        formData.append('trimStart', trimStart.toString());
        formData.append('trimEnd',   trimEnd.toString());
      }

      // Fade: send whenever edit is open and a fade duration was chosen
      if (editEnabled && audioDuration > 0) {
        const effectiveDur = isTrimmed ? trimEnd - trimStart : audioDuration;
        if (fadeInDuration !== null && fadeInDuration > 0) {
          formData.append('fadeIn', fadeInDuration.toString());
        }
        if (fadeOutDuration !== null && fadeOutDuration > 0) {
          const fadeOutStart = Math.max(0, effectiveDur - fadeOutDuration);
          formData.append('fadeOut',      fadeOutDuration.toString());
          formData.append('fadeOutStart', fadeOutStart.toString());
        }
      }

      // Tempo: send when edit is open and the user specified a valid target BPM.
      // The effective source BPM is either auto-detected or manually entered.
      if (editEnabled && targetBpmStr !== '') {
        const parsedTarget = parseFloat(targetBpmStr);
        const effectiveSource = detectedBpm !== null
          ? detectedBpm
          : parseFloat(sourceBpmStr);
        if (
          !isNaN(parsedTarget) && parsedTarget >= 20 && parsedTarget <= 300 &&
          !isNaN(effectiveSource) && effectiveSource >= 20 && effectiveSource <= 300
        ) {
          formData.append('detectedBpm', effectiveSource.toString());
          formData.append('targetBpm',   parsedTarget.toString());
        }
      }

      const uploadRes  = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.error || 'Upload failed. Please try again.');
      }

      const id: string = uploadData.jobId;
      setJobId(id);
      setPhase('converting');

      const convertRes  = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: id }),
      });
      const convertData = await convertRes.json();
      if (!convertRes.ok || !convertData.success) {
        throw new Error(convertData.error || 'Conversion failed. Please try again.');
      }

      await pollStatus(id, file, outputFormat);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      trackEvent('conversion_error', {
        source_format: inputFormat,
        output_format: outputFormat,
        error_type:    getErrorType(msg),
        tool_name:     toolName,
      });
      setPhase('error');
      setErrorMsg(msg);
    }
  }

  async function pollStatus(id: string, currentFile: File, currentOutputFormat: string) {
    const maxAttempts = 60;
    let   attempts    = 0;

    while (attempts < maxAttempts) {
      await new Promise((res) => setTimeout(res, 1500));
      if (abortRef.current.aborted) return;
      attempts++;

      const res  = await fetch(`/api/status?jobId=${id}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Status check failed.');

      const status: JobStatus = data.status;
      if (status === 'done') {
        if (abortRef.current.aborted) return;
        const conversionSeconds =
          conversionStartRef.current !== null
            ? Math.round((Date.now() - conversionStartRef.current) / 100) / 10
            : 0;
        trackEvent('conversion_success', {
          source_format:      getExtension(currentFile.name),
          output_format:      currentOutputFormat,
          conversion_seconds: conversionSeconds,
          tool_name:          toolName,
        });
        setOutputFilename(data.outputFilename || buildOutputFilename(currentFile.name, currentOutputFormat));
        setDownloadUrl(`/api/download?jobId=${id}`);
        setPhase('done');
        return;
      }
      if (status === 'failed') {
        throw new Error(data.error || 'Conversion failed. The file may be corrupt or unsupported.');
      }
    }
    throw new Error('Conversion is taking too long. Please try again with a smaller file.');
  }

  function handleReset() {
    abortRef.current.aborted = true;
    setFile(null);
    setInputFormat(presetInputFormat || null);
    setOutputFormat('');
    setBitrate('192');
    setSampleRate('44100');
    setChannels('stereo');
    setAgreed(false);
    setPhase('idle');
    setErrorMsg(null);
    setJobId(null);
    setDownloadUrl(null);
    setOutputFilename('');
    setSelectedPreset(null);
    setEditEnabled(false);
    setTrimStart(0);
    setTrimEnd(0);
    setAudioDuration(0);
    setFadeInDuration(null);
    setFadeOutDuration(null);
    setDetectedBpm(null);
    setTargetBpmStr('');
    setSourceBpmStr('');
  }

  handleResetRef.current = handleReset;

  // ── Derived booleans ──────────────────────────────────────────────────────
  const showFormatControls = phase === 'ready' && inputFormat !== null;
  const showActionRow      = phase === 'ready' && outputFormat !== '';

  // Summary label for the collapsed edit button
  const editSummary: string[] = [];
  if (audioDuration > 0 && editEnabled) {
    if (trimStart > 0.01 || trimEnd < audioDuration - 0.01) editSummary.push('Trimmed');
    if (fadeInDuration  !== null) editSummary.push(`Fade in ${fadeInDuration}s`);
    if (fadeOutDuration !== null) editSummary.push(`Fade out ${fadeOutDuration}s`);
    const parsedTarget = parseFloat(targetBpmStr);
    const effectiveSource = detectedBpm !== null ? detectedBpm : parseFloat(sourceBpmStr);
    if (
      !isNaN(parsedTarget) && parsedTarget >= 20 && parsedTarget <= 300 &&
      !isNaN(effectiveSource) && effectiveSource > 0
    ) {
      editSummary.push(`${parsedTarget} BPM`);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div id="convert" className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 w-full max-w-2xl mx-auto">

      {/* Done state */}
      {phase === 'done' && downloadUrl && (
        <DownloadResult
          downloadUrl={downloadUrl}
          filename={outputFilename}
          outputFormat={outputFormat as string}
          toolName={toolName}
          onReset={handleReset}
        />
      )}

      {/* Converting / uploading */}
      {(phase === 'uploading' || phase === 'converting') && (
        <div className="py-4">
          <ProgressBar label={phase === 'uploading' ? 'Uploading file…' : 'Converting…'} />
        </div>
      )}

      {/* Idle / ready / error */}
      {(phase === 'idle' || phase === 'ready' || phase === 'error') && (
        <div className="space-y-5">

          {/* File info row — or upload area */}
          {file && phase !== 'idle' ? (
            <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-[#D9D9D9]">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={handleReset}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Remove file"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <UploadArea onFileSelected={handleFileSelected} />
          )}

          {/* ── Unified "Edit audio" section (trim + fade + playback) ──────── */}
          {phase === 'ready' && file && (
            editEnabled ? (
              <div className="rounded-xl border border-[#D9D9D9] overflow-hidden">
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-[#D9D9D9]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    {/* Scissors icon */}
                    <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a2.165 2.165 0 001.083 1.839l1.676.967m-1.676-2.806l1.676-.967m0 3.773a3 3 0 105.196 3 3 3 0 00-5.196-3zm0-3.773a3 3 0 105.196-3 3 3 0 00-5.196 3z" />
                    </svg>
                    Edit audio
                  </div>
                  <button
                    type="button"
                    onClick={handleEditClose}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Use full file
                  </button>
                </div>

                {/* AudioEditor — waveform + playback + time inputs + fade */}
                <div className="p-4">
                  <AudioEditor
                    file={file}
                    trimStart={trimStart}
                    trimEnd={trimEnd}
                    duration={audioDuration}
                    fadeInDuration={fadeInDuration}
                    fadeOutDuration={fadeOutDuration}
                    onTrimChange={handleTrimChange}
                    onDurationLoaded={handleDurationLoaded}
                    onFadeInChange={setFadeInDuration}
                    onFadeOutChange={setFadeOutDuration}
                    detectedBpm={detectedBpm}
                    targetBpmStr={targetBpmStr}
                    sourceBpmStr={sourceBpmStr}
                    onDetectedBpmChange={setDetectedBpm}
                    onTargetBpmChange={setTargetBpmStr}
                    onSourceBpmChange={setSourceBpmStr}
                  />
                </div>
              </div>
            ) : (
              /* Collapsed: single dashed trigger button */
              <button
                type="button"
                onClick={() => setEditEnabled(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-brand border border-dashed border-brand/40 rounded-xl bg-brand-tint/50 hover:bg-brand-tint hover:border-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
              >
                {/* Scissors icon */}
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a2.165 2.165 0 001.083 1.839l1.676.967m-1.676-2.806l1.676-.967m0 3.773a3 3 0 105.196 3 3 3 0 00-5.196-3zm0-3.773a3 3 0 105.196-3 3 3 0 00-5.196 3z" />
                </svg>
                {editSummary.length > 0
                  ? editSummary.join(' · ')
                  : 'Trim & Fade (optional)'}
              </button>
            )
          )}

          {/* Format controls */}
          {showFormatControls && inputFormat && (
            <div className="space-y-4">
              <PresetSelector
                inputFormat={inputFormat}
                onSelect={handlePresetSelected}
                selectedId={selectedPreset?.id}
              />
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11px] font-medium text-gray-400">or choose format directly</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <FormatSelector
                inputFormat={inputFormat}
                value={outputFormat}
                onChange={handleDirectFormatChange}
              />
              {/* Show bitrate selector for all variable-rate lossy output formats */}
              {outputFormat && (['mp3', 'aac', 'ogg', 'opus'] as const).includes(outputFormat as 'mp3' | 'aac' | 'ogg' | 'opus') && (
                <BitrateSelector value={bitrate} onChange={setBitrate} />
              )}
            </div>
          )}

          {/* Legal checkbox */}
          {showActionRow && (
            <Checkbox
              id="legal-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label={
                <>
                  I confirm I own this file or have permission to convert it. I agree to the{' '}
                  <a href="/terms" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>
                  .
                </>
              }
            />
          )}

          {/* Error message */}
          {phase === 'error' && errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">{errorMsg}</p>
                <button onClick={handleReset} className="text-sm text-red-600 hover:text-red-800 underline mt-1">
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Convert button */}
          {showActionRow && (
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!canConvert}
              onClick={handleConvert}
            >
              Convert File
            </Button>
          )}

          {phase === 'idle' && (
            <p className="text-xs text-gray-400 text-center">
              Your file is processed securely and deleted automatically after conversion.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
