import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'WikiSound — Audio Terms Explained',
  description:
    'Plain-English explanations of the audio terms that actually matter when you convert files — bitrate, codecs, sample rate, lossless vs lossy, containers, and more.',
  alternates: {
    canonical: '/wiki',
  },
  openGraph: {
    title: 'WikiSound — Audio Terms Explained',
    description:
      'Plain-English explanations of the audio terms that actually matter when you convert files — bitrate, codecs, sample rate, lossless vs lossy, containers, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WikiSound — Audio Terms Explained',
    description:
      'Plain-English explanations of the audio terms that actually matter when you convert files — bitrate, codecs, sample rate, lossless vs lossy, containers, and more.',
  },
};

const CATEGORIES = [
  {
    name: 'Audio Fundamentals',
    description: 'The building blocks — concepts that come up in every format and conversion decision.',
    topics: [
      { href: '/wiki/what-is-bitrate',       title: 'What Is Bitrate?',            description: 'Bits per second — what it means, how it affects file size, and when it matters for quality.' },
      { href: '/wiki/what-is-sample-rate',   title: 'What Is Sample Rate?',        description: '44.1 kHz, 48 kHz, 96 kHz — what these numbers mean and when higher actually helps.' },
      { href: '/wiki/what-is-frequency',     title: 'What Is Frequency in Audio?', description: 'How sound frequency relates to pitch, human hearing, and what audio equipment can reproduce.' },
      { href: '/wiki/what-is-audio-quality', title: 'What Is Audio Quality?',      description: 'A practical definition — not just bitrate, but what actually determines how audio sounds.' },
      { href: '/wiki/what-is-loudness',      title: 'What Is Loudness?',           description: 'LUFS, volume, and level are not the same thing. What streaming platforms normalise to, and why.' },
      { href: '/wiki/what-is-mono-stereo',   title: 'What Is Mono vs Stereo?',     description: 'One channel vs two — why it matters for podcast file size, voice recordings, and playback.' },
    ],
  },
  {
    name: 'Compression & Formats',
    description: 'How audio files are encoded, stored, and decoded — and why it affects quality and size.',
    topics: [
      { href: '/wiki/what-is-lossless-audio',    title: 'What Is Lossless Audio?',             description: 'No data discarded. The decoded file is identical to the original. FLAC, WAV, ALAC.' },
      { href: '/wiki/what-is-lossy-audio',       title: 'What Is Lossy Audio?',                description: 'Permanently compressed audio. What gets removed, how audible it is, and when it is fine.' },
      { href: '/wiki/what-is-audio-compression', title: 'What Is Audio Compression?',          description: 'Two meanings — data compression (smaller files) and dynamic range compression (evening out volume).' },
      { href: '/wiki/what-is-audio-codec',       title: 'What Is an Audio Codec?',             description: 'The algorithm that encodes audio into a file and decodes it for playback. Every format uses one.' },
      { href: '/wiki/what-is-container-format',  title: 'What Is a Container Format?',         description: 'The file wrapper that holds the codec data. MP4, WAV, and MKV are containers.' },
      { href: '/wiki/codec-vs-container',        title: 'Codec vs Container',                  description: 'The most commonly confused distinction in audio — explained with real examples.' },
      { href: '/wiki/cbr-vs-vbr',                title: 'CBR vs VBR Encoding',                 description: 'Constant bitrate vs variable bitrate — quality, compatibility, and which to choose.' },
      { href: '/wiki/what-is-transcoding',       title: 'What Is Transcoding?',                description: 'Converting from one codec to another — and why repeated transcoding degrades quality.' },
      { href: '/wiki/what-is-audio-artifacting', title: 'What Is Audio Artifacting?',          description: 'The strange sounds that appear in low-bitrate compression — what causes them and how to avoid them.' },
    ],
  },
  {
    name: 'Format Guides',
    description: 'Everything worth knowing about the most common audio formats.',
    topics: [
      { href: '/formats/mp3',  title: 'What Is MP3?',  description: 'How it works, why it is still everywhere, when to use it, and when to use something else.' },
      { href: '/formats/wav',  title: 'What Is WAV?',  description: 'Uncompressed audio, large files, the format editors rely on — and a common misconception about quality.' },
      { href: '/formats/flac', title: 'What Is FLAC?', description: 'Lossless audio, 40–60% smaller than WAV, the preferred archive format. When it is the right choice.' },
      { href: '/formats/aac',  title: 'What Is AAC?',  description: 'The codec inside M4A files — more efficient than MP3 at the same bitrate. Why Apple adopted it.' },
      { href: '/formats/ogg',  title: 'What Is OGG?',  description: 'Open-source, used in games and streaming. What it is and when you would encounter it.' },
      { href: '/formats/opus', title: 'What Is Opus?', description: 'Extremely efficient codec for voice and streaming — small files, excellent quality.' },
    ],
  },
];

export default function WikiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">WikiSound</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Audio Terms Explained
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-2xl leading-relaxed">
          Plain-English explanations of the audio concepts that come up when you are choosing
          a format, a bitrate, or a codec. Focused on what matters for real conversion
          decisions — not a full production glossary.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-14">
        {CATEGORIES.map((cat) => (
          <div key={cat.name}>
            <div className="mb-5">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {cat.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.topics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="group flex flex-col p-4 rounded-xl border border-[#D9D9D9] bg-white hover:border-brand hover:shadow-sm transition-all"
                >
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand transition-colors leading-snug mb-1.5">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">
                    {topic.description}
                  </p>
                  <span className="mt-3 text-xs font-semibold text-brand">Read →</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <h2 className="text-sm font-bold text-gray-900 mb-1.5">Looking for practical guides?</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The{' '}
            <Link href="/guides" className="text-brand hover:underline">Guides section</Link>{' '}
            covers format comparisons, bitrate decisions, and conversion workflows — step-by-step
            answers for specific tasks.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <h2 className="text-sm font-bold text-gray-900 mb-1.5">Need to convert a file?</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Browse every supported conversion in the{' '}
            <Link href="/converters" className="text-brand hover:underline">Converters directory</Link>{' '}
            — MP3, WAV, FLAC, M4A, AAC, OGG, Opus, and more. Free, no account required.
          </p>
        </div>
      </div>

    </div>
  );
}
