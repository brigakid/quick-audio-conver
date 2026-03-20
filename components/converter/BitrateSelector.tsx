'use client';

import type { Bitrate } from '@/types/conversion';
import { cn } from '@/lib/utils';

const BITRATES: { value: Bitrate; label: string; hint: string }[] = [
  { value: '128', label: '128 kbps', hint: 'Good quality, smaller file' },
  { value: '192', label: '192 kbps', hint: 'High quality, balanced' },
  { value: '320', label: '320 kbps', hint: 'Maximum quality, larger file' },
];

interface BitrateSelectorProps {
  value: Bitrate;
  onChange: (bitrate: Bitrate) => void;
  disabled?: boolean;
}

export default function BitrateSelector({ value, onChange, disabled }: BitrateSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Audio Quality
      </label>
      <div className="flex gap-2 flex-wrap">
        {BITRATES.map((b) => (
          <button
            key={b.value}
            type="button"
            onClick={() => !disabled && onChange(b.value)}
            disabled={disabled}
            title={b.hint}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-150',
              value === b.value
                ? 'bg-brand border-brand text-white shadow-sm'
                : 'bg-white border-[#D9D9D9] text-gray-700 hover:border-brand hover:text-brand',
              disabled && 'opacity-50 pointer-events-none'
            )}
          >
            {b.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-1.5">
        {BITRATES.find((b) => b.value === value)?.hint}
      </p>
    </div>
  );
}
