import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is FLAC? Lossless Audio Compression Explained',
  description:
    'FLAC stores the exact same audio as WAV but in 40–60% less space. The preferred format for archiving, hi-fi listening, and sharing audio between producers. Here\'s how it works.',
};

export default function WhatIsFlacPage() {
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
          What Is FLAC?
        </h1>
      </div>

      <QuickAnswer>
        FLAC (Free Lossless Audio Codec) is a compressed audio format that{' '}
        <strong>preserves 100% of the original audio data</strong>. Decode a FLAC file and you
        get back exactly the same audio as the original recording. It's typically 40–60% smaller
        than WAV — but the audio quality is mathematically identical.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What makes FLAC different</h2>
          <p className="leading-relaxed">
            Most common audio formats fall into one of two categories: lossy (MP3, AAC — smaller
            files, some quality reduction) or uncompressed lossless (WAV, AIFF — full quality,
            very large files). FLAC sits in a third category that combines the benefits of both:
            it's compressed, but losslessly. The file is smaller than WAV. The audio is identical
            to the original.
          </p>
          <p className="leading-relaxed mt-3">
            This sounds too good to be true, but it's technically straightforward. Lossless
            compression doesn't discard data — it finds more efficient ways to represent the same
            data. The tradeoff is that lossless compression achieves less size reduction than lossy
            compression. FLAC gets you 40–60% smaller than WAV; MP3 gets you 90% smaller. You
            choose based on what you're willing to give up.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How FLAC compression works</h2>
          <p className="leading-relaxed">
            FLAC uses a prediction algorithm. At its core, it works like this: for each audio
            sample, the encoder predicts what the value should be based on the previous few samples.
            It then stores the difference between the prediction and the actual value — called the
            residual. Residuals are typically much smaller numbers than the original sample values,
            so they can be stored in fewer bits.
          </p>
          <p className="leading-relaxed mt-3">
            When decoding, the same prediction runs again on the stored residuals, and the original
            audio is reconstructed perfectly. The key insight: as long as you can reproduce the
            prediction algorithm exactly, you can fully recover the original data.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC offers compression levels from 0 to 8. Higher levels spend more encoding time to
            achieve slightly better compression ratios. All levels are lossless — the difference
            is only encoding speed and file size, not audio quality. The default level (5) is a
            good balance for most uses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">File sizes: FLAC vs WAV vs MP3</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">3-min song</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">60-min recording</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Audio quality</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['WAV',         '~50 MB',  '~600 MB', 'Lossless — uncompressed'],
                  ['FLAC',        '~25 MB',  '~300 MB', 'Lossless — identical to WAV when decoded'],
                  ['MP3 320kbps', '7.2 MB',  '144 MB',  'Lossy — very good, but not identical to source'],
                  ['MP3 192kbps', '4.3 MB',  '86 MB',   'Lossy — transparent for most listeners'],
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
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">FLAC vs WAV: what actually differs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700"></th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">FLAC</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">WAV</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Audio quality',     'Lossless',                    'Lossless (identical when decoded)'],
                  ['File size',         '40–60% smaller than WAV',    'Largest (baseline)'],
                  ['Metadata',          'Rich — title, artist, artwork, etc.', 'Very limited by default'],
                  ['DAW support',       'Good — most modern DAWs',    'Universal'],
                  ['OS/device support', 'Almost universal (2024+)',   'Universal'],
                  ['Streaming',         'Apple Music, Tidal, Qobuz', 'Not typically streamed'],
                  ['Open-source',       'Yes — royalty-free',         'Technically yes — public spec'],
                  ['Best for',          'Archiving, hi-fi, sharing masters', 'Editing, broadcast, legacy tools'],
                ].map(([prop, flac, wav]) => (
                  <tr key={prop} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{prop}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{flac}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{wav}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">FLAC is not a better MP3</h2>
          <p className="leading-relaxed">
            A common misconception: FLAC is a step above MP3 on some quality ladder. It isn't —
            they solve completely different problems. MP3 is lossy and optimised for small file
            size with acceptable quality. FLAC is lossless and optimised for perfect quality with
            reasonable file size.
          </p>
          <p className="leading-relaxed mt-3">
            They're not better and worse versions of the same thing. They're different tools for
            different jobs. Choosing between FLAC and MP3 is a question of what you're doing with
            the audio — not a question of which is "higher quality" in some abstract sense.
          </p>
          <p className="leading-relaxed mt-3">
            If you're distributing audio publicly — sharing, streaming, podcast delivery — MP3 or
            AAC is the right format. FLAC is far too large for casual distribution and the quality
            difference is inaudible to most listeners in most conditions anyway. If you're
            archiving, editing, or passing audio between producers — FLAC is the right format.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">FLAC support in 2025</h2>
          <p className="leading-relaxed">
            FLAC support has become nearly universal. Android has played FLAC natively since
            Android 3.1 (2011). macOS has supported FLAC natively since Big Sur (2020). Windows
            Media Player added FLAC support in Windows 10. VLC, foobar2000, and virtually all
            open-source audio players have supported it for years.
          </p>
          <p className="leading-relaxed mt-3">
            Apple Music now streams lossless audio (ALAC, which is Apple's lossless codec, very
            similar to FLAC). Tidal and Qobuz stream FLAC natively. Audiophile streaming is no
            longer a niche — it's a standard offering from major platforms.
          </p>
          <p className="leading-relaxed mt-3">
            The main exception: older iPods and iPhones before iOS 11 don't support FLAC — they
            use ALAC (Apple Lossless) instead. For the Apple ecosystem specifically, ALAC in an
            M4A container has historically been more reliable, though modern Apple devices handle
            FLAC without issues.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use FLAC</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Archiving your music collection:</span>
              <span>FLAC is the best format for long-term music storage. Full quality, reasonable size, rich metadata, and open standard — nothing proprietary to worry about.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Storing recording projects:</span>
              <span>If you record music, archive the finished takes in FLAC before doing anything else. You'll have a lossless master to generate any distribution format later.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Sharing audio with collaborators:</span>
              <span>Sending audio to a mix engineer or mastering engineer? FLAC gives them the full source quality at a manageable file size.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Hi-fi listening:</span>
              <span>If you have a good DAC and headphones or speakers, FLAC lets you hear the recording without any lossy codec's fingerprint.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Converting with FLAC</h2>
          <p className="leading-relaxed">
            Converting WAV to FLAC is lossless — you get a smaller file, identical audio. Converting
            FLAC to WAV is also lossless in the opposite direction. Neither involves any quality loss.
          </p>
          <p className="leading-relaxed mt-3">
            Converting FLAC to MP3 is a one-time, controlled quality reduction. You're applying
            lossy compression to a lossless source — the best possible starting point for that
            conversion.
          </p>
          <p className="leading-relaxed mt-3">
            Converting MP3 to FLAC doesn't improve quality. You get a lossless file that contains
            the same audio as the MP3. The lossy data that the MP3 encoder discarded is not
            recoverable — the FLAC wrapper can't reconstruct it.
          </p>
          <p className="leading-relaxed mt-3 text-sm text-gray-500">
            Note: on this site, FLAC output is only available when converting from lossless source
            formats (WAV, AIFF, ALAC). Converting a lossy source to FLAC would produce a lossless
            wrapper around lossy audio — larger file, no quality benefit — so that option is not
            offered.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Convert to/from FLAC"
        items={[
          { href: '/wav-to-flac',  label: 'WAV to FLAC',  note: 'Lossless to lossless'       },
          { href: '/flac-to-mp3',  label: 'FLAC to MP3',  note: 'Best starting point for MP3' },
          { href: '/flac-to-wav',  label: 'FLAC to WAV',  note: 'For editing software input'  },
          { href: '/alac-to-flac', label: 'ALAC to FLAC', note: 'Apple lossless to open lossless' },
          { href: '/aiff-to-flac', label: 'AIFF to FLAC', note: 'macOS lossless to FLAC'      },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-lossless-audio', label: 'What Is Lossless Audio?'    },
          { href: '/wiki/what-is-wav',            label: 'What Is WAV?'               },
          { href: '/wiki/what-is-audio-codec',    label: 'What Is an Audio Codec?'    },
          { href: '/wiki/what-is-mp3',            label: 'What Is MP3?'               },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/formats/flac',                                           label: 'FLAC format guide'             },
          { href: '/guides/flac-vs-wav',                                     label: 'FLAC vs WAV Guide'             },
          { href: '/guides/lossless-vs-lossy-audio',                         label: 'Lossless vs Lossy Audio Guide' },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
