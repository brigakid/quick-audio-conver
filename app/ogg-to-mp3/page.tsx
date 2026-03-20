import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'OGG to MP3 Converter',
  description:
    'Convert OGG Vorbis files to MP3 online for free. Upload your OGG audio and download a compatible MP3 in seconds. No account needed.',
};

export default function OggToMp3Page() {
  return (
    <ToolPageLayout
      title="OGG to MP3 Converter"
      subtitle="Convert OGG Vorbis audio files to widely compatible MP3 format. Fast server-side conversion, no software to install."
      inputFormat="ogg"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'OGG',
        description:
          'OGG is an open-source multimedia container format developed by Xiph.Org. It most commonly contains Vorbis audio, producing files with the .ogg extension. OGG Vorbis offers excellent audio quality at lower bitrates and is completely free from patent restrictions. It is widely used in games, open-source software, and Linux environments.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 is the most universally supported audio format in existence. While OGG Vorbis offers comparable or better quality, it is not supported on many consumer devices, older smartphones, car audio systems, and mainstream media platforms. MP3 plays on virtually everything.',
      }}
      whyConvert="OGG files are common in game audio, Linux-based applications, and open-source software — but they have poor support outside those ecosystems. If you extract audio from a game, download audio from an open-source application, or work with files from Audacity or Bandcamp (which sometimes use OGG), you may need to convert to MP3 to share or play them on standard devices. Converting OGG to MP3 gives your audio files universal compatibility."
      faqItems={[
        {
          question: 'Why are so many game audio files in OGG format?',
          answer:
            'OGG Vorbis is royalty-free and patent-unencumbered, which makes it attractive to game developers who want to avoid licensing costs. It also offers excellent quality at small file sizes, which matters for game assets.',
        },
        {
          question: 'Is OGG better quality than MP3?',
          answer:
            'At comparable bitrates, OGG Vorbis generally produces better audio quality than MP3. However, at 192 kbps or higher, both formats sound excellent for everyday listening.',
        },
        {
          question: 'What devices support OGG files?',
          answer:
            'OGG support is common on Android devices, Linux systems, and in open-source software. However, iOS/Apple devices, many car stereos, and older media players do not support OGG natively. MP3 is the safest choice for broad compatibility.',
        },
        {
          question: 'Can I convert OGG files from games to MP3?',
          answer:
            'Yes, as long as you own the game and the audio is not protected by DRM. You may only convert files you have the right to use or modify. Please review our Terms of Service before uploading.',
        },
      ]}
      relatedTools={[
        { href: '/aac-to-mp3', label: 'AAC to MP3' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
      ]}
    />
  );
}
