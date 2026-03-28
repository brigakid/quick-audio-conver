import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Audio Format Guide',
  description:
    'Reference guide to MP3, WAV, FLAC, M4A, AAC, OGG, AIFF, ALAC, AMR, AC3, MOV, and more — what each format is, when to use it, and which converters apply.',
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
    tagline: 'Lossless compression for archiving and hi-fi.',
    summary: 'Smaller than WAV, bit-perfectly lossless. Best for archiving and high-fidelity listening — available as an output format when converting from WAV, AIFF, or ALAC.',
    bestFor: 'Music archiving, hi-fi listening, local playback',
    converters: [
      { href: '/flac-to-mp3', label: 'FLAC to MP3' },
      { href: '/wav-to-flac', label: 'WAV to FLAC' },
      { href: '/flac-to-wav', label: 'FLAC to WAV' },
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
      { href: '/wav-to-m4a', label: 'WAV to M4A' },
    ],
  },
  {
    href: '/formats/aac',
    name: 'AAC',
    type: 'Lossy',
    tagline: 'The efficient successor to MP3.',
    summary: 'Better compression than MP3 at equivalent quality. Used by Apple, YouTube, and most streaming platforms. Now available as a direct output format (.aac files).',
    bestFor: 'Streaming, Apple Music, YouTube audio tracks',
    converters: [
      { href: '/aac-to-mp3', label: 'AAC to MP3' },
      { href: '/wav-to-aac', label: 'WAV to AAC' },
    ],
  },
  {
    href: '/formats/ogg',
    name: 'OGG',
    type: 'Lossy',
    tagline: 'Open, royalty-free audio for games and the web.',
    summary: 'Royalty-free and open. Common in video games, game engines, and Linux. Now available as an output format — useful for game developers and web audio workflows.',
    bestFor: 'Game audio, Linux, web audio, open-source projects',
    converters: [
      { href: '/ogg-to-mp3', label: 'OGG to MP3' },
      { href: '/wav-to-ogg', label: 'WAV to OGG' },
      { href: '/mp3-to-ogg', label: 'MP3 to OGG' },
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
          size, quality, compatibility, and use case. This page covers the main output
          formats and all supported input formats — including AIFF, ALAC, AMR, AC3, and MOV.
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

      {/* Other input formats */}
      <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-sm font-bold text-gray-900 mb-2">More supported input formats</h2>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          QuickAudioConvert also accepts AIFF/AIF, ALAC, AMR, AC3, MOV, OPUS, WMA, OGA,
          AIFC, and WEBA files as input. Output options depend on the source format —
          FLAC output is only available from lossless sources (WAV, AIFF, ALAC).
        </p>

        {/* Apple lossless & uncompressed */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Apple / Lossless</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/formats/aiff',  label: 'AIFF — Apple uncompressed PCM' },
              { href: '/formats/alac',  label: 'ALAC — Apple Lossless'         },
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
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { href: '/aiff-to-mp3',  label: 'AIFF to MP3'  },
              { href: '/aiff-to-flac', label: 'AIFF to FLAC' },
              { href: '/alac-to-mp3',  label: 'ALAC to MP3'  },
              { href: '/alac-to-flac', label: 'ALAC to FLAC' },
              { href: '/alac-to-wav',  label: 'ALAC to WAV'  },
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

        {/* Video containers */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Video containers (audio extraction)</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/formats/mov', label: 'MOV — QuickTime video container' },
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
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { href: '/mov-to-mp3', label: 'MOV to MP3' },
              { href: '/mov-to-wav', label: 'MOV to WAV' },
              { href: '/mov-to-m4a', label: 'MOV to M4A' },
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

        {/* Legacy / specialist */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Legacy &amp; specialist</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/formats/amr',  label: 'AMR — mobile voice recordings'   },
              { href: '/formats/ac3',  label: 'AC3 — Dolby Digital audio tracks' },
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
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { href: '/amr-to-mp3',  label: 'AMR to MP3'  },
              { href: '/amr-to-wav',  label: 'AMR to WAV'  },
              { href: '/ac3-to-mp3',  label: 'AC3 to MP3'  },
              { href: '/ac3-to-wav',  label: 'AC3 to WAV'  },
              { href: '/aifc-to-mp3', label: 'AIFC to MP3' },
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

        {/* Other */}
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Other inputs</p>
          <div className="flex flex-wrap gap-2">
            {[
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

    </div>
  );
}
