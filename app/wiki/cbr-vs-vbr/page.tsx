import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'CBR vs VBR: What\'s the Difference in MP3 Encoding?',
  description:
    'CBR (constant bitrate) uses the same bit allocation throughout. VBR (variable bitrate) uses more bits on complex passages. Here\'s the quality, file size, and compatibility trade-offs.',
  openGraph: {
    title: 'CBR vs VBR: What\'s the Difference in MP3 Encoding?',
    description:
      'CBR (constant bitrate) uses the same bit allocation throughout. VBR (variable bitrate) uses more bits on complex passages. Here\'s the quality, file size, and compatibility trade-offs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBR vs VBR: What\'s the Difference in MP3 Encoding?',
    description:
      'CBR (constant bitrate) uses the same bit allocation throughout. VBR (variable bitrate) uses more bits on complex passages. Here\'s the quality, file size, and compatibility trade-offs.',
  },
};

export default function CbrVsVbrPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Compression & Formats</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          CBR vs VBR: What's the Difference?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        <strong>CBR (constant bitrate)</strong> uses the same number of bits for every second of
        audio — simple, predictable, slightly less efficient.{' '}
        <strong>VBR (variable bitrate)</strong> allocates more bits to complex audio passages and
        fewer to simple ones — better quality at the same average file size, but occasionally
        less compatible with very old hardware.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How CBR works — and its flaw</h2>
          <p className="leading-relaxed">
            Constant bitrate encoding assigns the same number of bits to every second of audio,
            regardless of how complex or simple that second is. A dense passage with full-frequency
            orchestral content gets the same bit budget as a passage of near-silence or a single
            sustained note.
          </p>
          <p className="leading-relaxed mt-3">
            That's the inefficiency. Silence and simple audio don't need many bits to be accurately
            represented. Giving them the same allocation as complex audio means bits are being
            "wasted" on simple passages — while complex passages may not have enough. At a given
            bitrate, CBR is therefore not using the available data budget as efficiently as
            possible.
          </p>
          <p className="leading-relaxed mt-3">
            CBR's advantage is predictability. The file size is mathematically exact: bitrate ×
            duration. No surprises. This matters for streaming, where knowing the data rate in
            advance helps buffer management. It also means compatibility is essentially universal —
            every device that plays MP3 handles CBR without any issues.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How VBR solves the problem</h2>
          <p className="leading-relaxed">
            Variable bitrate encoding analyses the audio frame by frame and allocates bits
            dynamically. Complex passages — dense music, lots of high-frequency content, many
            simultaneous frequencies — get more bits. Simpler passages — sparse melodies, silence,
            sustained tones — get fewer. The average bitrate across the file may be close to a
            given target, but individual frames vary.
          </p>
          <p className="leading-relaxed mt-3">
            The result: the encoder can achieve perceptually better quality than CBR at the same
            average file size, because it's putting the bits where they're needed. The quality
            level stays consistent even as the bitrate varies.
          </p>
          <p className="leading-relaxed mt-3">
            VBR for MP3 is typically specified by a quality target (V0 through V9 in the LAME
            encoder, where V0 is the highest quality). VBR V2 is roughly equivalent to 192 kbps
            CBR in average size but generally produces better-sounding output because the bit
            allocation is more intelligent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Side-by-side comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700"></th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">CBR</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">VBR</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Bit allocation',      'Same for every second',                 'Varies by audio complexity'],
                  ['Quality at same size','Slightly lower on complex audio',        'Generally better'],
                  ['File size',           'Perfectly predictable',                 'Varies — approximate target'],
                  ['Compatibility',       'Universal — no known issues',           'Excellent on modern devices; occasional issues on very old hardware'],
                  ['Streaming support',   'Ideal — predictable data rate',         'Usually fine; some old streaming setups prefer CBR'],
                  ['Seeking/scrubbing',   'Trivial — fixed frame size',            'Slightly more complex but handled by all modern players'],
                  ['Best for',            'Streaming, maximum compatibility, when exact file size matters', 'Listening, archiving, quality-per-megabyte ratio'],
                ].map(([prop, cbr, vbr]) => (
                  <tr key={prop} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{prop}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{cbr}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{vbr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">ABR: the middle ground</h2>
          <p className="leading-relaxed">
            Average Bitrate (ABR) is a third mode that targets a specific average bitrate while
            allowing frame-by-frame variation within limits. It's a compromise between CBR's
            predictability and VBR's efficiency. In practice, for most use cases, the choice
            between CBR and VBR is sufficient — ABR occupies a niche that doesn't address what
            either CBR or VBR uniquely offers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Which to choose</h2>
          <div className="space-y-3 mt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-semibold text-gray-800 text-sm">Choose CBR when:</p>
              <ul className="text-sm text-gray-600 mt-1 space-y-1 list-disc list-inside">
                <li>Compatibility with old hardware is critical (car stereos, old MP3 players)</li>
                <li>You need an exact, predictable file size</li>
                <li>Distributing for streaming where a fixed data rate is expected</li>
                <li>You're not sure what playback device the recipient uses</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-semibold text-gray-800 text-sm">Choose VBR when:</p>
              <ul className="text-sm text-gray-600 mt-1 space-y-1 list-disc list-inside">
                <li>Playback is on modern devices (smartphones, computers, streaming apps)</li>
                <li>You want the best quality-to-size ratio for personal listening</li>
                <li>File size flexibility is acceptable (approximate, not exact)</li>
                <li>Archiving a high-quality lossy master</li>
              </ul>
            </div>
          </div>
          <p className="leading-relaxed mt-3 text-sm text-gray-500">
            Note: QuickAudioConvert uses CBR encoding for predictable, universally compatible output.
            For most distribution use cases, CBR at 192 kbps is the practical default.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'CBR at your chosen bitrate'    },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless source, CBR output'   },
          { href: '/ogg-to-mp3',  label: 'OGG to MP3',  note: 'VBR source to CBR MP3 output'  },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-bitrate',     label: 'What Is Bitrate?'        },
          { href: '/wiki/what-is-mp3',         label: 'What Is MP3?'            },
          { href: '/wiki/what-is-audio-codec', label: 'What Is an Audio Codec?' },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/how-to-choose-mp3-bitrate',                      label: 'How to Choose MP3 Bitrate'    },
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality', label: 'How Bitrate Affects Quality'  },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
