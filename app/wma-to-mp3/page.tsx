import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WMA to MP3 Converter — Free Online',
  description:
    'Convert WMA to MP3 online for free. Convert Windows Media Audio files to universally compatible MP3. No software to install, no signup required.',
};

export default function WmaToMp3Page() {
  return (
    <ToolPageLayout
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
      whyConvert="WMA was dominant on Windows PCs in the 2000s but has largely been abandoned by the industry. Many devices, apps, and platforms no longer support WMA playback. Converting your WMA library to MP3 ensures your music plays everywhere — on iOS, Android, modern media players, and any streaming or editing software. MP3 is also a safer long-term archival format since WMA support continues to decline."
      faqItems={[
        {
          question: 'Can this converter handle DRM-protected WMA files?',
          answer:
            'No. DRM (Digital Rights Management) protected WMA files are encrypted and cannot be decoded by standard conversion tools. This converter only works with unprotected WMA files. DRM-protected files were commonly sold through Microsoft\'s old MSN Music and similar stores.',
        },
        {
          question: 'Will I lose audio quality converting WMA to MP3?',
          answer:
            'Some quality loss is expected since both WMA and MP3 are lossy formats — converting between lossy formats is a "lossy-to-lossy" conversion. Use the highest bitrate available (320 kbps) to minimise further degradation. If your original WMA was ripped from CD at high bitrate, the result will still be good.',
        },
        {
          question: 'Where do WMA files come from?',
          answer:
            'WMA files are typically created by Windows Media Player when ripping CDs, by Windows voice recorder (older versions), internet radio recorders, or purchased from early 2000s online music stores. Many people have old WMA music libraries from this era.',
        },
        {
          question: 'My WMA file won\'t play anymore — will converting it fix that?',
          answer:
            'Yes, if the file is unprotected. Converting to MP3 removes the dependency on WMA codec support, which is declining on modern devices. The resulting MP3 will play universally.',
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
    />
  );
}
