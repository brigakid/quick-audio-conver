import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Reverb in Audio? Room, Plate, Hall, and Why It Matters',
  description:
    'Reverb is the persistence of sound after the source stops — the natural result of sound bouncing off surfaces. In audio production, it places sounds in imaginary spaces.',
};

export default function WhatIsReverbPage() {
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
          What Is Reverb in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Reverb — reverberation — is the persistence of sound after its source has stopped. In a
        real room, sound bounces off walls, floor, and ceiling, arriving at your ears slightly
        later from many different directions. Those reflections are reverb. In audio production,
        reverb processors simulate this acoustic behaviour to place dry, isolated recordings into
        a convincing imaginary space.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why reverb exists in nature</h2>
          <p className="leading-relaxed">
            Clap your hands in a large church. You hear the clap, then a wash of sound that fades
            gradually over one or two seconds — the clap reflected off every hard surface in the
            building. Clap in a clothes-lined closet and you hear almost nothing — all the soft
            surfaces absorb the sound before it can reflect.
          </p>
          <p className="leading-relaxed mt-3">
            The time it takes for reflections to decay by 60 dB (become inaudible) is called
            RT60 — reverb time at 60 dB of decay. A tiled bathroom might have an RT60 of 0.5–1 s.
            A large cathedral might have RT60 of 4–8 seconds. A sound-treated recording booth
            might approach 0.1 s or less.
          </p>
          <p className="leading-relaxed mt-3">
            When recording in a studio, engineers often use a dead-sounding booth — minimal
            natural reverb — specifically so that reverb can be added later with precise control.
            Recording in a naturally reverberant space bakes that sound in permanently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Types of reverb</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">How it works</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Character</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Common use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Room', 'Simulates a small to mid-sized enclosed space', 'Natural, short, adds presence without washing out', 'Drums, vocals — adding realism'],
                  ['Hall', 'Simulates a large concert or recital hall', 'Long, lush, pronounced late reverb tail', 'Orchestral, ambient, cinematic'],
                  ['Plate', 'Emulates a large vibrating metal plate (original 1950s hardware)', 'Bright, smooth, slightly metallic tail', 'Vocals, snare drum — classic studio sound'],
                  ['Spring', 'Emulates a spring reverb tank (found in guitar amps)', 'Bouncy, distinctive "twang" on the decay', 'Guitar, vintage keyboard, surf rock'],
                  ['Convolution (IR)', 'Uses impulse responses: recordings of actual spaces', 'Highly realistic, can capture any real space', 'Realistic room placement, film scoring'],
                  ['Shimmer', 'Pitch-shifted, harmonic reverb', 'Ethereal, swelling, ambient', 'Ambient music, guitar pads, film scoring'],
                ].map(([type, how, character, use]) => (
                  <tr key={type} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{how}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{character}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The key reverb parameters</h2>

          <div className="mt-4 bg-slate-50 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Main controls</p>
            {[
              ['Pre-delay', 'The gap between the dry sound and the first reverb reflection. Allows the initial transient to cut through before the reverb begins — longer pre-delay keeps vocals intelligible in a large hall.'],
              ['Decay / RT60', 'How long the reverb tail lasts before fading to silence. Short (0.3–0.8s) for clarity, long (2s+) for atmosphere.'],
              ['Size / Room size', 'Controls the simulated dimensions of the space. Larger room = longer, more spread-out early reflections.'],
              ['Damping / HF damping', 'How much the high frequencies are absorbed in the tail. Real rooms absorb highs faster; damping mimics this. High damping = warmer, more natural tail.'],
              ['Wet/Dry mix', 'The ratio of reverb to original signal. On a send/return setup, the reverb channel is typically 100% wet; the blend is controlled by the send level.'],
            ].map(([param, description]) => (
              <div key={param as string} className="flex gap-3">
                <span className="text-brand font-semibold flex-shrink-0 text-sm">{param}:</span>
                <span className="text-sm text-gray-600">{description}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Sends vs inserts</h2>
          <p className="leading-relaxed">
            Reverb is almost always used as a send effect, not an insert. An insert applies the
            reverb directly to one track and affects only that track. A send routes signal from
            multiple tracks to a shared reverb bus — the vocal, guitar, and piano all going to
            the same reverb — which creates the illusion that they exist in the same room.
          </p>
          <p className="leading-relaxed mt-3">
            Using separate reverbs on every instrument tends to sound diffuse and unfocused.
            Using one shared reverb (or two: a room and a hall) and varying how much each
            instrument sends to it creates a more coherent space. Elements receiving more reverb
            appear further back in the mix; elements with less or no reverb appear closer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Reverb in recordings you convert</h2>
          <p className="leading-relaxed">
            Reverb applied during mixing is baked into the exported audio file — there is no
            separate reverb layer to remove or adjust. If you convert an MP3 to WAV, the reverb
            in the recording stays exactly as it was. Changing the file format does not change
            anything about how the audio was processed; it only changes the encoding.
          </p>
          <p className="leading-relaxed mt-3">
            If you receive a recording with too much reverb, format conversion cannot help. Reverb
            removal is a separate tool (iZotope RX, Adobe Audition's Reverb Reduction), and even
            then, it works imperfectly because the reverb tail is mixed into the same signal as
            the dry audio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common reverb mistakes</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Too much on vocals:</span>
              <span>A small amount of reverb adds space and presence. A large amount pushes the vocal back and makes it hard to understand — particularly in detailed passages.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Wrong reverb time for the tempo:</span>
              <span>Long reverb tails in fast music blur together. A reverb with a 2-second decay on a 160 BPM track becomes a muddy wash. Match the reverb time to the track's tempo.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">No pre-delay on vocals:</span>
              <span>Without pre-delay, the reverb starts immediately on the first consonant and smears the beginning of every word. Even 20–30ms of pre-delay improves clarity significantly.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Reverb on bass and kick:</span>
              <span>Low-frequency reverb builds up quickly and creates mud. High-pass filter the reverb return or avoid reverb on low-frequency instruments entirely.</span>
            </li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Reverb is baked in — the format is your last choice' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless source, processing preserved through conversion' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-delay',              label: 'What Is Delay?'             },
          { href: '/wiki/what-is-eq',                 label: 'What Is EQ?'                },
          { href: '/wiki/what-is-mixing-mastering',   label: 'What Is Mixing & Mastering?' },
          { href: '/wiki/what-is-panning',            label: 'What Is Panning?'           },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
