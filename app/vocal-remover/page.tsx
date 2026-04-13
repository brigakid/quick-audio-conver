import { notFound }       from 'next/navigation';
import type { Metadata }  from 'next';
import VocalRemoverClient from './VocalRemoverClient';
import FAQ, { type FAQItem } from '@/components/marketing/FAQ';
import Link from 'next/link';
import { isVocalRemoverEnabled } from '@/lib/vocal-remover/feature-flag';

export const metadata: Metadata = {
  title: 'AI Vocal Remover — Separate Vocals & Instrumental Free',
  description:
    'Upload any audio file to instantly separate the vocals from the instrumental track using AI. Get two clean stems — vocals only and instrumental only — ready to download. Free, no account needed.',
  alternates: { canonical: '/vocal-remover' },
  openGraph: {
    title: 'AI Vocal Remover — Separate Vocals & Instrumental Free',
    description:
      'Separate vocals from the instrumental track in any song. Get clean stems instantly. Free, no account.',
  },
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does AI vocal removal work?',
    answer:
      'The tool uses Demucs, an open-source neural network developed by Meta Research, trained to separate audio into independent sound sources. It analyses the spectral and temporal patterns of your audio file and reconstructs two separate tracks — one containing vocals and one containing everything else (instruments, percussion, etc.). The process runs server-side and typically takes 1–3 minutes depending on song length.',
  },
  {
    question: 'What is the difference between the Vocals and Instrumental stems?',
    answer:
      'The Vocals stem contains only the human voice (lead and backing vocals). The Instrumental stem contains everything except vocals — bass, guitars, drums, synths, and all other instruments. Both files are exported as WAV for maximum quality.',
  },
  {
    question: 'Will there be any audio artefacts?',
    answer:
      'Some artefacts are normal and expected, especially on complex recordings with lots of reverb, layered vocals, or dense instrumentation. The quality is highest on well-produced, commercially mastered tracks. Starting from a lossless source (WAV or FLAC) gives the best results. For karaoke, practice tracks, and sampling, the quality is typically very usable.',
  },
  {
    question: 'What audio formats are accepted?',
    answer:
      'You can upload MP3, WAV, FLAC, M4A, AAC, and OGG files up to 100 MB. The output is always WAV (lossless) for both stems. You can re-encode the WAV to MP3 or any other format using the converter on this site.',
  },
  {
    question: 'How long does processing take?',
    answer:
      'Processing time depends on the length of the track and server load. A 3–4 minute song typically takes 1–3 minutes. Longer tracks or periods of high demand may take longer. You\'ll see a live status indicator — the page will update automatically when your stems are ready.',
  },
  {
    question: 'Are my files stored permanently?',
    answer:
      'No. Uploaded files and output stems are automatically deleted from the server after 1 hour. We do not retain your audio files beyond the download window.',
  },
];

export default function VocalRemoverPage() {
  if (!isVocalRemoverEnabled()) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2B2B2F] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 text-brand text-xs font-semibold mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Powered by Demucs AI
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            AI Vocal Remover
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Separate the vocals from the instrumental track in any audio file.
            Get two clean stems — ready to download. Free, no account needed.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <VocalRemoverClient />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">How it works</h2>
              <ol className="space-y-2.5 text-sm text-gray-700">
                {[
                  'Upload your audio — MP3, WAV, FLAC, M4A, AAC, or OGG, up to 100 MB.',
                  'The AI analyses the audio and separates the vocal frequencies from the instrumental track.',
                  'Two WAV files are generated: Vocals and Instrumental. Download either or both.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-brand flex-shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-[#D9D9D9]">
              <h2 className="text-sm font-semibold text-brand uppercase tracking-widest mb-3">What you get</h2>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-brand font-semibold flex-shrink-0">Vocals stem —</span>
                  <span>Isolated vocal track. Use for karaoke, remixes, or vocal practice.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-semibold flex-shrink-0">Instrumental stem —</span>
                  <span>Music without vocals. Use as backing track, for sampling, or DJ use.</span>
                </li>
                <li className="flex gap-2 pt-1 border-t border-gray-200">
                  <span className="text-gray-500 flex-shrink-0">Output format:</span>
                  <span className="text-gray-600">Lossless WAV — highest possible quality for both stems.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
            <h2 className="text-base font-bold text-amber-900 mb-2">Quality note</h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              AI separation is not perfect — some bleed between the stems is normal, especially on recordings
              with heavy reverb or dense arrangements. Results are typically very usable for karaoke,
              practice, and creative projects. For best results, start from a lossless source file (WAV or FLAC)
              rather than a highly compressed MP3. If you need the output in a different format, run it through the{' '}
              <Link href="/" className="underline font-medium hover:text-amber-900 transition-colors">
                audio converter
              </Link>{' '}
              after downloading.
            </p>
          </div>

        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />

      {/* Related tools */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Related tools</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/bpm-changer',  label: 'BPM Changer'     },
              { href: '/key-changer',  label: 'Key Changer'      },
              { href: '/',             label: 'Audio Converter'  },
              { href: '/wav-to-mp3',   label: 'WAV to MP3'       },
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
        </div>
      </section>
    </>
  );
}
