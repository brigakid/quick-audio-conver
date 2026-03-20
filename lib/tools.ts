/**
 * lib/tools.ts — canonical list of dedicated conversion tool pages.
 *
 * This is the single source of truth consumed by:
 *   - components/layout/Footer.tsx       (navigation links)
 *   - components/marketing/ToolsGrid.tsx (homepage tool cards)
 *
 * To add a new tool page:
 *   1. Add one entry to the TOOLS array below.
 *   2. Create the corresponding app/[route]/page.tsx.
 *   Footer and ToolsGrid update automatically — no other changes needed.
 */

export interface ToolEntry {
  /** URL path for the dedicated tool page, e.g. "/mp4-to-mp3" */
  href: string;
  /** Short display label, e.g. "MP4 to MP3" */
  label: string;
  /** Input format key — must match a value in the InputFormat union */
  inputFormat: string;
  /** Output format key — must match a value in the OutputFormat union */
  outputFormat: string;
  /** One-sentence description shown in the homepage ToolsGrid card */
  description: string;
}

export const TOOLS: readonly ToolEntry[] = [
  {
    href: '/mp4-to-mp3',
    label: 'MP4 to MP3',
    inputFormat: 'mp4',
    outputFormat: 'mp3',
    description: 'Extract the audio track from an MP4 video file and save it as a high-quality MP3.',
  },
  {
    href: '/wav-to-mp3',
    label: 'WAV to MP3',
    inputFormat: 'wav',
    outputFormat: 'mp3',
    description: 'Compress a large, uncompressed WAV file down to a compact, universally compatible MP3.',
  },
  {
    href: '/flac-to-mp3',
    label: 'FLAC to MP3',
    inputFormat: 'flac',
    outputFormat: 'mp3',
    description: 'Convert lossless FLAC audio to a smaller MP3 with a bitrate of your choice.',
  },
  {
    href: '/m4a-to-mp3',
    label: 'M4A to MP3',
    inputFormat: 'm4a',
    outputFormat: 'mp3',
    description: 'Convert Apple M4A audio files to MP3 for broader device and platform compatibility.',
  },
  {
    href: '/aiff-to-mp3',
    label: 'AIFF to MP3',
    inputFormat: 'aiff',
    outputFormat: 'mp3',
    description: 'Convert Apple AIFF audio — from Logic Pro, GarageBand, or Pro Tools — to MP3.',
  },
  {
    href: '/wma-to-mp3',
    label: 'WMA to MP3',
    inputFormat: 'wma',
    outputFormat: 'mp3',
    description: 'Convert Windows Media Audio files to MP3 — bring your old WMA library up to date.',
  },
  {
    href: '/opus-to-mp3',
    label: 'OPUS to MP3',
    inputFormat: 'opus',
    outputFormat: 'mp3',
    description: 'Convert OPUS audio to MP3 — works with Discord voice messages and WebRTC recordings.',
  },
  {
    href: '/aac-to-mp3',
    label: 'AAC to MP3',
    inputFormat: 'aac',
    outputFormat: 'mp3',
    description: 'Convert raw AAC audio files to MP3 for maximum device and platform compatibility.',
  },
  {
    href: '/ogg-to-mp3',
    label: 'OGG to MP3',
    inputFormat: 'ogg',
    outputFormat: 'mp3',
    description: 'Convert OGG Vorbis files — common in games and Linux — to widely supported MP3.',
  },
  {
    href: '/mp3-to-wav',
    label: 'MP3 to WAV',
    inputFormat: 'mp3',
    outputFormat: 'wav',
    description: 'Convert an MP3 to uncompressed WAV format for use in audio editing software.',
  },
];
