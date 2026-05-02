import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'ALAC to WAV Converter',
  description:
    'Convert Apple Lossless (ALAC) to uncompressed WAV for editing software, DAWs, and professional workflows. Both are lossless — no quality change. Free, no account.',
  alternates: {
    canonical: '/alac-to-wav',
  },

  openGraph: {
    title: 'ALAC to WAV Converter',
    description:
      'Convert Apple Lossless (ALAC) to uncompressed WAV for editing software, DAWs, and professional workflows. Both are lossless — no quality change. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALAC to WAV Converter',
    description:
      'Convert Apple Lossless (ALAC) to uncompressed WAV for editing software, DAWs, and professional workflows. Both are lossless — no quality change. Free, no account.',
  },
};

export default function AlacToWavPage() {
  return (
    <ToolPageLayout
      slug="/alac-to-wav"
      title="ALAC to WAV Converter"
      subtitle="Convert Apple Lossless audio to uncompressed WAV — the format preferred by DAWs, audio editors, and professional production tools."
      inputFormat="alac"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'ALAC',
        description:
          'ALAC (Apple Lossless Audio Codec) is Apple\'s lossless compression format, stored in .alac or .m4a files. Like FLAC, it compresses audio without discarding any data. ALAC is natively supported on Apple devices and in iTunes and Apple Music.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV (Waveform Audio File Format) stores raw, uncompressed PCM audio. It is the standard format for professional audio editing, DAWs, hardware samplers, and broadcast workflows. Files are large but require no decoding overhead and are supported everywhere.',
      }}
      whyConvert="Both ALAC and WAV are lossless, so converting between them involves no quality loss. The reason to convert ALAC to WAV is compatibility: some DAWs, hardware samplers, and older audio tools accept WAV but not ALAC. Logic Pro, Pro Tools, Ableton, and hardware gear like MPC samplers and Eurorack modules all work natively with WAV but may not handle ALAC. This conversion is also useful if you need to import Apple Music exports into software that does not understand ALAC containers."
      faqItems={[
        {
          question: 'Is there any quality difference between ALAC and WAV?',
          answer:
            'No. Both are lossless — ALAC is simply a compressed lossless format and WAV is uncompressed lossless. The audio content is identical after decoding. Converting ALAC to WAV involves no loss of any kind.',
        },
        {
          question: 'Why is WAV much larger than ALAC?',
          answer:
            'ALAC compresses the audio data (typically 40–60% of the original size) while retaining every bit. WAV stores the raw, uncompressed samples. The audio content is identical; WAV just uses more disk space to represent it.',
        },
        {
          question: 'Can I convert ALAC to FLAC instead?',
          answer:
            'Yes. ALAC to FLAC is also supported and keeps the audio lossless while using a format with broader non-Apple compatibility. Use FLAC if you want lossless quality with a smaller file than WAV.',
        },
        {
          question: 'My ALAC files have a .m4a extension — do I upload them here?',
          answer:
            'ALAC is sometimes stored with a .m4a extension. This converter accepts .alac files. For .m4a files, use the M4A to WAV converter — it handles both AAC and ALAC content inside .m4a containers.',
        },
      ]}
      relatedTools={[
        { href: '/alac-to-mp3',   label: 'ALAC to MP3' },
        { href: '/alac-to-flac',  label: 'ALAC to FLAC' },
        { href: '/flac-to-wav',   label: 'FLAC to WAV' },
        { href: '/m4a-to-wav',    label: 'M4A to WAV' },
        { href: '/mp3-to-wav',    label: 'MP3 to WAV' },
      ]}
      relatedGuides={[
        { href: '/guides/flac-vs-wav',             label: 'FLAC vs WAV' },
        { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
        { href: '/formats/alac',                   label: 'What Is ALAC?' },
      ]}
    />
  );
}
