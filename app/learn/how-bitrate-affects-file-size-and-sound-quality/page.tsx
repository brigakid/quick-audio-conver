import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'How Bitrate Affects File Size and Sound Quality',
  description:
    'Bitrate is bits per second — the math for file size is simple. The quality implications at different bitrate levels are specific and worth understanding before you convert.',
};

export default function BitrateExplainedPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/learn" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Learn
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Quality and file size</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          How Bitrate Affects File Size and Sound Quality
        </h1>
      </div>

      <QuickAnswer>
        Bitrate is the number of bits of audio data stored per second. Higher bitrate = larger
        file, more audio data retained. <strong>192 kbps is the transparency threshold</strong>{' '}
        for MP3 — at that point most listeners can't reliably distinguish it from lossless.
        Below 128 kbps, artefacts become audible. 320 kbps is the maximum, but the
        improvement over 192 kbps is small.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The basic math</h2>
          <p className="leading-relaxed">
            Bitrate means bits per second. A 192 kbps MP3 stores 192,000 bits of audio data
            every second. The file size follows directly from this:
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mt-3 font-mono text-sm text-gray-700">
            file size (MB) = bitrate (kbps) × duration (seconds) ÷ 8,000
          </div>
          <p className="leading-relaxed mt-3">
            A 3-minute (180 second) song at 192 kbps:
            192 × 180 ÷ 8,000 = <strong>4.3 MB</strong>.
          </p>
          <p className="leading-relaxed mt-3">
            The same song at 320 kbps: 320 × 180 ÷ 8,000 = <strong>7.2 MB</strong>.
            At 128 kbps: <strong>2.9 MB</strong>.
          </p>
          <p className="leading-relaxed mt-3">
            These are predictable, linear differences. Doubling the bitrate doubles the file size.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">File sizes at common bitrates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Bitrate</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">3-min song</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">60-min recording</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Quality tier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['128 kbps', '2.9 MB',  '57.6 MB',  'Acceptable — artefacts audible in some content'],
                  ['192 kbps', '4.3 MB',  '86.4 MB',  'Transparent — indistinguishable for most listeners'],
                  ['320 kbps', '7.2 MB',  '144 MB',   'Near-lossless — marginal improvement over 192'],
                  ['WAV (CD)', '50 MB',   '600 MB',   'Lossless — no quality tradeoff'],
                  ['FLAC',     '~25 MB',  '~300 MB',  'Lossless — 40–60% smaller than WAV'],
                ].map(([rate, song, hour, tier]) => (
                  <tr key={rate} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{rate}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{song}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{hour}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{tier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What happens at each quality level</h2>
          <p className="leading-relaxed">
            MP3 compression works by discarding audio data that a psychoacoustic model predicts
            human hearing won't notice — sounds masked by louder sounds nearby, very high
            frequencies, the quieter channel in a stereo pair. How aggressively it discards
            depends on the bitrate.
          </p>

          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">Below 128 kbps</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Compression artefacts are consistently audible. High frequencies are aggressively
                rolled off or smeared. Cymbals, sibilance, and reverb tails are the first things
                to suffer. Voice recordings become "boxy." Music sounds like it's being played
                through a transistor radio. Only appropriate when bandwidth is severely constrained.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">128 kbps</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Audible to most people on decent headphones, particularly in music with complex
                high-frequency content. Fine for voice recordings, podcasts, and casual listening.
                Noticeable on acoustic guitar, piano, and orchestral content with a trained ear.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">192 kbps</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                The practical transparency threshold. In controlled blind tests (ABX testing),
                most listeners cannot reliably identify which is the MP3 and which is the lossless
                source at 192 kbps. Suitable for all general listening, streaming, and distribution.
                The recommended default for most use cases.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">320 kbps</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                MP3's maximum bitrate. Files are 65% larger than 192 kbps with a marginal
                quality improvement. On reference-grade equipment, some listeners notice the
                difference. For typical listening, the extra file size is rarely justified.
                Choose 320 kbps when storage isn't a concern and you prefer the headroom.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">VBR vs CBR: which encoding mode</h2>
          <p className="leading-relaxed">
            CBR (constant bitrate) uses the same bitrate throughout the entire file. Simple
            sections of audio — silence, sustained notes — get the same bit allocation as complex
            sections. This wastes bits on simple parts and under-allocates on complex parts.
          </p>
          <p className="leading-relaxed mt-3">
            VBR (variable bitrate) adjusts dynamically. Simple sections use fewer bits; complex
            sections get more. The result is better quality at the same average file size, or
            a smaller file at the same perceptual quality.
          </p>
          <p className="leading-relaxed mt-3">
            VBR V2 (LAME encoder) is roughly equivalent to 192 kbps CBR in file size but
            generally sounds better due to the dynamic allocation. The tradeoff is that VBR
            files occasionally have compatibility issues with old hardware that expects a fixed
            bitrate header. On modern devices, this is rarely a problem.
          </p>
          <p className="leading-relaxed mt-3">
            QuickAudioConvert uses CBR encoding for predictable output. For most use cases,
            192 kbps CBR is the practical choice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bitrate doesn't apply to lossless formats</h2>
          <p className="leading-relaxed">
            WAV and FLAC are lossless. WAV doesn't compress at all — every sample is stored in
            full. FLAC uses lossless compression (similar to a ZIP file for audio) — it reduces
            file size without discarding any audio data. When you convert to WAV or FLAC, there
            is no bitrate choice because no audio data is being discarded.
          </p>
          <p className="leading-relaxed mt-3">
            This is why converting an MP3 to WAV doesn't "give you lossless quality" — you
            end up with the file size of a lossless format, but the audio data is still the
            compressed MP3 data. The WAV container can't reconstruct what the MP3 discarded.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bitrate recommendations by use case</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Use case</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['General listening, music',       'MP3 192 kbps'        ],
                  ['Podcast voice (speech only)',    'MP3 128 kbps mono'   ],
                  ['Podcast with music/sound effects','MP3 192 kbps stereo'],
                  ['Maximum quality MP3',            'MP3 320 kbps'        ],
                  ['Editing project files',          'WAV or FLAC'         ],
                  ['Long-term archive',              'FLAC'                ],
                ].map(([use, rec]) => (
                  <tr key={use} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-700">{use}</td>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Choose your bitrate at export'     },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless to compressed'            },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/when-mp3-is-good-enough',                       label: 'When MP3 Is Good Enough'              },
          { href: '/learn/when-converting-to-wav-does-not-improve-quality', label: 'When WAV Doesn\'t Improve Quality'  },
          { href: '/learn/best-audio-format-for-podcasts',                 label: 'Best Audio Format for Podcasts'      },
          { href: '/formats/mp3',                                          label: 'MP3 format guide'                    },
        ]}
      />

      <LastUpdated date="2026-03-26" />

    </div>
  );
}
