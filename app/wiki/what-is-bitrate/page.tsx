import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Bitrate in Audio? A Plain-English Explanation',
  description:
    'Bitrate is how many bits of audio data are stored per second. Here\'s what that means for file size, sound quality, and choosing the right setting when you convert.',
};

export default function WhatIsBitratePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Fundamentals</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Bitrate in Audio?
        </h1>
      </div>

      <QuickAnswer>
        Bitrate is the number of bits of audio data stored or transmitted per second. A 192 kbps MP3
        stores 192,000 bits of audio every second.{' '}
        <strong>Higher bitrate = larger file, more data retained.</strong>{' '}
        For MP3, 192 kbps is the practical transparency threshold — most listeners can't reliably
        tell it apart from lossless in blind tests. Below 128 kbps, artifacts become audible.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The word itself tells you everything</h2>
          <p className="leading-relaxed">
            Bit + rate. Like miles per hour or frames per second, bitrate is just a rate of something
            over time — in this case, bits of audio data per second.
          </p>
          <p className="leading-relaxed mt-3">
            192 kbps means 192 kilobits per second, which is 192,000 bits every second of audio.
            That number tells you two things simultaneously: how much data the file contains, and how
            much the encoder was allowed to work with when compressing the audio. The more bits
            available, the less the encoder has to discard.
          </p>
          <p className="leading-relaxed mt-3">
            Bitrate applies to lossy formats — MP3, AAC, OGG, Opus. Lossless formats like WAV and
            FLAC don't have a meaningful bitrate setting because nothing is being discarded. More on
            that below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The file size math</h2>
          <p className="leading-relaxed">
            File size follows directly and predictably from bitrate. The formula is simple:
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mt-3 font-mono text-sm text-gray-700">
            file size (MB) = bitrate (kbps) × duration (seconds) ÷ 8,000
          </div>
          <p className="leading-relaxed mt-3">
            A 3-minute (180 second) song at 192 kbps:{' '}
            <strong>192 × 180 ÷ 8,000 = 4.3 MB</strong>.
            At 320 kbps that becomes <strong>7.2 MB</strong>. At 128 kbps, <strong>2.9 MB</strong>.
          </p>
          <p className="leading-relaxed mt-3">
            Doubling the bitrate doubles the file size. That relationship is linear and predictable —
            which makes bitrate the clearest lever you have when balancing quality against storage.
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
                  ['64 kbps',  '1.4 MB',  '28.8 MB', 'Poor — artifacts consistently audible'],
                  ['128 kbps', '2.9 MB',  '57.6 MB', 'Acceptable — artifacts audible in complex audio'],
                  ['192 kbps', '4.3 MB',  '86.4 MB', 'Transparent — indistinguishable for most listeners'],
                  ['320 kbps', '7.2 MB',  '144 MB',  'Near-lossless — marginal improvement over 192'],
                  ['WAV (CD)', '~50 MB',  '~600 MB', 'Lossless — no quality trade-off'],
                  ['FLAC',     '~25 MB',  '~300 MB', 'Lossless — 40–60% smaller than WAV'],
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">What you're actually trading</h2>
          <p className="leading-relaxed">
            Lowering the bitrate doesn't make audio quieter or muffle it like a pillow over a
            speaker. What it actually does is force the encoder to be more aggressive about
            discarding audio data — specifically, data the encoder's model predicts your ears won't
            notice.
          </p>
          <p className="leading-relaxed mt-3">
            MP3 and AAC encoders use psychoacoustic models — mathematical representations of how
            human hearing works. These models know that you can't hear a quiet sound when a louder
            sound occupies the same frequency at the same time (this is called masking). They know
            that human hearing becomes less sensitive above about 16kHz. They use this knowledge to
            identify what to remove.
          </p>
          <p className="leading-relaxed mt-3">
            At high bitrates, only the truly inaudible data gets removed. At low bitrates, the
            encoder has to remove things your ears CAN notice — which is when artifacts appear.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The four quality tiers</h2>
          <div className="space-y-3 mt-1">
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">Below 128 kbps — audible degradation</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Compression artifacts are consistently noticeable. High frequencies get rolled off
                aggressively. Cymbals sound smeared, reverb tails disappear, voices take on a
                "boxy" quality. Suitable only when bandwidth is severely limited — old voice calls,
                very constrained streaming.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">128 kbps — acceptable, but noticeable in the right context</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                For podcast voice and casual listening: fine. For complex music with acoustic
                instruments or dense high-frequency content — piano, orchestral, acoustic guitar —
                a trained ear on decent headphones will likely notice the compression. The file is
                small enough that this compromise was worth it for a lot of earlier streaming.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">192 kbps — the practical transparency threshold</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                In controlled ABX blind tests, most listeners cannot reliably identify the MP3 from
                the lossless source at 192 kbps. This doesn't mean the difference doesn't exist —
                it means it's small enough to fall below the perceptual threshold for typical
                listening. The recommended default for music, podcasts, and general distribution.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">320 kbps — diminishing returns</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                MP3's maximum bitrate. Files are 65% larger than 192 kbps. The quality improvement
                is real but small — noticeable on reference-grade equipment by listeners trained to
                listen for it. For most storage-is-cheap scenarios, 320 kbps gives comfortable
                headroom. But don't confuse it with lossless.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When bitrate doesn't apply</h2>
          <p className="leading-relaxed">
            WAV files store every audio sample without compression — there's no bitrate setting
            because nothing is being removed. The "bitrate" of a WAV file is just the sample rate
            multiplied by the bit depth, and it tells you the raw data rate, not a quality setting.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC compresses audio losslessly — like a ZIP file for audio. It reduces file size
            without discarding any data. When you export FLAC, there's no bitrate choice because
            the output is bit-for-bit identical to the original regardless of compression level.
          </p>
          <p className="leading-relaxed mt-3">
            This is why converting an MP3 to WAV doesn't "give you lossless quality." The WAV file
            has no meaningful bitrate setting — but the audio data inside it is still the compressed
            MP3 data. The container doesn't reconstruct what the encoder discarded years ago.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bitrate and conversion decisions</h2>
          <p className="leading-relaxed">
            When converting from a lossless source (WAV, FLAC, AIFF), you're setting the bitrate
            for the first time — pick deliberately. 192 kbps is the right default for most uses.
            320 kbps if you want headroom and storage isn't a concern.
          </p>
          <p className="leading-relaxed mt-3">
            When converting from a lossy source, the original bitrate matters. If your source is
            already 128 kbps MP3, converting it to 320 kbps MP3 doesn't recover anything — you
            just get a larger file with the same quality ceiling as the source. The rule is: never
            re-encode lossy audio at a lower bitrate than the original. If you must re-encode,
            match or exceed the source bitrate — and understand you're still adding another
            generation of quality loss.
          </p>
          <p className="leading-relaxed mt-3">
            The cleanest approach for long-term audio is: archive in FLAC, distribute in MP3 at
            192 kbps. Work from the lossless source, compress once, for a specific purpose.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Set bitrate on export from a lossless source' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless source to controlled MP3 export'     },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-audio-codec',    label: 'What Is an Audio Codec?'    },
          { href: '/wiki/what-is-lossy-audio',    label: 'What Is Lossy Audio?'       },
          { href: '/wiki/what-is-lossless-audio', label: 'What Is Lossless Audio?'    },
          { href: '/wiki/what-is-sample-rate',    label: 'What Is Sample Rate?'       },
        ]}
      />

      <RelatedContent
        title="Go deeper"
        items={[
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality', label: 'Bitrate: The Calculations in Full' },
          { href: '/guides/how-to-choose-mp3-bitrate',                      label: 'How to Choose the Right MP3 Bitrate' },
          { href: '/formats/mp3',                                            label: 'MP3 format guide'                  },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
