import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AAC to MP3 Converter',
  description:
    'Convert AAC or M4A files to MP3. iTunes libraries, iPhone recordings, YouTube-extracted audio — upload and download a compatible MP3 in seconds. Free, no account.',
  alternates: {
    canonical: '/aac-to-mp3',
  },

  openGraph: {
    title: 'AAC to MP3 Converter',
    description:
      'Convert AAC or M4A files to MP3. iTunes libraries, iPhone recordings, YouTube-extracted audio — upload and download a compatible MP3 in seconds. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AAC to MP3 Converter',
    description:
      'Convert AAC or M4A files to MP3. iTunes libraries, iPhone recordings, YouTube-extracted audio — upload and download a compatible MP3 in seconds. Free, no account.',
  },
};

export default function AacToMp3Page() {
  return (
    <ToolPageLayout
      slug="/aac-to-mp3"
      title="AAC to MP3 Converter"
      subtitle="Convert AAC audio files to universally compatible MP3 format. Upload, choose quality, and download instantly."
      inputFormat="aac"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'AAC',
        description:
          'AAC (Advanced Audio Coding) is a lossy audio compression format designed as the successor to MP3. It delivers better sound quality than MP3 at similar bitrates. AAC is the default audio format for Apple devices, iTunes, YouTube streams, and many streaming services.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. While AAC technically offers better quality-per-bit, MP3 has broader compatibility across older devices, car stereos, and software that pre-dates widespread AAC support.',
      }}
      whyConvert="AAC sounds better than MP3 at the same bitrate — but MP3 wins on compatibility. iTunes libraries, iPhone voice memos, and YouTube-extracted audio typically arrive as AAC or M4A. If you need to play those files on a car stereo, older Android device, or any hardware that predates wide AAC support, converting to MP3 is the fix. MP3 is also the required format for many podcast platforms, DJ software, and audio editors."
      faqItems={[
        {
          question: 'Is AAC better quality than MP3?',
          answer:
            'Yes — AAC produces better audio quality than MP3 at the same bitrate due to a more efficient compression algorithm. At 128 kbps, AAC sounds noticeably cleaner. At 192 kbps or above, most listeners cannot tell the difference on typical headphones or speakers.',
        },
        {
          question: 'Will I lose quality converting AAC to MP3?',
          answer:
            'A small amount, yes. Both formats are lossy, so converting between them re-encodes already-compressed audio. Choose 192 kbps or 320 kbps to keep the quality loss minimal. If audio fidelity matters, keep your original AAC file alongside the MP3.',
        },
        {
          question: 'What bitrate should I choose for the MP3?',
          answer:
            '192 kbps is the recommended default — transparent to most listeners and produces a reasonable file size. Use 320 kbps if the source is high-quality music and you want maximum fidelity. 128 kbps is fine for voice recordings and podcasts where file size matters.',
        },
        {
          question: 'What is the difference between AAC and M4A?',
          answer:
            'M4A is an MPEG-4 container file that wraps AAC audio. A standalone .aac file is a raw AAC bitstream. Both use the same AAC encoding and sound identical — the difference is just the container format. This converter handles both extensions.',
        },
        {
          question: 'I have a library of iTunes purchases — can I convert them?',
          answer:
            'iTunes purchases from 2009 onward are DRM-free AAC files — these convert without any issue. Older purchases may have DRM (FairPlay protection), which cannot be decoded by a standard converter. If your files are DRM-protected, they will need to be addressed through Apple\'s own tools first.',
        },
      ]}
      relatedTools={[
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/ogg-to-mp3', label: 'OGG to MP3' },
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
      ]}
      relatedGuides={[
        { href: '/formats/aac',        label: 'AAC, M4A and MP3 — What Actually Matters' },
        { href: '/guides/mp3-vs-wav',                                  label: 'MP3 vs WAV'                              },
        { href: '/guides/how-to-choose-mp3-bitrate',                   label: 'How to Choose MP3 Bitrate'               },
        { href: '/formats/aac',                                   label: 'WikiSound: What Is AAC?'                 },
        { href: '/wiki/what-is-lossy-audio',                           label: 'WikiSound: What Is Lossy Audio?'         },
        { href: '/wiki/what-is-transcoding',                           label: 'WikiSound: What Is Transcoding?'         },
      ]}
      lastUpdated="2026-03-28"
    />
  );
}
