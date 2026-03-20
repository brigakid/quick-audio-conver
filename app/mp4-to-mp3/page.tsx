import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MP4 to MP3 Converter',
  description:
    'Convert MP4 to MP3 online with QuickAudioConvert. Upload your video file, choose quality, and download your audio in seconds. Free and private.',
};

export default function Mp4ToMp3Page() {
  return (
    <ToolPageLayout
      title="MP4 to MP3 Converter"
      subtitle="Upload an MP4 video file and extract the audio track as a high-quality MP3 in seconds."
      inputFormat="mp4"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'MP4',
        description:
          'MP4 (MPEG-4 Part 14) is one of the most widely used video container formats. It typically contains both a video stream and one or more audio tracks, encoded using modern codecs like H.264 and AAC.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. It uses lossy compression to reduce file size while maintaining acceptable audio quality. MP3 files play on virtually every device, app, and platform.',
      }}
      whyConvert="Converting MP4 to MP3 is ideal when you only need the audio from a video — such as extracting a podcast, music track, lecture, or commentary. MP3 files are much smaller than MP4 and are supported everywhere, from car stereos to smartphones to streaming apps. This conversion discards the video stream and retains only the audio."
      faqItems={[
        {
          question: 'Can I extract audio from any MP4 file?',
          answer:
            'Yes, as long as the MP4 file contains an audio track. Some screen recordings or video files may lack audio — in that case, the conversion will produce a silent or empty file.',
        },
        {
          question: 'Will I lose quality when converting MP4 to MP3?',
          answer:
            'MP3 is a lossy format, so some audio data is discarded during compression. Choosing a higher bitrate (192 or 320 kbps) will minimize quality loss. If the original MP4 audio was already compressed, some quality may have been lost at source.',
        },
        {
          question: 'What is the maximum MP4 file size I can upload?',
          answer:
            'The maximum file size is 200 MB by default. If your file is larger, consider trimming it first or using a local tool like Handbrake.',
        },
        {
          question: 'How long does the conversion take?',
          answer:
            'Most conversions complete in a few seconds. Larger files may take longer. The server uses FFmpeg for fast, efficient processing.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/aac-to-mp3', label: 'AAC to MP3' },
        { href: '/ogg-to-mp3', label: 'OGG to MP3' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
      ]}
    />
  );
}
