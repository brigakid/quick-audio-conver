import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Distortion in Audio? Damage vs Creative Effect',
  description:
    'Distortion means audio altered beyond its original waveform. Sometimes it\'s accidental damage. Sometimes it\'s the entire creative point — electric guitar, tape saturation, lo-fi aesthetics.',
  openGraph: {
    title: 'What Is Distortion in Audio? Damage vs Creative Effect',
    description:
      'Distortion means audio altered beyond its original waveform. Sometimes it\'s accidental damage. Sometimes it\'s the entire creative point — electric guitar, tape saturation, lo-fi aesthetics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Distortion in Audio? Damage vs Creative Effect',
    description:
      'Distortion means audio altered beyond its original waveform. Sometimes it\'s accidental damage. Sometimes it\'s the entire creative point — electric guitar, tape saturation, lo-fi aesthetics.',
  },
};

export default function WhatIsDistortionPage() {
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
          What Is Distortion in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Distortion is one of the most unwanted sounds in a studio vocal recording and one of the
        most desired sounds in a rock song. Same phenomenon — the waveform is altered beyond its
        original shape — completely different contexts. Whether distortion is a problem or a tool
        depends entirely on whether it was intentional.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What distortion means technically</h2>
          <p className="leading-relaxed">
            In technical terms, distortion means any change to the shape of an audio waveform
            that wasn't in the original signal. The input goes in; the output comes out different.
            The difference between them — whatever was added or modified — is distortion.
          </p>
          <p className="leading-relaxed mt-3">
            By this broad definition, even a microphone with imperfect frequency response
            introduces distortion. In practice, "distortion" usually refers specifically to
            nonlinear distortion — where the circuit or process doesn't handle all signal
            levels uniformly, causing the output to deviate from a clean amplification of the
            input.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Types of distortion</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Origin</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Character</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Intentional?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Hard digital clipping', 'Signal exceeds 0 dBFS; waveform cut flat', 'Harsh, buzzy, unpleasant', 'Rarely — usually a recording mistake'],
                  ['Soft clipping', 'Gradual saturation, rounded peaks', 'Warmer, more musical than hard clipping', 'Often — tube amp emulation, saturation plugins'],
                  ['Tape saturation', 'Magnetic tape overloading at high levels', 'Warm, harmonically rich, slight compression', 'Very common — adds "analog warmth"'],
                  ['Overdrive', 'Moderate gain applied to guitar amp or pedal', 'Growl, sustain, added harmonics', 'Yes — fundamental to rock and blues guitar'],
                  ['Fuzz / heavy distortion', 'Extreme clipping, often waveform squared off', 'Aggressive, sustaining, wall of sound', 'Yes — stylistic effect'],
                  ['Intermodulation (IM)', 'Multiple frequencies distorting together, creating sum/difference tones', 'Muddy, inharmonic, unpleasant', 'Almost never — a sign of poor equipment'],
                ].map(([type, origin, character, intentional]) => (
                  <tr key={type} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{origin}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{character}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">{intentional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why some distortion sounds musical</h2>
          <p className="leading-relaxed">
            When a signal is distorted, new frequencies are added to the output. These are called
            harmonics — multiples of the original frequency. A note at 440 Hz (A4) might generate
            harmonics at 880 Hz, 1320 Hz, 1760 Hz, and so on.
          </p>
          <p className="leading-relaxed mt-3">
            Even harmonics (2nd, 4th, 6th) are musically related to the original note — they're
            the octave, the double octave. Tube amplifiers and tape saturation tend to generate
            primarily even harmonics, which is why they sound "warm" rather than harsh. The added
            harmonics feel musically integrated.
          </p>
          <p className="leading-relaxed mt-3">
            Odd harmonics (3rd, 5th, 7th) are less musically related — they're the fifth, the
            third, the seventh in a way that clashes rather than blends. Hard digital clipping
            generates a mix of odd and even harmonics with a strong odd-harmonic component, which
            is why it sounds harsh and unpleasant.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Total Harmonic Distortion (THD)</h2>
          <p className="leading-relaxed">
            THD is a measurement of how much harmonic content a piece of audio equipment adds
            to a signal. It's expressed as a percentage — the ratio of harmonic content to the
            original signal. A microphone preamp specified at 0.001% THD adds an extremely
            small amount of distortion; a guitar amp running into clipping might add 20% or more.
          </p>
          <p className="leading-relaxed mt-3">
            For transparent, studio-quality equipment, THD below 0.01% is generally inaudible.
            For intentional character (tube preamps, analog tape), higher THD is a feature, not
            a bug — it's what gives the equipment its sonic personality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Distortion and audio conversion</h2>
          <p className="leading-relaxed">
            Lossy audio codecs don't add classic distortion — they use psychoacoustic compression
            rather than waveform clipping. However, at very low bitrates they introduce their own
            form of spectral distortion: the smearing and artifact sounds that emerge when the
            encoder makes poor decisions about what to discard.
          </p>
          <p className="leading-relaxed mt-3">
            The important distinction: if audio already contains intentional distortion (guitar
            overdrive, tape saturation), that's baked into the signal before encoding. The codec
            treats it like any other audio content. If you're encoding a distorted guitar at
            192 kbps MP3, the encoded file will faithfully reproduce the distortion — it was
            always just audio data.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-clipping',          label: 'What Is Clipping?'        },
          { href: '/wiki/what-is-gain-staging',      label: 'What Is Gain Staging?'    },
          { href: '/wiki/what-is-audio-quality',     label: 'What Is Audio Quality?'   },
          { href: '/wiki/what-is-audio-artifacting', label: 'What Is Audio Artifacting?' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
