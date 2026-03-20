'use client';

import { cn } from '@/lib/utils';
import { getAvailablePresets, type Preset } from '@/lib/presets';
import type { InputFormat } from '@/types/conversion';

interface PresetSelectorProps {
  inputFormat: InputFormat;
  onSelect: (preset: Preset) => void;
  selectedId?: string;
}

// Inline SVG icons keyed by preset id
const ICONS: Record<string, React.ReactNode> = {
  'best-quality': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  'music': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  ),
  'universal': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  'mobile': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  'podcast': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  'editing': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  'car': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  'smallest': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
    </svg>
  ),
};

export default function PresetSelector({ inputFormat, onSelect, selectedId }: PresetSelectorProps) {
  const presets = getAvailablePresets(inputFormat);
  if (presets.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick presets</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            onSelect={onSelect}
            isSelected={preset.id === selectedId}
          />
        ))}
      </div>
    </div>
  );
}

function PresetCard({
  preset,
  onSelect,
  isSelected,
}: {
  preset: Preset;
  onSelect: (p: Preset) => void;
  isSelected: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(preset)}
      className={cn(
        'group flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
        isSelected
          ? 'border-brand bg-brand-tint shadow-sm'
          : 'border-gray-100 bg-white hover:border-brand/50 hover:bg-red-50/30 hover:shadow-sm',
      )}
    >
      <div
        className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
          isSelected
            ? 'bg-brand text-white'
            : 'bg-red-50 text-brand group-hover:bg-red-100',
        )}
      >
        {ICONS[preset.id] ?? ICONS['universal']}
      </div>
      <div className="min-w-0 w-full">
        <p
          className={cn(
            'text-xs font-bold leading-tight transition-colors',
            isSelected ? 'text-brand' : 'text-gray-900 group-hover:text-brand',
          )}
        >
          {preset.label}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-snug line-clamp-2">
          {preset.tagline}
        </p>
        {isSelected && (
          <p className="text-[10px] font-semibold text-brand mt-1.5 leading-tight">
            {preset.specLabel}
          </p>
        )}
      </div>
    </button>
  );
}
