import ffmpeg from 'fluent-ffmpeg';
import type { InputFormat, OutputFormat, Bitrate, SampleRate, Channels } from '@/types/conversion';

export interface ConversionOptions {
  inputPath: string;
  outputPath: string;
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  bitrate?: Bitrate;
  sampleRate?: SampleRate;
  channels?: Channels;
  trimStart?: number;
  trimEnd?: number;
  fadeIn?: number;
  fadeOut?: number;
  fadeOutStart?: number;
}

export interface ConversionResult {
  success: boolean;
  error?: string;
}

/**
 * Converts a file using FFmpeg.
 * Returns a promise that resolves when conversion completes.
 *
 * Output format notes:
 *  - mp3:  libmp3lame codec, bitrate-controlled (128/192/320 kbps)
 *  - wav:  pcm_s16le codec, uncompressed — bitrate param is ignored
 *  - m4a:  AAC codec using 'ipod' container (MP4 wrapper) — fixed 192 kbps
 *          The output file must have a .m4a extension for the container to be correct.
 *  - flac: FLAC lossless codec — bitrate param is ignored (lossless has no bitrate)
 *          Only offered from uncompressed/lossless sources; see conversion-rules.ts.
 *  - aac:  Raw AAC in ADTS container (.aac file) — bitrate-controlled (128/192/320 kbps)
 *          Distinct from M4A: same codec, different container. Use when a .aac file
 *          is specifically required rather than an .m4a wrapper.
 *  - ogg:  OGG/Vorbis codec — bitrate-controlled (128/192/320 kbps)
 *          Royalty-free, open standard. Common in games, web, and Linux environments.
 *  - opus: libopus codec in Ogg container (.opus file) — bitrate-controlled
 *          Modern, extremely efficient codec. Better quality than MP3 at the same
 *          bitrate. Widely supported in browsers, Discord, and streaming tools.
 */
export function convertFile(options: ConversionOptions): Promise<ConversionResult> {
  const {
    inputPath, outputPath, inputFormat, outputFormat,
    bitrate, sampleRate, channels,
    trimStart, trimEnd, fadeIn, fadeOut, fadeOutStart,
  } = options;

  return new Promise((resolve) => {
    const command = ffmpeg(inputPath);

    if (outputFormat === 'mp3') {
      command
        .noVideo()
        .audioCodec('libmp3lame')
        .audioBitrate(bitrate || '192')
        .format('mp3');

    } else if (outputFormat === 'wav') {
      command
        .noVideo()
        .audioCodec('pcm_s16le')
        .format('wav');

    } else if (outputFormat === 'm4a') {
      // 'ipod' format produces proper M4A (AAC-in-MPEG-4) containers.
      // Fixed at 192k — AAC at 192k is transparent quality for most content.
      command
        .noVideo()
        .audioCodec('aac')
        .audioBitrate('192')
        .format('ipod');

    } else if (outputFormat === 'flac') {
      // FLAC is lossless — no bitrate applies.
      // Compression level 8 = smallest file; default (5) balances speed and size.
      command
        .noVideo()
        .audioCodec('flac')
        .format('flac');

    } else if (outputFormat === 'aac') {
      // Raw AAC in ADTS container (.aac file). Different from M4A (which wraps AAC in MP4).
      command
        .noVideo()
        .audioCodec('aac')
        .audioBitrate(bitrate || '192')
        .format('adts');

    } else if (outputFormat === 'ogg') {
      // OGG/Vorbis: royalty-free lossy codec.
      command
        .noVideo()
        .audioCodec('libvorbis')
        .audioBitrate(bitrate || '192')
        .format('ogg');

    } else if (outputFormat === 'opus') {
      // libopus in Ogg container (.opus). Highly efficient modern codec.
      // 128 kbps Opus matches ~192 kbps MP3 in quality for most content.
      command
        .noVideo()
        .audioCodec('libopus')
        .audioBitrate(bitrate || '128')
        .format('opus');
    }

    // Apply sample rate and channel count (works for all output formats)
    if (sampleRate) command.audioFrequency(Number(sampleRate));
    if (channels) command.audioChannels(channels === 'mono' ? 1 : 2);

    // Apply trim: -ss before input (fast seek), then -t limits output duration
    if (trimStart !== undefined && trimStart > 0) command.seekInput(trimStart);
    if (trimStart !== undefined && trimEnd !== undefined && trimEnd > trimStart) {
      command.duration(trimEnd - trimStart);
    }

    // Apply fade in/out via afade audio filter
    const audioFilters: string[] = [];
    if (fadeIn && fadeIn > 0) audioFilters.push(`afade=t=in:st=0:d=${fadeIn}`);
    if (fadeOut && fadeOut > 0 && fadeOutStart !== undefined && fadeOutStart >= 0) {
      audioFilters.push(`afade=t=out:st=${fadeOutStart}:d=${fadeOut}`);
    }
    if (audioFilters.length > 0) command.audioFilters(audioFilters);

    command
      .on('error', (err) => {
        resolve({
          success: false,
          error: sanitizeFfmpegError(err.message),
        });
      })
      .on('end', () => {
        resolve({ success: true });
      })
      .save(outputPath);
  });
}

/**
 * Strips potentially sensitive path information from FFmpeg error messages.
 */
function sanitizeFfmpegError(message: string): string {
  const cleaned = message.replace(/\/[^\s]+|[A-Z]:\\[^\s]+/g, '[file]');
  if (cleaned.includes('No such file or directory')) {
    return 'Input file could not be read. Please try uploading again.';
  }
  if (cleaned.includes('Invalid data')) {
    return 'The file appears to be corrupted or in an unsupported format.';
  }
  if (cleaned.includes('codec')) {
    return 'Audio codec error. The file may be in an unsupported variant of this format.';
  }
  return 'Conversion failed. Please check the file and try again.';
}

/**
 * Returns the expected output file extension for a given output format.
 * All format names match their file extension directly.
 */
export function getOutputExtension(format: OutputFormat): string {
  return format; // 'mp3'→'mp3', 'wav'→'wav', 'm4a'→'m4a', 'flac'→'flac', 'aac'→'aac', 'ogg'→'ogg', 'opus'→'opus'
}

/**
 * Checks if FFmpeg is available on the system.
 */
export function checkFfmpegAvailable(): Promise<boolean> {
  return new Promise((resolve) => {
    ffmpeg.getAvailableFormats((err) => {
      resolve(!err);
    });
  });
}
