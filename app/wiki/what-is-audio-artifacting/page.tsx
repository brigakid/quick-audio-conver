import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Are Audio Artifacts? Causes, Types & How to Avoid Them',
  description:
    'Audio artifacts (or artefacts) are sounds that weren\'t in the original recording — created by lossy compression, re-encoding, or over-processing. Pre-echo, smearing, the metallic shimmer: here\'s what causes each type and how to avoid them.',
  alternates: {
    canonical: '/wiki/what-is-audio-artifacting',
  },
  openGraph: {
    title: 'What Are Audio Artifacts? Causes, Types & How to Avoid Them',
    description:
      'Audio artifacts (or artefacts) are sounds that weren\'t in the original recording — created by lossy compression, re-encoding, or over-processing. Pre-echo, smearing, the metallic shimmer: here\'s what causes each type and how to avoid them.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Are Audio Artifacts? Causes, Types & How to Avoid Them',
    description:
      'Audio artifacts are sounds created by lossy compression or over-processing. Pre-echo, smearing, metallic shimmer — here\'s what causes each type and how to avoid them.',
  },
};

export default function WhatIsAudioArtifactingPage() {
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
          What Are Audio Artifacts?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Audio artifacts (also spelled <em>artefacts</em> in British English) are sounds that
        weren't in the original recording — introduced as a side effect of{' '}
        <Link href="/wiki/what-is-lossy-audio" className="underline hover:text-brand transition-colors">
          lossy compression
        </Link>
        , noise reduction, or other processing. They range from subtle (barely noticeable at high
        bitrates) to severe (the "underwater" sound of very low-bitrate MP3).{' '}
        <strong>They're not random — each type has a specific cause.</strong>
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What artifacts are</h2>
          <p className="leading-relaxed">
            An artifact in audio is any sound present in the output that wasn't in the input.
            When compression algorithms make decisions about what to discard — or when processing
            tools make incorrect assumptions about the audio — they sometimes introduce sounds
            that weren't there originally. These are artifacts.
          </p>
          <p className="leading-relaxed mt-3">
            They're distinct from noise, which is random and broadband. Artifacts have specific
            character related to the processing that created them. You can often identify the
            cause of an artifact by what it sounds like.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common codec artifacts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Artifact</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Sounds like</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Cause</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">When it appears</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Pre-echo / pre-ringing', 'A faint ghost of a sound audible just before it occurs', 'Transform boundary effect in MDCT; energy "leaks" from a loud event into preceding frames', 'Sharp transients at low bitrates (cymbals, piano notes)'],
                  ['High-frequency smearing', 'Cymbals sound blurry; sibilance becomes a soft hiss', 'Aggressive high-frequency cutoff in the encoder at lower bitrates', 'Below 192 kbps MP3; complex material'],
                  ['"Underwater" / "metallic" sound', 'Audio sounds like it\'s behind glass or being played through a filter', 'Extreme bitrate reduction; the psychoacoustic model makes poor decisions on complex audio', 'Below 96 kbps; dense music'],
                  ['Quantization noise', 'Low-level broadband hiss that rises and falls with the signal', 'Limited bit depth; each sample rounded to the nearest available value', 'Low bit depth (8-bit); rarely audible at 16-bit'],
                  ['Pumping / breathing', 'Volume pulses rhythmically or breathes in and out', 'Over-compressed codec or heavy noise gate', 'Low bitrate encoding of music; heavy noise reduction'],
                ].map(([artifact, sounds, cause, when]) => (
                  <tr key={artifact} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{artifact}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 italic">{sounds}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{cause}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Pre-echo: the most counterintuitive artifact</h2>
          <p className="leading-relaxed">
            Pre-echo is worth explaining in more detail because most people have never heard it
            named — even though they've almost certainly heard it in low-quality MP3s.
          </p>
          <p className="leading-relaxed mt-3">
            Lossy codecs process audio in blocks of time (frames). When a sudden loud sound
            — a sharp piano note, a cymbal crash — occurs in a frame, the encoder has to allocate
            bits for it. At low bitrates, the energy from that loud sound can "bleed" into the
            quiet portion just before it within the same frame. The result: you hear a faint,
            reverb-like shadow of the sound arriving slightly before the sound itself.
          </p>
          <p className="leading-relaxed mt-3">
            Pre-echo is particularly noticeable on solo piano and acoustic guitar recordings
            at low bitrates — two instrument types that have sharp transients (the attack of the
            note) followed by clear decay. Listen for a subtle "woosh" just before each note
            strike in low-quality audio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Noise reduction artifacts</h2>
          <p className="leading-relaxed">
            Noise reduction tools have their own distinctive artifact signature. When the reduction
            is applied too aggressively, the algorithm starts treating parts of the desired signal
            as noise and attenuating them. The result is a warbling, metallic shimmer — the audio
            seems to flutter or oscillate, like a corrupted radio signal or a reverb trail that
            has been electronically filtered.
          </p>
          <p className="leading-relaxed mt-3">
            The artifact is created in the frequency domain: the spectral subtraction algorithm
            creates modulation in how frequencies vary over time. Mild cases sound like a light
            reverberation that shouldn't be there. Severe cases make speech sound like it's being
            processed through a vocoder.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to avoid codec artifacts</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Use an appropriate bitrate:</span>
              <span>
                192 kbps MP3 eliminates most audible codec artifacts for music. 128 kbps is acceptable for
                voice. Below 96 kbps, artifacts are consistently audible on complex material. See{' '}
                <Link href="/wiki/what-is-bitrate" className="underline hover:text-brand transition-colors">
                  what bitrate means
                </Link>{' '}
                for a full explanation.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Choose the right codec:</span>
              <span>AAC produces fewer artifacts than MP3 at the same bitrate. Opus is dramatically better at low bitrates. For quality-critical work at lower bitrates, use a modern codec.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Encode from a lossless source:</span>
              <span>
                Encoding from a lossy source (re-encoding MP3 to AAC) compounds artifacts — each
                re-encode adds another layer of quality loss on top of what already exists. Always encode
                from the original lossless source when possible. If you have a{' '}
                <Link href="/flac-to-mp3" className="underline hover:text-brand transition-colors">
                  FLAC file and need MP3
                </Link>
                {' '}or a{' '}
                <Link href="/wav-to-mp3" className="underline hover:text-brand transition-colors">
                  WAV file and need MP3
                </Link>
                , converting directly from the lossless source gives you the cleanest possible result.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Limit noise reduction intensity:</span>
              <span>Apply the minimum noise reduction needed, not the maximum available. Use the preview function to check for artifacts before committing.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">What do audio artifacts sound like?</h3>
              <p className="leading-relaxed">
                The most common sounds are a metallic shimmer on high frequencies (like distorted
                cymbals), a watery or "underwater" quality on voices and instruments, a faint
                reverb-like echo just before sharp sounds (pre-echo), and rhythmic volume pulsing.
                The exact character depends on the codec and how aggressively it compressed the audio.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Does converting MP3 to another format create more artifacts?</h3>
              <p className="leading-relaxed">
                Yes. Each lossy-to-lossy re-encode adds another layer of quality loss. Converting MP3 to
                AAC, for example, decodes the MP3 (exposing all existing artifacts into the raw audio)
                and then re-encodes with AAC's own lossy decisions. When you need to convert, always
                start from the lossless source — WAV or FLAC — rather than re-encoding from MP3.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">At what bitrate do audio artifacts become noticeable?</h3>
              <p className="leading-relaxed">
                For MP3: most people notice artifacts on music below 128 kbps. At 192 kbps and above,
                artifacts are rarely audible on typical playback equipment. Below 96 kbps, artifacts are
                consistently audible on complex material like music with cymbals or dense orchestration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Are audio artifacts the same as audio distortion?</h3>
              <p className="leading-relaxed">
                No — they're related but different. Distortion adds harmonics that weren't in the
                original signal (like clipping). Artifacts are sounds created by compression algorithm
                decisions — things like pre-echo and smearing that have no acoustic equivalent in
                natural audio.
              </p>
            </div>
          </div>
        </section>

      </div>

      <RelatedContent
        title="Convert from a lossless source — avoid compounding artifacts"
        items={[
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Start from lossless for the cleanest MP3' },
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Convert from uncompressed source'         },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-lossy-audio',       label: 'What Is Lossy Audio?'        },
          { href: '/wiki/what-is-bitrate',           label: 'What Is Bitrate?'            },
          { href: '/wiki/what-is-transcoding',       label: 'What Is Transcoding?'        },
          { href: '/wiki/what-is-audio-compression', label: 'What Is Audio Compression?'  },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
