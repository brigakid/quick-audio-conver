import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Audio Formats Guide',
  description:
    'Learn about MP3, WAV, FLAC, M4A, AAC, OGG, OPUS, and more. Understand what each format is, when to use it, and which converter to use.',
};

const FORMATS = [
  {
    href: '/formats/mp3',
    name: 'MP3',
    type: 'Lossy',
    tagline: 'The universal audio format.',
    summary: 'Plays everywhere. Smaller than WAV. The right choice for sharing, streaming, and everyday listening.',
    bestFor: 'Sharing, streaming, podcasts, everyday use',
    converters: [
      { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
      { href: '/flac-to-mp3', label: 'FLAC to MP3' },
      { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
    ],
  },
  {
    href: '/formats/wav',
    name: 'WAV',
    type: 'Uncompressed',
    tagline: 'The standard for audio editing.',
    summary: 'Lossless and uncompressed. Large files, but the preferred format for editing software and professional workflows.',
    bestFor: 'Audio editing, DAWs, broadcast, archiving',
    converters: [
      { href: '/wav-to-mp3', label: 'WAV to MP3' },
      { href: '/mp3-to-wav', label: 'MP3 to WAV' },
    ],
  },
  {
    href: '/formats/flac',
    name: 'FLAC',
    type: 'Lossless',
    tagline: 'Lossless compression for audiophiles.',
    summary: 'Smaller than WAV, perfectly lossless. Best for archiving and high-fidelity listening — but not universally supported.',
    bestFor: 'Music archiving, hi-fi listening, local playback',
    converters: [
      { href: '/flac-to-mp3', label: 'FLAC to MP3' },
    ],
  },
  {
    href: '/formats/m4a',
    name: 'M4A',
    type: 'Lossy',
    tagline: "Apple's audio format.",
    summary: 'Common on iPhone, iTunes, and GarageBand. Better quality than MP3 at the same bitrate, but not universally supported outside Apple devices.',
    bestFor: 'Apple devices, iTunes libraries, GarageBand exports',
    converters: [
      { href: '/m4a-to-mp3', label: 'M4A to MP3' },
    ],
  },
  {
    href: '/formats/aac',
    name: 'AAC',
    type: 'Lossy',
    tagline: 'The efficient successor to MP3.',
    summary: 'Better compression than MP3 at equivalent quality. Used by Apple, YouTube, and most streaming platforms under the hood.',
    bestFor: 'Streaming, Apple Music, YouTube audio tracks',
    converters: [
      { href: '/aac-to-mp3', label: 'AAC to MP3' },
    ],
  },
  {
    href: '/formats/ogg',
    name: 'OGG',
    type: 'Lossy',
    tagline: 'Open source audio for games and Linux.',
    summary: 'Royalty-free and open. Common in video games, game engines, and Linux environments. Limited hardware support outside those contexts.',
    bestFor: 'Game audio, Linux, open-source projects',
    converters: [
      { href: '/ogg-to-mp3', label: 'OGG to MP3' },
    ],
  },
];

const typeStyles: Record<string, string> = {
  Lossy:        'bg-amber-50 text-amber-700 border-amber-200',
  Lossless:     'bg-green-50 text-green-700 border-green-200',
  Uncompressed: 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function FormatsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Audio Format Guide
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-2xl leading-relaxed">
          Not sure which format you need? Each format has different trade-offs around file
          size, quality, compatibility, and use case. This page covers the formats supported
          by QuickAudioConvert and when to use each one.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FORMATS.map((fmt) => (
          <div
            key={fmt.href}
            className="flex flex-col p-5 rounded-2xl border border-[#D9D9D9] bg-white shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-2xl font-extrabold text-gray-900">.{fmt.name.toLowerCase()}</span>
                <p className="text-xs text-gray-500 mt-0.5">{fmt.tagline}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${typeStyles[fmt.type]}`}>
                {fmt.type}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed flex-1">{fmt.summary}</p>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">
                <span className="font-medium text-gray-500">Best for:</span> {fmt.bestFor}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {fmt.converters.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="text-xs px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:border-brand hover:text-brand transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={fmt.href}
              className="mt-4 text-xs font-semibold text-brand hover:underline"
            >
              Full {fmt.name} guide →
            </Link>
          </div>
        ))}
      </div>

      {/* Formats not yet covered */}
      <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-sm font-bold text-gray-900 mb-2">Other supported input formats</h2>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          QuickAudioConvert also accepts AIFF, OPUS, WMA, OGA, and WEBA files. These are
          converted to MP3, WAV, or M4A using the same server-side process.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/aiff-to-mp3', label: 'AIFF to MP3' },
            { href: '/opus-to-mp3', label: 'OPUS to MP3' },
            { href: '/wma-to-mp3',  label: 'WMA to MP3'  },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-brand hover:text-brand transition-colors"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
