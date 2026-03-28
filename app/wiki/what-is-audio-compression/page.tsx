import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Audio Compression? The Two Completely Different Meanings',
  description:
    '"Audio compression" means two different things: data compression (making files smaller) and dynamic range compression (controlling loud and quiet levels). Both explained here.',
};

export default function WhatIsAudioCompressionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Compression & Formats</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Audio Compression?
          <span className="block text-2xl sm:text-3xl text-gray-500 font-bold mt-1">(There Are Two Answers)</span>
        </h1>
      </div>

      <QuickAnswer>
        "Audio compression" is genuinely ambiguous — it means two completely different things
        depending on context.{' '}
        <strong>Data compression</strong> makes audio files smaller (MP3, AAC, FLAC).{' '}
        <strong>Dynamic range compression</strong> reduces the volume difference between loud and
        quiet parts of audio (a compressor plugin). They share a name but have nothing else in
        common.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why this term is genuinely confusing</h2>
          <p className="leading-relaxed">
            "Compression" in audio can be discussing a file format, or it can be discussing a signal
            processing technique. These two uses of the word exist in completely separate contexts —
            one is about file storage, the other is about sound shaping — but they collide constantly
            in casual conversation.
          </p>
          <p className="leading-relaxed mt-3">
            A recording engineer saying "I compressed the vocals" means they used a dynamic range
            compressor to smooth out the performance levels. A developer saying "the audio is
            compressed" typically means it was encoded as MP3 or AAC. Both are using the word
            correctly. Both can confuse someone from the other world.
          </p>
          <p className="leading-relaxed mt-3">
            Understanding the difference matters because the implications are completely different.
            Data compression affects file size and potentially audio quality. Dynamic range
            compression affects how the audio sounds — the feel, the loudness, the punch.
          </p>
        </section>

        {/* Side-by-side comparison */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Side by side</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-brand/20 bg-brand/5">
              <p className="font-bold text-gray-900 text-sm mb-2">Data compression</p>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>• Makes the file smaller</li>
                <li>• Affects storage and download size</li>
                <li>• Happens at encoding / export time</li>
                <li>• Examples: MP3, AAC, OGG, FLAC</li>
                <li>• Can be lossy (data is discarded) or lossless (data is preserved)</li>
                <li>• Does NOT affect how loud or dynamic the audio sounds</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
              <p className="font-bold text-gray-900 text-sm mb-2">Dynamic range compression</p>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>• Reduces volume differences in the audio signal</li>
                <li>• Makes quiet parts louder relative to loud parts</li>
                <li>• Happens in a signal chain or DAW</li>
                <li>• Tools: compressor plugin, hardware compressor</li>
                <li>• Does NOT affect file size</li>
                <li>• Always applied before encoding — shaping the audio itself</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Data compression: how it works</h2>
          <p className="leading-relaxed">
            Data compression takes audio data and finds ways to represent it using fewer bits. The
            result is a smaller file. How much smaller depends on the codec and whether it's lossy
            or lossless.
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">How it compresses</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Quality impact</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Lossy', 'Discards audio data the ear is unlikely to notice', 'One-time quality reduction; irreversible', 'MP3, AAC, OGG, Opus'],
                  ['Lossless', 'Stores data more efficiently; nothing discarded', 'No quality loss; decoded output is identical', 'FLAC, ALAC, APE'],
                  ['Uncompressed', 'No compression at all; raw audio samples', 'No processing; largest files', 'WAV (PCM), AIFF'],
                ].map(([type, how, impact, examples]) => (
                  <tr key={type} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{how}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{impact}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="leading-relaxed mt-3">
            Lossy data compression uses psychoacoustic models — it removes sounds you're unlikely
            to notice, like frequencies masked by louder sounds, or detail above the upper range of
            human hearing. At high bitrates, the removal is subtle. At low bitrates, it becomes
            audible. Lossless compression finds redundant patterns in the audio data and stores
            them efficiently — like ZIP compression, but for audio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Dynamic range compression: how it works</h2>
          <p className="leading-relaxed">
            Dynamic range refers to the difference between the quietest and loudest parts of an
            audio signal. A live orchestra might have a dynamic range of 70 dB or more — whisper-quiet
            passages and ear-splitting climaxes. A radio broadcast is compressed to about 10 dB —
            everything sits at a similar level.
          </p>
          <p className="leading-relaxed mt-3">
            A compressor is a device or plugin that automatically reduces the volume of audio that
            exceeds a set threshold. It brings peaks down toward the average, which makes the overall
            audio feel more controlled and consistent. Four key controls:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Threshold:</span>
              <span>The level above which compression kicks in. Sounds louder than this get turned down.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Ratio:</span>
              <span>How much the compression reduces levels above the threshold. A ratio of 4:1 means every 4 dB over the threshold becomes 1 dB.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Attack:</span>
              <span>How quickly the compressor reacts to loud sounds. Fast attack catches transients; slow attack lets them through.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Release:</span>
              <span>How quickly the compressor stops reducing volume after the loud sound ends.</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            Dynamic range compression is used everywhere: on podcast vocals to smooth out
            inconsistent speaking levels, on music to punch up drums, in broadcast to meet
            loudness standards, and in mastering to prepare final audio for streaming platforms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to tell which one is being discussed</h2>
          <p className="leading-relaxed">
            Context is usually the giveaway. If someone is talking about file formats, downloads,
            encoding, or file size — they mean data compression. If they're talking about mixing,
            mastering, plugins, signal chains, or how audio sounds — they mean dynamic range
            compression.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2 p-3 bg-slate-50 rounded-lg">
              <span className="text-brand font-semibold">"I compressed my recording to MP3"</span>
              <span className="text-gray-500">→ data compression</span>
            </div>
            <div className="flex gap-2 p-3 bg-slate-50 rounded-lg">
              <span className="text-brand font-semibold">"I put a compressor on the vocal track"</span>
              <span className="text-gray-500">→ dynamic range compression</span>
            </div>
            <div className="flex gap-2 p-3 bg-slate-50 rounded-lg">
              <span className="text-brand font-semibold">"The podcast sounds over-compressed"</span>
              <span className="text-gray-500">→ could mean either — context required</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The overlap: when both apply</h2>
          <p className="leading-relaxed">
            A finished, distributed audio file has typically had both types of compression applied —
            just at different stages.
          </p>
          <p className="leading-relaxed mt-3">
            Dynamic range compression (and limiting, its harder-edged sibling) is applied during
            mixing and mastering, shaping the audio signal. Then the finished master is encoded as
            an MP3, AAC, or OGG file — applying data compression.
          </p>
          <p className="leading-relaxed mt-3">
            Streaming platforms add another layer: they measure the loudness of uploaded audio and
            apply normalisation to bring everything to a consistent level — effectively a mild form
            of dynamic processing — and then serve it in a lossy format like AAC or OGG.
          </p>
          <p className="leading-relaxed mt-3">
            Understanding both types helps you understand why audio sounds the way it does at every
            stage of the chain.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-lossy-audio',              label: 'What Is Lossy Audio?'              },
          { href: '/wiki/what-is-lossless-audio',           label: 'What Is Lossless Audio?'           },
          { href: '/wiki/what-is-audio-codec',              label: 'What Is an Audio Codec?'           },
          { href: '/wiki/what-is-bitrate',                  label: 'What Is Bitrate?'                  },
          { href: '/wiki/what-is-a-limiter',                label: 'What Is a Limiter?'                },
          { href: '/wiki/what-is-sidechain-compression',    label: 'What Is Sidechain Compression?'   },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio Guide' },
          { href: '/formats/mp3',                    label: 'MP3 format guide'             },
          { href: '/formats/flac',                   label: 'FLAC format guide'            },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
