import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'M4A to MP3 Converter',
  description:
    'Convert M4A to MP3 online for free. Upload your Apple M4A audio file and convert it to widely compatible MP3. Fast and private.',
};

export default function M4aToMp3Page() {
  return (
    <ToolPageLayout
      title="M4A to MP3 Converter"
      subtitle="Convert Apple M4A audio files to MP3 format for broader device and platform compatibility."
      inputFormat="m4a"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'M4A',
        description:
          'M4A is an audio file format used primarily by Apple. It is a container using the MPEG-4 standard, typically encoding audio with AAC (Advanced Audio Codec). M4A files are commonly produced by iTunes, Apple Music, iOS devices, and GarageBand.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 is the most widely supported audio format in the world. Unlike M4A, MP3 files are playable on virtually all devices, platforms, and apps — including older systems and third-party software that may not support M4A.',
      }}
      whyConvert="M4A files work well within the Apple ecosystem, but may not play on non-Apple devices or software that lacks AAC support. Converting M4A to MP3 ensures your audio is universally playable. It is also the preferred format for sharing audio online, via email, or for uploading to platforms that require MP3 input."
      faqItems={[
        {
          question: 'Is M4A better quality than MP3?',
          answer:
            'At the same bitrate, AAC (used in M4A) technically produces slightly better quality than MP3. However, both are lossy formats and the difference is usually not noticeable on typical playback equipment.',
        },
        {
          question: 'Why can\'t some devices play M4A files?',
          answer:
            'M4A support is not universal. Older Android devices, some car stereos, and non-Apple media players may not support AAC/M4A. MP3 has much broader hardware and software support.',
        },
        {
          question: 'Will I lose audio quality converting M4A to MP3?',
          answer:
            'Since both are lossy formats, you are re-encoding already compressed audio, which can reduce quality slightly. Choosing 192 kbps or 320 kbps helps minimize this. For archival, keep your original M4A.',
        },
        {
          question: 'Can I convert M4A files from my iPhone?',
          answer:
            'Yes. M4A files recorded or downloaded to your iPhone can be uploaded directly from your device using the file browser on mobile.',
        },
      ]}
      relatedTools={[
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/aac-to-mp3', label: 'AAC to MP3' },
        { href: '/ogg-to-mp3', label: 'OGG to MP3' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
      ]}
    />
  );
}
