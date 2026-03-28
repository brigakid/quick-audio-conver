import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Delay in Audio? Echo, Slap-Back, and Tempo Sync',
  description:
    'Delay is a time-based effect that repeats a sound after a set interval. From subtle slap-back to cascading echoes, here\'s how delay works and how it\'s used.',
};

export default function WhatIsDelayPage() {
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
          What Is Delay in Audio?
        </h1>
      </div>

      <QuickAnswer>
        Delay is a time-based effect that plays back a copy of the audio signal after a set time
        interval. At short intervals it sounds like a doubled track or a slap-back echo; at longer
        intervals it becomes a distinct echo that repeats. Most delay effects use <strong>feedback</strong> —
        routing the output back into the input — to create multiple repeating echoes that fade
        over time.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How delay works</h2>
          <p className="leading-relaxed">
            A delay stores the incoming audio in a buffer and plays it back after a specified
            time — the delay time. At its simplest, that's a single echo. With feedback (also
            called regeneration), the delayed output is fed back into the input, creating a
            second echo at the same interval, then a third, then a fourth — each one quieter
            than the last until they fade below audibility.
          </p>

          {/* Signal flow */}
          <div className="mt-4 bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Delay signal path</p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono text-gray-700">
              {[
                'Input',
                '→',
                'Buffer (delay time)',
                '→',
                'Output (wet)',
                '→',
                'Feedback loop',
                '→',
                'Back to buffer',
              ].map((item, i) => (
                item === '→' ? (
                  <span key={i} className="text-gray-400">{item}</span>
                ) : (
                  <span key={i} className="bg-white border border-gray-200 rounded px-2 py-1">{item}</span>
                )
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Feedback amount controls how many repeats occur before the signal fades.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Delay time and tempo sync</h2>
          <p className="leading-relaxed">
            Delay time can be set in milliseconds (absolute time) or synced to the tempo of
            the track in rhythmic subdivisions. Tempo-synced delay is fundamental to how delay
            sounds musical rather than arbitrary — a delay set to a dotted eighth note at 120 BPM
            creates a rhythmic pattern that complements the beat rather than fighting it.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Subdivision</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">At 120 BPM</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Character</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Quarter note', '500 ms', 'One echo per beat — spacious, clear'],
                  ['Dotted eighth note', '375 ms', 'Classic rhythmic delay — pulls against the beat in an interesting way'],
                  ['Eighth note', '250 ms', 'Tight echo; adds rhythmic density'],
                  ['Sixteenth note', '125 ms', 'Very short; doubles the sound or adds shimmer'],
                  ['Triplet eighth note', '167 ms', 'Polyrhythmic feel against straight time'],
                ].map(([sub, time, char]) => (
                  <tr key={sub} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{sub}</td>
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-800">{time}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 text-xs">{char}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Types of delay</h2>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Slap-back delay:</span>
              <span>A very short single echo (50–150 ms) with no feedback. Creates the impression of a doubled track or a small reflective space. Associated with classic rockabilly and early rock vocals, and with electric guitar tones from the 1950s–60s.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Ping-pong delay:</span>
              <span>Echoes alternate between left and right channels, creating a bouncing effect across the stereo field. Particularly noticeable on headphones.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Tape delay:</span>
              <span>Emulates vintage tape echo units — slight pitch variation as the tape warbles, high-frequency rolloff on the repeats, and a distinctive analog saturation character. Warmer and less pristine than digital delay.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Multi-tap delay:</span>
              <span>Multiple independent echoes at different times, each with their own level. Allows complex rhythmic patterns from a single input signal.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Modulated delay (chorus/flanger):</span>
              <span>The delay time is modulated (varied slightly) by an LFO. At very short delay times with modulation, this creates chorus or flanging rather than distinct echoes.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Delay vs reverb</h2>
          <p className="leading-relaxed">
            Delay and reverb are both time-based effects that add space to a sound, but they
            work differently and serve different purposes.
          </p>
          <p className="leading-relaxed mt-3">
            Reverb simulates the diffuse reflections of a space — hundreds of closely spaced
            echoes that blend into a continuous tail. The individual reflections aren't
            distinguishable; you hear the texture of a room.
          </p>
          <p className="leading-relaxed mt-3">
            Delay produces distinct, audible repetitions at set time intervals. You can hear
            each echo individually. This makes delay a rhythmic tool as much as a spatial one —
            it can create rhythmic patterns, double a sound, or add a sense of movement that
            pure reverb doesn't provide.
          </p>
          <p className="leading-relaxed mt-3">
            The two effects are frequently used together: delay for rhythmic movement and
            presence, reverb for depth and acoustic space.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Practical uses in mixing</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Vocal depth:</span>
              <span>A subtle delay (50–100 ms, low feedback, kept quiet in the mix) adds width and dimension without audible echoes.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Rhythmic interest:</span>
              <span>A dotted eighth note delay on a guitar phrase creates a counterpoint rhythm that feels larger than a single guitar line.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Ear candy:</span>
              <span>Automate the delay to only engage at the end of phrases — the tail echoes into the space between words or notes, then cuts when the next phrase starts.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Widening mono sources:</span>
              <span>A short delay (20–30 ms) panned opposite to the original creates the Haas effect — the brain perceives width without an obvious echo.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Delay in audio files you receive</h2>
          <p className="leading-relaxed">
            Like reverb, delay effects applied during recording or mixing are baked into the
            exported audio. You cannot remove delay from a finished file by converting it to a
            different format. An MP3 with delay echoes converted to WAV is a WAV with delay
            echoes — the encoding changes, the audio content does not.
          </p>
          <p className="leading-relaxed mt-3">
            At very low bitrates (below 128 kbps), the encoder has fewer bits to represent
            transient detail — short, single-repeat echoes may lose some of their crispness
            compared to the source. At reasonable bitrates (192 kbps+), this is not a
            practical concern.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Effects are permanent — format is what remains' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless source, effects preserved through conversion' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-reverb',             label: 'What Is Reverb?'            },
          { href: '/wiki/what-is-eq',                 label: 'What Is EQ?'                },
          { href: '/wiki/what-is-panning',            label: 'What Is Panning?'           },
          { href: '/wiki/what-is-mixing-mastering',   label: 'What Is Mixing & Mastering?' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
