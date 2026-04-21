import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WMA to MP3 Converter',
  description:
    'Convert WMA files to MP3. Works with Windows Media Player rips, old music libraries, and WMA voice recordings. Free, no account, no software to install.',
  alternates: {
    canonical: '/wma-to-mp3',
  },

  openGraph: {
    title: 'WMA to MP3 Converter',
    description:
      'Convert WMA files to MP3. Works with Windows Media Player rips, old music libraries, and WMA voice recordings. Free, no account, no software to install.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WMA to MP3 Converter',
    description:
      'Convert WMA files to MP3. Works with Windows Media Player rips, old music libraries, and WMA voice recordings. Free, no account, no software to install.',
  },
};

export default function WmaToMp3Page() {
  return (
    <ToolPageLayout
      slug="/wma-to-mp3"
      title="WMA to MP3 Converter"
      subtitle="Upload a WMA file and convert it to a broadly compatible MP3 — works with Windows Media Player exports, old media libraries, and radio recordings."
      inputFormat="wma"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'WMA',
        description:
          'WMA (Windows Media Audio) is Microsoft\'s proprietary audio format, introduced in 1999. It was widely used by Windows Media Player and early portable music players in the 2000s. WMA files use the .wma extension and are common in older Windows music libraries, CD rips made with Windows Media Player, and some internet radio recordings.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. It plays on every device, operating system, car stereo, smartphone, and media player — including everything that no longer supports WMA. Converting to MP3 brings your old WMA library into the modern era.',
      }}
      whyConvert="WMA was the default format for Windows Media Player CD rips and early digital music purchases in the 2000s. Today, most modern devices and apps have dropped WMA support entirely — iPhones can't play it, many Android players don't include the codec, and most audio software won't import it. Converting your WMA library to MP3 rescues those files and makes them playable on everything. MP3 is also a more stable long-term format; WMA support is unlikely to grow."
      faqItems={[
        {
          question: 'Can this converter handle DRM-protected WMA files?',
          answer:
            'No. DRM-protected WMA files were sold through early digital stores like MSN Music and early Napster. They are encrypted and cannot be decoded by any standard converter. This tool only works with unprotected WMA files — typically CD rips, voice recordings, and purchased tracks from after the DRM era.',
        },
        {
          question: 'Will I lose audio quality converting WMA to MP3?',
          answer:
            'A small amount, yes — both formats are lossy, so re-encoding compounds the compression. To minimise quality loss, use 320 kbps for music and 192 kbps for voice recordings. If your WMA was ripped from CD at 128 kbps or above, the converted MP3 will still sound acceptable.',
        },
        {
          question: 'What bitrate should I use for old WMA CD rips?',
          answer:
            'Match or exceed the original WMA bitrate. If the WMA was ripped at 128 kbps, encode to MP3 at 192 kbps to give the encoder a reasonable amount of headroom. Converting at the same low bitrate risks compounding artifacts from both encoding passes.',
        },
        {
          question: 'Where do WMA files come from?',
          answer:
            'WMA files typically come from Windows Media Player CD rips (the default format before Windows 7 switched to MP3), Windows Voice Recorder (older versions), internet radio recording software from the 2000s, and early digital music purchases. Many people have entire music libraries in WMA from this era.',
        },
        {
          question: 'My WMA files won\'t play on my phone — will converting fix that?',
          answer:
            'Yes, for unprotected files. Converting to MP3 removes the dependency on the WMA codec, which is absent on iOS and many Android setups. The resulting MP3 will play on any device.',
        },
      ]}
      relatedTools={[
        { href: '/aac-to-mp3',   label: 'AAC to MP3' },
        { href: '/m4a-to-mp3',   label: 'M4A to MP3' },
        { href: '/ogg-to-mp3',   label: 'OGG to MP3' },
        { href: '/flac-to-mp3',  label: 'FLAC to MP3' },
        { href: '/wav-to-mp3',   label: 'WAV to MP3' },
        { href: '/mp3-to-wav',   label: 'MP3 to WAV' },
      ]}
      relatedGuides={[
        { href: '/guides/mp3-vs-wav',                          label: 'MP3 vs WAV'                        },
        { href: '/guides/lossless-vs-lossy-audio',             label: 'Lossless vs Lossy Audio'           },
        { href: '/guides/how-to-choose-mp3-bitrate',           label: 'How to Choose MP3 Bitrate'         },
        { href: '/guides/troubleshooting-audio-conversion',    label: 'Troubleshooting Audio Conversion'  },
        { href: '/wiki/what-is-transcoding',                   label: 'WikiSound: What Is Transcoding?'   },
        { href: '/wiki/what-is-lossy-audio',                   label: 'WikiSound: What Is Lossy Audio?'   },
      ]}
      lastUpdated="2026-03-28"
    />
  );
}
