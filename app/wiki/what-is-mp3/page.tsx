import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is MP3? How It Works, Why It\'s Still Everywhere',
  description:
    'MP3 is a lossy audio format from 1993. It\'s not the best-sounding codec available today — but it plays on everything, which is why it still dominates audio distribution.',
};

export default function WhatIsMp3Page() {
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
          What Is MP3?
        </h1>
      </div>

      <QuickAnswer>
        MP3 (MPEG-1 Audio Layer III) is a <strong>lossy audio format</strong> that compresses audio
        by removing data the human ear is unlikely to notice. It was finalised in 1993 and remains
        the most universally compatible audio format on earth. Not the highest quality — but plays
        on absolutely everything.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What MP3 stands for</h2>
          <p className="leading-relaxed">
            MP3 stands for MPEG-1 Audio Layer III. MPEG is the Moving Picture Experts Group — the
            standards body that defined it. "Layer III" refers to the third and most sophisticated
            audio layer in the MPEG-1 standard, the one that achieved the best compression.
          </p>
          <p className="leading-relaxed mt-3">
            The name is a mouthful, which is why "MP3" stuck. It's both the name of the codec
            (the compression algorithm) and the name of the container format (the .mp3 file). This
            is one of the rare cases where codec and container share a name — which adds to the
            general confusion around audio formats, but MP3 as a format is simple: one codec,
            one container, always the same pairing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">A brief history worth knowing</h2>
          <p className="leading-relaxed">
            MP3 was developed in the late 1980s by the Fraunhofer Institute in Germany, with
            contributions from a wider academic consortium. The goal was to enable high-quality
            audio storage and transmission at much lower data rates than uncompressed audio —
            critical in an era when storage was expensive and internet connections were slow.
          </p>
          <p className="leading-relaxed mt-3">
            The format was standardised in 1993. Within a few years, it had changed music
            distribution forever. Napster, the file-sharing service that launched in 1999, ran
            almost entirely on MP3. The original iPod — launched in 2001 — was marketed on the
            premise of putting "1,000 songs in your pocket," which was only feasible because of
            MP3 compression.
          </p>
          <p className="leading-relaxed mt-3">
            That era of rapid adoption is why MP3 has such deep support today. It was baked into
            every consumer audio device, car stereo, and software player from the late 1990s onward.
            That installed base of support is the reason it still dominates, more than 30 years later.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How MP3 compression works</h2>
          <p className="leading-relaxed">
            MP3 uses a psychoacoustic model to decide what audio data to remove. Human hearing
            has well-documented limits — it can't hear some frequencies at all, can't hear quiet
            sounds at the same time as louder sounds nearby, and becomes less sensitive at the
            extremes of the audible range.
          </p>
          <p className="leading-relaxed mt-3">
            The encoder analyses the audio frame by frame, applies this model, and discards the
            data it predicts you won't miss. What's left gets stored efficiently. The result is
            a file that's typically 75–90% smaller than the uncompressed original — a 50 MB WAV
            becomes 4–7 MB as an MP3 — with audio quality that, at reasonable bitrates, most
            listeners can't distinguish from the original.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bitrate and quality</h2>
          <p className="leading-relaxed">
            The bitrate setting controls how aggressively MP3 compresses audio. Higher bitrate
            means more data retained, larger file, better quality. The practical range for music
            distribution runs from 128 kbps (acceptable) to 320 kbps (near-lossless).
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Bitrate</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">3-min song</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Quality</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['128 kbps', '2.9 MB', 'Acceptable — audible artifacts in complex audio', 'Voice recordings, podcasts, casual listening'],
                  ['192 kbps', '4.3 MB', 'Transparent for most listeners', 'General music distribution — recommended default'],
                  ['256 kbps', '5.8 MB', 'Very good — marginal improvement over 192', 'Discerning listeners, some streaming platforms'],
                  ['320 kbps', '7.2 MB', 'Near-lossless — maximum MP3 quality', 'Hi-fi playback, archiving a lossy master'],
                ].map(([bitrate, size, quality, use]) => (
                  <tr key={bitrate} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{bitrate}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{size}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{quality}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why MP3 still wins on compatibility</h2>
          <p className="leading-relaxed">
            AAC sounds measurably better than MP3 at the same bitrate. Opus sounds better still,
            especially at low bitrates. OGG Vorbis is also technically superior. None of them have
            displaced MP3 for general distribution — and the reason is pure compatibility.
          </p>
          <p className="leading-relaxed mt-3">
            MP3 plays on every smartphone, every car stereo, every podcast app, every website audio
            player, every smart speaker, every DJ controller, every old iPod in a drawer. It's the
            format that every device has had to support for 25+ years, which means you can hand an
            MP3 to anyone and be confident they can play it.
          </p>
          <p className="leading-relaxed mt-3">
            AAC has excellent support in the Apple ecosystem. Opus is used internally by streaming
            services and voice apps. But neither has the same universal compatibility as MP3 for
            public-facing distribution. When sharing audio with people you don't know, on hardware
            you can't verify — MP3 is the safe choice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">MP3 vs the alternatives</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Quality vs MP3</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Compatibility</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['MP3',  'Lossy', 'Baseline',                    'Universal — plays everywhere'],
                  ['AAC',  'Lossy', 'Better at same bitrate',      'Excellent on Apple; good elsewhere'],
                  ['OGG',  'Lossy', 'Comparable to AAC',           'Good on desktop/Android; limited on older hardware'],
                  ['Opus', 'Lossy', 'Much better at low bitrates', 'Excellent for streaming; limited on legacy devices'],
                  ['FLAC', 'Lossless', 'No compression artifacts',  'Wide but not universal; large files'],
                  ['WAV',  'Uncompressed', 'No compression artifacts', 'Universal; very large files'],
                ].map(([fmt, type, quality, compat]) => (
                  <tr key={fmt} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{fmt}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{quality}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{compat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use MP3</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Sharing with unknown recipients:</span>
              <span>If you're emailing, sharing a link, or uploading somewhere you don't control the playback — MP3 is the safest choice.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Podcast distribution:</span>
              <span>Podcast apps and directories universally support MP3. 128 kbps mono for voice-only; 192 kbps stereo if you include music.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Audio in video:</span>
              <span>If you need separate audio files for a video project, MP3 is widely compatible with video editors and web players.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Legacy hardware:</span>
              <span>Car stereos, old MP3 players, budget Bluetooth speakers — MP3 is the one format you can depend on.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When not to use MP3</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Archiving:</span>
              <span>Use FLAC. MP3 discards data — you lose the ability to generate a higher-quality export later. Archive lossless, distribute compressed.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Editing:</span>
              <span>Use WAV or AIFF in your DAW. Editing a lossy file and repeatedly exporting adds generation loss. Work lossless; export MP3 at the end.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Re-encoding:</span>
              <span>Don't convert MP3 to MP3 or MP3 to AAC unless necessary. Every re-encode of a lossy file degrades quality.</span>
            </li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Convert to MP3"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
          { href: '/flac-to-mp3', label: 'FLAC to MP3' },
          { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
          { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
          { href: '/mov-to-mp3',  label: 'MOV to MP3'  },
          { href: '/aac-to-mp3',  label: 'AAC to MP3'  },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-bitrate',           label: 'What Is Bitrate?'            },
          { href: '/wiki/what-is-lossy-audio',       label: 'What Is Lossy Audio?'        },
          { href: '/wiki/what-is-audio-codec',       label: 'What Is an Audio Codec?'     },
          { href: '/wiki/codec-vs-container',        label: 'Codec vs Container'          },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/formats/mp3',                                         label: 'MP3 format guide'                 },
          { href: '/guides/how-to-choose-mp3-bitrate',                    label: 'How to Choose MP3 Bitrate'        },
          { href: '/guides/mp3-vs-wav',                                   label: 'MP3 vs WAV Guide'                 },
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality', label: 'How Bitrate Affects Quality'   },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
