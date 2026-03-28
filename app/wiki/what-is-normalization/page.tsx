import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Audio Normalization? Peak, LUFS, and Why It Matters',
  description:
    'Normalization sets audio to a target volume level. Peak normalization adjusts by the loudest peak. Loudness normalization (LUFS) adjusts for perceived loudness. Here\'s the difference.',
};

export default function WhatIsNormalizationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Signal Processing</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Audio Normalization?
        </h1>
      </div>

      <QuickAnswer>
        Normalization adjusts the overall volume of an audio file to a target level. There are two
        kinds:{' '}
        <strong>peak normalization</strong> (sets the loudest moment to a target dB) and{' '}
        <strong>loudness normalization</strong> (sets the average perceived loudness to a target
        LUFS). They produce different results and are used for different purposes.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What normalization does</h2>
          <p className="leading-relaxed">
            Normalization is a volume adjustment applied to an entire audio file. Unlike manually
            turning up or down a gain knob, normalization is automatic — it analyses the audio,
            determines how much adjustment is needed to reach the target level, and applies
            a uniform gain change across the whole file.
          </p>
          <p className="leading-relaxed mt-3">
            The key point is "uniform gain change." Normalization doesn't change the dynamics of
            the audio — the relationship between loud and quiet passages stays the same. It just
            moves everything up or down together. This makes it fundamentally different from
            compression or limiting, which change the ratio between loud and quiet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Peak normalization</h2>
          <p className="leading-relaxed">
            Peak normalization finds the loudest sample in the file and sets it to a target
            peak level — typically -0.1 dBFS or -1 dBFS (just below the digital ceiling, leaving
            a small headroom margin). Everything else in the file is raised proportionally.
          </p>
          <p className="leading-relaxed mt-3">
            The limitation: peak level doesn't correlate well with how loud audio sounds. A
            single, brief transient — a drum hit, a hand clap — can have a high peak level while
            the overall content feels quiet. Normalising to peak level on a recording with one
            loud transient will leave most of the audio quieter than expected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Loudness normalization (LUFS)</h2>
          <p className="leading-relaxed">
            Loudness normalization uses integrated LUFS (Loudness Units relative to Full Scale)
            as the target — a psychoacoustic measurement that models how humans perceive loudness
            over time. Rather than reacting to the single loudest moment, it measures the
            sustained average loudness of the entire file and adjusts to match a target.
          </p>
          <p className="leading-relaxed mt-3">
            The result is much more consistent and perceptually meaningful. Two different recordings
            normalised to -16 LUFS will feel roughly similar in loudness when played in sequence
            — which is exactly what podcast apps and streaming platforms need.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Peak vs loudness normalization</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700"></th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Peak normalization</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Loudness normalization (LUFS)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Measures', 'Loudest single sample', 'Average integrated loudness over time'],
                  ['Unit', 'dBFS', 'LUFS'],
                  ['Typical target', '-0.1 or -1 dBFS', '-14 to -16 LUFS (varies by platform)'],
                  ['Perceptual consistency', 'Poor — transients can mislead', 'Good — correlates with perceived loudness'],
                  ['Used for', 'Ensuring no digital clipping, quick export', 'Podcast delivery, streaming platform prep'],
                  ['Dynamic range impact', 'None', 'None (uniform gain change only)'],
                ].map(([prop, peak, lufs]) => (
                  <tr key={prop} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{prop}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{peak}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{lufs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why platforms request it</h2>
          <p className="leading-relaxed">
            Streaming platforms and podcast apps serve content from many different sources to
            the same listener. Without normalisation, the listener constantly adjusts their
            volume as they move between podcasts, songs, or videos — each produced to a different
            loudness standard.
          </p>
          <p className="leading-relaxed mt-3">
            Platforms solve this by applying loudness normalisation to all uploaded content during
            playback. Spotify targets -14 LUFS. Apple Podcasts recommends -16 LUFS. YouTube
            targets -14 LUFS. If your content is louder than the target, it gets turned down
            for listeners. If it's quieter, it gets turned up (or played as-is, depending on
            the platform's policy).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When normalization alone isn't enough</h2>
          <p className="leading-relaxed">
            Normalization is a uniform volume adjustment — it doesn't smooth out internal level
            inconsistencies. If a podcast recording has one person speaking quietly and another
            loudly, normalising the file brings the overall level to target, but the internal
            imbalance remains. A compressor or dynamic equaliser is needed to level out those
            internal differences.
          </p>
          <p className="leading-relaxed mt-3">
            Similarly, normalization doesn't protect against true peak limiting. When audio is
            normalised upward, any peaks that were already close to 0 dBFS may now clip. This
            is why loudness normalisation is typically combined with a true peak limiter that
            caps peaks at -1 dBTP — preventing digital clipping while hitting the target LUFS.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Normalization in the conversion workflow</h2>
          <p className="leading-relaxed">
            Simple gain normalization applies a uniform multiplication to the audio samples — no
            frequency content changes, no dynamics change, no artifacts introduced. It changes
            playback level, not audio quality.
          </p>
          <p className="leading-relaxed mt-3">
            Where normalization becomes relevant in a conversion workflow: if you're converting
            audio to a lossy format (MP3, AAC) and the source file is very quiet, some converters
            will normalize before encoding. This is fine as long as the normalization target is
            below 0 dBFS — the encoder works better with a well-levelled signal than one running
            at -18 dBFS.
          </p>
          <p className="leading-relaxed mt-3">
            The risk is the other direction. If you normalize a file upward and it has peaks near
            0 dBFS, those peaks can now exceed the ceiling and{' '}
            <Link href="/wiki/what-is-clipping" className="text-brand hover:underline">clip</Link>.
            This is why export normalisation should always be combined with a -1 dBFS or -1 dBTP
            ceiling — normalize to the target LUFS, then ensure no peak exceeds the ceiling. The
            order is: apply EQ and dynamics processing first, normalize last, encode after.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-loudness',          label: 'What Is Loudness?'             },
          { href: '/wiki/what-is-a-limiter',         label: 'What Is a Limiter?'            },
          { href: '/wiki/what-is-audio-compression', label: 'What Is Audio Compression?'   },
          { href: '/wiki/what-is-clipping',          label: 'What Is Clipping?'             },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/best-audio-format-for-podcasting', label: 'Best Audio Format for Podcasting' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
