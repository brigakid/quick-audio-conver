import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Sample Rate in Audio? 44.1kHz, 48kHz, and Why It Matters',
  description:
    'Sample rate is how many times per second audio is measured. Higher isn\'t always better. Here\'s what 44.1kHz and 48kHz actually mean — and when the difference matters.',
  openGraph: {
    title: 'What Is Sample Rate in Audio? 44.1kHz, 48kHz, and Why It Matters',
    description:
      'Sample rate is how many times per second audio is measured. Higher isn\'t always better. Here\'s what 44.1kHz and 48kHz actually mean — and when the difference matters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Sample Rate in Audio? 44.1kHz, 48kHz, and Why It Matters',
    description:
      'Sample rate is how many times per second audio is measured. Higher isn\'t always better. Here\'s what 44.1kHz and 48kHz actually mean — and when the difference matters.',
  },
};

export default function WhatIsSampleRatePage() {
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
          What Is Sample Rate in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Sample rate is the number of audio measurements (samples) captured per second.{' '}
        <strong>44,100 Hz (44.1 kHz)</strong> is the CD standard — enough to perfectly capture
        all frequencies within human hearing. Higher sample rates (96kHz, 192kHz) are larger
        files and debatably audible. For video, <strong>48kHz</strong> is the universal standard.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What a "sample" is</h2>
          <p className="leading-relaxed">
            Sound is a physical phenomenon — variations in air pressure over time. To record audio
            digitally, those pressure variations need to be converted into numbers a computer can
            store. That conversion happens by taking a measurement — a snapshot of the air pressure
            at one specific instant — thousands of times per second.
          </p>
          <p className="leading-relaxed mt-3">
            Each snapshot is a sample. The sample rate is how many snapshots are taken every second.
            At 44,100 Hz (44.1 kHz), 44,100 measurements are taken each second. String them together
            and you have a numerical representation of the audio waveform.
          </p>
          <p className="leading-relaxed mt-3">
            When you play the file back, a DAC (digital-to-analog converter) reads those numbers and
            reconstructs the waveform — which drives speakers or headphones. The higher the sample
            rate, the more snapshots were taken, and the more accurately fast-moving parts of the
            waveform can be captured.
          </p>

          {/* Visual explanation */}
          <div className="mt-4 bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">How sampling works</p>
            <div className="flex items-end gap-1 h-12">
              {[4, 8, 11, 9, 6, 10, 12, 9, 5, 3, 6, 9, 11, 8, 4].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-brand/60 rounded-sm"
                  style={{ height: `${h * 4}px` }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Each bar = one sample. More bars per second = higher sample rate = smoother
              representation of the waveform.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why 44.1kHz became the standard</h2>
          <p className="leading-relaxed">
            There's a rule in digital audio: to accurately capture a frequency, you need to sample
            at more than twice that frequency. This is the Nyquist theorem (named after Harry
            Nyquist, who described it in 1928).
          </p>
          <p className="leading-relaxed mt-3">
            Human hearing tops out at around 20,000 Hz (20 kHz). Applying the rule: you need a
            sample rate above 40,000 Hz to capture all audible frequencies. 44,100 Hz gives a
            comfortable margin above that limit, with room for anti-aliasing filters that prevent
            distortion near the frequency ceiling.
          </p>
          <p className="leading-relaxed mt-3">
            44.1 kHz became the CD standard in 1980 for a combination of technical and practical
            reasons — including the fact that early digital audio was stored on video tape, and
            44,100 Hz fit neatly within PAL and NTSC video frame rates. It became a standard for
            practical engineering reasons, not arbitrary ones, and it stuck.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common sample rates and what they mean</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Sample rate</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Max frequency captured</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">File size vs 44.1kHz</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Standard for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['44.1 kHz', '~22 kHz', 'Baseline', 'CD audio, music streaming, digital music'],
                  ['48 kHz',   '~24 kHz', '~9% larger', 'Video production, broadcast, podcasting'],
                  ['88.2 kHz', '~44 kHz', '2× larger',  'High-resolution music (double CD)'],
                  ['96 kHz',   '~48 kHz', '~2.2× larger', 'Professional recording, film audio'],
                  ['192 kHz',  '~96 kHz', '~4.4× larger', 'Mastering, archiving — rarely for listening'],
                ].map(([rate, freq, size, standard]) => (
                  <tr key={rate} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{rate}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{freq}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{size}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Sample rate vs bit depth</h2>
          <p className="leading-relaxed">
            Sample rate and bit depth are two independent quality dimensions in digital audio.
            They're often mentioned together — "44.1kHz/16-bit" or "96kHz/24-bit" — but they
            describe different things.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-bold text-gray-800 text-sm mb-2">Sample rate (Hz / kHz)</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                How often measurements are taken per second. Determines the highest frequency that
                can be captured. Think of it as the <em>horizontal</em> resolution of the audio.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-bold text-gray-800 text-sm mb-2">Bit depth (bits)</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                How precisely each measurement is recorded. 16-bit allows 65,536 possible values
                per sample; 24-bit allows 16.7 million. Determines dynamic range. Think of it as
                the <em>vertical</em> resolution — how precisely each snapshot measures the
                waveform height.
              </p>
            </div>
          </div>

          <p className="leading-relaxed mt-3">
            CD quality (44.1kHz, 16-bit) is the minimum that covers all human hearing — both the
            frequency range and the dynamic range of human perception. Hi-res audio (typically
            96kHz/24-bit) goes well beyond those limits.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Does a higher sample rate sound better?</h2>
          <p className="leading-relaxed">
            This is genuinely debated, and the honest answer is: not necessarily for listening,
            possibly useful during production.
          </p>
          <p className="leading-relaxed mt-3">
            The case for higher sample rates during recording and mixing: higher sample rates
            give digital signal processing more headroom. Some audio processing (pitch shifting,
            time stretching, saturation effects) works more accurately when it has more samples
            to work with. Recording at 96kHz and then converting to 44.1kHz for distribution is
            a reasonable professional workflow.
          </p>
          <p className="leading-relaxed mt-3">
            The case against higher sample rates for listening: human hearing cannot perceive
            frequencies above 20kHz. The extra frequency content in a 96kHz or 192kHz file is
            ultrasonic — literally inaudible. In some cases, very high-frequency content can
            cause intermodulation distortion in amplifiers, which is actually detrimental. Major
            audio engineers, researchers, and listening test results consistently show that most
            people cannot reliably distinguish 44.1kHz/16-bit from 96kHz/24-bit in a controlled
            blind test.
          </p>
          <p className="leading-relaxed mt-3">
            The practical upshot: for distribution and listening, 44.1kHz or 48kHz at 16-bit is
            sufficient. If you're producing, recording at 48kHz or 96kHz and storing at that
            resolution is harmless and potentially useful for processing headroom.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why 48kHz became standard for video</h2>
          <p className="leading-relaxed">
            If you're making audio for video — YouTube, film, TV, social media — 48kHz is the
            expected standard. Video equipment (cameras, editing software, broadcast gear)
            defaults to 48kHz. Mixing 44.1kHz audio with 48kHz video requires sample rate
            conversion, which adds complexity and a tiny amount of imprecision.
          </p>
          <p className="leading-relaxed mt-3">
            The practical rule: recording music? Use 44.1kHz. Recording audio that will be used
            in video? Use 48kHz. If you're not sure, 48kHz works fine for music too — modern
            streaming platforms accept both, and the quality is indistinguishable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Sample rate mismatches and conversion</h2>
          <p className="leading-relaxed">
            When an audio file's sample rate doesn't match what a playback system or edit session
            expects, one of two things happens: the software performs sample rate conversion
            (resampling), or it plays back at the wrong pitch and speed.
          </p>
          <p className="leading-relaxed mt-3">
            The wrong-pitch scenario happens when software plays audio at a fixed sample rate
            without converting. A 48kHz file played back at 44.1kHz runs slower and sounds lower
            in pitch — like playing a record at the wrong RPM. This is rarely a problem with
            modern software, which handles sample rate conversion automatically.
          </p>
          <p className="leading-relaxed mt-3">
            Converting between sample rates (44.1kHz to 48kHz, or vice versa) involves a
            mathematical process called resampling. High-quality resampling is effectively
            transparent — the result sounds identical. Converters like this site handle
            resampling automatically when necessary; you don't need to manage it manually.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Sample rate handled automatically' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless to compressed'            },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-bitrate',           label: 'What Is Bitrate?'            },
          { href: '/wiki/what-is-audio-codec',       label: 'What Is an Audio Codec?'     },
          { href: '/wiki/what-is-lossless-audio',    label: 'What Is Lossless Audio?'     },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/how-to-choose-mp3-bitrate',                       label: 'How to Choose MP3 Bitrate'         },
          { href: '/guides/how-to-choose-mp3-bitrate',  label: 'How Bitrate Affects Quality'       },
          { href: '/guides/mp3-vs-wav',     label: 'WAV vs MP3 for Editing and Sharing' },
          { href: '/formats/wav',                                             label: 'WAV format guide'                  },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
