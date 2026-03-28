import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AMR to WAV Converter — Free Online',
  description:
    'Convert AMR to WAV online for free. Convert AMR voice recordings to uncompressed WAV for editing, transcription, or archiving.',
};

export default function AmrToWavPage() {
  return (
    <ToolPageLayout
      title="AMR to WAV Converter"
      subtitle="Convert AMR voice recordings to uncompressed WAV — ready for editing software, transcription tools, and archiving."
      inputFormat="amr"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'AMR',
        description:
          'AMR (Adaptive Multi-Rate) is a voice-optimised audio codec used in mobile phone recordings. It encodes speech at 4–13 kbps — extremely compact but limited to voice bandwidth. AMR files (.amr) were the standard for Nokia voice recorders and early Android recording apps.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV (Waveform Audio File Format) stores uncompressed PCM audio. It is the format expected by most audio editing software, transcription tools, and broadcasting workflows. WAV files are larger than AMR but work with virtually any audio application.',
      }}
      whyConvert="Converting AMR to WAV makes old voice recordings usable in modern software. Audio editors like Audacity, transcription services, and speech-to-text tools generally accept WAV but may not handle AMR. This conversion is useful for editing recorded calls or voice memos, running AMR recordings through transcription or captioning software, archiving voice recordings in a long-term format, and importing old mobile recordings into a podcast or audio project."
      faqItems={[
        {
          question: 'Will the WAV file sound better than the AMR?',
          answer:
            'No. Converting AMR to WAV does not improve quality — AMR is a lossy, narrow-bandwidth codec and the quality ceiling is set by the original recording. The WAV simply stores the same audio without further compression, making it editable and widely compatible.',
        },
        {
          question: 'Why is the WAV file so much larger than the AMR?',
          answer:
            'AMR achieves very high compression for voice (4–13 kbps). WAV stores uncompressed samples. A 1-minute AMR recording might be 100 KB; the WAV equivalent will be around 5 MB. This is expected and unavoidable — WAV is uncompressed by design.',
        },
        {
          question: 'Can transcription software read AMR directly?',
          answer:
            'Some can, but many cannot. Converting to WAV first ensures compatibility with most transcription services and speech recognition tools.',
        },
        {
          question: 'Should I use MP3 instead of WAV for AMR voice recordings?',
          answer:
            'If you only need playback, MP3 is more practical — smaller file, plays everywhere. Use WAV if you need to edit the recording or feed it into software that requires uncompressed audio.',
        },
      ]}
      relatedTools={[
        { href: '/amr-to-mp3',   label: 'AMR to MP3' },
        { href: '/mp3-to-wav',   label: 'MP3 to WAV' },
        { href: '/m4a-to-wav',   label: 'M4A to WAV' },
        { href: '/ogg-to-mp3',   label: 'OGG to MP3' },
      ]}
      relatedGuides={[
        { href: '/formats/amr',            label: 'What Is AMR?' },
        { href: '/guides/mp3-vs-wav',       label: 'MP3 vs WAV' },
      ]}
    />
  );
}
