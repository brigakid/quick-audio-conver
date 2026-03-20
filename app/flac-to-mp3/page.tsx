import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'FLAC to MP3 Converter',
  description:
    'Convert FLAC to MP3 online. Upload your lossless FLAC audio file, select bitrate, and download a compressed MP3 in seconds.',
};

export default function FlacToMp3Page() {
  return (
    <ToolPageLayout
      title="FLAC to MP3 Converter"
      subtitle="Convert lossless FLAC audio files to the compact and universally compatible MP3 format."
      inputFormat="flac"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'FLAC',
        description:
          'FLAC (Free Lossless Audio Codec) is an open-source format that compresses audio without any quality loss. FLAC files are significantly smaller than WAV while retaining 100% of the original audio data. They are popular among audiophiles and for archiving music.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 uses lossy compression to reduce audio file sizes by discarding some audio data. While not lossless, high-bitrate MP3 (320 kbps) sounds excellent for everyday listening and is far more broadly supported than FLAC on phones, car systems, and streaming platforms.',
      }}
      whyConvert="FLAC files are ideal for archiving or high-fidelity listening, but they can be large and are not supported on many platforms (including older Android devices, many car stereos, and social media upload tools). Converting to MP3 makes your audio universally shareable. You can choose 320 kbps to retain as much quality as possible while gaining full compatibility."
      faqItems={[
        {
          question: 'Does FLAC to MP3 conversion reduce audio quality?',
          answer:
            'Yes — MP3 is a lossy format, so some audio detail is discarded. However, a 320 kbps MP3 from a FLAC source sounds excellent for most listeners. If you want to preserve quality, keep your original FLAC file.',
        },
        {
          question: 'Why are FLAC files so large?',
          answer:
            'FLAC uses lossless compression — it stores every bit of the original audio data. A typical 3-minute FLAC track can be 20–40 MB, compared to 3–8 MB for an equivalent MP3.',
        },
        {
          question: 'Is FLAC supported on mobile devices?',
          answer:
            'FLAC support on mobile has improved but is inconsistent. Many music apps support FLAC, but some older devices and built-in media players do not. Converting to MP3 guarantees compatibility.',
        },
        {
          question: 'What bitrate should I choose for FLAC to MP3?',
          answer:
            'For the best quality when converting from FLAC, choose 320 kbps. For everyday listening and smaller file size, 192 kbps is a great balance. 128 kbps produces the smallest file with more noticeable compression.',
        },
      ]}
      relatedTools={[
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/aac-to-mp3', label: 'AAC to MP3' },
        { href: '/ogg-to-mp3', label: 'OGG to MP3' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
      ]}
    />
  );
}
