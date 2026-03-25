'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

interface DownloadResultProps {
  downloadUrl: string;
  filename: string;
  outputFormat: string;
  toolName: string;
  onReset: () => void;
}

export default function DownloadResult({ downloadUrl, filename, outputFormat, toolName, onReset }: DownloadResultProps) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    trackEvent('audio_download_clicked', {
      output_format: outputFormat,
      tool_name:     toolName,
    });
    setDownloading(true);
    try {
      // Fetch as Blob so iOS Safari triggers a real download instead of opening in-tab
      const res = await fetch(downloadUrl);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
    } catch {
      // Fallback: direct navigation
      window.open(downloadUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      {/* Success icon — brand tint bg with brand checkmark */}
      <div className="w-[72px] h-[72px] rounded-full bg-brand-tint ring-1 ring-brand/15 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-8 h-8 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="space-y-1">
        <p className="text-lg font-bold text-gray-900">Conversion complete</p>
        <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
          Your file is ready. Download it now — it will be automatically removed from our
          servers after a short time.
        </p>
      </div>

      {/* Filename display */}
      <div className="w-full flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-[#D9D9D9]">
        <div className="w-9 h-9 rounded-lg bg-brand-tint flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700 truncate flex-1 text-left">
          {filename}
        </span>
        <span className="text-xs text-brand font-semibold flex-shrink-0">Ready</span>
      </div>

      {/* Download button — full brand CTA */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold bg-brand text-white rounded-xl hover:bg-brand-dark active:bg-brand-active active:scale-[0.99] transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {downloading ? (
          <>
            <svg className="animate-spin h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Preparing download…
          </>
        ) : (
          <>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download {filename}
          </>
        )}
      </button>

      <Button variant="ghost" size="sm" onClick={onReset} className="text-gray-500">
        ← Convert another file
      </Button>
    </div>
  );
}
