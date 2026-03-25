import type { InputFormat, OutputFormat, ConversionRule } from '@/types/conversion';

/**
 * Full conversion matrix.
 *
 * Design decisions:
 *  - Same-format conversions (MP3→MP3, WAV→WAV, etc.) are excluded — pointless re-encode.
 *  - FLAC output is only allowed from uncompressed/lossless sources (WAV, AIFF).
 *    Encoding a lossy source (MP3, M4A, AAC, OGG, MP4) to FLAC produces a large file
 *    with the same lossy quality — this misleads users into thinking they have gained
 *    quality they have not. We do not offer it.
 *  - AAC output (.aac, raw ADTS container) is distinct from M4A (.m4a, AAC in MP4
 *    container). Both use the AAC codec but in different wrappers. We offer AAC output
 *    for workflows that require a raw .aac file rather than an .m4a container.
 *    M4A→AAC is excluded (same codec, just a container strip — too niche to surface).
 *  - OGG output uses Ogg/Vorbis. Offered broadly — useful for games, web, Linux.
 *    OGG→OGG and OGA→OGG excluded as same-format.
 *  - OPUS output uses libopus in an Ogg container (.opus). Modern, extremely efficient.
 *    OPUS→OPUS excluded (same codec). Very efficient even at 128 kbps.
 *
 * Wave-2 additions (all reliably decoded by standard FFmpeg builds):
 *  - AIFF / AIF : Apple uncompressed PCM — same decode path, two extensions
 *  - OPUS       : Modern codec (Discord, WebRTC) — native libopus or built-in decoder
 *  - OGA        : OGG Vorbis alternate extension (IETF spec) — same libvorbis path
 *  - WEBA       : WebM audio container (browser/web recordings)
 *  - WMA        : Windows Media Audio (old Windows libraries)
 */
export const CONVERSION_RULES: ConversionRule[] = [
  // ── Wave 1 ────────────────────────────────────────────────────────────────
  // MP4: lossy source → no FLAC; all other new formats fine
  { input: 'mp4',  allowedOutputs: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'opus'] },

  // WAV: uncompressed → FLAC is legitimate (lossless compression of raw PCM)
  { input: 'wav',  allowedOutputs: ['mp3', 'm4a', 'flac', 'aac', 'ogg', 'opus'] },

  // M4A: AAC-encoded, lossy → no FLAC (misleading), no AAC (same codec, different container)
  { input: 'm4a',  allowedOutputs: ['mp3', 'wav', 'ogg', 'opus'] },

  // FLAC: lossless → all outputs; FLAC→FLAC excluded (same format)
  { input: 'flac', allowedOutputs: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'opus'] },

  // MP3: lossy → no FLAC (misleading)
  { input: 'mp3',  allowedOutputs: ['wav', 'm4a', 'aac', 'ogg', 'opus'] },

  // AAC: lossy → no FLAC (misleading), no AAC (same codec)
  { input: 'aac',  allowedOutputs: ['mp3', 'wav', 'm4a', 'ogg', 'opus'] },

  // OGG/Vorbis: lossy → no FLAC (misleading), no OGG (same format)
  { input: 'ogg',  allowedOutputs: ['mp3', 'wav', 'm4a', 'aac', 'opus'] },

  // ── Wave 2 ────────────────────────────────────────────────────────────────
  // AIFF/AIF: Apple uncompressed PCM → FLAC is legitimate (same logic as WAV)
  { input: 'aiff', allowedOutputs: ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg', 'opus'] },
  { input: 'aif',  allowedOutputs: ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg', 'opus'] },

  // OPUS: lossy → no FLAC, no OPUS (same codec)
  { input: 'opus', allowedOutputs: ['mp3', 'wav', 'm4a', 'aac', 'ogg'] },

  // OGA: OGG Vorbis alternate extension → no FLAC (lossy), no OGG (same format)
  { input: 'oga',  allowedOutputs: ['mp3', 'wav', 'm4a', 'aac', 'opus'] },

  // WEBA: WebM audio → lossy, no FLAC
  { input: 'weba', allowedOutputs: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'opus'] },

  // WMA: Windows Media Audio → lossy, no FLAC
  { input: 'wma',  allowedOutputs: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'opus'] },
];

export function getAllowedOutputs(input: InputFormat): OutputFormat[] {
  const rule = CONVERSION_RULES.find((r) => r.input === input);
  return rule ? rule.allowedOutputs : [];
}

export function isConversionAllowed(input: InputFormat, output: OutputFormat): boolean {
  return getAllowedOutputs(input).includes(output);
}

export const SUPPORTED_INPUT_FORMATS: InputFormat[] = [
  // Wave 1
  'mp4', 'wav', 'm4a', 'flac', 'mp3', 'aac', 'ogg',
  // Wave 2
  'aiff', 'aif', 'opus', 'oga', 'weba', 'wma',
];

export const SUPPORTED_OUTPUT_FORMATS: OutputFormat[] = [
  'mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg', 'opus',
];

export const FORMAT_LABELS: Record<string, string> = {
  // Wave 1
  mp4:  'MP4',
  wav:  'WAV',
  m4a:  'M4A',
  flac: 'FLAC',
  mp3:  'MP3',
  aac:  'AAC',
  ogg:  'OGG',
  // Wave 2
  aiff: 'AIFF',
  aif:  'AIFF',   // same format, alternate extension
  opus: 'OPUS',
  oga:  'OGA',
  weba: 'WEBA',
  wma:  'WMA',
};

export const FORMAT_MIME_TYPES: Record<string, string[]> = {
  // Wave 1
  mp4:  ['video/mp4', 'audio/mp4'],
  wav:  ['audio/wav', 'audio/x-wav'],
  m4a:  ['audio/m4a', 'audio/x-m4a', 'audio/mp4'],
  flac: ['audio/flac', 'audio/x-flac'],
  mp3:  ['audio/mpeg', 'audio/mp3'],
  aac:  ['audio/aac', 'audio/x-aac', 'audio/vnd.dlna.adts'],
  ogg:  ['audio/ogg', 'audio/vorbis', 'application/ogg'],
  // Wave 2
  aiff: ['audio/aiff', 'audio/x-aiff', 'audio/x-aif'],
  aif:  ['audio/aiff', 'audio/x-aiff', 'audio/x-aif'],
  opus: ['audio/opus', 'audio/ogg; codecs=opus', 'audio/x-opus'],
  oga:  ['audio/ogg', 'audio/vorbis'],
  weba: ['audio/webm', 'video/webm'],
  wma:  ['audio/x-ms-wma', 'audio/wma'],
};

/**
 * Output MIME types — used when serving converted files for download.
 */
export const OUTPUT_MIME_TYPES: Record<OutputFormat, string> = {
  mp3:  'audio/mpeg',
  wav:  'audio/wav',
  m4a:  'audio/mp4',
  flac: 'audio/flac',
  aac:  'audio/aac',
  ogg:  'audio/ogg',
  opus: 'audio/opus',
};
