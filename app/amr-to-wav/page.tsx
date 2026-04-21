import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AMR to WAV Converter',
  description:
    'Convert AMR voice recordings to uncompressed WAV for editing, transcription software, or archiving. Works with mobile call recordings and voice memos. Free, no account.',
  alternates: {
    canonical: '/amr-to-wav',
  },

  openGraph: {
    title: 'AMR to WAV Converter',
    description:
      'Convert AMR voice recordings to uncompressed WAV for editing, transcription software, or archiving. Works with mobile call recordings and voice memos. Free, no account.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMR to WAV Converter',
    description:
      'Convert AMR voice recordings to uncompressed WAV for editing, transcription software, or archiving. Works with mobile call recordings and voice memos. Free, no account.',
  },
};

export default function AmrToWavPage() {
  return (
    <ToolPageLayout
      slug="/amr-to-wav"
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
      whyConvert={`Most modern audio software — Audacity, Premiere, Descript, Otter, and mainstream transcription services — does not accept AMR input. Converting to WAV is the unlock: every audio editor, transcription tool, and speech-to-text engine reliably reads WAV.

Typical use cases: editing recorded phone calls or voice memos, feeding old mobile recordings into speech-to-text or captioning tools, importing AMR voice memos into a podcast or video project, and archiving recordings in a format that will still be usable in ten years.

One caveat worth stating plainly: AMR is a narrow-band, heavily compressed voice codec. Converting to WAV does not recover audio quality — the new file simply contains the same speech audio in a form that modern tools can open. The WAV will be larger but editable.`}
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
        { href: '/formats/amr',              label: 'AMR format guide'        },
        { href: '/formats/wav',              label: 'WAV format guide'        },
        { href: '/guides/mp3-vs-wav',        label: 'MP3 vs WAV'              },
        { href: '/wiki/what-is-audio-codec', label: 'What Is an Audio Codec?' },
      ]}
      lastUpdated="2026-04-14"
    />
  );
}
