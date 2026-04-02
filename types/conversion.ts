export type InputFormat =
  | 'mp4' | 'wav' | 'm4a' | 'flac' | 'mp3' | 'aac' | 'ogg'
  // Wave 2 — all reliably decoded by standard FFmpeg builds
  | 'aiff' | 'aif'   // Apple uncompressed (same codec, two extensions)
  | 'opus'           // Modern low-latency codec (Discord, WebRTC, Spotify)
  | 'oga'            // OGG Vorbis alternate extension (IETF spec)
  | 'weba'           // WebM audio container (browser/web recordings)
  | 'wma'            // Windows Media Audio (old Windows libraries)
  // Wave 3 — additional formats with broad FFmpeg support
  | 'aifc'           // Compressed AIFF variant (IMA ADPCM, MACE, etc.)
  | 'alac'           // Apple Lossless Audio Codec (standalone .alac container)
  | 'amr'            // Adaptive Multi-Rate — mobile voice recordings
  | 'ac3'            // Dolby Digital (AC-3) — multimedia audio tracks
  | 'mov';           // QuickTime video container — audio extraction
export type OutputFormat = 'mp3' | 'wav' | 'm4a' | 'flac' | 'aac' | 'ogg' | 'opus';
export type Bitrate = '128' | '192' | '320';
export type SampleRate = '22050' | '44100' | '48000';
export type Channels = 'mono' | 'stereo';

export type JobStatus = 'idle' | 'uploaded' | 'processing' | 'done' | 'failed';

export interface ConversionJob {
  jobId: string;
  status: JobStatus;
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  bitrate?: Bitrate;
  sampleRate?: SampleRate;
  channels?: Channels;
  originalName: string;
  inputPath: string;
  outputPath?: string;
  outputFilename?: string;
  error?: string;
  createdAt: number;
  completedAt?: number;
  trimStart?: number;
  trimEnd?: number;
  fadeIn?: number;
  fadeOut?: number;
  fadeOutStart?: number;
  // Tempo / BPM change — both required together to compute the atempo ratio.
  // detectedBpm: the source BPM (auto-detected or user-supplied).
  // targetBpm:   the desired output BPM.
  detectedBpm?: number;
  targetBpm?: number;
}

export interface ConversionRule {
  input: InputFormat;
  allowedOutputs: OutputFormat[];
}
