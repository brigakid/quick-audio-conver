import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'OGG to MP3 Converter — Game Audio, Linux Files, Bandcamp Downloads',
  description:
    'Convert OGG Vorbis files to MP3 online for free. Extract audio from games, convert Bandcamp downloads, or move Linux audio files to a universally compatible format.',
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
      whyConvert="OGG Vorbis is the default audio format in PC games, Linux systems, and open-source software — but it's essentially invisible outside those environments. Apple devices don't support it natively, car stereos rarely do, and most mainstream media players won't open it without a codec pack. If you've extracted audio from a game, downloaded from Bandcamp (which ships OGG as the default download), or received files from a Linux user, converting to MP3 makes them playable on anything."
      faqItems={[
        {
          question: 'Why are so many game audio files in OGG format?',
          answer:
            'OGG Vorbis is royalty-free and patent-free, which means game developers pay nothing to use it. It also produces good quality at low file sizes — important when a game ships hundreds of sound effects. Minecraft, World of Warcraft, and many indie games store audio as OGG.',
        },
        {
          question: 'Is OGG better quality than MP3?',
          answer:
            'At comparable bitrates, OGG Vorbis generally matches or slightly exceeds MP3 quality. At Vorbis quality 5 (approximately 160 kbps average), the output is transparent for most listeners. The gap narrows at higher bitrates — at 192 kbps and above, both are excellent.',
        },
        {
          question: 'What devices support OGG files?',
          answer:
            'Android and Linux support OGG natively. iOS and macOS do not — no iPhone or Mac will play an OGG file without a third-party app. Most car stereos, hardware media players, and older devices don\'t support it either. MP3 is the safe default for anything outside a PC or Android.',
        },
        {
          question: 'I downloaded from Bandcamp and got OGG files — is that normal?',
          answer:
            'Yes. Bandcamp offers OGG Vorbis as one of its download formats (usually Vorbis quality 6, around 200 kbps). It\'s a high-quality option on desktop, but if you need to play the files on iOS or non-OGG hardware, converting to MP3 or FLAC is the practical fix.',
        },
        {
          question: 'Can I convert OGG files from games to MP3?',
          answer:
            'Yes, provided you own the game and the audio is not DRM-protected. Game audio files for personal listening use are generally fine to convert. This converter only handles unprotected files.',
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
      relatedGuides={[
        { href: '/guides/mp3-vs-wav',                          label: 'MP3 vs WAV'                      },
        { href: '/guides/how-to-choose-mp3-bitrate',           label: 'How to Choose MP3 Bitrate'        },
        { href: '/guides/troubleshooting-audio-conversion',    label: 'Troubleshooting Audio Conversion' },
        { href: '/wiki/what-is-ogg',                          label: 'WikiSound: What Is OGG?'          },
        { href: '/wiki/what-is-lossy-audio',                  label: 'WikiSound: What Is Lossy Audio?'  },
        { href: '/wiki/cbr-vs-vbr',                           label: 'WikiSound: CBR vs VBR'            },
      ]}
      lastUpdated="2026-03-28"
    />
  );
}
