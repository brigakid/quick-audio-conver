import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'WikiSound — Audio Terms Explained in Plain English',
  description:
    'Clear explanations of audio terminology — bitrate, codecs, sample rate, lossless, lossy, and more. No jargon. No filler. Just useful answers for real questions.',
};

const LIVE_SLUGS = new Set([
  '/wiki/what-is-bitrate',
  '/wiki/what-is-audio-codec',
  '/wiki/what-is-lossless-audio',
  '/wiki/what-is-lossy-audio',
  '/wiki/what-is-audio-compression',
  '/wiki/codec-vs-container',
  '/wiki/what-is-mp3',
  '/wiki/what-is-wav',
  '/wiki/what-is-flac',
  '/wiki/what-is-sample-rate',
  '/wiki/what-is-frequency',
  '/wiki/what-is-audio-quality',
  '/wiki/what-is-loudness',
  '/wiki/what-is-mono-stereo',
  '/wiki/what-is-container-format',
  '/wiki/cbr-vs-vbr',
  '/wiki/what-is-transcoding',
  '/wiki/what-is-eq',
  '/wiki/what-is-normalization',
  '/wiki/what-is-clipping',
  '/wiki/what-is-noise-reduction',
  '/wiki/what-is-audio-artifacting',
  '/wiki/what-is-gain-staging',
  '/wiki/what-is-distortion',
  '/wiki/what-is-mixing-mastering',
  '/wiki/what-is-reverb',
  '/wiki/what-is-delay',
  '/wiki/what-is-a-limiter',
  '/wiki/what-is-panning',
  '/wiki/what-is-sidechain-compression',
]);

const CATEGORIES = [
  {
    name: 'Audio Fundamentals',
    description: 'The building blocks — concepts that come up in every audio decision.',
    topics: [
      { href: '/wiki/what-is-bitrate',      title: 'What Is Bitrate?',                description: 'Bits per second — what it means, how it affects file size, and when it matters for quality.' },
      { href: '/wiki/what-is-sample-rate',  title: 'What Is Sample Rate?',            description: '44.1kHz, 48kHz, 96kHz — what these numbers mean and when higher actually helps.' },
      { href: '/wiki/what-is-frequency',    title: 'What Is Frequency in Audio?',     description: 'How sound frequency relates to pitch, human hearing, and what audio equipment can reproduce.' },
      { href: '/wiki/what-is-audio-quality',title: 'What Is Audio Quality?',          description: 'A practical definition — not just bitrate, but what actually determines how audio sounds.' },
      { href: '/wiki/what-is-loudness',     title: 'What Is Loudness?',               description: 'Loudness, volume, and level are not the same thing. Here\'s how they differ.' },
      { href: '/wiki/what-is-mono-stereo',  title: 'What Is Mono vs Stereo?',         description: 'One channel vs two — why it matters for listening, recording, and file size.' },
    ],
  },
  {
    name: 'Compression & Formats',
    description: 'How audio files are encoded, stored, and decoded — and why it affects quality.',
    topics: [
      { href: '/wiki/what-is-lossless-audio',  title: 'What Is Lossless Audio?',          description: 'No data discarded. The decoded file is identical to the original. FLAC, WAV, ALAC.' },
      { href: '/wiki/what-is-lossy-audio',     title: 'What Is Lossy Audio?',             description: 'Permanently compressed audio. What gets removed, how audible it is, and when it\'s fine.' },
      { href: '/wiki/what-is-audio-compression', title: 'What Is Audio Compression?',     description: 'This term means two different things — data compression and dynamic range compression.' },
      { href: '/wiki/what-is-audio-codec',     title: 'What Is an Audio Codec?',          description: 'The algorithm that encodes audio into a file and decodes it for playback. Every format uses one.' },
      { href: '/wiki/what-is-container-format',title: 'What Is a Container Format?',      description: 'The file wrapper that holds the codec data. MP4, WAV, and MKV are containers.' },
      { href: '/wiki/codec-vs-container',      title: 'Codec vs Container: What\'s the Difference?', description: 'The most commonly confused distinction in audio — explained with real examples.' },
      { href: '/wiki/cbr-vs-vbr',              title: 'CBR vs VBR: What\'s the Difference?', description: 'Constant bitrate vs variable bitrate — quality, compatibility, and which to choose.' },
      { href: '/wiki/what-is-transcoding',     title: 'What Is Transcoding?',             description: 'Converting from one codec to another — and why repeated transcoding degrades quality.' },
    ],
  },
  {
    name: 'Format Guides',
    description: 'Everything worth knowing about the most common audio formats.',
    topics: [
      { href: '/wiki/what-is-mp3',  title: 'What Is MP3?',  description: 'How it works, why it\'s still everywhere, when to use it, and when to use something else.' },
      { href: '/wiki/what-is-wav',  title: 'What Is WAV?',  description: 'Uncompressed audio, large files, the format editors rely on — and a common misconception about quality.' },
      { href: '/wiki/what-is-flac', title: 'What Is FLAC?', description: 'Lossless audio, 40–60% smaller than WAV, the preferred archive format. When it\'s the right choice.' },
      { href: '/wiki/what-is-aac',  title: 'What Is AAC?',  description: 'The codec inside M4A files — more efficient than MP3 at the same bitrate. Why Apple adopted it.' },
      { href: '/wiki/what-is-ogg',  title: 'What Is OGG?',  description: 'Open-source, used in games and streaming. What it is and when you\'d encounter it.' },
      { href: '/wiki/what-is-opus', title: 'What Is Opus?', description: 'Extremely efficient codec for voice and streaming — small files, excellent quality.' },
    ],
  },
  {
    name: 'Signal Processing',
    description: 'What happens to audio before it reaches a file — and why it matters when you receive audio.',
    topics: [
      { href: '/wiki/what-is-eq',              title: 'What Is EQ in Audio?',        description: 'Equalisation — adjusting frequency balance. The most fundamental audio tool.' },
      { href: '/wiki/what-is-normalization',   title: 'What Is Normalization?',      description: 'Setting a consistent volume ceiling. Why podcast platforms request it.' },
      { href: '/wiki/what-is-clipping',        title: 'What Is Clipping in Audio?',  description: 'What happens when audio exceeds the maximum level — and why it sounds harsh.' },
      { href: '/wiki/what-is-noise-reduction', title: 'What Is Noise Reduction?',    description: 'Removing background noise from recordings. How it works and when it helps vs hurts.' },
      { href: '/wiki/what-is-audio-artifacting', title: 'What Is Audio Artifacting?', description: 'The strange sounds that appear in low-bitrate compression — what causes them.' },
      { href: '/wiki/what-is-gain-staging',    title: 'What Is Gain Staging?',       description: 'Managing levels through a signal chain to avoid noise and distortion.' },
      { href: '/wiki/what-is-distortion',      title: 'What Is Distortion in Audio?', description: 'Distortion as damage vs distortion as an intentional effect.' },
    ],
  },
  {
    name: 'Mixing & Production',
    description: 'Concepts from audio production that shape how finished audio sounds.',
    topics: [
      { href: '/wiki/what-is-mixing-mastering',    title: 'What Is Mixing vs Mastering?',    description: 'Two separate stages of audio production — what each one does and why both matter.' },
      { href: '/wiki/what-is-reverb',              title: 'What Is Reverb?',                 description: 'How simulated room acoustics work and why reverb appears in almost every recording.' },
      { href: '/wiki/what-is-delay',               title: 'What Is Delay in Audio?',         description: 'Echo and delay effects — the difference, how they\'re used, and why timing matters.' },
      { href: '/wiki/what-is-a-limiter',           title: 'What Is a Limiter?',              description: 'A compressor with a hard ceiling. Used in mastering and broadcast to control peak levels.' },
      { href: '/wiki/what-is-panning',             title: 'What Is Panning?',                description: 'Placing audio in the stereo field. Why mix engineers move sounds left and right.' },
      { href: '/wiki/what-is-sidechain-compression', title: 'What Is Sidechain Compression?', description: 'Using one audio signal to control the compression of another. The "pumping" effect explained.' },
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
          Plain-English explanations of audio concepts — from bitrate and codecs to reverb and mastering.
          Written for real people, not textbooks.
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
              {cat.topics.map((topic) => {
                const isLive = LIVE_SLUGS.has(topic.href);

                if (isLive) {
                  return (
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
                  );
                }

                return (
                  <div
                    key={topic.href}
                    className="flex flex-col p-4 rounded-xl border border-[#EBEBEB] bg-gray-50"
                  >
                    <h3 className="text-sm font-bold text-gray-500 leading-snug mb-1.5">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed flex-1">
                      {topic.description}
                    </p>
                    <span className="mt-3 text-xs text-gray-400">Coming soon</span>
                  </div>
                );
              })}
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
          <h2 className="text-sm font-bold text-gray-900 mb-1.5">Want to go deeper?</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The{' '}
            <Link href="/learn" className="text-brand hover:underline">Learn section</Link>{' '}
            has longer in-depth articles on bitrate theory, conversion quality, format decisions,
            and why some conversions don't improve quality.
          </p>
        </div>
      </div>

    </div>
  );
}
