import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'How Bitrate Actually Affects File Size and Sound',
  description:
    'Bitrate is bits per second — a rate that sets both the file size and the quality ceiling of a lossy audio file. Here\'s the math, the audibility thresholds, and which bitrate to pick.',
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
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Technical</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          How Bitrate Actually Affects File Size and Sound
        </h1>
      </div>

      <QuickAnswer>
        Bitrate is the number of bits used per second of audio. Higher bitrate = larger file
        and higher quality ceiling. Below <strong>128 kbps</strong>, quality loss is
        audible to most people. At <strong>192 kbps</strong>, most listeners can't detect
        the difference from lossless in a blind test. At <strong>320 kbps</strong> (MP3 maximum),
        the file is larger but the audible gain over 192 kbps is minimal for typical listening.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What bitrate is</h2>
          <p className="leading-relaxed">
            Bitrate (measured in kilobits per second, or kbps) is the number of bits of audio
            data stored per second of playback. It's a rate — how much data is used to
            represent each second of the recording.
          </p>
          <p className="leading-relaxed mt-3">
            In a lossy format like MP3, bitrate controls how aggressively the encoder
            discards audio data. A higher bitrate means less is discarded; a lower bitrate
            means more is discarded. The encoder is always making trade-offs: which frequencies
            to keep, which to approximate, which to remove. Bitrate is the budget it has to
            work with.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The file size calculation</h2>
          <p className="leading-relaxed">
            File size from bitrate is straightforward:
          </p>
          <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-100 font-mono text-sm text-gray-700">
            file size (MB) ≈ (bitrate in kbps × duration in seconds) ÷ 8000
          </div>
          <p className="leading-relaxed">
            For a 3-minute (180-second) song at 192 kbps:
          </p>
          <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-100 font-mono text-sm text-gray-700">
            (192 × 180) ÷ 8000 = 4.32 MB
          </div>
          <p className="leading-relaxed">
            At 320 kbps, the same song would be approximately 7.2 MB. At 128 kbps, it would
            be approximately 2.9 MB. The relationship is linear — doubling the bitrate
            doubles the file size.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Duration</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">128 kbps</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">192 kbps</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">320 kbps</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1 minute',    '~1 MB',   '~1.4 MB',  '~2.4 MB'  ],
                  ['3 minutes',   '~2.9 MB', '~4.3 MB',  '~7.2 MB'  ],
                  ['10 minutes',  '~9.6 MB', '~14.4 MB', '~24 MB'   ],
                  ['1 hour',      '~58 MB',  '~86 MB',   '~144 MB'  ],
                ].map(([dur, lo, mid, hi]) => (
                  <tr key={dur} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-600">{dur}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{lo}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{mid}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{hi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">Approximate. Variable bitrate encoding can produce smaller files than constant bitrate at the same nominal setting.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What actually degrades at low bitrates</h2>
          <p className="leading-relaxed">
            When the encoder has too little bitrate budget, it has to make harder trade-offs.
            The first things to go are the subtle details: ambience, room sound, very high
            and low frequencies, the fine texture of instruments. With less budget, the
            encoder also does a rougher job on fast transients — drums, percussion, sharp
            attacks — which can produce a pre-ringing artefact (a faint "smear" before the
            actual sound).
          </p>
          <p className="leading-relaxed mt-3">
            At 128 kbps, most people can detect quality loss on complex material — busy
            mixes, acoustic instruments, cymbals. The sound can feel slightly closed-in or
            have a muffled quality in the upper frequencies.
          </p>
          <p className="leading-relaxed mt-3">
            At 96 kbps and below, artefacts are consistently audible: "watery" or "bubbly"
            distortion on sustained notes, obvious frequency roll-off, and a generally
            compressed feel to the mix.
          </p>
          <p className="leading-relaxed mt-3">
            At 64 kbps — used for voice-optimised encoding, podcasts at low bandwidth, or
            older streaming services — the encoding is very aggressive. Speech remains
            intelligible but music quality degrades substantially.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The transparency threshold</h2>
          <p className="leading-relaxed">
            In audio, "transparent" means the listener cannot reliably tell the lossy file
            apart from the lossless original under controlled listening conditions. For MP3,
            the transparency threshold is generally considered to be around 192 kbps.
          </p>
          <p className="leading-relaxed mt-3">
            At 192 kbps, a well-encoded MP3 is indistinguishable from WAV for most people on
            typical headphones and speakers. This doesn't mean 192 kbps is identical to WAV —
            it means the difference is below the threshold of consistent human perception in
            normal listening conditions.
          </p>
          <p className="leading-relaxed mt-3">
            The encoder matters too. Different MP3 encoders at the same bitrate produce
            different results. LAME (the open-source MP3 encoder) at 192 kbps V0 (variable
            bitrate) is considered among the highest-quality MP3 encodings available and is
            effectively transparent for nearly all listeners. Most conversion tools, including
            server-side ones, use LAME or an equivalent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When 320 kbps makes sense</h2>
          <p className="leading-relaxed">
            320 kbps is the maximum for MP3. The step from 192 to 320 produces files about
            65% larger. The audible difference for most people on consumer equipment is
            minimal to nonexistent.
          </p>
          <p className="leading-relaxed mt-3">
            There are cases where 320 kbps is worth it: archiving a lossy-only collection
            (when you don't have lossless originals and want to maximize what you keep),
            encoding for DJ software or monitoring situations where artefacts at 192 kbps are
            occasionally detectable, or simply as a personal preference when storage is not a
            constraint. These are edge cases — most people encoding for personal use at 192 kbps
            will not benefit from switching to 320.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Which to choose</h2>
          <ul className="space-y-3">
            {[
              ['128 kbps', 'Voice-only content (podcasts, audiobooks), bandwidth-constrained distribution, small file size with acceptable quality for speech'],
              ['192 kbps', 'General music, sharing, streaming, podcasts with music. The practical default — transparent for most uses'],
              ['256 kbps', 'Higher confidence margin over 192 kbps for mixed content. Used by Apple Music as their AAC delivery bitrate'],
              ['320 kbps', 'Maximum MP3 quality. Minimal audible gain over 192 kbps for most listeners. Useful when storage is not a concern or you want headroom for further processing'],
            ].map(([rate, desc]) => (
              <li key={rate} className="flex gap-3">
                <span className="font-semibold text-gray-800 flex-shrink-0 w-20">{rate}</span>
                <span className="text-gray-600 leading-relaxed">{desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Variable vs constant bitrate</h2>
          <p className="leading-relaxed">
            Constant bitrate (CBR) uses the same bitrate for every second of audio,
            regardless of the complexity of the content. Simple sections (silence, steady
            tones) get the same budget as complex sections (dense mixes, fast transients).
          </p>
          <p className="leading-relaxed mt-3">
            Variable bitrate (VBR) allocates more bits to complex sections and fewer to
            simple ones. At the same average bitrate, VBR generally produces better sound
            quality than CBR, because the encoder uses its budget where it's most needed.
          </p>
          <p className="leading-relaxed mt-3">
            For most conversion purposes — sharing, streaming, personal use — VBR at an
            equivalent quality setting to 192 kbps CBR is the better choice. All modern
            players support VBR MP3. The resulting file is often slightly smaller than
            the equivalent CBR file while matching or exceeding its quality.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Choose bitrate when converting'  },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless to MP3 at any bitrate'  },
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'For editing software input'      },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/when-mp3-is-good-enough',   label: 'When MP3 Is Good Enough'         },
          { href: '/learn/aac-m4a-mp3-what-matters',  label: 'AAC, M4A, and MP3: What Matters' },
          { href: '/formats/mp3',                     label: 'MP3 format guide'                 },
        ]}
      />

      <LastUpdated date="2026-03-25" />

    </div>
  );
}
