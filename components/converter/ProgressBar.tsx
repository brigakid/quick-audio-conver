'use client';

interface ProgressBarProps {
  label?: string;
  indeterminate?: boolean;
}

export default function ProgressBar({ label = 'Converting…', indeterminate = true }: ProgressBarProps) {
  const isUploading = label.toLowerCase().includes('upload');

  return (
    <div className="flex flex-col items-center gap-5 py-4 w-full text-center">
      {/* Spinner */}
      <div className="relative w-14 h-14 flex-shrink-0">
        <div className="w-14 h-14 rounded-full border-[3px] border-gray-200" />
        <div className="absolute inset-0 w-14 h-14 rounded-full border-[3px] border-transparent border-t-brand animate-spin" />
        {/* Icon inside */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isUploading ? (
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-400">
          {isUploading
            ? 'Sending your file to the server…'
            : 'Processing with FFmpeg — this usually takes a few seconds.'}
        </p>
      </div>

      {/* Indeterminate progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        {indeterminate ? (
          <div className="h-full bg-brand rounded-full animate-[indeterminate_1.5s_ease-in-out_infinite]" />
        ) : (
          <div className="h-full bg-brand rounded-full w-full" />
        )}
      </div>

      <p className="text-xs text-gray-400">
        Keep this page open while your file is being converted.
      </p>
    </div>
  );
}
