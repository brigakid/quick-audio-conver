import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MP3 to M4A Converter',
  description:
    'Convert MP3 audio to M4A for iTunes, Apple Music, and devices that prefer AAC encoding. Free, private, no account needed.',
  openGraph: {
    title: 'MP3 to M4A Converter',
    description:
      'Convert MP3 audio to M4A for iTunes, Apple Music, and devices that prefer AAC encoding. Free, private, no account needed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP3 to M4A Converter',
    description:
      'Convert MP3 audio to M4A for iTunes, Apple Music, and devices that prefer AAC encoding. Free, private, no account needed.',
  },
};

export default function Mp3ToM4aPage() {
  return (
    <ToolPageLayout
      title="MP3 to M4A Converter"
      subtitle="Convert MP3 to the M4A format used by Apple devices and iTunes — slightly better audio efficiency at comparable bitrates."
      inputFormat="mp3"
      outputFormat="m4a"
      sourceFormatInfo={{
        name: 'MP3',
        description:
          'MP3 is the universally compatible lossy format. It has been the internet standard for 25 years. Its compression algorithm — psychoacoustic modelling — was state-of-the-art in 1993 but has since been surpassed by AAC. An MP3 works on essentially every device and platform, which is still its primary advantage.',
      }}
      targetFormatInfo={{
        name: 'M4A',
        description:
          'M4A is an MPEG-4 audio container holding AAC-encoded audio. AAC achieves better audio quality than MP3 at the same bitrate — the difference is most noticeable below 192 kbps. It is the default format for Apple devices, iTunes, GarageBand, and Apple Podcasts. Most modern non-Apple players support it too, though it is less universal than MP3.',
      }}
      whyConvert={`The two situations where this conversion actually makes sense: uploading to Apple Podcasts, which officially recommends AAC/M4A at 128 kbps for mono and 192 kbps for stereo; and compatibility with iTunes libraries or Apple workflows where M4A is the expected container.

That said, this is a lossy-to-lossy conversion. The output M4A will not sound better than the source MP3 — you are re-encoding audio that was already compressed, and each generation of lossy encoding discards additional data. If you have the original lossless file (WAV, FLAC, AIFF), always convert from that instead. MP3 to M4A only makes sense when you specifically need the M4A container or AAC codec and the lossless source is not available.`}
      faqItems={[
        {
          question: 'Will the M4A sound better than the original MP3?',
          answer:
            'No. This is a lossy-to-lossy transcode. The M4A will be re-encoded from already-compressed MP3 data, which means another round of psychoacoustic discarding. At high bitrates the difference is negligible; at lower bitrates it becomes audible. If audio quality matters, start from a lossless source.',
        },
        {
          question: 'Apple Podcasts requires M4A — what bitrate should I use?',
          answer:
            "Apple's own podcast guidelines recommend AAC encoding at 128 kbps for mono audio and 192 kbps for stereo. Most talk podcasts are mono; music-heavy shows or those where stereo imaging matters use stereo. Going higher than 192 kbps stereo buys you little for spoken-word content.",
        },
        {
          question: 'Can I play M4A files on Android or Windows?',
          answer:
            'Yes, AAC is widely supported — Android, Windows Media Player, VLC, and most streaming apps handle it without issue. It is less universally supported than MP3 in older or more obscure devices, but on anything made in the last decade you will not have a problem.',
        },
        {
          question: 'Why would I choose M4A over just keeping the MP3?',
          answer:
            'You would not, unless a specific platform or workflow requires the M4A container. If your MP3 plays everywhere you need it to, there is no reason to re-encode it. The conversion is for situations where M4A is the required input — a podcast host, an Apple-native workflow, or a device that only reads MPEG-4 containers.',
        },
      ]}
      relatedTools={[
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/wav-to-m4a', label: 'WAV to M4A' },
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
      ]}
      relatedGuides={[
        { href: '/learn/aac-m4a-and-mp3-what-actually-matters', label: 'AAC, M4A, and MP3 — what actually matters' },
        { href: '/formats/m4a', label: 'M4A format guide' },
        { href: '/formats/mp3', label: 'MP3 format guide' },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
