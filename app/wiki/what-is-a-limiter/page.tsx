import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'What Is a Limiter in Audio? Ceiling, Loudness, and True Peak',
  description:
    'A limiter is a compressor with an extreme ratio — it prevents audio from exceeding a set ceiling. It\'s the last thing in a mastering chain and the reason streaming music sounds loud without clipping.',
  openGraph: {
    title: 'What Is a Limiter in Audio? Ceiling, Loudness, and True Peak',
    description:
      'A limiter is a compressor with an extreme ratio — it prevents audio from exceeding a set ceiling. It\'s the last thing in a mastering chain and the reason streaming music sounds loud without clipping.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Limiter in Audio? Ceiling, Loudness, and True Peak',
    description:
      'A limiter is a compressor with an extreme ratio — it prevents audio from exceeding a set ceiling. It\'s the last thing in a mastering chain and the reason streaming music sounds loud without clipping.',
  },
};

export default function WhatIsALimiterPage() {
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
          What Is a Limiter in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        A limiter is a dynamic processor that prevents audio from exceeding a set threshold —
        the ceiling. Where a compressor gradually reduces gain as a signal gets louder, a limiter
        applies an extreme ratio (effectively infinity:1) to stop any signal from getting through
        above the ceiling at all. It's the final safeguard against clipping, and the tool that
        allows mastered music to be loud without distortion.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">A compressor with an extreme ratio</h2>
          <p className="leading-relaxed">
            Compression and limiting are the same process at different ratios. A compressor
            at 4:1 means for every 4 dB a signal rises above the threshold, only 1 dB gets
            through. At 10:1 it's more aggressive. At ∞:1 — infinity to one — nothing gets
            through above the ceiling. That's a limiter.
          </p>
          <p className="leading-relaxed mt-3">
            In practice, limiters are characterised by their near-zero attack time (they catch
            peaks before they{' '}
            <Link href="/wiki/what-is-clipping" className="text-brand hover:underline">clip</Link>)
            and their very specific ceiling behaviour. A brickwall limiter
            guarantees that no sample in the output exceeds the ceiling level.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What limiters are used for</h2>

          <div className="space-y-3 mt-3">
            {[
              {
                title: 'Mastering — loudness and protection',
                body: 'The limiter at the end of a mastering chain has two jobs: push the overall level up (by reducing peaks and allowing the mix to be normalised higher) and ensure nothing exceeds the distribution ceiling. Setting the limiter ceiling at -1 dBTP is the streaming standard — the -1 dB headroom prevents true peak violations during codec encoding.',
              },
              {
                title: 'Broadcast — compliance',
                body: 'Television, radio, and streaming all specify maximum loudness levels (LUFS) and true peak levels. A limiter ensures the programme material never exceeds either limit, regardless of what the source content looks like.',
              },
              {
                title: 'Live sound — protection',
                body: 'Limiters protect loudspeakers from damage. A system limiter on a PA system prevents a rogue signal spike from sending damaging levels to the speaker cabinets.',
              },
              {
                title: 'Mix bus — glue',
                body: 'Some engineers use a gentle limiter (or low-ratio compressor) on the mix bus to catch the occasional transient that escapes from individual track processing — adding a sense of cohesion without heavy-handed gain reduction.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
                <p className="text-sm text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">True peak vs sample peak</h2>
          <p className="leading-relaxed">
            Digital audio is stored as discrete samples. No individual sample can exceed 0 dBFS.
            But when that digital signal is converted to analog for playback, the conversion
            process (reconstruction filtering) can create peaks between samples that exceed the
            value of either adjacent sample — these are called inter-sample peaks or true peaks.
          </p>
          <p className="leading-relaxed mt-3">
            A conventional peak limiter set at -1 dBFS would still allow true peaks above 0 dBFS
            because it only monitors discrete samples, not the continuous reconstruction. A true
            peak limiter oversamples the signal internally, calculates where inter-sample peaks
            would occur, and catches those too.
          </p>
          <p className="leading-relaxed mt-3">
            Streaming platforms specify true peak limits (typically -1 dBTP) rather than sample
            peak limits for this reason. MP3 encoding in particular is known to create inter-sample
            peaks that can cause clipping on playback even when the source measured clean.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The relationship between limiters and loudness</h2>
          <p className="leading-relaxed">
            A limiter alone doesn't make audio loud. It prevents peaks from exceeding a ceiling.
            What makes audio loud is gain — increasing the overall level of the signal. The limiter
            allows higher average levels by catching the peaks that would otherwise clip.
          </p>
          <p className="leading-relaxed mt-3">
            The typical mastering workflow: set a ceiling on the limiter (-1 dBTP), then increase
            the input gain until the desired loudness is reached. As input gain increases, the
            limiter works harder — more peaks hit the ceiling and get reduced. The louder the
            master, the more limiting occurs, and the more dynamic range is sacrificed.
          </p>
          <p className="leading-relaxed mt-3">
            This is what drove the loudness wars in commercial music production — engineers
            discovered that louder music seemed to sound better to casual listeners when compared
            A/B at different levels. The response was to push limiters harder and harder until
            the dynamic range of commercial releases was severely compressed. Streaming platforms
            now normalise playback levels (targeting -14 LUFS on most services), which removed
            the competitive advantage of extreme limiting — a louder master simply gets turned down.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Limiter settings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Parameter</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">What it does</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Typical setting</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Ceiling / Output', 'The maximum output level — nothing gets through above this', '-1 dBTP for streaming; -0.3 to -0.5 dBFS for CD'],
                  ['Input gain / Drive', 'How much gain is added before limiting — determines how hard the limiter works', 'Adjusted to target loudness (e.g. -14 LUFS for streaming)'],
                  ['Attack', 'How quickly the limiter engages when a peak exceeds the ceiling', 'Near zero — fast attack catches transients before they clip'],
                  ['Release', 'How quickly gain is restored after a peak', 'Auto or short (1–50 ms) — longer release sounds smoother but pumps'],
                  ['Lookahead', 'Reads audio slightly ahead in time to anticipate peaks', '0.5–2 ms — eliminates transient breakthrough at the ceiling'],
                ].map(([param, what, typical]) => (
                  <tr key={param} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{param}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 text-xs">{what}</td>
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-800">{typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Convert your mastered WAV for distribution' },
          { href: '/wav-to-flac', label: 'WAV to FLAC', note: 'Lossless archive of your mastered file'     },
          { href: '/wav-to-aac',  label: 'WAV to AAC',  note: 'Streaming-ready format from mastered WAV'  },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-clipping',           label: 'What Is Clipping?'          },
          { href: '/wiki/what-is-loudness',            label: 'What Is Loudness?'          },
          { href: '/wiki/what-is-normalization',       label: 'What Is Normalization?'     },
          { href: '/wiki/what-is-gain-staging',        label: 'What Is Gain Staging?'      },
          { href: '/wiki/what-is-mixing-mastering',    label: 'What Is Mixing & Mastering?' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
