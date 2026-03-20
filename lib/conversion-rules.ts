import type { InputFormat, OutputFormat, ConversionRule } from '@/types/conversion';

/**
 * Full conversion matrix.
 *
 * Design decisions:
 *  - Same-format conversions (MP3→MP3, WAV→WAV, etc.) are excluded — pointless re-encode.
 *  - FLAC output is excluded — encoding a lossy source to lossless produces no benefit and
 *    misleads users into thinking they have a lossless file.
 *  - OGG output is excluded — OGG Vorbis is a niche output target; MP3/WAV/M4A cover
 *    virtually all real-world use cases.
 *  - M4A output is supported for all inputs (except M4A itself) because AAC-in-MP4 is a
 *    primary modern audio format used by Apple, Android, and streaming platforms.
 *
 * Wave-2 additions (all reliably decoded by standard FFmpeg builds):
 *  - AIFF / AIF : Apple uncompressed PCM — same decode path, two extensions
 *  - OPUS       : Modern codec (Discord, WebRTC) — native libopus or built-in decoder
 *  - OGA        : OGG Vorbis alternate extension per IETF spec — same libvorbis path
 *  - WEBA       : WebM audio — same Vorbis/Opus decoders already in use
 *  - WMA        : Windows Media Audio — wmav2 decoder is LGPL and always compiled in
 */
export const CONVERSION_RULES: ConversionRule[] = [
  // Wave 1
  { input: 'mp4',  allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'wav',  allowedOutputs: ['mp3', 'm4a'] },
  { input: 'm4a',  allowedOutputs: ['mp3', 'wav'] },
  { input: 'flac', allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'mp3',  allowedOutputs: ['wav', 'm4a'] },
  { input: 'aac',  allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'ogg',  allowedOutputs: ['mp3', 'wav', 'm4a'] },
  // Wave 2
  { input: 'aiff', allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'aif',  allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'opus', allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'oga',  allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'weba', allowedOutputs: ['mp3', 'wav', 'm4a'] },
  { input: 'wma',  allowedOutputs: ['mp3', 'wav', 'm4a'] },
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

export const SUPPORTED_OUTPUT_FORMATS: OutputFormat[] = ['mp3', 'wav', 'm4a'];

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
