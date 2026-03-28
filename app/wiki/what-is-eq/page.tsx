import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is EQ in Audio? Equalisation Explained Simply',
  description:
    'EQ (equalisation) adjusts the volume of specific frequency ranges in audio. It\'s the most fundamental audio tool — in recording, mixing, mastering, and podcast production.',
};

export default function WhatIsEqPage() {
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
          What Is EQ in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        EQ (equalisation) adjusts the volume of specific frequency ranges within an audio signal.
        Boost 200 Hz and the audio gets more bass. Cut 5 kHz and the harshness in a voice recording
        softens. EQ doesn't add content that wasn't there — <strong>it shapes what's already
        present.</strong>
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What EQ actually does</h2>
          <p className="leading-relaxed">
            Every recording has a frequency balance — some frequencies are naturally louder than
            others based on what was recorded, how it was mic'd, and how the room sounds. EQ is
            how you adjust that balance. You're not adding new sounds or frequencies; you're
            turning up or down the volume of specific parts of the frequency spectrum.
          </p>
          <p className="leading-relaxed mt-3">
            EQ shows up in almost every context where audio is processed: the treble and bass
            knobs on a stereo, the graphic EQ built into headphone apps, the parametric EQ in a
            digital audio workstation, the tone shaping in a mastering chain. Different tools,
            different interfaces — same underlying concept.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Types of EQ</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">How it works</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Graphic EQ', 'Fixed frequency bands with gain sliders (e.g., 31 or 10 bands)', 'Consumer stereos, live sound, quick adjustments'],
                  ['Parametric EQ', 'Fully adjustable frequency, gain, and bandwidth (Q) for each band', 'Studio recording, mixing, mastering'],
                  ['Shelving EQ', 'Boosts or cuts everything above (high shelf) or below (low shelf) a frequency', 'Brightening a recording, reducing rumble'],
                  ['High-pass filter', 'Cuts all frequencies below a set point; above pass through', 'Removing mic rumble, low-end noise from voice'],
                  ['Low-pass filter', 'Cuts all frequencies above a set point; below pass through', 'Removing high-frequency hiss, creating muffled effects'],
                  ['Notch filter', 'Deeply cuts a very narrow frequency band', 'Removing specific hum (50/60 Hz) or feedback tones'],
                ].map(([type, how, use]) => (
                  <tr key={type} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{how}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">EQ as problem-solving</h2>
          <p className="leading-relaxed">
            Most EQ decisions in recording and podcasting are corrective — fixing problems
            introduced by the recording environment, microphone choice, or mic placement.
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Boxy, hollow vocal:</span>
              <span>The recording has excessive energy around 300–500 Hz. A moderate cut at those frequencies (3–6 dB) opens up the voice.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Muffled recording:</span>
              <span>Something absorbed the high frequencies — blankets, acoustic foam, clothes. A high shelf boost (above 8–10 kHz) adds back some air and clarity.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Low-frequency rumble:</span>
              <span>Air conditioning, traffic, footsteps on the floor — a high-pass filter set to 80–120 Hz removes it cleanly.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Harsh sibilance:</span>
              <span>Some microphones overemphasise s and sh sounds. A narrow cut around 6–8 kHz reduces it without dulling the voice overall (this is also called de-essing).</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">EQ as a creative tool</h2>
          <p className="leading-relaxed">
            EQ isn't only for fixing problems. In music production, EQ is used creatively to
            give each instrument its own sonic space in the mix. A guitar and a piano might
            compete for the same frequency range — cutting the guitar slightly in the piano's
            zone and vice versa helps both elements be heard clearly simultaneously.
          </p>
          <p className="leading-relaxed mt-3">
            Aggressive EQ creates character: cutting the low end and high end of a vocal to make
            it sound like a telephone call, boosting the presence range on a guitar for maximum
            cut-through, rolling off the top end on a piano to make it sit further back in a mix.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What EQ cannot fix</h2>
          <p className="leading-relaxed">
            EQ is powerful within the bounds of what was actually recorded. It can't fix problems
            that weren't a matter of frequency balance:
          </p>
          <ul className="space-y-1 mt-2 text-sm text-gray-600 list-disc list-inside">
            <li><strong>Clipping:</strong> The waveform is damaged. EQ doesn't restore clipped peaks.</li>
            <li><strong>Heavy background noise:</strong> Boosting the midrange makes the noise louder too. Noise reduction is a separate tool.</li>
            <li><strong>Missing content:</strong> If high frequencies were never captured (cheap microphone, recording through a phone), EQ can't boost frequencies that aren't there — it will only boost noise and artifacts.</li>
            <li><strong>Performance problems:</strong> Wrong notes, timing issues, off-key singing — these require editing or re-recording.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">EQ and audio conversion</h2>
          <p className="leading-relaxed">
            If you're producing audio you plan to convert, the order matters: apply EQ corrections
            before the final lossy encode. A lossy codec (MP3, AAC) works from the audio data it
            receives. If that audio has a 6 dB mid-range build-up that you'll want to correct
            later, the codec encodes the build-up. When you try to EQ it afterwards, you're
            working with already-compressed audio — and boosting frequencies that were already
            encoded may amplify the codec's fingerprint.
          </p>
          <p className="leading-relaxed mt-3">
            EQ also can't restore frequency content that was never recorded. If you convert a low-bitrate
            MP3 and try to boost the high frequencies, you're boosting the noise and artifacts left
            by the encoder — not the original content. This is a fundamental limit of file conversion:
            it works with what's there. EQ applied to audio before conversion is productive; EQ
            applied after a lossy encode is damage control at best.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Apply EQ before this step for best results' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless source gives EQ full frequency range' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-frequency',          label: 'What Is Frequency?'           },
          { href: '/wiki/what-is-audio-quality',      label: 'What Is Audio Quality?'       },
          { href: '/wiki/what-is-audio-artifacting',  label: 'What Is Audio Artifacting?'   },
          { href: '/wiki/what-is-noise-reduction',    label: 'What Is Noise Reduction?'     },
          { href: '/wiki/what-is-gain-staging',       label: 'What Is Gain Staging?'        },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/best-audio-format-for-voice-recordings', label: 'Best Format for Voice Recordings' },
          { href: '/learn/best-audio-format-for-editing',          label: 'Best Format for Editing'          },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
