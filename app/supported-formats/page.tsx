import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllowedOutputs } from '@/lib/conversion-rules';
import type { InputFormat } from '@/types/conversion';

export const metadata: Metadata = {
  title: 'Supported Audio Formats',
  description:
    'See all supported audio conversion formats on QuickAudioConvert. Convert MP4, MOV, WAV, AIFF, ALAC, FLAC, MP3, AAC, OGG, AMR, AC3, WMA, and more to MP3, WAV, M4A, FLAC, AAC, OGG, or OPUS.',
};

/**
 * Per-row metadata for the conversion matrix table.
 *
 * The `outputs` column is intentionally NOT hardcoded here — it is derived
 * from `getAllowedOutputs(inputKey)` in `lib/conversion-rules.ts`. This means
 * the table always stays in sync with the actual conversion rules: if a new
 * output format is added to the rules, it automatically appears here.
 *
 * To add a new input format to this page:
 *   1. Add a ConversionRule entry in lib/conversion-rules.ts.
 *   2. Add a row object below with the display metadata.
 *   3. Add a card to formatDetails further down.
 */
type ConversionRow = {
  /** Display name shown in the table (may differ from the key, e.g. "AIFF / AIF") */
  input: string;
  /** Must match an InputFormat value — used to look up allowed outputs */
  inputKey: InputFormat;
  /** Link to the closest dedicated tool page */
  href: string;
  /** Short sub-label below the format name */
  inputDesc: string;
  /** One-sentence description column */
  description: string;
};

const conversionsMeta: ConversionRow[] = [
  // Wave 1
  {
    input: 'MP4',
    inputKey: 'mp4',
    href: '/mp4-to-mp3',
    inputDesc: 'Video/audio container (MPEG-4)',
    description: 'Extract and convert audio from MP4 video files.',
  },
  {
    input: 'WAV',
    inputKey: 'wav',
    href: '/wav-to-mp3',
    inputDesc: 'Uncompressed PCM audio',
    description: 'Compress uncompressed WAV audio to a smaller format.',
  },
  {
    input: 'M4A',
    inputKey: 'm4a',
    href: '/m4a-to-mp3',
    inputDesc: 'Apple AAC audio (MPEG-4)',
    description: 'Convert Apple AAC audio to MP3 or uncompressed WAV.',
  },
  {
    input: 'FLAC',
    inputKey: 'flac',
    href: '/flac-to-mp3',
    inputDesc: 'Lossless compressed audio',
    description: 'Convert lossless FLAC to any supported output format.',
  },
  {
    input: 'MP3',
    inputKey: 'mp3',
    href: '/mp3-to-wav',
    inputDesc: 'Compressed audio (lossy)',
    description: 'Convert MP3 to uncompressed WAV or an M4A container.',
  },
  {
    input: 'AAC',
    inputKey: 'aac',
    href: '/aac-to-mp3',
    inputDesc: 'Advanced Audio Coding (lossy)',
    description: 'Convert raw AAC audio files to MP3, WAV, M4A, OGG, or OPUS.',
  },
  {
    input: 'OGG',
    inputKey: 'ogg',
    href: '/ogg-to-mp3',
    inputDesc: 'OGG Vorbis (open-source, lossy)',
    description: 'Convert OGG Vorbis to broadly compatible formats.',
  },
  // Wave 2
  {
    input: 'AIFF / AIF',
    inputKey: 'aiff',
    href: '/aiff-to-mp3',
    inputDesc: 'Apple uncompressed PCM (.aiff, .aif)',
    description: 'Convert Apple uncompressed audio from Logic Pro, GarageBand, and Pro Tools.',
  },
  {
    input: 'OPUS',
    inputKey: 'opus',
    href: '/opus-to-mp3',
    inputDesc: 'Modern open codec (Discord, WebRTC)',
    description: 'Convert OPUS audio — Discord voice messages, WebRTC recordings, and more.',
  },
  {
    input: 'WMA',
    inputKey: 'wma',
    href: '/wma-to-mp3',
    inputDesc: 'Windows Media Audio (Microsoft)',
    description: 'Convert Windows Media Audio files from old Windows libraries and CD rips.',
  },
  {
    input: 'OGA',
    inputKey: 'oga',
    href: '/ogg-to-mp3',
    inputDesc: 'OGG Vorbis alternate extension',
    description: 'Convert OGA files — OGG Vorbis audio under its alternate IETF extension.',
  },
  {
    input: 'WEBA',
    inputKey: 'weba',
    href: '/ogg-to-mp3',
    inputDesc: 'WebM audio container (browser)',
    description: 'Convert WebM audio files recorded by browsers and web-based tools.',
  },
  // Wave 3
  {
    input: 'MOV',
    inputKey: 'mov',
    href: '/mov-to-mp3',
    inputDesc: 'QuickTime video container (Apple)',
    description: 'Extract audio from iPhone, Mac, or Final Cut Pro MOV video files.',
  },
  {
    input: 'ALAC',
    inputKey: 'alac',
    href: '/alac-to-mp3',
    inputDesc: 'Apple Lossless Audio Codec',
    description: 'Convert Apple Lossless audio to MP3, WAV, FLAC, or other formats.',
  },
  {
    input: 'AIFC',
    inputKey: 'aifc',
    href: '/aifc-to-mp3',
    inputDesc: 'Compressed AIFF variant (.aifc)',
    description: 'Convert compressed AIFC files from legacy Apple Pro Audio workflows.',
  },
  {
    input: 'AMR',
    inputKey: 'amr',
    href: '/amr-to-mp3',
    inputDesc: 'Adaptive Multi-Rate (mobile voice)',
    description: 'Convert voice recordings from Nokia and early Android phones to MP3 or WAV.',
  },
  {
    input: 'AC3',
    inputKey: 'ac3',
    href: '/ac3-to-mp3',
    inputDesc: 'Dolby Digital (AC-3)',
    description: 'Convert Dolby Digital audio tracks from DVDs and video files to MP3 or WAV.',
  },
];

// Build the final rows by looking up allowed outputs from conversion-rules.ts.
// If conversion rules change, output badges here update automatically.
const conversions = conversionsMeta.map((row) => ({
  ...row,
  outputs: getAllowedOutputs(row.inputKey).map((f) => f.toUpperCase()),
}));

const outputColors: Record<string, string> = {
  MP3: 'bg-gray-100 text-gray-600 border-[#D9D9D9]',
  WAV: 'bg-sky-50 text-sky-700 border-sky-100',
  M4A: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const formatDetails = [
  // Outputs (Input · Output)
  {
    name: 'MP3',
    role: 'Input · Output',
    desc: 'MPEG Audio Layer III. Lossy compression. The most universally supported audio format across all devices and platforms.',
  },
  {
    name: 'WAV',
    role: 'Input · Output',
    desc: 'Uncompressed PCM audio. Lossless and high quality, but large files. Standard format for audio editing software.',
  },
  {
    name: 'M4A',
    role: 'Input · Output',
    desc: 'MPEG-4 audio container using AAC codec. Produced by Apple devices and iTunes. High quality at smaller sizes. Supported as both input and output.',
  },
  // Inputs — Wave 1
  {
    name: 'MP4',
    role: 'Input',
    desc: 'MPEG-4 video container. Commonly contains H.264 video and AAC audio. Widely used for video recording, downloads, and streaming.',
  },
  {
    name: 'FLAC',
    role: 'Input',
    desc: 'Free Lossless Audio Codec. Open-source, lossless compression. Popular for archiving and audiophile listening. Not universally supported.',
  },
  {
    name: 'AAC',
    role: 'Input',
    desc: 'Advanced Audio Coding. Successor to MP3 — better quality at similar bitrates. Default format for Apple, YouTube, and many streaming services.',
  },
  {
    name: 'OGG',
    role: 'Input',
    desc: 'OGG Vorbis. Open-source, royalty-free lossy codec. Excellent quality and common in games and Linux software. Limited hardware support.',
  },
  // Inputs — Wave 2
  {
    name: 'AIFF / AIF',
    role: 'Input',
    desc: 'Apple Interchange File Format. Uncompressed PCM in an Apple container — identical quality to WAV. Native format for Logic Pro, GarageBand, and Pro Tools.',
  },
  {
    name: 'OPUS',
    role: 'Input',
    desc: 'Modern open codec standardised by the IETF. Used by Discord, WhatsApp, WebRTC, and Spotify. Excellent quality at very low bitrates. Typically wrapped in OGG or WebM.',
  },
  {
    name: 'WMA',
    role: 'Input',
    desc: "Windows Media Audio. Microsoft's proprietary format from 1999. Common in old Windows music libraries and CD rips made with Windows Media Player. DRM-protected WMA files cannot be converted.",
  },
  {
    name: 'OGA',
    role: 'Input',
    desc: 'OGG Vorbis with the alternate .oga extension defined in the IETF OGG specification. Functionally identical to .ogg — same codec, same container.',
  },
  {
    name: 'WEBA',
    role: 'Input',
    desc: 'WebM audio container. Produced by browser-based recorders, video editors, and web tools. Contains Vorbis or Opus audio inside a WebM container.',
  },
  // Wave 3
  {
    name: 'MOV',
    role: 'Input',
    desc: "QuickTime video container produced by iPhone, iPad, Mac, iMovie, and Final Cut Pro. Treated as a video container for audio extraction — audio track is typically AAC or PCM.",
  },
  {
    name: 'ALAC',
    role: 'Input',
    desc: "Apple Lossless Audio Codec. Lossless compression with the same quality as WAV, natively supported on all Apple devices. FLAC output is available since ALAC is lossless.",
  },
  {
    name: 'AIFC',
    role: 'Input',
    desc: 'Compressed AIFF variant. Stores compressed audio (IMA ADPCM, MACE, etc.) inside an AIFF container. Less common than standard AIFF; used in legacy Apple Pro Audio gear.',
  },
  {
    name: 'AMR',
    role: 'Input',
    desc: 'Adaptive Multi-Rate codec. Designed for mobile phone voice recordings — very small files, speech-only quality. Common in Nokia voice memos and early Android recorders.',
  },
  {
    name: 'AC3',
    role: 'Input',
    desc: 'Dolby Digital (AC-3). Compressed multichannel audio from DVDs, Blu-rays, and broadcast TV. Standalone .ac3 files are audio tracks extracted from video containers.',
  },
];

const roleColors: Record<string, string> = {
  'Input': 'bg-slate-50 text-gray-600',
  'Input · Output': 'bg-red-50 text-brand',
};

export default function SupportedFormatsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Supported Formats
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
          Each input format supports multiple outputs. Upload any supported file on any tool
          page — the converter shows all available output options for your file automatically.
        </p>
      </div>

      {/* Conversion matrix table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-10">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Input Format
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Available Outputs
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden md:table-cell">
                Description
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Tool
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {conversions.map((c) => (
              <tr key={c.input} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <span className="font-semibold text-gray-900">{c.input}</span>
                    <p className="text-xs text-gray-400 mt-0.5">{c.inputDesc}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {c.outputs.map((out) => (
                      <span
                        key={out}
                        className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${outputColors[out] ?? 'bg-gray-50 text-gray-700 border-gray-100'}`}
                      >
                        {out}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                  {c.description}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={c.href}
                    className="text-sm font-semibold text-brand hover:text-brand-dark hover:underline whitespace-nowrap"
                  >
                    Convert →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Output format legend */}
      <div className="flex flex-wrap gap-3 mb-14 items-center">
        <span className="text-xs text-gray-400 mr-1">Output formats:</span>
        {Object.entries(outputColors).map(([label, cls]) => (
          <span
            key={label}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${cls}`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Format detail cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
        {formatDetails.map((fmt) => (
          <div key={fmt.name} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-bold text-gray-900">{fmt.name}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${roleColors[fmt.role] ?? 'bg-gray-50 text-gray-600'}`}>
                {fmt.role}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{fmt.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-gray-50 border border-[#D9D9D9] text-center">
        <p className="text-sm text-gray-800 font-medium">
          Need a format that isn&apos;t listed here?
        </p>
        <p className="text-sm text-brand mt-1">
          More formats may be added over time.{' '}
          <Link href="/contact" className="underline hover:no-underline">
            Let us know what you need.
          </Link>
        </p>
      </div>
    </div>
  );
}
