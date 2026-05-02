import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'ALAC to FLAC Converter',
  description:
    'Convert Apple Lossless (ALAC) to FLAC with no quality loss. Lossless to lossless — same audio, smaller file, broader cross-platform support. Free, no account.',
  alternates: {
    canonical: '/alac-to-flac',
  },

  openGraph: {
    title: 'ALAC to FLAC Converter',
    description:
      'Convert Apple Lossless (ALAC) to FLAC with no quality loss. Lossless to lossless — same audio, smaller file, broader cross-platform support. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALAC to FLAC Converter',
    description:
      'Convert Apple Lossless (ALAC) to FLAC with no quality loss. Lossless to lossless — same audio, smaller file, broader cross-platform support. Free, no account.',
  },
};

export default function AlacToFlacPage() {
  return (
    <ToolPageLayout
      slug="/alac-to-flac"
      title="ALAC to FLAC Converter"
      subtitle="Convert Apple Lossless to FLAC with no quality loss — the same audio, in a format that works on Android, Windows, and Linux without Apple software."
      inputFormat="alac"
      outputFormat="flac"
      sourceFormatInfo={{
        name: 'ALAC',
        description:
          'ALAC (Apple Lossless Audio Codec) is Apple\'s lossless compression format. It stores audio perfectly — no data is removed — but it is tied to Apple\'s ecosystem. ALAC is natively supported in iTunes, Apple Music, and iOS, but requires third-party software on Android, Windows, and Linux.',
      }}
      targetFormatInfo={{
        name: 'FLAC',
        description:
          'FLAC (Free Lossless Audio Codec) is an open, royalty-free lossless format. It plays natively on Android, Linux, VLC, Windows Media Player (Windows 10+), foobar2000, and most modern audio players. FLAC achieves similar compression ratios to ALAC with broader platform support.',
      }}
      whyConvert="ALAC and FLAC are both lossless — converting between them involves no quality loss at all. The audio content before and after conversion is bit-for-bit identical. The reason to convert is platform compatibility: if you have an ALAC music library and want it to play on Android, Windows without iTunes, or a non-Apple hi-fi device, FLAC is the more widely supported alternative. This is a pure container swap — same quality, better reach."
      faqItems={[
        {
          question: 'Is there any quality loss when converting ALAC to FLAC?',
          answer:
            'None. Both formats are lossless. The decoded audio from either file is identical to the original PCM source. This is a container and codec swap, not a lossy re-encode.',
        },
        {
          question: 'Why not just convert to WAV instead of FLAC?',
          answer:
            'FLAC gives you lossless quality at roughly half the file size of WAV. If you want to archive your library efficiently and need cross-platform compatibility, FLAC is the better choice. WAV is preferable when you need maximum software compatibility, especially with older audio tools.',
        },
        {
          question: 'Can I convert back from FLAC to ALAC later?',
          answer:
            'Yes. Since both are lossless, you can convert FLAC back to ALAC at any time without any degradation. Neither conversion direction causes quality loss.',
        },
        {
          question: 'My ALAC files are .m4a — will this work?',
          answer:
            'ALAC is sometimes stored with a .m4a extension. This converter accepts .alac files. If your files are .m4a, they may contain AAC (lossy) rather than ALAC. Check in iTunes or a media player — if the codec shows "Apple Lossless" or "ALAC", the audio is lossless.',
        },
      ]}
      relatedTools={[
        { href: '/alac-to-mp3',  label: 'ALAC to MP3' },
        { href: '/alac-to-wav',  label: 'ALAC to WAV' },
        { href: '/flac-to-mp3',  label: 'FLAC to MP3' },
        { href: '/flac-to-wav',  label: 'FLAC to WAV' },
        { href: '/wav-to-flac',  label: 'WAV to FLAC' },
      ]}
      relatedGuides={[
        { href: '/guides/flac-vs-wav',             label: 'FLAC vs WAV' },
        { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
        { href: '/formats/flac',                   label: 'What Is FLAC?' },
        { href: '/formats/alac',                   label: 'What Is ALAC?' },
      ]}
    />
  );
}
