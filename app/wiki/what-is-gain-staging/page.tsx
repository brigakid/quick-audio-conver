import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Gain Staging? Managing Audio Levels Through the Chain',
  description:
    'Gain staging means managing signal levels at each step of an audio chain — not too quiet (noise) and not too loud (clipping). It\'s the foundation of clean-sounding recordings.',
  openGraph: {
    title: 'What Is Gain Staging? Managing Audio Levels Through the Chain',
    description:
      'Gain staging means managing signal levels at each step of an audio chain — not too quiet (noise) and not too loud (clipping). It\'s the foundation of clean-sounding recordings.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Gain Staging? Managing Audio Levels Through the Chain',
    description:
      'Gain staging means managing signal levels at each step of an audio chain — not too quiet (noise) and not too loud (clipping). It\'s the foundation of clean-sounding recordings.',
  },
};

export default function WhatIsGainStagingPage() {
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
          What Is Gain Staging?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Gain staging means setting the signal level correctly at each step of the audio chain.
        <strong> Too quiet and you amplify noise. Too loud and you get clipping.</strong> Good
        gain staging keeps the signal in a range where it's clean and has headroom for dynamic
        peaks — typically targeting -18 to -12 dBFS during recording.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The two problems gain staging solves</h2>
          <p className="leading-relaxed">
            Every signal in an audio chain has a noise floor — a baseline level of background
            noise below which the signal is inaudible. There's also a ceiling — 0 dBFS in digital
            audio — above which the signal clips. Good gain staging keeps the useful signal
            comfortably between these two extremes at every step of the chain.
          </p>
          <p className="leading-relaxed mt-3">
            Recording too quietly (say, -40 dBFS peaks) means when you later boost the level
            to a normal range, you also boost everything below the signal: the noise floor,
            the hiss, the electrical interference. The boosted noise is now audible. Recording
            too loudly means peaks clip the digital ceiling, creating harsh distortion that
            can't be undone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The signal chain</h2>
          <p className="leading-relaxed">
            A typical recording signal chain has multiple stages, each with its own gain
            control. Gain staging means each stage hands the signal to the next at an appropriate
            level.
          </p>

          {/* Signal flow */}
          <div className="mt-4 bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Recording signal flow</p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono text-gray-700">
              {[
                'Microphone',
                '→',
                'Preamp gain',
                '→',
                'Audio interface',
                '→',
                'DAW input gain',
                '→',
                'Plugin chain',
                '→',
                'DAW fader',
                '→',
                'Master bus',
                '→',
                'Export',
              ].map((item, i) => (
                item === '→' ? (
                  <span key={i} className="text-gray-400">{item}</span>
                ) : (
                  <span key={i} className="bg-white border border-gray-200 rounded px-2 py-1">{item}</span>
                )
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Each stage has gain that needs to be set correctly.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The sweet spot: headroom</h2>
          <p className="leading-relaxed">
            Headroom is the difference between your signal level and the digital ceiling (0 dBFS).
            A signal peaking at -12 dBFS has 12 dB of headroom. This matters because transients —
            the sharp, fast attacks of drums, piano, hand claps — can be significantly louder
            than the sustained average level. Without headroom, these transients clip.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Stage</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Target level (peaks)</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Recording / input',    '-18 to -12 dBFS',  'Leaves headroom for transients; keeps signal well above noise floor'],
                  ['Individual tracks',    '-18 to -12 dBFS',  'Gives plugins headroom; plugin processing can increase levels'],
                  ['Plugin outputs',       '-12 to -6 dBFS',   'Ensure no plugin is clipping its output into the next in chain'],
                  ['Master bus (pre-limit)','Up to -6 dBFS',   'Leave room for the limiter to catch peaks'],
                  ['Final export',         '-1 dBTP (true peak)', 'Platform standard; prevents digital clipping on decoding'],
                ].map(([stage, target, why]) => (
                  <tr key={stage} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{stage}</td>
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-800">{target}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common gain staging mistakes</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Recording too quietly:</span>
              <span>Setting the input gain too low to avoid any risk of clipping. The result is a signal buried in noise that requires significant amplification in post.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Using faders as gain controls:</span>
              <span>Cranking a DAW fader to +10 dB to make up for a quiet recording — this adds gain after the signal has already been captured at a poor level, along with everything below it.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Ignoring plugin gain:</span>
              <span>Some plugins add significant gain to their output. An EQ boosting 6 dB at a key frequency can push the signal into clipping further down the chain if the output isn't checked.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Not checking the master bus:</span>
              <span>Individual tracks look fine, but the summed master bus is clipping because the combination of many signals adds up to more than any single track showed.</span>
            </li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-clipping',      label: 'What Is Clipping?'      },
          { href: '/wiki/what-is-distortion',    label: 'What Is Distortion?'    },
          { href: '/wiki/what-is-loudness',      label: 'What Is Loudness?'      },
          { href: '/wiki/what-is-a-limiter',     label: 'What Is a Limiter?'     },
          { href: '/wiki/what-is-normalization', label: 'What Is Normalization?'  },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
