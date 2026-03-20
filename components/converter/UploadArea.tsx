'use client';

import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import type { InputFormat } from '@/types/conversion';
import { SUPPORTED_INPUT_FORMATS } from '@/lib/conversion-rules';

interface UploadAreaProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export default function UploadArea({ onFileSelected, disabled }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Always accept all supported input formats — the converter dynamically adapts
  // to whatever file is uploaded, regardless of which page the user is on.
  const acceptedExts = SUPPORTED_INPUT_FORMATS.map((f) => `.${f}`);
  const acceptString = acceptedExts.join(',');

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!disabled) setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  }

  function processFile(file: File) {
    setError(null);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!SUPPORTED_INPUT_FORMATS.includes(ext as InputFormat)) {
      const supported = acceptedExts.join(', ').toUpperCase();
      setError(`Unsupported format ".${ext}". Accepted: ${supported}`);
      return;
    }
    onFileSelected(file);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload area — click or drag a file here"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 w-full rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer',
          'py-12 px-6 text-center',
          dragging
            ? 'border-brand bg-red-50/30 scale-[1.01]'
            : 'border-[#D9D9D9] bg-white hover:border-brand hover:bg-gray-50',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        {/* Icon */}
        <div className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
          dragging ? 'bg-red-50' : 'bg-white shadow-sm border border-gray-100'
        )}>
          <svg
            className={cn('w-6 h-6', dragging ? 'text-brand' : 'text-gray-400')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800">
            {dragging ? 'Drop your file here' : 'Drag & drop your file here'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            or <span className="text-brand font-medium">click to browse</span>
          </p>
        </div>

        {/* Format badges */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {acceptedExts.map((ext) => (
            <span
              key={ext}
              className="px-2 py-0.5 text-xs font-medium bg-white border border-gray-200 rounded-md text-gray-500 uppercase"
            >
              {ext.replace('.', '')}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-400">
          Max file size: {process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '200'} MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={acceptString}
          onChange={handleChange}
          className="sr-only"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
