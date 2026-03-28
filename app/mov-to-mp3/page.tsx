import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MOV to MP3 Converter',
  description:
    'Extract audio from a QuickTime MOV video and save it as MP3. Works with iPhone recordings, iMovie exports, and Final Cut Pro files. Free, no account.',
  openGraph: {
    title: 'MOV to MP3 Converter',
    description:
      'Extract audio from a QuickTime MOV video and save it as MP3. Works with iPhone recordings, iMovie exports, and Final Cut Pro files. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOV to MP3 Converter',
    description:
      'Extract audio from a QuickTime MOV video and save it as MP3. Works with iPhone recordings, iMovie exports, and Final Cut Pro files. Free, no account.',
  },
};

export default function MovToMp3Page() {
  return (
    <ToolPageLayout
      title="MOV to MP3 Converter"
      subtitle="Upload a QuickTime MOV video and extract its audio as a compact, universally compatible MP3 — instantly and privately."
      inputFormat="mov"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'MOV',
        description:
          'MOV is Apple\'s QuickTime video container format. It can hold video, audio, and metadata in a single file, and is commonly produced by iPhones, iPads, macOS screen recordings, and Final Cut Pro. The audio track inside a MOV file is typically AAC or MP3, sometimes PCM.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. It uses lossy compression to produce small files that play on every device, operating system, car stereo, and media player. At 192–320 kbps, the quality is excellent for most use cases.',
      }}
      whyConvert="MOV files contain both video and audio data, making them large and impractical to share when you only need the audio. Converting MOV to MP3 strips out the video track and compresses the audio into a small, portable file. Common scenarios include extracting music or speech from iPhone screen recordings, pulling voiceover audio from video projects, converting recorded lectures or interviews, and getting audio from iMovie or Final Cut Pro exports. MP3 plays on every device and platform, making it the most practical format for distribution."
      faqItems={[
        {
          question: 'Does this extract the audio from the video?',
          answer:
            'Yes. The converter reads the audio track from your MOV file and encodes it as MP3. The video portion is discarded. You get an MP3 file containing only the audio.',
        },
        {
          question: 'Will converting MOV to MP3 reduce audio quality?',
          answer:
            'The audio in most MOV files is already compressed (usually AAC). Re-encoding to MP3 at 192 or 320 kbps keeps the quality high — the difference is imperceptible for most content. If the original MOV contained uncompressed PCM audio, some quality loss occurs, but the result at 320 kbps is excellent.',
        },
        {
          question: 'Can I convert MOV files from my iPhone?',
          answer:
            'Yes. MOV is the default video format for iPhone and iPad recordings. Upload the .mov file here to extract the audio as MP3.',
        },
        {
          question: 'What other output formats are available for MOV?',
          answer:
            'From a MOV file you can also convert to WAV, M4A, AAC, OGG, or OPUS. WAV is useful for editing workflows; M4A is ideal for Apple devices and podcasting.',
        },
      ]}
      relatedTools={[
        { href: '/mov-to-wav',  label: 'MOV to WAV' },
        { href: '/mov-to-m4a',  label: 'MOV to M4A' },
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3' },
        { href: '/mp4-to-wav',  label: 'MP4 to WAV' },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3' },
      ]}
      relatedGuides={[
        { href: '/formats/mov',                                           label: 'MOV format guide'                           },
        { href: '/guides/extract-audio-from-video',                       label: 'How to Extract Audio from Video'            },
        { href: '/learn/extracting-audio-from-video-best-format-choices', label: 'Best Format Choices When Extracting Audio'  },
        { href: '/wiki/what-is-aac',                                      label: 'WikiSound: What Is AAC?'                    },
        { href: '/wiki/codec-vs-container',                               label: 'WikiSound: Codec vs Container'              },
      ]}
      lastUpdated="2026-03-28"
    />
  );
}
