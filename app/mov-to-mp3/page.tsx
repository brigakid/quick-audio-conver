import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MOV to MP3 Converter',
  description:
    'Extract audio from a QuickTime MOV video and save it as MP3. Works with iPhone recordings, iMovie exports, and Final Cut Pro files. Free, no account.',
  alternates: {
    canonical: '/mov-to-mp3',
  },

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
      slug="/mov-to-mp3"
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
          'MP3 is the practical output format when the goal is portability. A MOV file contains both video and audio data — MP3 contains only audio. The resulting file is 10–20x smaller, plays without a video player, and works on every device that the MOV container does not.',
      }}
      whyConvert={`MOV files carry both video and audio in a single QuickTime container, which makes them large and awkward to share when you only need the sound. Converting MOV to MP3 discards the video stream and re-encodes the audio into a compact, universally playable file — typically 10–20× smaller than the original.

The most common source: iPhone and iPad recordings, which default to MOV. Also iMovie and Final Cut Pro exports, macOS QuickTime screen recordings, and some DSLR and mirrorless camera footage.

Typical workflows: pulling voiceover or interview audio out of a video project, converting a family video's audio for sharing by messaging, extracting music that was recorded on an iPhone, or turning a screen recording into a listenable MP3 without the visual track. MP3 plays everywhere — car stereos, old Android devices, Bluetooth speakers — where MOV itself is not supported.`}
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
        { href: '/guides/extract-audio-from-video', label: 'How to Extract Audio from Video' },
        { href: '/formats/mov',                     label: 'MOV format guide'                },
        { href: '/formats/mp3',                     label: 'MP3 format guide'                },
        { href: '/formats/aac',                     label: 'AAC format guide'                },
        { href: '/wiki/codec-vs-container',         label: 'Codec vs Container'              },
      ]}
      lastUpdated="2026-03-28"
    />
  );
}
