import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'MOV to M4A Converter',
  description:
    'Extract and compress audio from a QuickTime MOV video into M4A — ideal for Apple Podcasts, iOS devices, and iTunes libraries. Free, no account needed.',
  alternates: {
    canonical: '/mov-to-m4a',
  },

  openGraph: {
    title: 'MOV to M4A Converter',
    description:
      'Extract and compress audio from a QuickTime MOV video into M4A — ideal for Apple Podcasts, iOS devices, and iTunes libraries. Free, no account needed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOV to M4A Converter',
    description:
      'Extract and compress audio from a QuickTime MOV video into M4A — ideal for Apple Podcasts, iOS devices, and iTunes libraries. Free, no account needed.',
  },
};

export default function MovToM4aPage() {
  return (
    <ToolPageLayout
      slug="/mov-to-m4a"
      title="MOV to M4A Converter"
      subtitle="Extract audio from a QuickTime MOV video and save it as M4A — the compressed format preferred by Apple Podcasts, iTunes, and iOS."
      inputFormat="mov"
      outputFormat="m4a"
      sourceFormatInfo={{
        name: 'MOV',
        description:
          'MOV is Apple\'s QuickTime video container format, produced by iPhones, iPads, macOS, iMovie, and Final Cut Pro. It bundles video, audio, and metadata together. Audio inside is typically AAC-encoded, though some workflows use PCM.',
      }}
      targetFormatInfo={{
        name: 'M4A',
        description:
          'M4A is AAC audio in an MPEG-4 container — the default audio format on Apple devices. It offers better compression efficiency than MP3 at equivalent quality and is natively supported by iTunes, Apple Podcasts, iOS, macOS, and most modern streaming platforms.',
      }}
      whyConvert="If you record video on an iPhone and only need the audio, converting MOV to M4A strips the video and produces a compressed file that is immediately ready for Apple Podcasts, iTunes, or sharing on Apple devices. M4A is smaller than WAV while maintaining better quality than MP3 at the same bitrate. It is a good choice when your audience is primarily on Apple devices, or when you are submitting audio to podcast platforms that accept M4A natively."
      faqItems={[
        {
          question: 'Is M4A the same as AAC?',
          answer:
            'Yes and no. M4A is the file extension; it uses the AAC codec inside an MPEG-4 container. AAC (.aac) is the same codec but in a different container (ADTS). M4A is the format Apple uses and the one most compatible with their ecosystem.',
        },
        {
          question: 'Is M4A better quality than MP3?',
          answer:
            'At the same bitrate, AAC (M4A) generally delivers better quality than MP3. A 192 kbps M4A sounds noticeably better than a 192 kbps MP3 on most content. If quality matters and you are targeting Apple or modern platforms, M4A is the better choice.',
        },
        {
          question: 'Will my iPhone video audio convert well?',
          answer:
            'Yes. iPhone MOV files contain AAC audio, which converts cleanly to M4A. Since both formats use the AAC codec, the conversion is essentially a container re-wrap with minimal re-encoding overhead.',
        },
        {
          question: 'Can I also convert to MP3 or WAV?',
          answer:
            'Yes. From a MOV file you can also convert to MP3, WAV, AAC, OGG, or OPUS. Use WAV for editing software; MP3 for maximum compatibility.',
        },
      ]}
      relatedTools={[
        { href: '/mov-to-mp3',  label: 'MOV to MP3' },
        { href: '/mov-to-wav',  label: 'MOV to WAV' },
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3' },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3' },
        { href: '/wav-to-m4a',  label: 'WAV to M4A' },
      ]}
      relatedGuides={[
        { href: '/formats/mov',                                 label: 'MOV format guide'                        },
        { href: '/guides/extract-audio-from-video',             label: 'How to Extract Audio from Video'         },
        { href: '/formats/aac', label: 'AAC, M4A, and MP3 — What Actually Matters' },
      ]}
    />
  );
}
