import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'AC3 to WAV Converter',
  description:
    'Convert Dolby Digital (AC3) audio to uncompressed WAV for editing, mixing, and post-production workflows. Works with AC3 tracks from video containers. Free, no account.',
  alternates: {
    canonical: '/ac3-to-wav',
  },

  openGraph: {
    title: 'AC3 to WAV Converter',
    description:
      'Convert Dolby Digital (AC3) audio to uncompressed WAV for editing, mixing, and post-production workflows. Works with AC3 tracks from video containers. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AC3 to WAV Converter',
    description:
      'Convert Dolby Digital (AC3) audio to uncompressed WAV for editing, mixing, and post-production workflows. Works with AC3 tracks from video containers. Free, no account.',
  },
};

export default function Ac3ToWavPage() {
  return (
    <ToolPageLayout
      slug="/ac3-to-wav"
      title="AC3 to WAV Converter"
      subtitle="Convert Dolby Digital AC3 audio to uncompressed WAV — ready for editing software, mixing tools, and post-production workflows."
      inputFormat="ac3"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'AC3',
        description:
          'AC3 (Dolby Digital / Dolby AC-3) is a compressed multichannel audio format used in DVDs, Blu-rays, and broadcast media. The .ac3 extension indicates a standalone Dolby Digital audio file, often extracted from a video container. It may contain stereo or surround sound (5.1, 7.1) channels.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV (Waveform Audio File Format) stores uncompressed PCM audio. It is the format preferred by audio editing software, DAWs, and mixing tools. WAV has no further compression artifacts and is editable without generation loss, making it the right intermediate format for post-production work.',
      }}
      whyConvert="Converting AC3 to WAV gives you uncompressed audio for editing without introducing additional compression artifacts. This is useful when you need to edit or process a Dolby Digital audio track — applying EQ, noise reduction, or level corrections — and want the cleanest possible starting point. WAV also plays in any audio software without requiring Dolby decoding libraries. Note that AC3 is a lossy format, so the WAV output will be uncompressed but not higher quality than the AC3 source."
      faqItems={[
        {
          question: 'Is WAV output better quality than the AC3 source?',
          answer:
            'No. AC3 is lossy — some audio data was removed during encoding. Converting to WAV stores that data uncompressed, but the original quality ceiling set by AC3 cannot be recovered. The WAV will be larger and free from further compression, but not higher in objective quality than the AC3.',
        },
        {
          question: 'What happens to 5.1 surround channels when converting to WAV?',
          answer:
            'The converter outputs stereo WAV (2 channels). FFmpeg downmixes multichannel AC3 audio to stereo. If you need to preserve the individual surround channels, you should use specialist video/audio tools that support multichannel WAV output.',
        },
        {
          question: 'Why use WAV instead of MP3 for editing?',
          answer:
            'WAV is uncompressed, meaning you can edit and export multiple times without accumulating compression artifacts. MP3 re-encodes each time you export, progressively degrading the audio. For editing workflows, always use WAV.',
        },
        {
          question: 'Can I use the WAV in video editing software like Premiere or DaVinci Resolve?',
          answer:
            'Yes. Both Adobe Premiere Pro and DaVinci Resolve accept WAV natively. WAV is the most universally supported format for audio import in video editing applications.',
        },
      ]}
      relatedTools={[
        { href: '/ac3-to-mp3',   label: 'AC3 to MP3' },
        { href: '/mp4-to-wav',   label: 'MP4 to WAV' },
        { href: '/mov-to-wav',   label: 'MOV to WAV' },
        { href: '/aac-to-mp3',   label: 'AAC to MP3' },
        { href: '/mp3-to-wav',   label: 'MP3 to WAV' },
      ]}
      relatedGuides={[
        { href: '/formats/ac3',       label: 'What Is AC3 (Dolby Digital)?' },
        { href: '/guides/mp3-vs-wav', label: 'MP3 vs WAV' },
      ]}
    />
  );
}
