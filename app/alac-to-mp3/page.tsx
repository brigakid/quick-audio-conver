import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'ALAC to MP3 Converter — Free Online',
  description:
    'Convert ALAC to MP3 online for free. Upload Apple Lossless audio and download a high-quality MP3 for universal playback. No signup required.',
};

export default function AlacToMp3Page() {
  return (
    <ToolPageLayout
      title="ALAC to MP3 Converter"
      subtitle="Upload Apple Lossless audio and convert it to compact, universally compatible MP3 — instantly and privately."
      inputFormat="alac"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'ALAC',
        description:
          'ALAC (Apple Lossless Audio Codec) is Apple\'s lossless compression format. Like FLAC, it compresses audio without removing any data — the decoded output is bit-for-bit identical to the original. ALAC is natively supported in iTunes, Apple Music, and iOS, and is stored in files with the .alac or .m4a extension.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. It uses lossy compression to produce small files without dramatically reducing perceived quality. MP3 plays on every device, car stereo, and media player — making it the best choice when you need a file that works everywhere.',
      }}
      whyConvert="ALAC files are typically 40–60% the size of equivalent WAV files, but they are still much larger than MP3 and not supported on non-Apple devices without extra software. Converting ALAC to MP3 produces a file that plays anywhere — Android devices, Windows Media Player, car stereos, and streaming platforms — without needing iTunes or Apple Music. Since ALAC is lossless, you are starting from the best possible source, which means your MP3 will be as good as any MP3 at its chosen bitrate."
      faqItems={[
        {
          question: 'Does ALAC to MP3 conversion reduce quality?',
          answer:
            'Yes — MP3 is lossy, so some audio data is discarded during encoding. However, starting from a lossless ALAC source means you are getting the best possible MP3 at your chosen bitrate. At 192 or 320 kbps, quality loss is imperceptible for most listeners.',
        },
        {
          question: 'What is the difference between ALAC and FLAC?',
          answer:
            'Both are lossless compression formats with identical audio quality. ALAC was developed by Apple and plays natively on Apple devices; FLAC is open source and plays natively on Android, Linux, and Windows (with modern software). Neither is better — the choice depends on your devices.',
        },
        {
          question: 'My ALAC files have an .m4a extension — will they work?',
          answer:
            'ALAC audio is often stored with a .m4a extension. The converter accepts .alac files directly. If your file is .m4a with ALAC encoding, try the M4A to MP3 converter — it handles M4A files regardless of whether the audio codec inside is AAC or ALAC.',
        },
        {
          question: 'Can I also convert ALAC to WAV or FLAC?',
          answer:
            'Yes. ALAC is lossless, so you can also convert it to WAV or FLAC without any quality loss. FLAC is particularly useful if you want a lossless copy with broader non-Apple compatibility.',
        },
      ]}
      relatedTools={[
        { href: '/alac-to-wav',   label: 'ALAC to WAV' },
        { href: '/alac-to-flac',  label: 'ALAC to FLAC' },
        { href: '/flac-to-mp3',   label: 'FLAC to MP3' },
        { href: '/m4a-to-mp3',    label: 'M4A to MP3' },
        { href: '/wav-to-mp3',    label: 'WAV to MP3' },
      ]}
      relatedGuides={[
        { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
        { href: '/formats/alac',                   label: 'What Is ALAC?' },
      ]}
    />
  );
}
