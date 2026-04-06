import type { Metadata } from 'next';
import ConverterBox from '@/components/converter/ConverterBox';
import FAQ, { type FAQItem } from '@/components/marketing/FAQ';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BPM Changer & Detector Online — Change Tempo Free',
  description:
    'Upload any audio file to detect BPM automatically, then change the tempo to any target BPM — pitch preserved. Works on MP3, WAV, FLAC, OGG, and more. Free, no account.',
  alternates: {
    canonical: '/bpm-changer',
  },
  openGraph: {
    title: 'BPM Changer & Detector Online — Change Tempo Free',
    description:
      'Upload any audio file to detect BPM automatically, then change the tempo to any target BPM — pitch preserved. Works on MP3, WAV, FLAC, OGG, and more. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BPM Changer & Detector Online — Change Tempo Free',
    description:
      'Detect BPM automatically and change tempo to any target — pitch preserved. Free, no account.',
  },
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I change the BPM without changing pitch?',
    answer:
      'Upload your audio, then expand the "BPM Changer" panel that appears after upload. The tool detects the BPM automatically — enter your target BPM and convert. The output matches your target tempo while the pitch stays exactly the same. This uses FFmpeg\'s atempo filter, which changes playback speed independently of pitch.',
  },
  {
    question: 'What is the maximum BPM change I can make?',
    answer:
      'You can set any target between 20 and 300 BPM. Very large changes — more than tripling or reducing to less than a third of the original — will produce audible quality degradation. The tool warns you if you exceed the recommended range. For clean results, keep changes within 2× in either direction.',
  },
  {
    question: 'Does BPM detection work on all music?',
    answer:
      'BPM detection works best on rhythmic music with a steady pulse: electronic, pop, hip-hop, dance, and similar genres. It is less reliable on classical, ambient, jazz with complex time signatures, or speech. If detection fails or returns an inaccurate result, you can manually enter the source BPM before setting your target.',
  },
  {
    question: 'What formats can I use with the BPM changer?',
    answer:
      'All supported input formats work with BPM changing: MP3, WAV, FLAC, M4A, AAC, OGG, AIFF, and more. You can export to any supported output format — MP3, WAV, FLAC, M4A, AAC, OGG, or OPUS. The BPM change is applied during conversion, so format and tempo are handled in a single step.',
  },
];

export default function BpmChangerPage() {
  return (
    <>
      {/* Hero + converter */}
      <section className="bg-[#2B2B2F] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            BPM Changer &amp; Detector
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Upload any audio file. BPM is detected automatically — then change tempo
            to any target, pitch preserved. Free, no account needed.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConverterBox />
          <p className="text-center text-xs text-[#8B745A]/70 mt-3">
            After upload, expand the{' '}
            <strong className="text-[#8B745A]">BPM Changer</strong>{' '}
            panel to detect tempo and set your target BPM.
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
                  <span>Upload your audio file — MP3, WAV, FLAC, M4A, OGG, and more are all accepted.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-brand flex-shrink-0">2.</span>
                  <span>BPM is detected automatically from the audio. The result appears within seconds. If detection fails, you can enter the BPM manually.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-brand flex-shrink-0">3.</span>
                  <span>Expand the BPM Changer panel, enter your target BPM, choose your output format, and convert. The output matches your target tempo while the pitch stays the same.</span>
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
                  <span>Speed and total duration. A 3-minute track at 120 BPM becomes approximately 2.5 minutes at 144 BPM.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 font-semibold flex-shrink-0">Preserved:</span>
                  <span>Pitch — the musical key and tone of every instrument and voice stays identical. Nothing sounds higher or lower.</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">When to change the BPM</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: 'DJ & music production',
                  desc: 'Match tempo between tracks without re-pitching. Beat-match audio assets before loading into your DAW or DJ software for a seamless transition.',
                },
                {
                  title: 'Workout & running music',
                  desc: 'Speed up or slow down a playlist to match your target cadence or exercise intensity without the music sounding higher or lower in key.',
                },
                {
                  title: 'Transcription & learning',
                  desc: 'Slow down a recording to catch every word, learn a fast guitar or piano passage, or study a complicated rhythm without pitch distortion.',
                },
                {
                  title: 'Mashups & remixes',
                  desc: 'Align the tempo of two recordings before mixing. Change one track to match another\'s BPM so beats land correctly in the combined output.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
            <h2 className="text-base font-bold text-amber-900 mb-2">Quality and limits</h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              BPM changing works best on rhythmic music with a steady beat. Quality degrades
              with very large tempo changes — more than tripling speed or slowing below one-third
              of the original will produce audible artifacts. For best results, stay within 2×
              in either direction. If you also want to shift the musical key, use the{' '}
              <Link
                href="/key-changer"
                className="underline font-medium hover:text-amber-900 transition-colors"
              >
                Key Changer
              </Link>
              {' '}alongside this tool — BPM and key shifts can be applied together in one conversion.
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
              { href: '/key-changer',  label: 'Key Changer & Detector' },
              { href: '/wav-to-mp3',   label: 'WAV to MP3'             },
              { href: '/flac-to-mp3',  label: 'FLAC to MP3'            },
              { href: '/mp3-to-wav',   label: 'MP3 to WAV'             },
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
