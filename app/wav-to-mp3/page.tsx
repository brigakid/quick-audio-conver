import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WAV to MP3 Converter',
  description:
    'Convert WAV to MP3 online for free. Upload your WAV file, select audio quality, and download your compressed MP3 instantly.',
};

export default function WavToMp3Page() {
  return (
    <ToolPageLayout
      title="WAV to MP3 Converter"
      subtitle="Convert uncompressed WAV audio files to the universally compatible MP3 format. Choose your bitrate and download in seconds."
      inputFormat="wav"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'WAV',
        description:
          'WAV (Waveform Audio File Format) is an uncompressed audio format developed by Microsoft and IBM. WAV files store audio in raw PCM data, which means they are large but lossless — every detail of the original recording is preserved.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the world\'s most widely supported audio format. It uses lossy compression to significantly reduce file size. A 40 MB WAV file might become a 3–5 MB MP3 at 192 kbps with minimal perceptible quality loss.',
      }}
      whyConvert="WAV files are large — a few minutes of audio can exceed 30–40 MB. Converting WAV to MP3 is the standard way to share audio online, via email, or on portable devices where storage matters. MP3 is supported by every music app, phone, and media player. The trade-off is a small reduction in audio fidelity, which is usually imperceptible at 192 kbps or higher."
      faqItems={[
        {
          question: 'How much smaller will my MP3 be compared to WAV?',
          answer:
            'A typical 40 MB WAV file will compress to around 3–5 MB as a 192 kbps MP3. The exact ratio depends on the original bit depth and sample rate of your WAV file.',
        },
        {
          question: 'Will the audio quality sound different?',
          answer:
            'At 192 kbps or 320 kbps, most listeners cannot tell the difference between WAV and MP3 on typical playback equipment. If you need lossless audio, keep your original WAV file.',
        },
        {
          question: 'Is WAV to MP3 conversion suitable for music production?',
          answer:
            'For final distribution, yes. For editing or mixing, you should keep your WAV source files. Do your editing in WAV, then convert to MP3 for release.',
        },
        {
          question: 'Can I convert stereo WAV files?',
          answer:
            'Yes. Stereo, mono, and multichannel WAV files are all supported. The output MP3 will preserve the channel layout of the original.',
        },
      ]}
      relatedTools={[
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/aac-to-mp3', label: 'AAC to MP3' },
        { href: '/ogg-to-mp3', label: 'OGG to MP3' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
      ]}
    />
  );
}
