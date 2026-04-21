import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'ALAC to MP3 Converter',
  description:
    'Convert Apple Lossless (ALAC) to MP3 for universal device compatibility. Upload your ALAC file and download a high-quality MP3. Free, no account, no install.',
  alternates: {
    canonical: '/alac-to-mp3',
  },

  openGraph: {
    title: 'ALAC to MP3 Converter',
    description:
      'Convert Apple Lossless (ALAC) to MP3 for universal device compatibility. Upload your ALAC file and download a high-quality MP3. Free, no account, no install.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALAC to MP3 Converter',
    description:
      'Convert Apple Lossless (ALAC) to MP3 for universal device compatibility. Upload your ALAC file and download a high-quality MP3. Free, no account, no install.',
  },
};

export default function AlacToMp3Page() {
  return (
    <ToolPageLayout
      slug="/alac-to-mp3"
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
          'MP3 plays natively on every device ALAC does not: Android phones, Windows PCs, non-Apple car stereos, and any hardware that predates Apple ecosystem support. Since ALAC is lossless, converting to MP3 at 192 kbps gives you the best possible MP3 — the encoder starts from fully intact audio with no prior compression.',
      }}
      whyConvert="ALAC files are typically 40–60% the size of equivalent WAV files, but they are still much larger than MP3 and not supported on non-Apple devices without extra software. Converting ALAC to MP3 produces a file that plays anywhere — Android devices, Windows Media Player, car stereos, and streaming platforms — without needing iTunes or Apple Music. Since ALAC is lossless, you are starting from the best possible source, which means your MP3 will be as good as any MP3 at its chosen bitrate."
      faqItems={[
        {
          question: 'Does ALAC to MP3 conversion reduce quality?',
          answer:
            'Yes — MP3 is lossy, so some audio data is discarded during encoding. However, starting from a lossless ALAC source means the MP3 encoder works from the full intact signal, with no accumulated compression from a previous encode. At 192 or 320 kbps, quality loss is imperceptible for most listeners.',
        },
        {
          question: 'Why won\'t ALAC play on my Android phone or Windows PC?',
          answer:
            'ALAC is a proprietary Apple codec. Android does not include native ALAC playback support. Windows can play ALAC only through iTunes, Apple Music, or third-party software like VLC — it does not work in Windows Media Player or most default Android music apps. Converting to MP3 removes the dependency on Apple software entirely.',
        },
        {
          question: 'What is the difference between ALAC and FLAC?',
          answer:
            'Both are lossless compression formats with identical audio quality at the same source. ALAC was developed by Apple and plays natively on Apple devices; FLAC is open source and plays natively on Android, Linux, and modern Windows. Converting ALAC to FLAC gives you the same audio in a more broadly compatible container — useful if you want to keep a lossless copy.',
        },
        {
          question: 'My ALAC files have an .m4a extension — will they work?',
          answer:
            'ALAC audio is commonly stored with a .m4a extension because ALAC uses the MPEG-4 container. The .m4a extension does not distinguish between AAC and ALAC content inside. If your file is .m4a with ALAC encoding, use the M4A to MP3 converter — it handles both AAC-encoded and ALAC-encoded .m4a files.',
        },
        {
          question: 'Can I also convert ALAC to WAV or FLAC?',
          answer:
            'Yes. Since ALAC is lossless, converting to WAV or FLAC produces a lossless output with no quality loss. FLAC is the more storage-efficient choice — it is 40–60% smaller than WAV at identical quality. WAV is the safer choice for software that does not support FLAC.',
        },
        {
          question: 'Which bitrate should I choose when converting ALAC to MP3?',
          answer:
            '320 kbps is the recommended choice when converting from a lossless source. You are starting with the best possible audio, so there is no reason to limit the output with a lower bitrate. 192 kbps is a good middle ground for everyday listening where file size matters. 128 kbps is acceptable for voice or speech content but noticeable on music.',
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
        { href: '/guides/lossless-vs-lossy-audio',             label: 'Lossless vs Lossy Audio'              },
        { href: '/formats/alac',                               label: 'What Is ALAC?'                        },
        { href: '/wiki/what-is-lossless-audio',                label: 'WikiSound: What Is Lossless Audio?'   },
        { href: '/wiki/what-is-transcoding',                   label: 'WikiSound: What Is Transcoding?'      },
        { href: '/guides/how-to-choose-mp3-bitrate',           label: 'How to Choose the Right MP3 Bitrate'  },
      ]}
      lastUpdated="2026-04-14"
    />
  );
}
