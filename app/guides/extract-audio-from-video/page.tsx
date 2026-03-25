import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'How to Extract Audio from a Video File',
  description:
    'Step-by-step: how to extract the audio track from an MP4, MKV, or MOV file and save it as MP3, WAV, or M4A. No software installation required.',
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

      <QuickAnswer>
        Upload the video file to QuickAudioConvert and select an audio output format
        (MP3, WAV, or M4A). The converter strips the video track and saves only the
        audio. The video is discarded — only the audio is in the download.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step-by-step</h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'Go to the converter',
                body: 'Visit the homepage or go directly to the MP4 to MP3 converter. The converter also works with MKV, MOV, and other video formats — just upload and it detects the file type.',
              },
              {
                step: '2',
                title: 'Upload your video file',
                body: 'Drag the file into the upload area or click to browse. Files up to 200 MB are supported. If your file is larger, see the note below.',
              },
              {
                step: '3',
                title: 'Choose your audio output format',
                body: 'Select MP3, WAV, or M4A. MP3 is the best choice for most purposes — small file, plays everywhere. WAV if you need the audio for editing software. M4A for Apple device compatibility.',
              },
              {
                step: '4',
                title: 'If converting to MP3, choose a bitrate',
                body: '192 kbps is a good default. 320 kbps for higher quality. 128 kbps for a smaller file when quality is less important (voice recordings, lectures).',
              },
              {
                step: '5',
                title: 'Convert and download',
                body: 'Click Convert and wait a few seconds. When complete, click Download. The file is automatically deleted from the server after 30 minutes.',
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
            The converter accepts MP4 files directly. It also accepts audio-containing files
            in formats including MKV, MOV, WebM, and AVI through the general upload flow —
            upload the file and the converter will detect the audio track. If your video
            format is not recognised, the upload will fail with a format error.
          </p>
          <p className="leading-relaxed mt-3">
            MP4 is by far the most common video format for this purpose. If you downloaded a
            video from YouTube, a lecture, a screen recording, or a video message, it is
            almost certainly MP4.
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
          { href: '/mp4-to-mp3', label: 'MP4 to MP3 Converter', note: 'Most common video-to-audio conversion' },
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

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
