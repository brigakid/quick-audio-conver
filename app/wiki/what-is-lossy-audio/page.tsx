import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Lossy Audio? How Compression Removes Sound',
  description:
    'Lossy audio formats permanently remove audio data to shrink file sizes. Here\'s exactly what gets removed, how audible it is, and when lossy compression is completely fine.',
  openGraph: {
    title: 'What Is Lossy Audio? How Compression Removes Sound',
    description:
      'Lossy audio formats permanently remove audio data to shrink file sizes. Here\'s exactly what gets removed, how audible it is, and when lossy compression is completely fine.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Lossy Audio? How Compression Removes Sound',
    description:
      'Lossy audio formats permanently remove audio data to shrink file sizes. Here\'s exactly what gets removed, how audible it is, and when lossy compression is completely fine.',
  },
};

export default function WhatIsLossyAudioPage() {
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
          What Is Lossy Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Unlike lossless compression, which can be fully reversed, lossy compression makes a
        one-way trade. Audio data is <strong>permanently discarded</strong> to make the file
        smaller — and once it's gone, it cannot be recovered. Common lossy formats: MP3, AAC,
        OGG, Opus, WMA.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The permanent trade-off</h2>
          <p className="leading-relaxed">
            Lossy compression works by identifying audio data that human hearing is unlikely to
            notice — and throwing it away. The file gets smaller. The removed data is gone forever.
            When you play the file back, the decoder reconstructs what it can from what remains.
          </p>
          <p className="leading-relaxed mt-3">
            This is fundamentally different from lossless compression, where data is stored more
            efficiently but preserved intact. Lossy compression makes a permanent editorial
            decision: this data probably isn't worth keeping. How much it discards is controlled
            by the bitrate — lower bitrate means more data removed.
          </p>
          <p className="leading-relaxed mt-3">
            The trade-off is real and worth understanding. At the right bitrate, you'd never know
            anything was removed. At the wrong bitrate, the missing data becomes audible — and
            that's when people describe audio as sounding "compressed."
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How psychoacoustic compression works</h2>
          <p className="leading-relaxed">
            Lossy codecs don't just slice off chunks of audio at random. They use a psychoacoustic
            model — a mathematical representation of how human hearing actually works — to decide
            specifically what to remove.
          </p>
          <p className="leading-relaxed mt-3">
            Human hearing has documented limitations. Some sounds genuinely can't be perceived in
            certain contexts. The codec exploits these limits deliberately. Three mechanisms drive
            what gets discarded:
          </p>

          <div className="mt-4 space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-semibold text-gray-800 text-sm mb-1">Frequency masking</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                When a loud sound plays at one frequency, you can't perceive quieter sounds at nearby
                frequencies at the same moment. A loud kick drum at 80 Hz masks quiet rumble at
                90 Hz. The codec discards the masked sounds — they were inaudible anyway.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-semibold text-gray-800 text-sm mb-1">Temporal masking</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                A loud sound temporarily suppresses perception of quieter sounds for a brief window
                before and after it — sometimes as long as 20–100 milliseconds. The codec identifies
                and removes sounds that fall within this masked window.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-semibold text-gray-800 text-sm mb-1">Absolute hearing threshold</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Human hearing has frequency limits — roughly 20 Hz to 20 kHz, with sensitivity
                dropping off sharply above 16–18 kHz, especially with age. Very high frequencies and
                very quiet sounds are the first to go at any bitrate because they're the least
                perceptible.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common lossy formats</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Typical bitrate</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Relative quality</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['MP3',  '128–320 kbps', 'Good at 192+ kbps',    'General distribution, maximum compatibility'],
                  ['AAC',  '96–256 kbps',  'Better than MP3 at same bitrate', 'Apple ecosystem, streaming, YouTube'],
                  ['OGG',  '96–500 kbps',  'Comparable to AAC',    'Open-source, games, Spotify internally'],
                  ['Opus', '6–510 kbps',   'Excellent at low bitrates', 'Voice calls, streaming, web audio'],
                  ['WMA',  '32–320 kbps',  'Comparable to MP3',    'Legacy Windows — mostly obsolete'],
                ].map(([fmt, bitrate, quality, use]) => (
                  <tr key={fmt} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{fmt}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{bitrate}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{quality}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Does lossy audio actually sound bad?</h2>
          <p className="leading-relaxed">
            Not if the bitrate is right. At 192 kbps, most listeners in controlled blind tests
            (ABX tests, where you hear A and B and try to identify which is the MP3) cannot
            reliably tell the difference between an MP3 and its lossless source.
          </p>
          <p className="leading-relaxed mt-3">
            The perception of "lossy audio sounds bad" comes from specific situations:
          </p>
          <ul className="space-y-1 mt-2 list-disc list-inside text-sm text-gray-600">
            <li>Very low bitrates (below 96 kbps for music) where artifacts are consistently audible</li>
            <li>Listening on good headphones or reference speakers that reveal compression artifacts</li>
            <li>Complex audio — dense orchestral, acoustic guitar, cymbals — that taxes the psychoacoustic model</li>
            <li>Repeated re-encoding, which compounds the quality loss each time</li>
          </ul>
          <p className="leading-relaxed mt-3">
            For podcast voice, background music, casual listening, and streaming: lossy audio at a
            reasonable bitrate is entirely appropriate. The quality loss is real, but it falls
            below what most people can perceive in everyday listening conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Generation loss: the real danger</h2>
          <p className="leading-relaxed">
            The most significant risk with lossy audio isn't the first encode — it's re-encoding.
            Every time you convert a lossy file to another lossy format, you're decoding and then
            re-encoding. The decode step restores slightly degraded audio. The encode step applies
            another round of psychoacoustic removal to already-damaged audio.
          </p>
          <p className="leading-relaxed mt-3">
            This is generation loss. A single generation of MP3 at 192 kbps sounds fine. After
            three or four re-encodes — MP3 → AAC → MP3 → OGG — the quality has deteriorated
            measurably. The artifacts accumulate because the encoder keeps making conservative
            decisions about what to remove, and each pass removes more.
          </p>
          <p className="leading-relaxed mt-3">
            The practical takeaway: if you're going to distribute audio, do the final lossy encode
            from a lossless source. Don't repeatedly re-compress the same audio. And never edit
            or process a lossy file if a lossless original exists — the processing itself can
            amplify the artifacts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When lossy is the right choice</h2>
          <p className="leading-relaxed">
            Most audio people consume — streaming, podcasts, downloaded music, audio in videos —
            is lossy. That's not a failing; it's appropriate for the use case.
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Sharing:</span>
              <span>MP3 or AAC is the right format for sharing audio with others. Small, compatible, good quality.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Distributing podcasts:</span>
              <span>MP3 at 128 kbps mono for voice, 192 kbps stereo if you include music. Podcast apps, directories, and listeners all expect MP3.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Uploading to platforms:</span>
              <span>YouTube, SoundCloud, Spotify, Apple Music — they all re-encode your upload. Send them the best source you have; they'll do the lossy encode themselves.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Storage-limited situations:</span>
              <span>Mobile devices, older hardware with limited space — lossy formats make large libraries practical.</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            The decision is clear: use lossy for output and distribution. Use lossless for archiving,
            editing, and production. Keep the lossless master; compress for the audience.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless source to lossy output'    },
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Uncompressed to compressed'          },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-lossless-audio',    label: 'What Is Lossless Audio?'    },
          { href: '/wiki/what-is-bitrate',           label: 'What Is Bitrate?'           },
          { href: '/wiki/what-is-audio-compression', label: 'What Is Audio Compression?' },
          { href: '/wiki/what-is-mp3',               label: 'What Is MP3?'               },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio Guide' },
          { href: '/learn/when-mp3-is-good-enough',  label: 'When MP3 Is Good Enough'      },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
