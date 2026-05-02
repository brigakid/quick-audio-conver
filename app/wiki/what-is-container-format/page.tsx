import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'What Is a Container Format in Audio and Video?',
  description:
    'A container format is the file wrapper — the packaging that holds audio, video, metadata, and more. MP4, WAV, MKV, and M4A are containers. Here\'s what they actually do.',
  alternates: {
    canonical: '/wiki/what-is-container-format',
  },
  openGraph: {
    title: 'What Is a Container Format in Audio and Video?',
    description:
      'A container format is the file wrapper — the packaging that holds audio, video, metadata, and more. MP4, WAV, MKV, and M4A are containers. Here\'s what they actually do.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Container Format in Audio and Video?',
    description:
      'A container format is the file wrapper — the packaging that holds audio, video, metadata, and more. MP4, WAV, MKV, and M4A are containers. Here\'s what they actually do.',
  },
};

export default function WhatIsContainerFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <JsonLd
        data={articleSchema({
          headline: "What Is a Container Format in Audio and Video?",
          description: "A container format is the file wrapper — the packaging that holds audio, video, metadata, and more. MP4, WAV, MKV, and M4A are containers. Here's what they actually do.",
          path: "/wiki/what-is-container-format",
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
          What Is a Container Format?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        A container format is the file's outer wrapper — it organises and stores audio (and
        optionally video, subtitles, and metadata) inside a structured file. MP4, MKV, WAV, M4A,
        and OGG are containers. <strong>The container doesn't determine audio quality — the codec
        inside it does.</strong> The same container can hold different codecs.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What a container actually does</h2>
          <p className="leading-relaxed">
            Think of a container as a physical package. It has structure — sections, headers,
            indices — that tell a media player where to find the audio track, where the video
            starts, what metadata is attached, where chapter markers are. Without the container's
            organisation, the encoded audio or video data inside would be an unstructured blob
            that nothing could easily read.
          </p>
          <p className="leading-relaxed mt-3">
            A container handles the practical logistics of the file:
          </p>
          <ul className="space-y-1 mt-2 text-sm text-gray-600 list-disc list-inside">
            <li>Where each track starts and ends</li>
            <li>How to synchronise audio and video streams</li>
            <li>What codecs are used (so the player knows which decoder to load)</li>
            <li>Embedded metadata: title, artist, album, cover art, year</li>
            <li>Chapter markers and navigation points</li>
            <li>Multiple audio tracks (e.g., different language versions)</li>
            <li>Subtitle or caption tracks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common containers and what they hold</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Container</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Extension</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Can hold</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Common use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['MP4',  '.mp4',  'AAC, MP3, PCM + H.264/H.265 video',   'Video sharing, streaming, phone recordings'],
                  ['M4A',  '.m4a',  'AAC (audio-only MP4)',                 'Apple audio, music downloads, podcasts'],
                  ['WAV',  '.wav',  'PCM (usually), some others',           'Professional audio editing, broadcast'],
                  ['OGG',  '.ogg',  'Vorbis, Opus, FLAC audio',            'Open-source audio, games, web'],
                  ['MKV',  '.mkv',  'Almost any audio+video codec',         'Movies, TV shows, flexible archiving'],
                  ['WebM', '.webm', 'Vorbis, Opus + VP8/VP9 video',        'Web video (YouTube, HTML5)'],
                  ['MOV',  '.mov',  'AAC, PCM, MP3 + video',               'Apple cameras, Final Cut Pro'],
                  ['FLAC', '.flac', 'FLAC codec only (audio-only)',         'Lossless music archiving'],
                  ['MP3',  '.mp3',  'MP3 codec only (audio-only)',          'Music, podcasts, legacy compatibility'],
                ].map(([container, ext, holds, use]) => (
                  <tr key={container} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{container}</td>
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-600">{ext}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{holds}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why the same extension can sound completely different</h2>
          <p className="leading-relaxed">
            Because a container can hold different codecs, files with the same extension can
            contain very different audio. An OGG file might contain Vorbis audio (lossy) or FLAC
            audio (lossless). An MP4 file from one camera might have AAC audio at 128 kbps; from
            another it might have PCM audio at full quality.
          </p>
          <p className="leading-relaxed mt-3">
            This is why specifying just the container isn't enough to know what you're working with.
            A media analysis tool like MediaInfo or VLC's codec information dialog will tell you
            both the container and the codec inside — the information that actually matters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Container limitations</h2>
          <p className="leading-relaxed">
            Not every codec works in every container. WAV is designed for PCM audio — you can
            technically put other codecs in a WAV file but most software won't handle it. M4A
            is designed for AAC — trying to put Vorbis in an M4A container would confuse most
            players. MKV and MP4 are flexible and support many combinations, but even they
            have limits.
          </p>
          <p className="leading-relaxed mt-3">
            When you convert audio to a specific format, you're choosing both a container and a
            codec — sometimes they're the same name (MP3, FLAC), sometimes different (M4A uses
            AAC). Understanding both levels helps you make informed decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why video containers are the most common source of confusion</h2>
          <p className="leading-relaxed">
            Most of the time people encounter container questions is when they're working with
            video files and want to extract or convert the audio. An MP4 from a phone camera, a
            MOV from Final Cut Pro, an MKV of a downloaded film — all of these are video containers
            with audio tracks inside.
          </p>
          <p className="leading-relaxed mt-3">
            When you convert an MP4 to MP3, you're doing two things: extracting the audio track
            from the video container, and re-encoding it from whatever codec the MP4 used (usually
            AAC) to MP3. The container change is unavoidable; the codec change is where any quality
            trade-off occurs.
          </p>
          <p className="leading-relaxed mt-3">
            This is why "convert video to audio" tools always ask what audio format you want —
            they can't just strip the container; they have to decode the audio track and re-encode
            it in a format your audio software or device can handle directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Metadata lives in the container, not the codec</h2>
          <p className="leading-relaxed">
            Song title, artist name, album artwork, track number — all of this metadata is stored
            by the container, not the codec. When you convert an MP3 to WAV, metadata handling
            becomes unpredictable: WAV has very limited metadata support compared to formats like
            FLAC or M4A, and some tools don't transfer metadata during conversion at all.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC and M4A have rich metadata containers — they can store embedded artwork, multiple
            tags, replay gain data, and more. MP3 uses ID3 tags, which are widely supported. WAV
            uses RIFF INFO chunks, which most consumer software doesn't display.
          </p>
          <p className="leading-relaxed mt-3">
            If you're building an audio library and metadata matters, FLAC or M4A (AAC) are
            better archival container choices than WAV — not because of audio quality (all three
            are lossless when using PCM or FLAC codecs), but because the container supports
            richer, more reliable metadata embedding.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/mp4-to-mp3', label: 'MP4 to MP3', note: 'Extract audio from video container' },
          { href: '/mov-to-mp3', label: 'MOV to MP3', note: 'Apple video container to audio'     },
          { href: '/mov-to-m4a', label: 'MOV to M4A', note: 'Video to audio-only container'      },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/codec-vs-container',  label: 'Codec vs Container'          },
          { href: '/wiki/what-is-audio-codec', label: 'What Is an Audio Codec?'     },
          { href: '/wiki/what-is-transcoding', label: 'What Is Transcoding?'        },
          { href: '/formats/mp3',         label: 'What Is MP3?'                },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/extract-audio-from-video', label: 'How to Extract Audio from Video' },
          { href: '/guides/mp3-vs-wav',               label: 'MP3 vs WAV'                      },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
