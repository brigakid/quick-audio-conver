import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Frequency in Audio? Pitch, Hz, and the Audible Spectrum',
  description:
    'Frequency is measured in Hz and determines pitch — low Hz is bass, high Hz is treble. Here\'s how the audible spectrum maps to what you hear, and why it matters for audio.',
  openGraph: {
    title: 'What Is Frequency in Audio? Pitch, Hz, and the Audible Spectrum',
    description:
      'Frequency is measured in Hz and determines pitch — low Hz is bass, high Hz is treble. Here\'s how the audible spectrum maps to what you hear, and why it matters for audio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Frequency in Audio? Pitch, Hz, and the Audible Spectrum',
    description:
      'Frequency is measured in Hz and determines pitch — low Hz is bass, high Hz is treble. Here\'s how the audible spectrum maps to what you hear, and why it matters for audio.',
  },
};

export default function WhatIsFrequencyPage() {
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
          What Is Frequency in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Frequency is the number of times a sound wave completes a full cycle per second, measured
        in Hertz (Hz). <strong>Low frequency = low pitch (bass). High frequency = high pitch (treble).</strong>{' '}
        Human hearing spans roughly 20 Hz to 20,000 Hz (20 kHz). Most of what makes audio sound
        full, clear, or thin happens across this range.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Frequency is cycles per second</h2>
          <p className="leading-relaxed">
            Sound travels as pressure waves — alternating compressions and expansions in the air.
            One complete compression and expansion is one cycle. The number of times that cycle
            happens per second is the frequency, measured in Hertz (Hz). 1 Hz = 1 cycle per second.
          </p>
          <p className="leading-relaxed mt-3">
            The lowest note on a bass guitar vibrates at about 41 Hz — 41 complete cycles per
            second. Middle A on a piano (A4) vibrates at exactly 440 Hz. The highest note on a
            piano is about 4,186 Hz. A cymbal crash contains frequencies up to 16,000 Hz and
            beyond — frequencies you feel as much as hear.
          </p>
          <p className="leading-relaxed mt-3">
            Pitch and frequency are directly related. Higher frequency = higher pitch. Lower
            frequency = lower pitch. Every musical note corresponds to a specific frequency.
            When a musician tunes their instrument, they're adjusting the frequency of the
            vibration.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The audible spectrum</h2>
          <p className="leading-relaxed">
            Human hearing spans approximately 20 Hz to 20,000 Hz — though this varies
            significantly by person and age. Most adults over 40 have meaningful hearing loss
            above 12–14 kHz. This is relevant to audio engineering because it influences what
            needs to be preserved in recordings.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Range</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Name</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">What you hear</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['20–60 Hz',      'Sub-bass',      'Deep rumble — felt more than heard', 'Bass synth sub, kick drum thump'],
                  ['60–250 Hz',     'Bass',          'Warmth, body, power',                'Bass guitar, kick drum, bass vocals'],
                  ['250–500 Hz',    'Low-mid',       'Fullness vs muddiness',              'Male vocals, acoustic guitar body'],
                  ['500 Hz–2 kHz',  'Midrange',      'Presence, clarity',                  'Most vocals, snare, guitar'],
                  ['2–6 kHz',       'Upper-mid',     'Attack, articulation, "presence"',   'Vocal intelligibility, piano attack'],
                  ['6–12 kHz',      'High (air)',    'Brightness, detail, sparkle',        'Cymbals, sibilance, breath'],
                  ['12–20 kHz',     'Ultra-high',    'Air, space, shimmer',                'Overhead microphones, room ambience'],
                ].map(([range, name, char, examples]) => (
                  <tr key={range} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-700">{range}</td>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{name}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{char}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What human hearing can and can't perceive</h2>
          <p className="leading-relaxed">
            The 20–20,000 Hz range is often cited as the limits of human hearing, but the reality
            is more nuanced. Sensitivity isn't flat across the spectrum. Human hearing is most
            sensitive around 2–5 kHz — roughly where speech intelligibility lives. Sensitivity
            drops off significantly at the very low and very high ends.
          </p>
          <p className="leading-relaxed mt-3">
            This uneven sensitivity is exactly what audio codecs exploit. When an MP3 encoder
            uses its psychoacoustic model to decide what to discard, high frequencies go first
            at lower bitrates — because the ears are least sensitive there. Sub-bass also gets
            reduced. The midrange, where hearing is most acute, is preserved most carefully.
          </p>
          <p className="leading-relaxed mt-3">
            Age matters significantly. Children can hear up to 20 kHz clearly. Most adults over
            40 begin to lose meaningful sensitivity above 12–14 kHz. Above 60, the upper limit
            often drops to 10 kHz or less. Audio engineering content aimed at "hi-res audio"
            sometimes overlooks this — the frequencies being preserved may already be inaudible
            to much of the audience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What frequency range matters for intelligibility</h2>
          <p className="leading-relaxed">
            Not all frequencies are equally important for understanding spoken content. The
            fundamental frequencies of human speech sit between about 300 Hz and 3,000 Hz.
            The higher frequencies — above 3 kHz — carry consonants: the sounds that distinguish
            "s" from "sh", "p" from "b", "t" from "d". Without high-frequency content, speech
            becomes muddy and hard to understand.
          </p>
          <p className="leading-relaxed mt-3">
            Telephone calls are limited to roughly 300 Hz–3,400 Hz — the narrowest range that
            still allows reasonable speech intelligibility. FM radio extends a bit higher; most
            broadcast codecs preserve at least up to 15 kHz for music.
          </p>
          <p className="leading-relaxed mt-3">
            For voice recordings — podcasts, audiobooks, interviews — the full audible spectrum
            isn't critical. Clear capture of the 300 Hz–8 kHz range is the priority. For music,
            the full spectrum matters: high-frequency content is what gives cymbals their shimmer,
            instruments their breath, and recordings their sense of space.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Age and hearing range: what this means for quality decisions</h2>
          <p className="leading-relaxed">
            The 20–20,000 Hz range is the theoretical maximum for young, healthy human hearing.
            In practice, most adults progressively lose sensitivity in the upper frequencies with
            age. By 40, it's common to have significant sensitivity loss above 12–14 kHz. By 60,
            the upper limit can drop to 10 kHz or lower.
          </p>
          <p className="leading-relaxed mt-3">
            This has practical implications for audio format decisions. The case for high-resolution
            audio (96 kHz, 192 kHz) often emphasises frequency content above 20 kHz — ultrasonic
            range that most adults genuinely cannot hear. For the majority of listeners, the
            audible difference between a 44.1 kHz/16-bit lossless file and a 96 kHz/24-bit file
            is essentially zero.
          </p>
          <p className="leading-relaxed mt-3">
            For everyday listening, voice content, and distribution: preserving the 20 Hz–16 kHz
            range accurately is sufficient for virtually all audiences. The top octave of theoretical
            human hearing is, for most people most of the time, already gone.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-sample-rate',   label: 'What Is Sample Rate?'    },
          { href: '/wiki/what-is-eq',            label: 'What Is EQ?'             },
          { href: '/wiki/what-is-bitrate',       label: 'What Is Bitrate?'        },
          { href: '/wiki/what-is-audio-codec',   label: 'What Is an Audio Codec?' },
          { href: '/wiki/what-is-lossy-audio',   label: 'What Is Lossy Audio?'    },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/key-changer',                                           label: 'Key Changer & Detector',           note: 'Shift audio pitch by semitones online' },
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality', label: 'How Bitrate Affects Sound Quality' },
          { href: '/learn/best-audio-format-for-voice-recordings',          label: 'Best Format for Voice Recordings'  },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
