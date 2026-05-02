import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'What Is Transcoding in Audio? When It Costs Quality and When It Doesn\'t',
  description:
    'Transcoding means re-encoding audio from one codec to another. Sometimes it\'s transparent. Sometimes it degrades quality. Here\'s how to know which situation you\'re in.',
  alternates: {
    canonical: '/wiki/what-is-transcoding',
  },
  openGraph: {
    title: 'What Is Transcoding in Audio? When It Costs Quality and When It Doesn\'t',
    description:
      'Transcoding means re-encoding audio from one codec to another. Sometimes it\'s transparent. Sometimes it degrades quality. Here\'s how to know which situation you\'re in.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Transcoding in Audio? When It Costs Quality and When It Doesn\'t',
    description:
      'Transcoding means re-encoding audio from one codec to another. Sometimes it\'s transparent. Sometimes it degrades quality. Here\'s how to know which situation you\'re in.',
  },
};

export default function WhatIsTranscodingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <JsonLd
        data={articleSchema({
          headline: "What Is Transcoding in Audio? When It Costs Quality and When It Doesn\\",
          description: "Transcoding means re-encoding audio from one codec to another. Sometimes it's transparent. Sometimes it degrades quality. Here's how to know which situation you're in.",
          path: "/wiki/what-is-transcoding",
          datePublished: "2026-02-01",
          dateModified: "2026-04-28",
        })}
      />
      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Compression & Formats</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Transcoding in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Transcoding means decoding audio from one codec and re-encoding it with a different codec.
        It's not the same as renaming a file or changing the container. <strong>Whether
        transcoding affects quality depends on the codecs involved</strong> — lossless-to-lossless
        is fine; lossy-to-lossy introduces cumulative quality loss.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Transcoding is not just renaming a file</h2>
          <p className="leading-relaxed">
            This is the first thing to understand. Changing a file's extension — renaming
            audio.mp3 to audio.wav — does not transcode the audio. The file is still an MP3
            with the wrong name. Most players will refuse to play it or will play it incorrectly.
          </p>
          <p className="leading-relaxed mt-3">
            Transcoding means actually processing the audio data: decoding it from its current
            codec representation (turning the compressed bitstream back into raw audio samples)
            and then encoding it again using a different codec. Two computational steps, not
            one. The output is genuinely a different format.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Transcoding vs remuxing</h2>
          <p className="leading-relaxed">
            Remuxing means moving audio data from one container to another without changing the
            codec. The audio data itself is untouched — only the wrapper changes. This is fast,
            lossless, and computationally trivial.
          </p>
          <p className="leading-relaxed mt-3">
            Transcoding changes the codec. It requires decoding (CPU-intensive) and re-encoding
            (more CPU-intensive). Whether quality is affected depends on what the codecs are.
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="font-semibold text-gray-800">Remux example:</span>
              <span className="text-gray-600 ml-2">MP4 (AAC audio) → M4A (AAC audio) — container change, codec unchanged. No quality loss.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="font-semibold text-gray-800">Transcode example:</span>
              <span className="text-gray-600 ml-2">FLAC → MP3 — different codec. Audio is decoded and re-encoded. Quality changes.</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Quality impact by conversion path</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Conversion path</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Quality impact</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Lossless → lossless (FLAC → WAV)', 'None', 'Both sides preserve all audio data'],
                  ['Lossless → lossy (FLAC → MP3)', 'One-time controlled reduction', 'Best starting point for a lossy encode'],
                  ['Lossy → lossless (MP3 → FLAC)', 'None (but no quality gain)', 'Lossless wrapper around lossy audio — bigger file, same quality'],
                  ['Lossy → lossy same codec (MP3 → MP3)', 'Small additional loss', 'Decode and re-encode; artifacts compound slightly'],
                  ['Lossy → lossy diff codec (MP3 → AAC)', 'Noticeable additional loss', 'Two separate rounds of psychoacoustic removal'],
                  ['Lossy → lossy multiple times', 'Significant cumulative loss', 'Each generation degrades further; avoidable'],
                ].map(([path, impact, notes]) => (
                  <tr key={path} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-700">{path}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{impact}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The generation loss problem</h2>
          <p className="leading-relaxed">
            Each lossy encode is called a generation. When you re-encode a lossy file to another
            lossy format, you create a second generation. The degradation compounds: the decoder
            presents slightly damaged audio to the encoder, which then applies its own round of
            psychoacoustic removal on top of already-compressed audio.
          </p>
          <p className="leading-relaxed mt-3">
            The artifacts don't double with each generation — but they do accumulate. After
            three or four lossy re-encodes, the quality has noticeably deteriorated: the high
            frequencies are smeared, the imaging collapses, the audio sounds muddy or
            "underwater."
          </p>
          <p className="leading-relaxed mt-3">
            The practical rule: if you ever need to transcode between lossy formats, do it once
            from the highest-quality lossy source you have. Never use a transcoded file as the
            source for another transcode if an original lossless version exists.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Best practices to avoid unnecessary transcoding</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Keep lossless masters:</span>
              <span>Archive original recordings as WAV or FLAC. Every distribution format can be generated from the lossless master without generation loss.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Encode to lossy only once:</span>
              <span>Generate your MP3 or AAC distribution file directly from the lossless source. If you need a different lossy format, go back to the lossless master, not the MP3.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Don't re-encode if remuxing works:</span>
              <span>If you only need to change the container (MP4 → M4A for AAC audio), check whether the operation is a remux or a transcode. Some tools transcode when they don't need to.</span>
            </li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-audio-codec',    label: 'What Is an Audio Codec?'     },
          { href: '/wiki/codec-vs-container',     label: 'Codec vs Container'          },
          { href: '/wiki/what-is-lossy-audio',    label: 'What Is Lossy Audio?'        },
          { href: '/wiki/what-is-lossless-audio', label: 'What Is Lossless Audio?'     },
        ]}
      />

      <RelatedContent
        title="Converters"
        items={[
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless to lossy — one generation' },
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'Lossy to lossless — no quality gain' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
