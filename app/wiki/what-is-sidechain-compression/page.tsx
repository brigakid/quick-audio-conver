import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Sidechain Compression? The Pumping Effect Explained',
  description:
    'Sidechain compression uses one audio signal to control the dynamics of another. The kick drum makes the bass duck. The vocal pushes the music down. Here\'s how it works.',
};

export default function WhatIsSidechainCompressionPage() {
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
          What Is Sidechain Compression?
        </h1>
      </div>

      <QuickAnswer>
        Sidechain compression uses one audio signal — the sidechain input — to control the
        compression of another. When the sidechain signal gets loud, the compressed track gets
        turned down. When the sidechain quiets, the compressed track returns to normal level.
        The classic example: routing the kick drum into the sidechain of a bass compressor so
        the bass ducks every time the kick hits, making both elements audible without clashing.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How compression normally works</h2>
          <p className="leading-relaxed">
            In standard compression, the detector — the part of the compressor that decides when
            to reduce gain — listens to the signal being compressed. When that signal exceeds
            the threshold, gain reduction kicks in.
          </p>
          <p className="leading-relaxed mt-3">
            Sidechain compression separates the detector from the signal being compressed.
            The detector listens to a different input — the sidechain — while the gain reduction
            still applies to the main signal. The main signal has no say in when it gets compressed;
            that decision is entirely made by the sidechain source.
          </p>

          {/* Signal flow */}
          <div className="mt-4 bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Standard vs sidechain compression</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Standard:</p>
                <div className="flex flex-wrap items-center gap-1 text-xs font-mono text-gray-700">
                  {['Bass signal', '→', 'Detector', '→', 'Gain reduction on bass'].map((item, i) => (
                    item === '→' ? <span key={i} className="text-gray-400">{item}</span>
                    : <span key={i} className="bg-white border border-gray-200 rounded px-2 py-1">{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Sidechain:</p>
                <div className="flex flex-wrap items-center gap-1 text-xs font-mono text-gray-700">
                  {['Kick drum', '→', 'Detector', '→', 'Gain reduction on bass'].map((item, i) => (
                    item === '→' ? <span key={i} className="text-gray-400">{item}</span>
                    : <span key={i} className="bg-white border border-gray-200 rounded px-2 py-1">{item}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-2">The kick triggers compression; the bass is what gets compressed.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The kick-bass relationship</h2>
          <p className="leading-relaxed">
            Kick drum and bass guitar occupy similar frequency ranges — both are low-frequency
            instruments. In a dense mix, they compete for the same sonic space. When they hit
            simultaneously, neither cuts through cleanly; the combined low-frequency energy
            becomes a muddy thud.
          </p>
          <p className="leading-relaxed mt-3">
            Sidechain compression solves this by making the bass duck — reduce in level — every
            time the kick drum hits. The kick triggers the compressor on the bass track. The
            result: when the kick hits, the bass momentarily steps back to let the kick punch
            through. When the kick releases, the bass returns to full level. Done well, it's
            subtle and barely noticeable — you just hear a mix that feels tight and rhythmically
            clear.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Pumping: intentional and unintentional</h2>
          <p className="leading-relaxed">
            When sidechain compression is applied heavily and with a slow release, the gain
            reduction becomes audible as a rhythmic pulsing — the "pumping" effect. The compressed
            signal seems to breathe in time with the sidechain trigger.
          </p>
          <p className="leading-relaxed mt-3">
            In electronic and dance music, this pumping effect is often the entire point. Routing
            a kick drum (or even a silent kick-shaped pulse) into the sidechain of a synth pad
            or the whole mix creates the characteristic "ducking" that's central to the sound
            of house and techno music. The music pulses in time with the beat, which creates
            energy and forward motion.
          </p>
          <p className="leading-relaxed mt-3">
            In other contexts — a podcast, a voice recording, a classical mix — unintentional
            pumping is a problem. A compressor with a sidechain responding to the room noise,
            a misrouted signal, or simply a ratio and release time that's too aggressive will
            produce audible breathing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Other sidechain uses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Sidechain source</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Compressed track</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Kick drum', 'Bass guitar', 'Tighten kick-bass relationship; prevent low-end buildup'],
                  ['Lead vocal', 'Music/background', 'Ducking: music steps back when vocal enters — used in broadcast, podcasts, radio'],
                  ['Kick drum', 'Entire mix bus', 'Pumping effect in dance music; rhythmic energy on the master'],
                  ['Dialogue', 'Background ambience', 'Narrative audio: background sounds duck under speech automatically'],
                  ['High-hat or snare', 'Reverb returns', 'Reverse ducking: reverb tail is gated between hits, tightening the mix'],
                  ['Any loud transient', 'Competing track', 'General separation: reduce a clash between two tracks at the same frequency'],
                ].map(([source, track, purpose]) => (
                  <tr key={source + track} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{source}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{track}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 text-xs">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Recognising sidechain compression in files you receive</h2>
          <p className="leading-relaxed">
            Sidechain compression — like all dynamic processing — is baked into a finished audio
            file. Converting the file to a different format does not change the processing. If you
            receive a track with the characteristic pumping sound of sidechain compression, that
            effect is a permanent part of the recording.
          </p>
          <p className="leading-relaxed mt-3">
            Intentional pumping (EDM, electronic music) is a stylistic choice and part of the
            track. Unintentional pumping — a sign of over-aggressive dynamics processing — is also
            permanent. Format conversion changes encoding; it cannot alter the amplitude envelope
            of the audio. If the pumping is unwanted, it would need to be addressed at the source
            before the file was exported.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Sidechain EQ</h2>
          <p className="leading-relaxed">
            Some compressors allow the sidechain input to be filtered before it reaches the
            detector. This is called sidechain EQ or sidechain filtering, and it's one of the
            most practical tools in mixing.
          </p>
          <p className="leading-relaxed mt-3">
            A common application: de-essing. A de-esser is essentially a compressor with a
            sidechain filter tuned to the frequency range of sibilant sounds (typically
            5–10 kHz). The detector only responds to high frequencies — so the compressor only
            engages when the vocal's sibilants hit that range, reducing level just on "s" and
            "sh" sounds while leaving the rest of the vocal unaffected.
          </p>
          <p className="leading-relaxed mt-3">
            Another use: adding a low-cut filter to the kick-drum sidechain before it triggers
            bass compression. If the full kick drum spectrum triggers the detector, even the
            kick's body frequencies cause compression. High-passing the sidechain means only
            the sharp transient attack of the kick triggers the ducking — more precise control
            over when and how the compression fires.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Dynamic processing is fixed in the export file' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless source preserves all dynamics through conversion' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-audio-compression',  label: 'What Is Audio Compression?' },
          { href: '/wiki/what-is-gain-staging',        label: 'What Is Gain Staging?'      },
          { href: '/wiki/what-is-a-limiter',           label: 'What Is a Limiter?'         },
          { href: '/wiki/what-is-mixing-mastering',    label: 'What Is Mixing & Mastering?' },
          { href: '/wiki/what-is-loudness',            label: 'What Is Loudness?'           },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
