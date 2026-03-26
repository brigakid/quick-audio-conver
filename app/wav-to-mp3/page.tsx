import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WAV to MP3 Converter',
  description:
    'Convert large WAV audio files to MP3 for easy sharing and uploading. Choose your bitrate and download a compressed MP3 in seconds. Free and private.',
};

export default function WavToMp3Page() {
  return (
    <ToolPageLayout
      title="WAV to MP3 Converter"
      subtitle="Compress a WAV file to MP3. A 30 MB WAV typically becomes 3–5 MB — small enough to share by email, attach to a message, or upload anywhere."
      inputFormat="wav"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'WAV',
        description:
          'WAV stores audio as raw, uncompressed PCM data. Nothing is discarded — every sample is preserved exactly. This is excellent for editing, but makes WAV files large: a 3-minute song at CD quality is around 30 MB.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 uses lossy compression to reduce file size by permanently removing audio frequencies that most people cannot perceive. At 192 kbps or higher, the quality difference from WAV is inaudible to most listeners. At 128 kbps, light compression artefacts may be noticeable on good headphones.',
      }}
      whyConvert={`WAV files are impractical for sharing. Most email services have attachment limits of 10–25 MB. Messaging apps compress audio further if the original is large. Platforms like SoundCloud, podcast hosts, and social media accept MP3 and often reject oversized WAV files. Converting to MP3 at 192 kbps gives you a file that is 8–10x smaller with quality that is effectively indistinguishable from the original in everyday listening. Keep the original WAV if you need to edit the audio again later.`}
      faqItems={[
        {
          question: 'How much smaller will the MP3 be?',
          answer:
            'A typical 40 MB WAV file at CD quality (16-bit, 44.1 kHz) converts to approximately 4 MB at 192 kbps MP3. The ratio is roughly 8–10x. The exact size depends on the original sample rate and bit depth.',
        },
        {
          question: 'Will the audio quality noticeably change?',
          answer:
            'At 192 kbps, most people cannot tell the difference between the WAV and the MP3 on typical headphones or speakers. At 320 kbps, the difference is essentially imperceptible. At 128 kbps, some listeners may notice compression artefacts in complex passages.',
        },
        {
          question: 'Should I convert to MP3 before editing, or after?',
          answer:
            'After. Do all editing in WAV — it is lossless and you can save and re-open without accumulating quality loss. Convert to MP3 only at the end, for distribution or sharing. Editing a converted MP3 and re-saving it causes double-compression.',
        },
        {
          question: 'Can I convert stereo WAV files?',
          answer:
            'Yes. Stereo, mono, and multichannel WAV files are all accepted. The channel layout of the original is preserved in the MP3 output.',
        },
      ]}
      relatedTools={[
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
        { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
        { href: '/aac-to-mp3',  label: 'AAC to MP3'  },
      ]}
      relatedGuides={[
        { href: '/guides/mp3-vs-wav',              label: 'MP3 vs WAV'             },
        { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio'},
        { href: '/formats/wav',                    label: 'WAV format guide'       },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
