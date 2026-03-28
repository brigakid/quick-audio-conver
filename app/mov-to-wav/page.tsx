import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MOV to WAV Converter — Free Online',
  description:
    'Convert MOV to WAV online for free. Extract uncompressed audio from a QuickTime MOV video file — ideal for editing software and professional audio workflows.',
};

export default function MovToWavPage() {
  return (
    <ToolPageLayout
      title="MOV to WAV Converter"
      subtitle="Extract uncompressed WAV audio from a QuickTime MOV video — the format preferred by DAWs, video editors, and professional workflows."
      inputFormat="mov"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'MOV',
        description:
          'MOV is Apple\'s QuickTime video container. Produced by iPhones, iPads, macOS screen recordings, iMovie, and Final Cut Pro, it stores video, audio, and metadata together. The audio track inside is usually AAC or PCM, depending on the recording settings.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV (Waveform Audio File Format) stores uncompressed PCM audio — no data is discarded. It is the standard format for professional audio editing, DAWs like Pro Tools, Logic Pro, Ableton, and hardware samplers. Files are large but bit-perfect.',
      }}
      whyConvert="Converting MOV to WAV gives you the audio track in a format that editing software works with natively. DAWs import WAV without re-encoding, avoiding any additional quality loss. This is useful for pulling audio from Final Cut Pro or iMovie exports for post-production work, extracting voice recordings from iPhone video for transcription or editing, and getting clean audio out of screen recordings for narration editing. WAV is also required by many hardware samplers, broadcast tools, and older audio applications that do not handle MOV."
      faqItems={[
        {
          question: 'Why use WAV instead of MP3 for editing?',
          answer:
            'WAV is uncompressed, so there is no generation loss when you edit and re-export. MP3 re-encodes on every export, causing cumulative quality loss. For editing workflows, WAV is the correct choice.',
        },
        {
          question: 'Will the WAV be higher quality than the original audio in the MOV?',
          answer:
            'Not if the original audio was compressed (e.g. AAC). Converting AAC to WAV produces a large file with the same quality as the AAC — the uncompressed container does not restore compressed data. If the MOV contained PCM audio, the WAV will be identical.',
        },
        {
          question: 'Can I convert iPhone MOV recordings this way?',
          answer:
            'Yes. iPhone videos are MOV files. Upload the .mov file to extract the audio as uncompressed WAV.',
        },
        {
          question: 'What is the file size difference?',
          answer:
            'WAV files are significantly larger than the audio in a typical MOV. A 5-minute MOV with AAC audio might have 5 MB of audio data; the equivalent WAV will be 50–60 MB. This is expected — WAV is uncompressed.',
        },
      ]}
      relatedTools={[
        { href: '/mov-to-mp3',  label: 'MOV to MP3' },
        { href: '/mov-to-m4a',  label: 'MOV to M4A' },
        { href: '/mp4-to-wav',  label: 'MP4 to WAV' },
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3' },
        { href: '/m4a-to-wav',  label: 'M4A to WAV' },
      ]}
      relatedGuides={[
        { href: '/formats/mov',                     label: 'MOV format guide'                },
        { href: '/guides/extract-audio-from-video', label: 'How to Extract Audio from Video' },
        { href: '/guides/mp3-vs-wav',               label: 'MP3 vs WAV'                      },
      ]}
    />
  );
}
