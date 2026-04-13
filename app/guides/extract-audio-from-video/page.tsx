import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'How to Extract Audio from a Video File',
  description:
    'Step-by-step: how to extract the audio track from an MP4 or MOV file and save it as MP3, WAV, M4A, AAC, OGG, or OPUS. No software installation required.',
  openGraph: {
    title: 'How to Extract Audio from a Video File',
    description:
      'Step-by-step: how to extract the audio track from an MP4 or MOV file and save it as MP3, WAV, M4A, AAC, OGG, or OPUS. No software installation required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Extract Audio from a Video File',
    description:
      'Step-by-step: how to extract the audio track from an MP4 or MOV file and save it as MP3, WAV, M4A, AAC, OGG, or OPUS. No software installation required.',
  },
};

export default function ExtractAudioFromVideoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/guides" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Guides
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">How-to</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          How to Extract Audio from a Video File
        </h1>
      </div>

      <Author />

      <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-gray-600 leading-relaxed">
        This is the step-by-step how-to for extracting audio using QuickAudioConvert: upload,
        choose a format, download. For a deeper look at which output format suits which use case —
        codec trade-offs, why WAV vs MP3 matters for editing — see{' '}
        <Link href="/learn/extracting-audio-from-video-best-format-choices" className="text-brand hover:underline">
          Best Format Choices When Extracting Audio from Video
        </Link>
        .
      </div>

      <QuickAnswer>
        Upload the video file to QuickAudioConvert and select an audio output format
        (MP3, WAV, M4A, AAC, OGG, or OPUS). The converter strips the video track
        and saves only the audio. The video is discarded — only the audio is in the download.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step-by-step</h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'Go to the converter',
                body: 'Visit the homepage or go directly to the MP4 to MP3 or MOV to MP3 converter. MP4 and MOV are directly supported for audio extraction. If you have an MKV, AVI, or WebM file, you will need to remux it to MP4 first using a local tool like VLC or Handbrake.',
              },
              {
                step: '2',
                title: 'Upload your video file',
                body: 'Drag the file into the upload area or click to browse. Files up to 200 MB are supported. If your file is larger, see the note below.',
              },
              {
                step: '3',
                title: 'Choose your audio output format',
                body: 'Select MP3, WAV, M4A, AAC, OGG, or OPUS. MP3 is the best choice for most purposes — small file, plays everywhere. WAV if you need the audio for editing software. M4A for Apple devices.',
              },
              {
                step: '4',
                title: 'If converting to MP3, choose a bitrate',
                body: '192 kbps is a good default. 320 kbps for higher quality. 128 kbps for a smaller file when quality is less important (voice recordings, lectures).',
              },
              {
                step: '5',
                title: 'Convert and download',
                body: 'Click Convert and wait a few seconds. When complete, click Download. The file is automatically deleted from the server after 5 minutes.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <span className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Which video formats are supported?</h2>
          <p className="leading-relaxed">
            The converter directly supports MP4 and MOV as video input formats for audio
            extraction. MP4 is the most common — YouTube downloads, screen recordings, and
            most downloaded video files are MP4. MOV is produced by iPhones, iPads, iMovie,
            and Final Cut Pro. Both work the same way: upload the file, choose an audio
            output format, and download the result.
          </p>
          <p className="leading-relaxed mt-3">
            If you have a video file in another container (MKV, AVI, WebM), you may need
            to remux it to MP4 first using a local tool like VLC or Handbrake before uploading.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What output format should I choose?</h2>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">MP3</span>
              <span>— Best for sharing, uploading, or playing on any device. 192 kbps is the right choice for music. 128 kbps is fine for voice or podcasts.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">WAV</span>
              <span>— Use this if you need to import the audio into editing software (Audacity, Premiere, Final Cut, etc.).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">M4A</span>
              <span>— Good option if you primarily use Apple devices and apps.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">FLAC</span>
              <span>— Lossless output, same quality as WAV in a smaller file. FLAC is not offered for MP4 or MOV (these contain lossy audio). FLAC output is available when converting from lossless sources: WAV, AIFF, or ALAC.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">AAC / OGG / OPUS</span>
              <span>— Efficient compressed formats. Good for streaming, web use, or when file size matters more than broad compatibility.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What about the video quality?</h2>
          <p className="leading-relaxed">
            The converter extracts the existing audio track from the video. It does not affect
            video quality because the video stream is discarded entirely — only the audio is
            saved.
          </p>
          <p className="leading-relaxed mt-3">
            The audio quality of the output depends on the audio in the original video. If the
            video had low-quality audio (e.g. a compressed MP4 with a 128 kbps AAC track),
            the extracted audio will reflect that source quality. Choosing a higher output
            bitrate cannot improve audio quality beyond what the source contained.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">File too large?</h2>
          <p className="leading-relaxed">
            The maximum upload size is 200 MB. If your video file exceeds this:
          </p>
          <ul className="mt-2 space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Trim the video to a shorter section using a local tool before uploading</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Use a desktop tool like VLC or FFmpeg if you have one installed — both can extract audio natively</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>For very large files, a local tool will be faster than an upload-based converter regardless of size limits</li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Extract audio from video"
        items={[
          { href: '/mp4-to-mp3', label: 'MP4 to MP3', note: 'Most common video-to-audio conversion' },
          { href: '/mp4-to-wav', label: 'MP4 to WAV', note: 'Uncompressed output for editing' },
          { href: '/mov-to-mp3', label: 'MOV to MP3', note: 'iPhone, iMovie, Final Cut Pro files' },
          { href: '/mov-to-wav', label: 'MOV to WAV', note: 'MOV audio for editing software' },
        ]}
      />

      <RelatedContent
        title="Choose the right output format"
        items={[
          { href: '/formats/mp3',       label: 'MP3 format guide' },
          { href: '/formats/wav',       label: 'WAV format guide' },
          { href: '/guides/mp3-vs-wav', label: 'MP3 vs WAV guide' },
        ]}
      />

      <LastUpdated date="2026-04-14" />

    </div>
  );
}
