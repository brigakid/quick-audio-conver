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

      {/* Bitrate note: only shown when a non-MP3 output is selected */}
      {value && value !== 'mp3' && (
        <p className="text-xs text-gray-400 mt-2">
          {value === 'wav'
            ? 'WAV is uncompressed — bitrate does not apply.'
            : 'M4A uses AAC at 192 kbps — bitrate does not apply.'}
        </p>
      )}
    </div>
  );
}
