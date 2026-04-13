import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Audio Converters',
  description:
    'Browse all audio conversion tools — convert between MP3, WAV, FLAC, M4A, AAC, OGG, Opus, and more. Free, no account, no install required.',
  openGraph: {
    title: 'Audio Converters — QuickAudioConvert',
    description:
      'Browse all audio conversion tools — convert between MP3, WAV, FLAC, M4A, AAC, OGG, Opus, and more. Free, no account, no install required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audio Converters — QuickAudioConvert',
    description:
      'Browse all audio conversion tools — convert between MP3, WAV, FLAC, M4A, AAC, OGG, Opus, and more. Free, no account, no install required.',
  },
};

// Group tools by output format for scannable layout
const OUTPUT_GROUPS = [
  {
    output: 'to MP3',
    description: 'Convert to the universally supported MP3 format. Plays on every device.',
    tools: TOOLS.filter((t) => t.outputFormat === 'mp3'),
  },
  {
    output: 'to WAV',
    description: 'Convert to uncompressed WAV — for editing software and professional workflows.',
    tools: TOOLS.filter((t) => t.outputFormat === 'wav'),
  },
  {
    output: 'to M4A',
    description: 'Convert to M4A (AAC encoding) — the format preferred by Apple Podcasts, iTunes, and iOS devices.',
    tools: TOOLS.filter((t) => t.outputFormat === 'm4a'),
  },
  {
    output: 'to FLAC',
    description: 'Convert to lossless FLAC — same quality as WAV, 40–60% smaller. Only available from lossless sources (WAV, AIFF, ALAC).',
    tools: TOOLS.filter((t) => t.outputFormat === 'flac'),
  },
  {
    output: 'to OGG',
    description: 'Convert to OGG/Vorbis — open, royalty-free. Common in games, web audio, and Linux.',
    tools: TOOLS.filter((t) => t.outputFormat === 'ogg'),
  },
  {
    output: 'to AAC',
    description: 'Convert to raw AAC (.aac file) — same codec as M4A, better compression than MP3 at equal bitrates.',
    tools: TOOLS.filter((t) => t.outputFormat === 'aac'),
  },
].filter((g) => g.tools.length > 0); // hide groups with no tools yet

export default function ConvertersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          All Converters
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-2xl leading-relaxed">
          Upload a file, choose an output format, and download. All conversions run
          server-side — nothing installs. Files are deleted automatically after 5 minutes.
        </p>
      </div>

      <div className="space-y-12">
        {OUTPUT_GROUPS.map((group) => (
          <div key={group.output}>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Convert {group.output}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{group.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col p-5 rounded-2xl border border-[#D9D9D9] bg-white shadow-sm hover:border-brand/40 hover:shadow-md transition-all"
                >
                  <span className="text-sm font-bold text-gray-900 group-hover:text-brand-dark transition-colors">
                    {tool.label}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 leading-relaxed flex-1">
                    {tool.description}
                  </span>
                  <span className="mt-3 text-xs font-semibold text-brand group-hover:underline">
                    Convert →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Format note */}
      <div className="mt-12 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-sm font-bold text-gray-900 mb-2">Not sure which format to use?</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          The{' '}
          <Link href="/formats" className="text-brand hover:underline">
            Audio Format Guide
          </Link>{' '}
          explains what each format is, when to use it, and which converter to choose.
          The{' '}
          <Link href="/guides/flac-vs-wav" className="text-brand hover:underline">
            FLAC vs WAV guide
          </Link>{' '}
          covers lossless format decisions, and the{' '}
          <Link href="/guides/mp3-vs-wav" className="text-brand hover:underline">
            MP3 vs WAV guide
          </Link>{' '}
          covers the most common lossy vs lossless question.
        </p>
      </div>

    </div>
  );
}
