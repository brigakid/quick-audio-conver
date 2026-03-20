import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AAC to MP3 Converter',
  description:
    'Convert AAC to MP3 online for free. Upload your AAC audio file and download a high-quality MP3 in seconds. Fast, private, no signup needed.',
};

export default function AacToMp3Page() {
  return (
    <ToolPageLayout
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
      whyConvert="Despite AAC being technically superior, MP3 wins on compatibility. Many older devices, in-car audio systems, external speakers, and software tools only accept MP3. Converting your AAC files to MP3 ensures they will play anywhere — including legacy hardware and platforms that have not updated their audio support. If you are sharing audio widely or uploading to a platform that requires MP3, this conversion is the right choice."
      faqItems={[
        {
          question: 'Is AAC better quality than MP3?',
          answer:
            'At the same bitrate, AAC generally produces better audio quality than MP3 due to its more efficient compression algorithm. However, at 192 kbps or 320 kbps, most listeners cannot tell the difference on typical playback equipment.',
        },
        {
          question: 'Will I lose quality converting AAC to MP3?',
          answer:
            'Yes — both are lossy formats, so converting between them involves re-encoding already compressed audio, which can introduce a small additional quality loss. Choosing 192 kbps or 320 kbps minimises this. Keep your original AAC if audio fidelity is critical.',
        },
        {
          question: 'Where do AAC files come from?',
          answer:
            'AAC files are commonly produced by Apple devices (iPhone recordings, Voice Memos, GarageBand exports), purchased tracks from iTunes/Apple Music, and audio extracted from YouTube videos. They typically use the .aac or .m4a extension.',
        },
        {
          question: 'What is the difference between AAC and M4A?',
          answer:
            'M4A is an MPEG-4 container file that usually contains AAC audio. A standalone .aac file is a raw AAC bitstream. Functionally they sound the same — both use AAC encoding. Our tool handles both.',
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
    />
  );
}
