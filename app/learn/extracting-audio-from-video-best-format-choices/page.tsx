import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'Extracting Audio from Video: Best Format Choices',
  description:
    'When you extract audio from an MP4 or MOV, the output format you choose determines file size and compatibility — not quality. Quality is fixed by the source video.',
};

export default function ExtractingAudioFromVideoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/learn" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Learn
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Real-world workflows</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Extracting Audio from Video: Best Format Choices
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        When you extract audio from a video file, <strong>the quality ceiling is set by
        the source video's audio track</strong> — typically AAC at 128–256 kbps. Choosing
        your output format changes file size and compatibility, not the audio quality.
        For general use, <strong>MP3 at 192 kbps</strong> is the safest output. For editing,
        use WAV. For archiving, consider that the source was already lossy.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What extraction actually does</h2>
          <p className="leading-relaxed">
            "Extracting audio from video" sounds like it should be straightforward — and for
            the most part it is. A video file like MP4, MOV, or MKV is a container that holds
            separate video and audio streams. Extraction means reading the audio stream and
            saving it separately, without the video.
          </p>
          <p className="leading-relaxed mt-3">
            What happens to the audio data during extraction depends on the output format you
            choose:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>If the output format matches the source codec:</strong> the audio
              stream can be remuxed (copied directly without re-encoding). No quality loss.
              Extraction is fast. This is what happens when you extract an MP4's AAC audio
              to M4A — same codec, just a different container.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>If the output format requires a different codec:</strong> the audio
              is decoded and re-encoded. There's a small quality cost. This is what happens
              when you extract to MP3 from an MP4 that contains AAC audio.</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            In either case, the quality is bounded by the source. If the video's audio track
            was compressed AAC at 128 kbps, extracting to WAV gives you a large WAV file
            containing 128 kbps AAC-quality audio. The WAV container doesn't add quality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What audio codec is in your video</h2>
          <p className="leading-relaxed">
            Most video files use one of these audio codecs inside:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-2">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Container</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Typical audio codec</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Typical quality</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['MP4 (YouTube, iPhone, web)',       'AAC',                 '128–256 kbps'       ],
                  ['MOV (iPhone, Final Cut)',           'AAC or PCM',          'AAC 128 kbps or lossless'],
                  ['MKV (films, rips)',                 'AAC, AC3, or DTS',    'Varies widely'      ],
                  ['WebM (browser video)',              'Opus or Vorbis',      '128–192 kbps'       ],
                  ['AVI (older Windows format)',        'MP3 or PCM',          'Varies'             ],
                ].map(([container, codec, quality]) => (
                  <tr key={container} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-700">{container}</td>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{codec}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed mt-3">
            Most MP4 files — downloaded YouTube videos, phone recordings, screencasts,
            conference recordings — contain AAC audio at 128–192 kbps. That's the quality
            ceiling for everything you extract from them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Choosing your output format</h2>
          <p className="leading-relaxed">
            Once you've extracted the audio, the output format choice comes down to what you
            need to do with it:
          </p>

          <div className="space-y-3 mt-3">
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">
                MP3 — for sharing, uploading, or general use
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                The safe default. Small, plays everywhere, widely accepted by every platform.
                Choose 192 kbps for music-heavy content; 128 kbps is fine for speech. The
                re-encode from AAC to MP3 causes minimal quality loss at these bitrates.
                Use the{' '}
                <Link href="/mp4-to-mp3" className="text-brand hover:underline">MP4 to MP3 converter</Link>{' '}
                for this workflow.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">
                WAV — for editing or software compatibility
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Extract to WAV if you'll edit the audio in a DAW, video editor, or any tool
                that prefers lossless input. Remember: the WAV contains the same lossy audio
                as the source — it's not a quality upgrade. The benefit is avoiding further
                re-encoding during editing. Use the{' '}
                <Link href="/mp4-to-wav" className="text-brand hover:underline">MP4 to WAV converter</Link>{' '}
                for this.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">
                M4A — for Apple ecosystem or same-codec efficiency
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                If the video's audio was AAC (most MP4s), extracting to M4A keeps the same
                codec — just changing the container. No re-encoding, no quality loss. Use
                this if the file will live on an iPhone, Mac, or Apple ecosystem device.
                It's also slightly smaller than the equivalent MP3 at the same perceived quality.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">
                FLAC — not usually worth it for video-extracted audio
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                FLAC is lossless, but if the source audio was compressed AAC, FLAC doesn't
                make it lossless — it just stores the AAC-quality audio in a lossless
                container. The file is much larger than MP3 for no audible benefit. The only
                reason to do this is if the video's audio track was genuinely lossless PCM
                (some professional MOV files), in which case FLAC extraction is a genuine
                lossless-to-lossless operation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Special cases</h2>
          <p className="font-semibold text-gray-800 mb-2">YouTube videos</p>
          <p className="leading-relaxed">
            YouTube serves video with AAC audio at 128–192 kbps for standard streams.
            Downloaded YouTube MP4 files contain that AAC stream. Extracting to MP3 at
            192 kbps gives you a small quality hit from the AAC-to-MP3 transcode, but the
            result is clean and universally compatible. For music, extracting to M4A (same
            codec, no transcode) is technically better — but you'll need a player that
            supports M4A.
          </p>

          <p className="font-semibold text-gray-800 mb-2 mt-4">Lecture recordings and interviews</p>
          <p className="leading-relaxed">
            If you're extracting audio from a Zoom recording, a lecture capture, or a video
            interview — MP3 at 128 kbps is plenty. Speech compresses well and these files
            are often long (1–2 hours), where file size matters. No need for anything higher
            than 128 kbps mono for pure speech.
          </p>

          <p className="font-semibold text-gray-800 mb-2 mt-4">Concert or live music recordings</p>
          <p className="leading-relaxed">
            If the source video had good audio — a well-recorded live concert, for example
            — use 320 kbps MP3 or M4A to preserve as much of the source quality as possible.
            You're still bounded by the source encoding, but you minimise the additional
            loss from the extraction transcode.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/mp4-to-mp3', label: 'MP4 to MP3', note: 'Extract audio for sharing'    },
          { href: '/mp4-to-wav', label: 'MP4 to WAV', note: 'Extract audio for editing'    },
          { href: '/mov-to-mp3', label: 'MOV to MP3', note: 'iPhone, iMovie, Final Cut Pro' },
          { href: '/mov-to-wav', label: 'MOV to WAV', note: 'MOV audio for editing'         },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/when-converting-to-wav-does-not-improve-quality', label: 'When WAV Doesn\'t Help Quality'    },
          { href: '/learn/aac-m4a-and-mp3-what-actually-matters',           label: 'AAC, M4A, and MP3: What Matters'  },
          { href: '/learn/best-audio-format-for-editing',                   label: 'Best Audio Format for Editing'    },
          { href: '/formats/mp3',                                           label: 'MP3 format guide'                 },
        ]}
      />

      <LastUpdated date="2026-03-26" />

    </div>
  );
}
