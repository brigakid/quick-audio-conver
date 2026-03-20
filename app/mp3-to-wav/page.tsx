import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MP3 to WAV Converter',
  description:
    'Convert MP3 to WAV online for free. Upload your MP3 file and download an uncompressed WAV audio file instantly. Great for editing and production.',
};

export default function Mp3ToWavPage() {
  return (
    <ToolPageLayout
      title="MP3 to WAV Converter"
      subtitle="Convert MP3 audio files to uncompressed WAV format — ideal for editing, audio production, or software that requires WAV input."
      inputFormat="mp3"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is a widely used lossy audio format. It compresses audio by discarding some data, resulting in smaller files. MP3 is the most supported audio format in the world, playing on all devices and platforms.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV (Waveform Audio File Format) stores audio in uncompressed PCM format. WAV files are lossless in terms of processing — every sample is preserved as-is. They are the standard format for audio editing software, DAWs, broadcast tools, and applications that require raw audio input.',
      }}
      whyConvert="Many audio editing applications, DAWs (Digital Audio Workstations), and professional tools require or strongly prefer WAV files. Converting MP3 to WAV allows you to use your audio in software like Adobe Audition, GarageBand, Logic Pro, or any tool that does not accept compressed formats. Note: converting MP3 to WAV does not recover quality that was lost during original MP3 compression — the WAV will be larger but the audio quality is identical to the MP3 source."
      faqItems={[
        {
          question: 'Will converting MP3 to WAV improve the audio quality?',
          answer:
            'No. WAV is an uncompressed format, but the audio quality is limited by the original MP3. The WAV output will be larger, but it will not sound better than the MP3 source — you cannot recover data that was discarded during MP3 compression.',
        },
        {
          question: 'Why would I convert MP3 to WAV then?',
          answer:
            'Some audio software only accepts WAV files. Converting MP3 to WAV is useful when you need to import audio into a DAW, editing tool, video editor, or any application that requires uncompressed input.',
        },
        {
          question: 'How much larger will the WAV file be?',
          answer:
            'A typical 4 MB MP3 (192 kbps) will expand to around 30–50 MB as a WAV file. The WAV format stores raw audio data without compression, which is why it is so much larger.',
        },
        {
          question: 'What sample rate and bit depth does the output WAV use?',
          answer:
            'The output WAV uses 16-bit PCM at the sample rate of the original MP3 (usually 44100 Hz or 48000 Hz). This is standard for most editing and production workflows.',
        },
      ]}
      relatedTools={[
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/aac-to-mp3', label: 'AAC to MP3' },
        { href: '/ogg-to-mp3', label: 'OGG to MP3' },
      ]}
    />
  );
}
