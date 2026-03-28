import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'Codec vs Container: What\'s the Difference in Audio?',
  description:
    'A container is the file wrapper (MP4, M4A, WAV). A codec is the compression algorithm inside it (AAC, MP3, PCM). The same container can hold different codecs — here\'s why that matters.',
};

export default function CodecVsContainerPage() {
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
          Codec vs Container: What's the Difference?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        A <strong>container</strong> is the file wrapper — it determines the file extension (MP4,
        M4A, WAV) and how audio (and video/metadata) is organised inside the file.{' '}
        A <strong>codec</strong> is the compression algorithm that encoded the audio data inside
        that container (AAC, MP3, PCM, FLAC). The same container can hold different codecs.
        The same codec can live in different containers.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why this confuses everyone</h2>
          <p className="leading-relaxed">
            If you've ever wondered why an MP4 video file "contains AAC audio" — or why M4A is
            described as an audio format but the codec inside is AAC — or why a WAV file is
            called uncompressed when it technically uses a codec called PCM — you've bumped into
            the container/codec distinction.
          </p>
          <p className="leading-relaxed mt-3">
            The confusion is understandable. MP3 is both the name of a codec (MPEG-1 Audio Layer
            III) and the name of the container format that holds it (.mp3 files). They share a
            name because MP3 was designed as a self-contained format. Most other formats separate
            the container from the codec — and that separation is what trips people up.
          </p>
        </section>

        {/* Side-by-side explanation */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Container vs codec, side by side</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-brand/20 bg-brand/5">
              <p className="font-bold text-gray-900 text-sm mb-2">The container</p>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>• The file wrapper / packaging</li>
                <li>• Determines the file extension</li>
                <li>• Stores metadata (title, artist, cover art)</li>
                <li>• Can hold multiple streams (audio + video + subtitles)</li>
                <li>• Doesn't determine sound quality</li>
                <li>• Examples: MP4, MKV, M4A, WAV, OGG, WebM</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
              <p className="font-bold text-gray-900 text-sm mb-2">The codec</p>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>• The compression algorithm</li>
                <li>• Determines audio quality and file size</li>
                <li>• Encodes audio when saving; decodes on playback</li>
                <li>• Can be lossy or lossless</li>
                <li>• Does determine sound quality</li>
                <li>• Examples: AAC, MP3, PCM, FLAC, Opus, Vorbis</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The box and the language</h2>
          <p className="leading-relaxed">
            An analogy that makes the distinction stick: think of the container as a box or
            package. The codec is the language the contents are written in.
          </p>
          <p className="leading-relaxed mt-3">
            The same box (MP4 container) can hold documents written in English, French, or German
            (AAC, MP3, or PCM codec). The box format tells you how things are organised inside;
            the language determines what the content actually says and how it compresses.
          </p>
          <p className="leading-relaxed mt-3">
            Extending the analogy: if you move the documents to a different box (change the
            container) but don't translate them (don't re-encode), the content is identical. If
            you translate them into a new language (transcode to a different codec), the meaning
            is similar but the phrasing changes — and there may be small losses in translation
            if the new language is less expressive (lossy codec).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common containers and the codecs inside them</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Container</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Extension</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Common audio codecs inside</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['MP4',  '.mp4',  'AAC (most common), MP3, PCM', 'Video + audio; used by cameras, phones, web'],
                  ['M4A',  '.m4a',  'AAC (almost always)',         'Audio-only MP4; Apple\'s preferred audio format'],
                  ['WAV',  '.wav',  'PCM (almost always)',         'Uncompressed audio; Microsoft standard'],
                  ['OGG',  '.ogg',  'Vorbis, Opus, FLAC',         'Open-source container; codec varies by use'],
                  ['MKV',  '.mkv',  'AAC, MP3, FLAC, Opus',       'Flexible video container; supports many codecs'],
                  ['FLAC', '.flac', 'FLAC codec only',             'Both the codec and the container share a name'],
                  ['MP3',  '.mp3',  'MP3 codec only',              'Container and codec share a name'],
                  ['WebM', '.webm', 'Vorbis, Opus',                'Web video/audio; open standard from Google'],
                  ['MOV',  '.mov',  'AAC, PCM, MP3',               'Apple\'s video container; used by iPhones, cameras'],
                ].map(([container, ext, codecs, notes]) => (
                  <tr key={container} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{container}</td>
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-600">{ext}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{codecs}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Remuxing vs transcoding — why it matters practically</h2>
          <p className="leading-relaxed">
            This is where the distinction has real consequences. When you change the container
            without changing the codec, it's called remuxing. The audio data stays identical —
            it's just reorganised into a different wrapper. No quality loss, no re-encoding.
          </p>
          <p className="leading-relaxed mt-3">
            When you change the codec — even if you keep the same container — it's called
            transcoding. The audio is fully decoded and then re-encoded with a different algorithm.
            If both codecs are lossy, this causes quality loss. If you transcode from lossy to
            lossless, you get a lossless wrapper around lossy data (no quality gain). If you
            transcode from lossless to lossy, you get one-time, controlled quality reduction.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="font-semibold text-green-800">No quality loss:</span>
              <span className="text-green-700 ml-2">MP4 (AAC) → M4A (AAC) — container change only, codec stays AAC</span>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="font-semibold text-green-800">No quality loss:</span>
              <span className="text-green-700 ml-2">WAV → FLAC — both lossless, audio data is identical</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="font-semibold text-amber-800">Controlled quality trade-off:</span>
              <span className="text-amber-700 ml-2">FLAC → MP3 — lossless to lossy, one-time compression</span>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="font-semibold text-red-800">Quality loss:</span>
              <span className="text-red-700 ml-2">MP3 → AAC → MP3 — lossy to lossy to lossy; cumulative degradation</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How this affects audio conversion on this site</h2>
          <p className="leading-relaxed">
            When you convert an MP4 or MOV file to MP3 here, the audio track is extracted (decoded
            from whatever codec the video used, often AAC) and then re-encoded as MP3. That's a
            full transcode — the codec changes — so there is a quality trade-off if the source
            was lossy.
          </p>
          <p className="leading-relaxed mt-3">
            When you convert WAV to FLAC, you're transcoding from PCM (uncompressed) to FLAC
            (lossless) — both lossless codecs, so no quality loss. When you convert FLAC to WAV,
            same story in reverse.
          </p>
          <p className="leading-relaxed mt-3">
            The most important conversion rule: transcode from the highest-quality source available.
            If you have both an MP3 and a FLAC of the same audio, always convert from the FLAC.
            The FLAC gives the encoder the full audio data to work with; the MP3 has already been
            reduced.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/mp4-to-mp3', label: 'MP4 to MP3', note: 'Extracts audio, re-encodes as MP3'  },
          { href: '/mov-to-mp3', label: 'MOV to MP3', note: 'MOV container → MP3 codec'          },
          { href: '/mov-to-m4a', label: 'MOV to M4A', note: 'May be a container change only'     },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-audio-codec',    label: 'What Is an Audio Codec?'    },
          { href: '/wiki/what-is-mp3',            label: 'What Is MP3?'               },
          { href: '/wiki/what-is-wav',            label: 'What Is WAV?'               },
          { href: '/wiki/what-is-flac',           label: 'What Is FLAC?'              },
          { href: '/wiki/what-is-lossy-audio',    label: 'What Is Lossy Audio?'       },
        ]}
      />

      <RelatedContent
        title="Format guides"
        items={[
          { href: '/formats/mp3', label: 'MP3 format guide' },
          { href: '/formats/m4a', label: 'M4A format guide' },
          { href: '/formats/aac', label: 'AAC format guide' },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
