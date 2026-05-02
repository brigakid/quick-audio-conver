import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AC3 to MP3 Converter',
  description:
    'Convert Dolby Digital (AC3) audio tracks from video files to MP3. Works with standalone .ac3 files and extracted audio tracks. Free, no account needed.',
  alternates: {
    canonical: '/ac3-to-mp3',
  },

  openGraph: {
    title: 'AC3 to MP3 Converter',
    description:
      'Convert Dolby Digital (AC3) audio tracks from video files to MP3. Works with standalone .ac3 files and extracted audio tracks. Free, no account needed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AC3 to MP3 Converter',
    description:
      'Convert Dolby Digital (AC3) audio tracks from video files to MP3. Works with standalone .ac3 files and extracted audio tracks. Free, no account needed.',
  },
};

export default function Ac3ToMp3Page() {
  return (
    <ToolPageLayout
      slug="/ac3-to-mp3"
      title="AC3 to MP3 Converter"
      subtitle="Convert Dolby Digital AC3 audio to MP3 — a format that plays on any device without surround sound hardware or Dolby decoding."
      inputFormat="ac3"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'AC3',
        description:
          'AC3 (also known as Dolby Digital or Dolby AC-3) is a compressed multichannel audio format developed by Dolby. It is widely used in DVDs, Blu-rays, broadcast television, and video files. AC3 files often contain 5.1 or 7.1 surround channels, though stereo variants exist. The .ac3 extension is used when the audio is extracted as a standalone file.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported stereo audio format. It plays on every device, operating system, and media player. MP3 does not support surround sound — the conversion downmixes multichannel AC3 audio to stereo.',
      }}
      whyConvert="AC3 audio requires Dolby decoding hardware or software to play. Standalone .ac3 files are not playable in most audio players, media managers, or on portable devices. Converting AC3 to MP3 produces a stereo file that plays anywhere. This is useful for extracting audio tracks from DVD rips or video files that store separate AC3 tracks, converting broadcast recordings with AC3 audio, and archiving dialogue or commentary tracks from multichannel sources."
      faqItems={[
        {
          question: 'What happens to surround sound channels when converting AC3 to MP3?',
          answer:
            'MP3 is a stereo format. When converting a 5.1 or 7.1 AC3 file to MP3, FFmpeg automatically downmixes the surround channels to stereo. Centre dialogue, front left/right, and surround/rear channels are all folded into two output channels. The result is a usable stereo file. Spatial positioning from the original surround mix is not preserved.',
        },
        {
          question: 'What should I expect when converting movie or TV audio from AC3 to MP3?',
          answer:
            'The dialogue and overall mix will come through clearly. What is lost is the surround positioning — sounds that were placed behind or beside you in the original mix will appear blended into the stereo field. For dialogue-heavy content like TV shows or movies, this is barely noticeable. For action sequences or music with strong surround use, the stereo downmix is a meaningful trade-off. If spatial audio matters, convert to WAV instead and process with a stereo tool that handles downmix routing.',
        },
        {
          question: 'What bitrate should I choose for AC3 to MP3?',
          answer:
            'For dialogue-heavy content (TV, podcasts, commentary tracks), 128 kbps is sufficient. For movie audio with music and effects, 192 kbps is recommended. 320 kbps is rarely necessary unless the source AC3 was high-bitrate and you want to preserve as much of the mix as possible.',
        },
        {
          question: 'Will the AC3 to MP3 conversion lose quality?',
          answer:
            'Yes — both AC3 and MP3 are lossy. Re-encoding from one lossy format to another causes some additional quality loss. At 192 or 320 kbps, the result is still highly listenable. If you plan to edit the audio further, convert to WAV instead — it is uncompressed output and avoids the lossy-to-lossy penalty.',
        },
        {
          question: 'Where do .ac3 files come from?',
          answer:
            'AC3 files are typically extracted from DVD or Blu-ray disc images, video containers (MKV, VOB, TS), or broadcast recordings. Tools like MKVToolNix or HandBrake can extract AC3 tracks from video files as standalone .ac3 files.',
        },
        {
          question: 'Can I also convert AC3 to WAV?',
          answer:
            'Yes. AC3 to WAV is supported and gives you an uncompressed stereo output — better for editing. The same surround-to-stereo downmix applies.',
        },
      ]}
      relatedTools={[
        { href: '/ac3-to-wav',   label: 'AC3 to WAV' },
        { href: '/mp4-to-mp3',   label: 'MP4 to MP3' },
        { href: '/mov-to-mp3',   label: 'MOV to MP3' },
        { href: '/ogg-to-mp3',   label: 'OGG to MP3' },
        { href: '/aac-to-mp3',   label: 'AAC to MP3' },
      ]}
      relatedGuides={[
        { href: '/guides/extract-audio-from-video',  label: 'How to Extract Audio from Video' },
        { href: '/wiki/what-is-transcoding',         label: 'WikiSound: What Is Transcoding?' },
        { href: '/wiki/what-is-lossy-audio',         label: 'WikiSound: What Is Lossy Audio?' },
      ]}
      lastUpdated="2026-04-14"
    />
  );
}
