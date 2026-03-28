import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Audio Quality? It\'s Not Just Bitrate',
  description:
    'Audio quality isn\'t one number. It\'s a combination of frequency response, dynamic range, noise floor, and more. Here\'s what actually determines whether audio sounds good.',
};

export default function WhatIsAudioQualityPage() {
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
          What Is Audio Quality?
        </h1>
      </div>

      <QuickAnswer>
        Audio quality is not a single number — it's a composite of multiple factors: frequency
        response, dynamic range, noise floor, distortion, and stereo accuracy. <strong>Format
        choices can preserve or degrade quality. They cannot create it.</strong> A high-bitrate
        MP3 of a bad recording is still a bad recording.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why "quality" is hard to pin down</h2>
          <p className="leading-relaxed">
            People talk about audio quality as if it's a single dial — higher is better. In
            practice, it's more like five or six independent dials, each measuring something
            different. You can have a recording with excellent frequency response but a terrible
            noise floor. You can have a file with a high bitrate that contains a source recording
            of poor quality.
          </p>
          <p className="leading-relaxed mt-3">
            The question "is this good quality audio?" has layers. Are you asking about the
            recording? The editing? The encoding? The playback hardware? All of these contribute
            to what you ultimately hear, and problems at any stage can undermine quality introduced
            at every other stage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The factors that actually determine quality</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Factor</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">What it means</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">What affects it</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Frequency response', 'How accurately the full audible spectrum is captured and reproduced', 'Microphone quality, recording environment, codec, EQ'],
                  ['Dynamic range', 'Difference between quietest and loudest sounds', 'Bit depth, recording levels, compression/limiting'],
                  ['Noise floor', 'Background hiss and electrical noise beneath the signal', 'Preamp quality, room acoustics, recording gain'],
                  ['Distortion', 'Unwanted alteration of the waveform', 'Clipping, over-compression, poor equipment'],
                  ['Stereo imaging', 'Accuracy and width of the stereo field', 'Microphone technique, panning, mono compatibility'],
                  ['Encoding artifacts', 'Compression side-effects added by lossy codecs', 'Codec choice, bitrate setting'],
                ].map(([factor, meaning, affects]) => (
                  <tr key={factor} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{factor}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{meaning}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{affects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Frequency response</h2>
          <p className="leading-relaxed">
            A high-quality recording captures the full audible frequency range accurately — from
            the sub-bass below 60 Hz to the airy highs above 12 kHz — without exaggerating or
            cutting any part of it. A cheap microphone may roll off above 8 kHz. An overloaded
            preamp may add harmonic distortion. A poorly configured codec may cut the top end at
            high bitrates.
          </p>
          <p className="leading-relaxed mt-3">
            When people describe recordings as "thin," "bassy," "bright," or "muffled," they're
            describing frequency response imbalances. EQ can adjust frequency balance, but it
            can't restore frequencies that were never captured.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Dynamic range</h2>
          <p className="leading-relaxed">
            Dynamic range is the ratio between the quietest and loudest sounds in an audio
            recording. CD-quality audio (16-bit) has a theoretical dynamic range of 96 dB —
            far more than you need for any practical listening scenario. Professional recording
            at 24-bit extends this to 144 dB — again, far beyond what's necessary.
          </p>
          <p className="leading-relaxed mt-3">
            The quality concern with dynamic range arises not from the format, but from heavy
            compression and limiting applied during production. Over-compressed audio sounds
            "squashed" — there's no room between soft and loud. The music loses its natural
            breathing quality. Streaming platforms' loudness normalisation has helped reverse
            some of the damage done by the loudness wars era.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Noise floor</h2>
          <p className="leading-relaxed">
            The noise floor is the level of background noise present in the signal when nothing
            is being recorded. It manifests as hiss, hum, or room ambience. A low noise floor
            is desirable — the quieter the background, the more dynamic range the signal has.
          </p>
          <p className="leading-relaxed mt-3">
            Bit depth affects the noise floor of a digital recording — 16-bit has a theoretical
            noise floor of around -96 dBFS; 24-bit drops it to -144 dBFS. In practice, the
            room, microphone, and preamp introduce far more noise than the bit depth adds, making
            the bit depth advantage largely theoretical for most recording situations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What format choices can and cannot do</h2>
          <p className="leading-relaxed">
            Choosing a lossless format (WAV, FLAC) preserves the quality of whatever was recorded.
            It introduces no additional degradation. But it can't improve source material. A FLAC
            of a muffled recording is a muffled recording — just accurately preserved.
          </p>
          <p className="leading-relaxed mt-3">
            A high-bitrate lossy format (320 kbps MP3, 256 kbps AAC) introduces a very small
            quality reduction — one that most listeners in typical conditions cannot perceive.
            A low-bitrate lossy format (64 kbps MP3) introduces audible artifacts that genuinely
            reduce perceptual quality.
          </p>
          <p className="leading-relaxed mt-3">
            The biggest quality determinants are: the recording environment, the microphone, the
            preamp, the recording levels, and the editing and mixing decisions. Format is the last
            link in that chain — it can preserve or slightly reduce what came before it, but it
            cannot compensate for problems introduced earlier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What audio conversion can and cannot do to quality</h2>
          <p className="leading-relaxed">
            When you convert an audio file, the conversion affects encoding artifacts — and nothing
            else in this list. It doesn't change the recording environment, the microphone, the
            recording levels, or the editing decisions. Those are permanent properties of the source
            audio that no conversion can alter.
          </p>
          <p className="leading-relaxed mt-3">
            Converting from a lossless source (WAV, FLAC) to a lossy format (MP3, AAC) introduces
            a small, deliberate increase in encoding artifacts — the only quality factor a converter
            directly controls. Done at a reasonable bitrate (192 kbps MP3 or higher), this reduction
            is below what most people can hear in typical listening conditions.
          </p>
          <p className="leading-relaxed mt-3">
            Converting from a lossy source to a higher-bitrate lossy format doesn't recover quality
            — it just re-packages the same artifacts in a larger file. Converting any format to
            lossless preserves exactly what exists in the source. The practical rule: if you care
            about quality, protect the lossless original. Everything distributable flows from that.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Lossless to lossy — controlled quality trade-off' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Best starting point for a lossy encode'           },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-bitrate',        label: 'What Is Bitrate?'          },
          { href: '/wiki/what-is-sample-rate',    label: 'What Is Sample Rate?'      },
          { href: '/wiki/what-is-lossy-audio',    label: 'What Is Lossy Audio?'      },
          { href: '/wiki/what-is-clipping',       label: 'What Is Clipping?'         },
          { href: '/wiki/what-is-distortion',     label: 'What Is Distortion?'       },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/when-converting-to-wav-does-not-improve-quality', label: 'When Converting to WAV Doesn\'t Improve Quality' },
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality', label: 'How Bitrate Affects Quality'                     },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
