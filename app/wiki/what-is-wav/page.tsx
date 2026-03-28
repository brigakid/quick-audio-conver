import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is WAV Audio? Why It\'s Used for Editing (and When to Avoid It)',
  description:
    'WAV stores uncompressed audio — no quality trade-off, but very large files. The standard for professional editing. Here\'s when WAV makes sense and when it doesn\'t.',
  openGraph: {
    title: 'What Is WAV Audio? Why It\'s Used for Editing (and When to Avoid It)',
    description:
      'WAV stores uncompressed audio — no quality trade-off, but very large files. The standard for professional editing. Here\'s when WAV makes sense and when it doesn\'t.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is WAV Audio? Why It\'s Used for Editing (and When to Avoid It)',
    description:
      'WAV stores uncompressed audio — no quality trade-off, but very large files. The standard for professional editing. Here\'s when WAV makes sense and when it doesn\'t.',
  },
};

export default function WhatIsWavPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Format Guides</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is WAV?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        WAV (Waveform Audio File Format) stores audio without compression. Every sample is kept
        intact — no psychoacoustic removal, no quality trade-off. The result is large files (a
        3-minute song is ~50 MB) and{' '}
        <strong>audio that is identical to the original recording</strong>. WAV is the standard
        format for professional audio editing.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What WAV actually is</h2>
          <p className="leading-relaxed">
            WAV stands for Waveform Audio File Format. It was developed by Microsoft and IBM and
            has been a standard since 1991 — making it one of the oldest audio file formats still
            in common use. The format is simple: a container that holds audio data encoded as PCM
            (Pulse Code Modulation), which means raw, uncompressed audio samples.
          </p>
          <p className="leading-relaxed mt-3">
            "Uncompressed" is the key word. WAV doesn't use a codec to reduce file size. It stores
            the audio data exactly as recorded — every measurement, every sample value, in full.
            There is no encoding algorithm making decisions about what to keep and what to discard.
          </p>
          <p className="leading-relaxed mt-3">
            This gives WAV a specific property: the audio is preserved with complete fidelity. But
            it comes with an equally specific cost: the file sizes are enormous compared to
            compressed formats.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why WAV files are large</h2>
          <p className="leading-relaxed">
            CD-quality audio (44,100 Hz sample rate, 16-bit depth, stereo) generates about
            10 megabytes of data per minute. A 3-minute song is roughly 50 MB. A 1-hour recording
            is about 600 MB.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">3-min song</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">60-min recording</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Quality</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['WAV',        '~50 MB',  '~600 MB', 'Lossless — uncompressed'],
                  ['FLAC',       '~25 MB',  '~300 MB', 'Lossless — compressed (identical audio)'],
                  ['MP3 320kbps','7.2 MB',  '144 MB',  'Lossy — near-lossless at this bitrate'],
                  ['MP3 192kbps','4.3 MB',  '86 MB',   'Lossy — transparent for most listeners'],
                  ['MP3 128kbps','2.9 MB',  '58 MB',   'Lossy — audible artifacts in some content'],
                ].map(([fmt, song, hour, quality]) => (
                  <tr key={fmt} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{fmt}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{song}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{hour}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed mt-3 text-sm text-gray-500">
            Note that WAV and FLAC contain identical audio data — FLAC is just compressed more
            efficiently. Converting between them loses no quality. Converting either to MP3 loses
            some quality, irreversibly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why editors use WAV</h2>
          <p className="leading-relaxed">
            Professional audio editing software — DAWs like Pro Tools, Logic Pro, Ableton, Reaper —
            all read WAV natively and efficiently. There are specific technical reasons this matters
            in a production context.
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">No decoding overhead:</span>
              <span>Uncompressed audio can be read directly from disk. There's no decode step, which makes random access (jumping to any point in the audio) fast and CPU-efficient.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">No generation loss:</span>
              <span>When you export a WAV, process it, and export it again — repeatedly — the quality doesn't degrade. Each export is a clean representation of the audio at that stage.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Universal support:</span>
              <span>Every piece of professional audio software accepts WAV without question. Compatibility is never an issue.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Sample-accurate editing:</span>
              <span>Since every sample is available and unmodified, cuts, fades, and edits happen at the exact sample position — no interpolation or approximation.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The most important misunderstanding about WAV</h2>
          <p className="leading-relaxed">
            WAV is not inherently higher quality than the audio stored inside it. This is the
            single most common confusion about the format — and it's worth being explicit about.
          </p>
          <p className="leading-relaxed mt-3">
            If you take an MP3 — a file where data has already been discarded through lossy
            compression — and convert it to WAV, you end up with a WAV file that contains the same
            audio as the MP3. The WAV container doesn't restore the discarded data. The file is
            larger (because WAV is uncompressed), but the audio is identical to the MP3.
          </p>
          <p className="leading-relaxed mt-3">
            This is sometimes called "re-wrapping" or "upsampling" but those terms can be
            misleading. The reality is simpler: you've changed the container. The audio data hasn't
            changed. If the MP3 had audible compression artifacts, the WAV has the same audible
            compression artifacts. More disk space, same quality.
          </p>
          <p className="leading-relaxed mt-3">
            The reason some software requires WAV input isn't because WAV "sounds better" — it's
            because WAV has no decompression step, which simplifies processing. Converting MP3 to
            WAV to use with such software is necessary but shouldn't be mistaken for a quality
            improvement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">WAV vs FLAC</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700"></th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">WAV</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">FLAC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Audio quality',      'Lossless',                  'Lossless (identical)'],
                  ['File size',          'Largest',                   '40–60% smaller than WAV'],
                  ['Compression',        'None',                      'Lossless compression'],
                  ['DAW support',        'Universal',                 'Wide but check your software'],
                  ['Metadata support',   'Limited',                   'Rich (title, artist, artwork, etc.)'],
                  ['Streaming support',  'Universal',                 'Widely supported now (Apple Music, etc.)'],
                  ['Best for',           'Editing, broadcast, legacy software', 'Archiving, hi-fi, long-term storage'],
                ].map(([property, wav, flac]) => (
                  <tr key={property} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{property}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{wav}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{flac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed mt-3 text-sm text-gray-500">
            Both are lossless. The decoded audio is mathematically identical. The choice between them
            is about file size, metadata, and software compatibility — not quality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use WAV</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Working in a DAW:</span>
              <span>Use WAV as your working format. Create projects in WAV; export in WAV until the final step.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Software that requires uncompressed input:</span>
              <span>Some audio tools, games engines, and broadcast workflows require WAV. Convert to WAV if that's what the software demands.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Delivering audio professionally:</span>
              <span>Broadcast, film, and TV deliverables often specify WAV with specific sample rate and bit depth requirements.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When not to use WAV</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Archiving long recordings:</span>
              <span>Use FLAC. You get identical audio quality at half the file size. WAV's lack of metadata support is also a problem for archiving large collections.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Sharing or distributing:</span>
              <span>Use MP3 or AAC. A 50 MB WAV is impractical for email, streaming, or public download. MP3 at 192 kbps is 10x smaller and sounds near-identical for most listeners.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Mobile storage:</span>
              <span>WAV files fill up phones and portable devices quickly. Use a compressed format for listening on the go.</span>
            </li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Convert to/from WAV"
        items={[
          { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
          { href: '/flac-to-wav', label: 'FLAC to WAV' },
          { href: '/m4a-to-wav',  label: 'M4A to WAV'  },
          { href: '/mp4-to-wav',  label: 'MP4 to WAV'  },
          { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
          { href: '/wav-to-flac', label: 'WAV to FLAC' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-lossless-audio', label: 'What Is Lossless Audio?'    },
          { href: '/wiki/what-is-flac',           label: 'What Is FLAC?'               },
          { href: '/wiki/what-is-audio-codec',    label: 'What Is an Audio Codec?'     },
          { href: '/wiki/codec-vs-container',     label: 'Codec vs Container'          },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/formats/wav',                                              label: 'WAV format guide'              },
          { href: '/guides/flac-vs-wav',                                       label: 'FLAC vs WAV Guide'             },
          { href: '/guides/mp3-vs-wav',                                        label: 'MP3 vs WAV Guide'              },
          { href: '/learn/when-converting-to-wav-does-not-improve-quality',    label: 'When WAV Doesn\'t Improve Quality' },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
