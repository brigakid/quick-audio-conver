import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is an Audio Codec? How Encoding and Decoding Actually Work',
  description:
    'A codec is the algorithm that compresses audio when saving and decompresses it during playback. Every audio format you\'ve heard of — MP3, AAC, FLAC — is a codec.',
  openGraph: {
    title: 'What Is an Audio Codec? How Encoding and Decoding Actually Work',
    description:
      'A codec is the algorithm that compresses audio when saving and decompresses it during playback. Every audio format you\'ve heard of — MP3, AAC, FLAC — is a codec.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is an Audio Codec? How Encoding and Decoding Actually Work',
    description:
      'A codec is the algorithm that compresses audio when saving and decompresses it during playback. Every audio format you\'ve heard of — MP3, AAC, FLAC — is a codec.',
  },
};

export default function WhatIsAudioCodecPage() {
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
          What Is an Audio Codec?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        A codec is the algorithm that <strong>encodes</strong> audio into a compressed format when
        saving, and <strong>decodes</strong> it back into sound during playback. Every compressed
        audio file — MP3, AAC, FLAC, Opus — was created by a codec. Without a matching decoder,
        the file is unreadable.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where the word comes from</h2>
          <p className="leading-relaxed">
            Codec is a portmanteau of <em>coder</em> and <em>decoder</em> — or sometimes
            <em>compression/decompression</em>. Both meanings point to the same thing: a two-way
            process. Something goes in, gets compressed into a smaller representation, then gets
            expanded back into its original form (or as close to it as the codec allows).
          </p>
          <p className="leading-relaxed mt-3">
            The word is worth knowing because it explains the job. A codec isn't a file format or
            a container. It's the specific algorithm — the set of rules — that decides how audio
            data is transformed when it gets written to disk and how it gets restored when played
            back.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What a codec actually does</h2>
          <p className="leading-relaxed">
            When you record audio, the raw data is enormous. A single minute of uncompressed
            stereo audio at CD quality is about 10 megabytes. A codec's job is to represent
            that same audio using less data — ideally much less.
          </p>
          <p className="leading-relaxed mt-3">
            Think of it like a translator who specialises in concise summaries. The original
            conversation (raw audio) is long and detailed. The summary (encoded file) captures
            the important parts in a fraction of the space. When someone reads the summary later
            (playback), the decoder reconstructs the conversation as faithfully as the summary
            allows.
          </p>
          <p className="leading-relaxed mt-3">
            Encoding happens when you export, convert, or save. Decoding happens in your media
            player, phone, browser, or anywhere else the audio plays back. Your device needs the
            correct decoder for the codec used. If it doesn't have it, the file either won't play
            or plays back incorrectly.
          </p>

          {/* Flow diagram */}
          <div className="mt-4 bg-slate-50 rounded-xl p-4 text-sm font-mono text-gray-700">
            <div className="flex flex-wrap items-center gap-2 text-center">
              <span className="bg-white border border-gray-200 rounded-lg px-3 py-2">Raw audio</span>
              <span className="text-gray-400">→ encoder →</span>
              <span className="bg-white border border-gray-200 rounded-lg px-3 py-2">Compressed file</span>
              <span className="text-gray-400">→ decoder →</span>
              <span className="bg-white border border-gray-200 rounded-lg px-3 py-2">Playback</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How lossy codecs work — and why they differ</h2>
          <p className="leading-relaxed">
            Lossy codecs all use psychoacoustic models to decide what to discard — the specific
            mechanics are covered in detail on the <Link href="/wiki/what-is-lossy-audio" className="text-brand hover:underline">What Is Lossy Audio</Link> page.
            What's worth understanding here is that different lossy codecs make different decisions,
            which is why they perform differently at the same bitrate.
          </p>
          <p className="leading-relaxed mt-3">
            AAC, developed after MP3, improves on MP3's psychoacoustic model. It achieves better
            audio quality at the same bitrate — typically 128 kbps AAC is considered comparable
            to 192 kbps MP3 for most listeners. Opus is designed for both speech and music at
            extremely low bitrates (as low as 6 kbps for speech), using a more sophisticated
            combined model. The codec's design determines where it allocates bits most effectively.
          </p>
          <p className="leading-relaxed mt-3">
            The practical upshot: if you're encoding for streaming or voice calls and file size
            matters, codec choice affects quality per kilobit more than bitrate alone. At 128 kbps,
            AAC beats MP3. At 32 kbps voice, Opus beats everything else.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How lossless codecs work</h2>
          <p className="leading-relaxed">
            Lossless codecs — FLAC, ALAC, APE — don't discard anything. Instead, they find more
            efficient ways to represent the same data. The ZIP file analogy is a good one: a ZIP
            archive is smaller than the original files, but extracting it gives you back every
            byte, unchanged.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC uses a prediction algorithm — it looks at the audio waveform and predicts what
            comes next, then only stores the difference between the prediction and reality. Those
            differences are typically much smaller than the raw audio data, so the file shrinks.
            When you decode it, the prediction runs again and the differences are added back,
            reconstructing the original audio exactly.
          </p>
          <p className="leading-relaxed mt-3">
            The result: FLAC files are typically 40–60% smaller than WAV, and the decoded audio
            is bit-for-bit identical to the original. Not "sounds the same" — mathematically
            identical.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common audio codecs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Codec</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Common containers</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['MP3',       'Lossy',      '.mp3',                'Music, podcasts, general distribution'],
                  ['AAC',       'Lossy',      '.m4a, .mp4, .aac',   'Apple ecosystem, streaming, YouTube'],
                  ['OGG Vorbis','Lossy',      '.ogg',                'Open-source, games, Spotify (internally)'],
                  ['Opus',      'Lossy',      '.opus, .ogg, .webm',  'Voice calls, streaming, low-latency audio'],
                  ['FLAC',      'Lossless',   '.flac',               'Archiving, hi-fi listening, masters'],
                  ['ALAC',      'Lossless',   '.m4a, .caf',          'Apple devices, iTunes'],
                  ['PCM',       'Uncompressed','.wav, .aiff',        'Professional editing, broadcast'],
                  ['WMA',       'Lossy',      '.wma',                'Windows Media — legacy'],
                ].map(([codec, type, containers, use]) => (
                  <tr key={codec} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{codec}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 font-mono text-xs">{containers}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Codec vs format: a common confusion</h2>
          <p className="leading-relaxed">
            "MP3" can refer to the codec (MPEG-1 Audio Layer III, the compression algorithm) or
            the file format (the .mp3 container that typically holds that codec). They happen to
            share a name, which causes a lot of confusion.
          </p>
          <p className="leading-relaxed mt-3">
            M4A is different — it's purely a container format. The audio inside an M4A file is
            almost always AAC codec. The file extension tells you the container; you need to look
            inside to know the codec. This is why you can have an MP4 video file where the audio
            track uses the AAC codec, the OGG codec, or even MP3.
          </p>
          <p className="leading-relaxed mt-3">
            The distinction matters practically: changing the container (say, from MP4 to M4A
            for an AAC audio track) requires no re-encoding — it's just reorganising the wrapper.
            Changing the codec (say, from AAC to MP3) requires full re-encoding, which can affect
            quality if both are lossy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What this means when you convert</h2>
          <p className="leading-relaxed">
            Every conversion that changes the codec is called transcoding. If you convert a FLAC
            to MP3, you're decoding FLAC (lossless decode, perfect) and re-encoding as MP3 (lossy
            encode, one-time quality reduction). That's acceptable when done intentionally.
          </p>
          <p className="leading-relaxed mt-3">
            If you convert MP3 to AAC — two lossy codecs — you decode the MP3 (getting back
            slightly degraded audio) and then encode it again as AAC (introducing a second round
            of degradation). The quality loss is cumulative. The file ends up smaller, but the
            audio is noticeably worse than the original MP3.
          </p>
          <p className="leading-relaxed mt-3">
            The safest approach: keep lossless masters, and encode to lossy only once — for the
            final distribution copy.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/codec-vs-container',     label: 'Codec vs Container'         },
          { href: '/wiki/what-is-lossless-audio', label: 'What Is Lossless Audio?'    },
          { href: '/wiki/what-is-lossy-audio',    label: 'What Is Lossy Audio?'       },
          { href: '/wiki/what-is-mp3',            label: 'What Is MP3?'               },
          { href: '/wiki/what-is-flac',           label: 'What Is FLAC?'              },
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
