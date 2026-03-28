import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Panning in Audio? Stereo Placement and the Stereo Field',
  description:
    'Panning places audio in the stereo field — left, right, or centre. It\'s how a mix sounds wide rather than flat. Here\'s how panning works and the practical rules for using it.',
};

export default function WhatIsPanningPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Production</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Panning in Audio?
        </h1>
      </div>

      <QuickAnswer>
        Panning determines where a sound appears in the stereo field — how far left or right it
        is placed between the two speakers or headphone channels. A signal panned hard left is
        heard only in the left channel; panned centre it's equal in both; panned hard right only
        in the right. Panning is how a mix creates width and gives each element its own space.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What a stereo field is</h2>
          <p className="leading-relaxed">
            Stereo audio uses two channels — left and right — to create the impression of
            sound occurring across a physical space. When different sounds are sent to different
            proportions of left and right, the listener perceives them as coming from different
            locations. The full range from hard left to hard right is called the stereo field.
          </p>

          {/* Visual stereo field */}
          <div className="mt-4 bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Stereo field</p>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="font-mono bg-white border border-gray-200 rounded px-2 py-1">Hard L</span>
              <span className="font-mono bg-white border border-gray-200 rounded px-2 py-1">L</span>
              <span className="font-mono bg-white border border-gray-200 rounded px-3 py-1 border-brand text-brand font-semibold">Centre</span>
              <span className="font-mono bg-white border border-gray-200 rounded px-2 py-1">R</span>
              <span className="font-mono bg-white border border-gray-200 rounded px-2 py-1">Hard R</span>
            </div>
            <div className="mt-2 h-1 bg-gradient-to-r from-blue-200 via-brand to-blue-200 rounded-full opacity-50" />
            <p className="text-xs text-gray-500 mt-2">Most elements sit somewhere between hard left and hard right.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How panning works technically</h2>
          <p className="leading-relaxed">
            A mono signal panned to centre sends equal level to both channels. Panned left,
            the signal is reduced in the right channel and maintained (or boosted) in the left.
            At hard left, only the left channel carries the signal; the right receives nothing.
          </p>
          <p className="leading-relaxed mt-3">
            Different DAWs and devices use different pan laws to manage this. The most common
            is -3 dB pan law — a signal panned centre is reduced 3 dB in each channel relative
            to a signal sent to only one channel. This compensates for the perceived loudness
            increase when a signal adds to both channels simultaneously. Some systems use -6 dB
            or 0 dB pan laws; the result sounds different on each.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Conventional panning in a mix</h2>
          <p className="leading-relaxed">
            Most mixes follow loose conventions about where elements live in the stereo field.
            These aren't rules — they're starting points based on what tends to sound coherent.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Element</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Typical position</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Kick drum', 'Centre', 'Low-frequency anchor; panning it off-centre creates imbalance'],
                  ['Snare', 'Centre or slightly left', 'Main backbeat; usually centre; slight left mirrors live drum kit perspective'],
                  ['Bass guitar', 'Centre', 'Same as kick — low frequencies need to anchor the mix'],
                  ['Lead vocal', 'Centre', 'The focal point of most music; needs to be centred for impact'],
                  ['Rhythm guitars', 'Hard L / Hard R (pair)', 'Creates width; two similar guitar parts, one left, one right'],
                  ['Hi-hat / cymbals', 'Slight R (audience perspective)', 'Mirrors where hi-hat sits in a real drum kit'],
                  ['Piano', 'Spread across the field', 'Often panned as a stereo pair — low notes left, high notes right'],
                  ['Backing vocals', 'Spread L and R', 'Complements without competing with lead vocal at centre'],
                ].map(([elem, pos, why]) => (
                  <tr key={elem} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{elem}</td>
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-800">{pos}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 text-xs">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mono compatibility</h2>
          <p className="leading-relaxed">
            A significant portion of audio is played back in mono — phone speakers, smart
            speakers, some radio broadcasting, and any situation where only one speaker is used.
            When a stereo mix is summed to mono, signals panned to opposite extremes can cancel
            each other out (phase cancellation) or simply lose their apparent separation.
          </p>
          <p className="leading-relaxed mt-3">
            Elements that rely entirely on panning for their placement — like a wide synth pad
            or a heavily panned guitar — can disappear or sound hollow in mono. Check your mix
            in mono periodically during mixing to ensure nothing important is lost or damaged.
          </p>
          <p className="leading-relaxed mt-3">
            Low-frequency elements (kick, bass) are panned centre specifically for this reason:
            low frequencies consume significant power in speakers and are non-directional anyway
            — panning them doesn't meaningfully change where they seem to come from, but it
            does mean they'll be present at full level in mono.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Panning in mono recordings and files</h2>
          <p className="leading-relaxed">
            A mono audio file — one channel, not two — has no panning information. When you
            load a mono file into a stereo DAW track, the panner controls where it sits in
            the stereo field. The file itself has no panning baked in; that's determined by
            the playback setup.
          </p>
          <p className="leading-relaxed mt-3">
            A stereo audio file has the panning decisions permanently encoded as the difference
            between left and right channel levels. When you convert a stereo file to mono — whether
            through a converter or during export — all panning information is lost. The mix collapses
            to a sum of both channels. A guitar panned hard left and a vocal panned centre will both
            land at centre; nothing distinguishes their positions anymore.
          </p>
          <p className="leading-relaxed mt-3">
            This has a practical consequence for converting stereo content: converting to mono is
            a one-way operation. You can go from stereo to mono, but you cannot reconstruct the
            original stereo field from a mono file. If you need to preserve the full mix, always
            keep the stereo version.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Stereo WAV to MP3 — left/right panning preserved' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Stereo field intact — panning decisions survive format conversion' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-mono-stereo',         label: 'What Is Mono vs Stereo?'    },
          { href: '/wiki/what-is-mixing-mastering',    label: 'What Is Mixing & Mastering?' },
          { href: '/wiki/what-is-eq',                  label: 'What Is EQ?'                },
          { href: '/wiki/what-is-reverb',              label: 'What Is Reverb?'            },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
