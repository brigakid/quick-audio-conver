import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Lossless Audio? What It Means and When It Matters',
  description:
    'Lossless audio means no audio data was discarded during compression. Formats like FLAC, WAV, and ALAC are lossless. Here\'s what that actually guarantees — and when it matters.',
  openGraph: {
    title: 'What Is Lossless Audio? What It Means and When It Matters',
    description:
      'Lossless audio means no audio data was discarded during compression. Formats like FLAC, WAV, and ALAC are lossless. Here\'s what that actually guarantees — and when it matters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Lossless Audio? What It Means and When It Matters',
    description:
      'Lossless audio means no audio data was discarded during compression. Formats like FLAC, WAV, and ALAC are lossless. Here\'s what that actually guarantees — and when it matters.',
  },
};

export default function WhatIsLosslessAudioPage() {
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
          What Is Lossless Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Lossless audio means no audio data was discarded during compression. When you decode a
        lossless file, the output is <strong>bit-for-bit identical</strong> to the original
        recording. Not "sounds similar" — provably, mathematically identical. Common lossless
        formats: FLAC, WAV, ALAC, AIFF.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What "lossless" actually guarantees</h2>
          <p className="leading-relaxed">
            The guarantee is specific: if you encode audio to a lossless format and then decode it,
            you get back exactly what you put in. Every sample value is preserved. The waveform is
            identical to the original.
          </p>
          <p className="leading-relaxed mt-3">
            This is different from "high quality" or "good-sounding." Lossless makes a precise
            technical claim — that no information was removed during encoding. Whether the audio
            itself sounds good depends entirely on what was recorded in the first place.
          </p>
          <p className="leading-relaxed mt-3">
            It also means lossless files can be decoded and re-encoded repeatedly — copied, converted
            to another lossless format, re-compressed — without any quality degradation. As long as
            you stay within lossless formats, the audio data remains intact.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The ZIP file analogy</h2>
          <p className="leading-relaxed">
            The easiest way to understand lossless compression is to think of a ZIP file. A ZIP
            archive is smaller than the original files inside it, but unzipping gives you back every
            byte, unchanged. Nothing was discarded — the data was just stored more efficiently.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC works the same way. It analyses the audio waveform, finds patterns, and stores
            them in a more compact form. When decoded, the original waveform is reconstructed
            exactly. The file is smaller than WAV — typically 40–60% smaller — but the audio data
            is identical.
          </p>
          <p className="leading-relaxed mt-3">
            The key difference from lossy compression (like MP3) is reversibility. A ZIP can be
            unzipped. A FLAC can be decoded to identical WAV. An MP3 cannot be "uncompressed" —
            the data it discarded is gone permanently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Lossless doesn't mean better than the source</h2>
          <p className="leading-relaxed">
            This is the most important misconception to address. Lossless audio preserves whatever
            was put into the encoder. It cannot improve on the source.
          </p>
          <p className="leading-relaxed mt-3">
            If you take an MP3 — a lossy file where data has already been discarded — and convert
            it to FLAC, you get a FLAC file that contains the same audio as the MP3. The conversion
            was lossless in the sense that no <em>additional</em> data was removed. But the data
            that the MP3 encoder discarded originally is still gone. The FLAC is just a lossless
            wrapper around already-degraded audio.
          </p>
          <p className="leading-relaxed mt-3">
            The ceiling of a lossless file is the quality of the original recording. A FLAC of a
            phone recording sounds like a phone recording. A FLAC of a professionally recorded
            master sounds excellent. The format isn't what determines quality — the source is.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The lossless formats compared</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Compression</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">File size vs WAV</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['WAV',  'None (uncompressed)',   'Largest (baseline)', 'Editing, DAW projects, broadcast'],
                  ['FLAC', 'Lossless compressed',   '40–60% smaller',     'Archiving, hi-fi, distribution between producers'],
                  ['ALAC', 'Lossless compressed',   '~40% smaller',       'Apple ecosystem, iTunes, iPhone'],
                  ['AIFF', 'None (uncompressed)',   'Same as WAV',        'macOS and professional audio tools'],
                ].map(([fmt, compression, size, use]) => (
                  <tr key={fmt} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{fmt}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{compression}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{size}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed mt-3 text-sm text-gray-500">
            All four formats are lossless — the decoded audio is identical regardless of which you
            choose. The differences are file size, software support, and ecosystem fit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When lossless genuinely matters</h2>
          <p className="leading-relaxed">
            There are specific situations where lossless isn't just nice to have — it's the right
            tool for the job.
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Archiving recordings:</span>
              <span>If you've recorded something — music, voice, field recordings — store the master
              in a lossless format. You can always compress it later for distribution. You can't
              un-compress a lossy file if you lose the original.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Editing in a DAW:</span>
              <span>Digital audio workstations work better with lossless audio. WAV and AIFF are
              standard inputs. Lossless audio has no decoding overhead, supports clean random
              access, and doesn't introduce generation loss during repeated export.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Sending audio to collaborators:</span>
              <span>If someone needs to edit or master your recording, send FLAC. They get the
              full audio data without the overhead of an uncompressed WAV.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Hi-fi listening:</span>
              <span>On a good listening setup — quality headphones, a DAC, reference speakers —
              lossless audio at 44.1kHz/16-bit captures everything human hearing can perceive.
              Whether listeners notice vs a good lossy encode at 192 kbps is debated, but the
              option is there.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When lossless is overkill</h2>
          <p className="leading-relaxed">
            For most casual listening, lossy audio at a sensible bitrate is entirely sufficient.
            The difference between a 192 kbps MP3 and a FLAC of the same source is inaudible to
            most people on most equipment in most listening environments.
          </p>
          <p className="leading-relaxed mt-3">
            If you're streaming podcast episodes, playing background music, or listening on
            earbuds while commuting — lossless doesn't add value. It just uses more storage and
            data.
          </p>
          <p className="leading-relaxed mt-3">
            That said, if storage isn't a concern and you're building a music library, using FLAC
            preserves your options. You can always generate a 192 kbps MP3 from a FLAC master.
            You can't go the other way.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Lossless and conversion</h2>
          <p className="leading-relaxed">
            Converting from a lossless source to a lossy format (FLAC → MP3, WAV → AAC) causes a
            one-time, controlled quality reduction. This is the ideal conversion path — you have
            the full audio data to work with, and you're compressing it deliberately with your
            preferred settings.
          </p>
          <p className="leading-relaxed mt-3">
            Converting between lossless formats (WAV → FLAC, FLAC → ALAC) involves no quality
            loss at all — both sides are lossless, so the decoded audio on both ends is identical.
          </p>
          <p className="leading-relaxed mt-3">
            Converting from a lossy source to lossless (MP3 → WAV, MP3 → FLAC) doesn't improve
            quality. You end up with a lossless wrapper around lossy data. The file is bigger; the
            audio is unchanged. This conversion is sometimes necessary — some software requires WAV
            input — but it shouldn't be mistaken for a quality upgrade.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-flac',  label: 'WAV to FLAC',  note: 'Lossless to lossless — smaller file, same quality' },
          { href: '/flac-to-mp3',  label: 'FLAC to MP3',  note: 'Lossless source to lossy output'                   },
          { href: '/alac-to-flac', label: 'ALAC to FLAC', note: 'Between lossless formats'                          },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-lossy-audio',  label: 'What Is Lossy Audio?'        },
          { href: '/wiki/what-is-flac',         label: 'What Is FLAC?'               },
          { href: '/wiki/what-is-wav',          label: 'What Is WAV?'                },
          { href: '/wiki/what-is-audio-codec',  label: 'What Is an Audio Codec?'     },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio Guide' },
          { href: '/guides/flac-vs-wav',             label: 'FLAC vs WAV Guide'             },
          { href: '/formats/flac',                   label: 'FLAC format guide'             },
          { href: '/formats/wav',                    label: 'WAV format guide'              },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
