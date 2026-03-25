'use client';

import type { InputFormat, OutputFormat } from '@/types/conversion';
import { getAllowedOutputs, FORMAT_LABELS } from '@/lib/conversion-rules';
import { cn } from '@/lib/utils';

interface FormatSelectorProps {
  inputFormat: InputFormat;
  value: OutputFormat | '';
  onChange: (format: OutputFormat) => void;
  disabled?: boolean;
}

/** Short note shown below the format buttons for non-bitrate formats */
const FORMAT_NOTES: Partial<Record<OutputFormat, string>> = {
  wav:  'WAV is uncompressed — bitrate does not apply.',
  m4a:  'M4A uses AAC at 192 kbps — bitrate does not apply.',
  flac: 'FLAC is lossless — the file size is smaller than WAV but the quality is identical. Bitrate does not apply.',
  aac:  'Raw AAC file (.aac). Same codec as M4A, different container. Choose your bitrate below.',
  ogg:  'OGG/Vorbis — open, royalty-free. Common in games and Linux. Choose your bitrate below.',
  opus: 'OPUS — a modern, efficient codec. 128 kbps Opus matches ~192 kbps MP3 in quality. Choose your bitrate below.',
};

export default function FormatSelector({
  inputFormat,
  value,
  onChange,
  disabled,
}: FormatSelectorProps) {
  const allowed = getAllowedOutputs(inputFormat);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">
          Output Format
        </label>
        {allowed.length > 1 && (
          <span className="text-xs text-gray-400">
            {value ? 'Selected' : 'Choose one'}
          </span>
        )}
      </div>

      {allowed.length > 1 && (
        <p className="text-xs text-gray-400 mb-2.5">
          Your file supports {allowed.length} output formats — select the one you need.
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        {allowed.map((fmt) => (
          <button
            key={fmt}
            type="button"
            onClick={() => !disabled && onChange(fmt)}
            disabled={disabled}
            aria-pressed={value === fmt}
            className={cn(
              'px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-150',
              value === fmt
                ? 'bg-brand border-brand text-white shadow-sm'
                : 'bg-white border-[#D9D9D9] text-gray-700 hover:border-brand hover:text-brand',
              disabled && 'opacity-50 pointer-events-none'
            )}
          >
            {FORMAT_LABELS[fmt] || fmt.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Format-specific note shown when a format is selected */}
      {value && FORMAT_NOTES[value] && (
        <p className="text-xs text-gray-400 mt-2">
          {FORMAT_NOTES[value]}
        </p>
      )}
    </div>
  );
}
