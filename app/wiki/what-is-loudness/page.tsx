import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Loudness in Audio? LUFS, Volume, and Streaming Normalisation',
  description:
    'Loudness isn\'t the same as volume. It\'s a measure of how audio is perceived over time. Streaming platforms normalise to specific LUFS targets — here\'s what that means for your audio.',
  openGraph: {
    title: 'What Is Loudness in Audio? LUFS, Volume, and Streaming Normalisation',
    description:
      'Loudness isn\'t the same as volume. It\'s a measure of how audio is perceived over time. Streaming platforms normalise to specific LUFS targets — here\'s what that means for your audio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Loudness in Audio? LUFS, Volume, and Streaming Normalisation',
    description:
      'Loudness isn\'t the same as volume. It\'s a measure of how audio is perceived over time. Streaming platforms normalise to specific LUFS targets — here\'s what that means for your audio.',
  },
};

export default function WhatIsLoudnessPage() {
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
          What Is Loudness in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Loudness and volume are not the same thing. Volume is an instantaneous level. Loudness
        is a <strong>perceptual measure of how loud audio feels over time</strong>, measured in
        LUFS (Loudness Units relative to Full Scale). Streaming platforms like Spotify and YouTube
        normalise all content to a target LUFS — which means making your master louder than
        that target doesn't make it louder for listeners.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Loudness vs volume: the key distinction</h2>
          <p className="leading-relaxed">
            Volume typically refers to the amplitude of a signal at a given moment — how high
            the meter reads right now. Loudness is a psychoacoustic measure that models how
            human hearing perceives sustained audio over time. Two recordings with identical
            peak levels can feel very different in perceived loudness, because loudness depends
            on frequency content and duration as well as amplitude.
          </p>
          <p className="leading-relaxed mt-3">
            A single short drum hit might peak at -3 dBFS but feel quiet because it's brief.
            A sustained, heavily compressed vocal track might peak at -6 dBFS but feel
            overwhelmingly loud because the compression keeps the level constantly high. Volume
            meters don't capture this difference. Loudness meters do.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How loudness is measured: LUFS</h2>
          <p className="leading-relaxed">
            LUFS stands for Loudness Units relative to Full Scale. It's a standardised measurement
            defined by the ITU (International Telecommunication Union) in standard BS.1770,
            designed to correlate with how humans actually perceive loudness.
          </p>
          <p className="leading-relaxed mt-3">
            There are three related measurements you'll encounter:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Integrated LUFS:</span>
              <span>The average loudness of the entire file from start to finish. This is the number platforms use for normalisation. For a track or podcast episode, this is the key figure.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Short-term LUFS:</span>
              <span>Average loudness over the last 3 seconds — useful for monitoring during mix and mastering.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">True peak:</span>
              <span>The actual peak level of the audio, accounting for inter-sample peaks that standard peak meters miss. Most platforms specify a maximum true peak limit to prevent distortion during their transcoding.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Streaming platform loudness targets</h2>
          <p className="leading-relaxed">
            Every major streaming platform measures the integrated loudness of your upload and
            adjusts playback volume to match their target. Upload something louder: they turn it
            down. Upload something quieter: they turn it up (or leave it as-is, depending on
            the platform).
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Platform</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Target (Integrated LUFS)</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">True peak limit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Spotify',        '-14 LUFS',    '-1 dBTP'],
                  ['Apple Music',    '-16 LUFS',    '-1 dBTP'],
                  ['YouTube',        '-14 LUFS',    '-1 dBTP'],
                  ['Amazon Music',   '-14 LUFS',    '-2 dBTP'],
                  ['Tidal',          '-14 LUFS',    '-1 dBTP'],
                  ['Podcast (AAC)',  '-16 to -19 LUFS', '-1 dBTP (recommended)'],
                ].map(([platform, target, peak]) => (
                  <tr key={platform} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{platform}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{target}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{peak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed mt-3 text-sm text-gray-500">
            Targets can vary slightly by region or update. Always check the platform's current
            technical specifications before final mastering.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The loudness wars — and why they ended</h2>
          <p className="leading-relaxed">
            Through the 1990s and 2000s, a competitive escalation played out in the music industry.
            Radio stations used compressors and limiters to broadcast music louder than competitors.
            Mastering engineers responded by pushing masters harder. Labels demanded the loudest
            possible master. The result was a decade of increasingly compressed, dynamic-free music
            where everything was loud — and therefore nothing felt loud, because there was no
            contrast.
          </p>
          <p className="leading-relaxed mt-3">
            When streaming platforms introduced loudness normalisation, the incentive for extreme
            loudness evaporated. If Spotify turns your -7 LUFS master down to match its -14 LUFS
            target, you've sacrificed dynamic range for no gain. Modern mastering practice has
            gradually moved back toward louder targets (-14 to -10 LUFS for electronic music is
            common, while classical and acoustic music sits closer to -18 to -23 LUFS) because
            the format allows it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What this means when you export audio</h2>
          <p className="leading-relaxed">
            For music: aim for a target loudness that suits your genre and won't be excessively
            reduced by streaming platforms. -14 LUFS integrated with a true peak of -1 dBTP is
            a broadly safe starting point for most platforms.
          </p>
          <p className="leading-relaxed mt-3">
            For podcasts: -16 LUFS is the widely recommended target for spoken-word content. Some
            hosts and apps use their own normalisation, but aiming for -16 LUFS with a -1 dBTP
            true peak limit gives you a clean, consistent baseline.
          </p>
          <p className="leading-relaxed mt-3">
            For video (YouTube): -14 LUFS. YouTube normalises to that target; submitting at exactly
            that level means your audio arrives at listeners without adjustment.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-normalization',     label: 'What Is Normalization?'        },
          { href: '/wiki/what-is-a-limiter',         label: 'What Is a Limiter?'            },
          { href: '/wiki/what-is-audio-compression', label: 'What Is Audio Compression?'   },
          { href: '/wiki/what-is-mixing-mastering',  label: 'What Is Mixing vs Mastering?'  },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/best-audio-format-for-podcasting', label: 'Best Format for Podcasting' },
          { href: '/learn/best-audio-format-for-podcasts',    label: 'Best Audio Format for Podcasts' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
