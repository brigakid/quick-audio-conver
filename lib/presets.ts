import type { InputFormat, OutputFormat, Bitrate, SampleRate, Channels } from '@/types/conversion';
import { getAllowedOutputs } from '@/lib/conversion-rules';

export interface Preset {
  id: string;
  label: string;
  tagline: string;
  outputFormat: OutputFormat;
  bitrate: Bitrate;
  sampleRate: SampleRate;
  channels: Channels;
  /** Short spec string shown on the summary card, e.g. "MP3 · 320 kbps · Stereo" */
  specLabel: string;
}

export const PRESETS: Preset[] = [
  {
    id: 'best-quality',
    label: 'Best Quality',
    tagline: 'Lossless WAV — every detail of the original preserved.',
    outputFormat: 'wav',
    bitrate: '192', // unused for WAV
    sampleRate: '44100',
    channels: 'stereo',
    specLabel: 'WAV · Lossless · Stereo · 44.1 kHz',
  },
  {
    id: 'music',
    label: 'Music Playback',
    tagline: 'High-bitrate MP3 — near-transparent quality for headphones and speakers.',
    outputFormat: 'mp3',
    bitrate: '320',
    sampleRate: '44100',
    channels: 'stereo',
    specLabel: 'MP3 · 320 kbps · Stereo · 44.1 kHz',
  },
  {
    id: 'universal',
    label: 'Universal Compatibility',
    tagline: 'MP3 at 192 kbps plays on every device, app, and platform — the safe default.',
    outputFormat: 'mp3',
    bitrate: '192',
    sampleRate: '44100',
    channels: 'stereo',
    specLabel: 'MP3 · 192 kbps · Stereo · 44.1 kHz',
  },
  {
    id: 'mobile',
    label: 'Mobile Playback',
    tagline: 'AAC (M4A) delivers better quality than MP3 at the same file size. Default on iOS and Android.',
    outputFormat: 'm4a',
    bitrate: '192', // M4A is fixed 192k in FFmpeg
    sampleRate: '44100',
    channels: 'stereo',
    specLabel: 'M4A · AAC 192 kbps · Stereo · 44.1 kHz',
  },
  {
    id: 'podcast',
    label: 'Podcast / Voice',
    tagline: 'Mono speech file — half the size of stereo with no perceptible quality difference for voice.',
    outputFormat: 'mp3',
    bitrate: '128',
    sampleRate: '44100',
    channels: 'mono',
    specLabel: 'MP3 · 128 kbps · Mono · 44.1 kHz',
  },
  {
    id: 'editing',
    label: 'Editing / Production',
    tagline: '48 kHz WAV is the standard sample rate for DAWs, video editing, and broadcast.',
    outputFormat: 'wav',
    bitrate: '192', // unused for WAV
    sampleRate: '48000',
    channels: 'stereo',
    specLabel: 'WAV · Lossless · Stereo · 48 kHz',
  },
  {
    id: 'car',
    label: 'Car Audio',
    tagline: 'Proven to work on factory and aftermarket head units, CD players, and USB music drives.',
    outputFormat: 'mp3',
    bitrate: '192',
    sampleRate: '44100',
    channels: 'stereo',
    specLabel: 'MP3 · 192 kbps · Stereo · 44.1 kHz',
  },
  {
    id: 'smallest',
    label: 'Smallest File',
    tagline: 'Compact 128 kbps MP3 — lowest file size with acceptable quality for casual listening.',
    outputFormat: 'mp3',
    bitrate: '128',
    sampleRate: '44100',
    channels: 'stereo',
    specLabel: 'MP3 · 128 kbps · Stereo · 44.1 kHz',
  },
];

/**
 * Returns only the presets whose outputFormat is allowed for the given input format.
 * This ensures we never show a preset that would result in an unsupported conversion.
 */
export function getAvailablePresets(inputFormat: InputFormat): Preset[] {
  const allowed = getAllowedOutputs(inputFormat);
  return PRESETS.filter((p) => allowed.includes(p.outputFormat));
}
