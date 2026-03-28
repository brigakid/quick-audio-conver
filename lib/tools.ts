/**
 * lib/tools.ts — canonical list of dedicated conversion tool pages.
 *
 * This is the single source of truth consumed by:
 *   - components/layout/Footer.tsx         (navigation links)
 *   - components/marketing/ToolsGrid.tsx   (homepage tabbed converter section)
 *   - app/converters/page.tsx              (full conversion matrix page)
 *
 * To add a new tool page:
 *   1. Add one entry to the TOOLS array below.
 *   2. Create the corresponding app/[route]/page.tsx.
 *   Footer and the output-filtered tabs (To MP3, To WAV, To M4A) update
 *   automatically. The hand-curated tabs (Popular, Lossless, Video, Legacy)
 *   require explicit additions to the byHrefs() lists in ToolsGrid.tsx.
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
  /** One-sentence description — shown on the /converters index and on dedicated tool pages */
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
  {
    href: '/mp4-to-wav',
    label: 'MP4 to WAV',
    inputFormat: 'mp4',
    outputFormat: 'wav',
    description: 'Extract the audio from an MP4 video as uncompressed WAV — the format DAWs and video editors work with natively.',
  },
  {
    href: '/m4a-to-wav',
    label: 'M4A to WAV',
    inputFormat: 'm4a',
    outputFormat: 'wav',
    description: 'Convert iPhone voice memos and GarageBand exports to WAV for use in editing software.',
  },
  {
    href: '/flac-to-wav',
    label: 'FLAC to WAV',
    inputFormat: 'flac',
    outputFormat: 'wav',
    description: 'Convert lossless FLAC to uncompressed WAV for hardware samplers and software that cannot handle FLAC.',
  },
  {
    href: '/mp3-to-m4a',
    label: 'MP3 to M4A',
    inputFormat: 'mp3',
    outputFormat: 'm4a',
    description: 'Convert MP3 to M4A (AAC) for Apple Podcasts, iTunes, and iOS device compatibility.',
  },
  {
    href: '/wav-to-m4a',
    label: 'WAV to M4A',
    inputFormat: 'wav',
    outputFormat: 'm4a',
    description: 'Convert uncompressed WAV to M4A — the compressed format preferred by Apple Podcasts and iTunes.',
  },
  // ── New output formats: FLAC, OGG, AAC ──────────────────────────────────
  {
    href: '/wav-to-flac',
    label: 'WAV to FLAC',
    inputFormat: 'wav',
    outputFormat: 'flac',
    description: 'Convert uncompressed WAV to lossless FLAC — same audio quality, 40–60% smaller file size.',
  },
  {
    href: '/aiff-to-flac',
    label: 'AIFF to FLAC',
    inputFormat: 'aiff',
    outputFormat: 'flac',
    description: 'Convert Apple AIFF audio to lossless FLAC for compact, high-fidelity archiving.',
  },
  {
    href: '/wav-to-ogg',
    label: 'WAV to OGG',
    inputFormat: 'wav',
    outputFormat: 'ogg',
    description: 'Convert WAV to OGG/Vorbis — the open, royalty-free format used in games and web audio.',
  },
  {
    href: '/mp3-to-ogg',
    label: 'MP3 to OGG',
    inputFormat: 'mp3',
    outputFormat: 'ogg',
    description: 'Convert MP3 to OGG/Vorbis for game engines, Linux, and open-source audio workflows.',
  },
  {
    href: '/wav-to-aac',
    label: 'WAV to AAC',
    inputFormat: 'wav',
    outputFormat: 'aac',
    description: 'Convert WAV to a raw AAC file (.aac) — efficient compressed audio without an MP4 wrapper.',
  },
  // ── Wave 3 additions: MOV, ALAC, AMR, AC3, AIFC ─────────────────────────
  {
    href: '/mov-to-mp3',
    label: 'MOV to MP3',
    inputFormat: 'mov',
    outputFormat: 'mp3',
    description: 'Extract the audio track from a QuickTime MOV video and save it as a high-quality MP3.',
  },
  {
    href: '/mov-to-wav',
    label: 'MOV to WAV',
    inputFormat: 'mov',
    outputFormat: 'wav',
    description: 'Extract audio from a MOV file as uncompressed WAV — ready for editing software and DAWs.',
  },
  {
    href: '/mov-to-m4a',
    label: 'MOV to M4A',
    inputFormat: 'mov',
    outputFormat: 'm4a',
    description: 'Extract and compress audio from a QuickTime MOV file to M4A for Apple Podcasts and iTunes.',
  },
  {
    href: '/alac-to-mp3',
    label: 'ALAC to MP3',
    inputFormat: 'alac',
    outputFormat: 'mp3',
    description: 'Convert Apple Lossless audio to MP3 for universal playback on any device or platform.',
  },
  {
    href: '/alac-to-wav',
    label: 'ALAC to WAV',
    inputFormat: 'alac',
    outputFormat: 'wav',
    description: 'Convert Apple Lossless to uncompressed WAV for use in DAWs and professional editing software.',
  },
  {
    href: '/alac-to-flac',
    label: 'ALAC to FLAC',
    inputFormat: 'alac',
    outputFormat: 'flac',
    description: 'Convert Apple Lossless ALAC to FLAC — lossless to lossless, with broader cross-platform support.',
  },
  {
    href: '/amr-to-mp3',
    label: 'AMR to MP3',
    inputFormat: 'amr',
    outputFormat: 'mp3',
    description: 'Convert legacy AMR voice recordings from mobile phones to widely compatible MP3.',
  },
  {
    href: '/amr-to-wav',
    label: 'AMR to WAV',
    inputFormat: 'amr',
    outputFormat: 'wav',
    description: 'Convert AMR voice recordings to uncompressed WAV for editing, archiving, or transcription.',
  },
  {
    href: '/ac3-to-mp3',
    label: 'AC3 to MP3',
    inputFormat: 'ac3',
    outputFormat: 'mp3',
    description: 'Convert Dolby Digital AC3 audio tracks from video files to universally compatible MP3.',
  },
  {
    href: '/ac3-to-wav',
    label: 'AC3 to WAV',
    inputFormat: 'ac3',
    outputFormat: 'wav',
    description: 'Convert AC3 Dolby Digital audio to uncompressed WAV for editing workflows.',
  },
  {
    href: '/aifc-to-mp3',
    label: 'AIFC to MP3',
    inputFormat: 'aifc',
    outputFormat: 'mp3',
    description: 'Convert compressed AIFC audio files to widely compatible MP3.',
  },
];
