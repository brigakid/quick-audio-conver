import type { Metadata } from 'next';
import ConverterBox from '@/components/converter/ConverterBox';
import FAQ, { type FAQItem } from '@/components/marketing/FAQ';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Audio Key Changer Online — Detect Key & Transpose Free',
  description:
    'Upload any audio file to detect the musical key, then shift it up or down by any number of semitones — tempo preserved. Transpose songs, match keys for mixes, adjust pitch for singing. Free, no account.',
  alternates: {
    canonical: '/key-changer',
  },
  openGraph: {
    title: 'Audio Key Changer Online — Detect Key & Transpose Free',
    description:
      'Upload any audio file to detect the musical key, then shift it up or down by any number of semitones — tempo preserved. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audio Key Changer Online — Detect Key & Transpose Free',
    description:
      'Detect the musical key of any audio and shift it by semitones — tempo preserved. Free, no account.',
  },
};

const SEMITONE_ROWS = [
  { semitones: '+1',  interval: 'Minor second',    example: 'C → C#/Db' },
  { semitones: '+2',  interval: 'Major second',     example: 'C → D'    },
  { semitones: '+3',  interval: 'Minor third',      example: 'C → Eb'   },
  { semitones: '+4',  interval: 'Major third',      example: 'C → E'    },
  { semitones: '+5',  interval: 'Perfect fourth',   example: 'C → F'    },
  { semitones: '+7',  interval: 'Perfect fifth',    example: 'C → G'    },
  { semitones: '+12', interval: 'Octave up',        example: 'C → C'    },
  { semitones: '-1',  interval: 'Minor second down', example: 'C → B'   },
  { semitones: '-5',  interval: 'Perfect fourth down', example: 'C → G' },
  { semitones: '-12', interval: 'Octave down',      example: 'C → C'    },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is the difference between pitch shifting and key changing?',
    answer:
      'In practice for audio tools, they mean the same thing: raising or lowering every frequency in the recording by a fixed ratio. "Key changing" emphasizes the musical result — moving a song from C major to D major, for example. "Pitch shifting" describes the technical process. Both apply the same transformation: a semitone-based frequency shift applied to the full audio signal.',
  },
  {
    question: 'Does key changing affect the tempo or duration?',
    answer:
      'No. This tool uses the rubberband algorithm to shift pitch while keeping the tempo and duration identical. A 4-minute song shifted up by 3 semitones is still exactly 4 minutes. This is different from simply speeding up or slowing down the audio, which would also change pitch.',
  },
  {
    question: 'How accurate is the automatic key detection?',
    answer:
      'Key detection uses the Krumhansl-Schmuckler algorithm, which analyses the pitch class distribution of a 30-second segment from the middle of the track. It works well on tonal music — pop, rock, classical, and most genres with clear harmonic structure. It returns a confidence score: low confidence means the key is ambiguous or the music is atonal. For important uses, always verify the detected key by ear before committing to a shift.',
  },
  {
    question: 'What is a semitone?',
    answer:
      'A semitone is the smallest interval in standard Western music — the distance between two adjacent notes on a piano keyboard. There are 12 semitones in an octave. Shifting by +2 semitones (a whole tone) moves C to D; shifting by +7 semitones (a perfect fifth) moves C to G; shifting by +12 semitones moves up exactly one octave.',
  },
  {
    question: 'What audio formats work with the key changer?',
    answer:
      'All supported input formats work with key changing: MP3, WAV, FLAC, M4A, AAC, OGG, AIFF, and more. You choose the output format after upload — MP3, WAV, FLAC, M4A, AAC, OGG, or OPUS. The key shift is applied during conversion, so format and pitch change happen in a single pass.',
  },
];

export default function KeyChangerPage() {
  return (
    <>
      {/* Hero + converter */}
      <section className="bg-[#2B2B2F] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            Audio Key Changer &amp; Detector
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Detect the musical key of any audio file, then shift it up or down by any
            number of semitones — tempo preserved. Free, no account needed.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConverterBox />
          <p className="text-center text-xs text-[#8B745A]/70 mt-3">
            After upload, expand the{' '}
            <strong className="text-[#8B745A]">Key &amp; Pitch</strong>{' '}
            panel to detect the key and set your semitone shift.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                How it works
              </h2>
              <ol className="space-y-2.5 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="font-bold text-brand flex-shrink-0">1.</span>
                  <span>Upload your audio — MP3, WAV, FLAC, M4A, OGG, and more are all supported.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-brand flex-shrink-0">2.</span>
                  <span>The musical key is detected automatically and shown with a confidence score — e.g. "A minor (high confidence)".</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-brand flex-shrink-0">3.</span>
                  <span>Expand the Key &amp; Pitch panel, choose your semitone shift using the slider or quick-shift buttons, and convert. The output is shifted while the tempo stays identical.</span>
                </li>
              </ol>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-[#D9D9D9]">
              <h2 className="text-sm font-semibold text-brand uppercase tracking-widest mb-3">
                What changes, what stays the same
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-green-600 font-semibold flex-shrink-0">Changes:</span>
                  <span>Pitch — every frequency in the recording shifts up or down by the same ratio. A song in C major shifted +2 semitones becomes D major.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 font-semibold flex-shrink-0">Preserved:</span>
                  <span>Tempo and duration — the song plays at exactly the same speed. No chipmunk effect, no slow-motion.</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">When to change the key</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: 'Singers finding their range',
                  desc: 'If a song sits just outside your comfortable singing range, shift it down 1–3 semitones. The backing track matches your voice, not the original recording\'s key.',
                },
                {
                  title: 'DJ mixing & key matching',
                  desc: 'Harmonically mix tracks by bringing two songs into the same key before blending them. Prevents dissonant clashes when transitioning between tracks in a set.',
                },
                {
                  title: 'Capo equivalent for digital audio',
                  desc: 'Guitarists use a capo to shift key without retuning. Apply the same concept digitally — shift a backing track to match your instrument\'s open tuning.',
                },
                {
                  title: 'Music practice & ear training',
                  desc: 'Transpose a practice track to any key to work on scales and intervals across different tonal centres, or to match the key your teacher is demonstrating in.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Semitone reference</h2>
            <p className="text-sm text-gray-500 mb-4">
              Each semitone is one step on the chromatic scale — the smallest interval in Western music.
              There are 12 semitones in an octave. The range is −12 to +12.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Shift</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Interval</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Example (from C)</th>
                  </tr>
                </thead>
                <tbody>
                  {SEMITONE_ROWS.map(({ semitones, interval, example }) => (
                    <tr key={semitones} className="border-t border-gray-100">
                      <td className="p-3 border border-gray-200 font-mono text-xs font-semibold text-brand">{semitones}</td>
                      <td className="p-3 border border-gray-200 text-gray-700">{interval}</td>
                      <td className="p-3 border border-gray-200 text-gray-500 text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
            <h2 className="text-base font-bold text-amber-900 mb-2">Quality note</h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              Large pitch shifts — beyond 5–6 semitones — may introduce audible artifacts,
              particularly on vocals. The rubberband algorithm used here is high quality,
              but no pitch shifting algorithm is completely transparent at extreme values.
              Start from a lossless source (WAV or FLAC) when possible, and export at
              192 kbps or higher for the cleanest result. If you also need to change the
              tempo, use the{' '}
              <Link
                href="/bpm-changer"
                className="underline font-medium hover:text-amber-900 transition-colors"
              >
                BPM Changer
              </Link>
              {' '}— both BPM and key shifts can be applied together in one conversion.
            </p>
          </div>

        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />

      {/* Related */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Related tools
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { href: '/bpm-changer',  label: 'BPM Changer & Detector'  },
              { href: '/wav-to-mp3',   label: 'WAV to MP3'               },
              { href: '/flac-to-mp3',  label: 'FLAC to MP3'              },
              { href: '/wav-to-ogg',   label: 'WAV to OGG'               },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-4 py-2 rounded-xl bg-white border border-[#D9D9D9] text-sm font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors shadow-sm"
              >
                {t.label}
              </Link>
            ))}
          </div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Learn more
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/wiki/what-is-audio-artifacting', label: 'WikiSound: What Are Audio Artifacts?' },
              { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio'              },
            ].map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="px-4 py-2 rounded-xl bg-white border border-[#D9D9D9] text-sm font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors shadow-sm"
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
