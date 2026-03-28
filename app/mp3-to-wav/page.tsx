import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MP3 to WAV Converter',
  description:
    'Convert MP3 to uncompressed WAV format for use in audio editing software, DAWs, and video editors. Fast, free, no account required.',
  openGraph: {
    title: 'MP3 to WAV Converter',
    description:
      'Convert MP3 to uncompressed WAV format for use in audio editing software, DAWs, and video editors. Fast, free, no account required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP3 to WAV Converter',
    description:
      'Convert MP3 to uncompressed WAV format for use in audio editing software, DAWs, and video editors. Fast, free, no account required.',
  },
};

export default function Mp3ToWavPage() {
  return (
    <ToolPageLayout
      title="MP3 to WAV Converter"
      subtitle="Convert MP3 to uncompressed WAV — needed when your editing software or workflow requires WAV input."
      inputFormat="mp3"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'MP3',
        description:
          'MP3 is a lossy compressed format. The compression is permanent — once data is removed during encoding, it cannot be recovered. Converting an MP3 to WAV produces a larger file with the same audio quality as the MP3.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV stores audio as raw, uncompressed PCM. It is the standard format for audio editing software — DAWs, video editors, and broadcast tools all work natively with WAV. Converting from MP3 to WAV does not restore lost quality, but it gives you a file that any audio tool will accept without re-encoding.',
      }}
      whyConvert={`The most common reason: your editing software or video tool requires WAV and will not accept MP3. Adobe Premiere, Final Cut Pro, DaVinci Resolve, and many DAWs either require WAV input or work better with it. Converting your MP3 to WAV before importing prevents the software from doing its own re-encoding. Be aware that the audio quality in the WAV will be exactly the same as in the MP3 — the conversion unpacks the compression, but the discarded data from the original MP3 encoding is gone for good. This conversion is about format compatibility, not quality improvement.`}
      faqItems={[
        {
          question: 'Will the audio sound better after converting to WAV?',
          answer:
            'No. WAV is lossless in terms of how it stores data, but it cannot restore quality that was discarded when the MP3 was originally encoded. The WAV will sound identical to the MP3. If you need better-sounding audio, you need to start from a higher-quality source.',
        },
        {
          question: 'Why does my video editor import WAV but not MP3?',
          answer:
            'Video editors process audio in real time while playing back video. WAV (uncompressed PCM) is simpler to decode at playback speed. Some editors import MP3 natively; others require WAV. Even when MP3 is accepted, the editor typically converts it to an uncompressed format internally on import.',
        },
        {
          question: 'How much larger will the WAV file be?',
          answer:
            'A typical 4 MB MP3 (192 kbps, 3-minute song) expands to around 30–50 MB as a WAV. This is the nature of uncompressed audio — WAV stores raw samples, one by one, with no compression.',
        },
        {
          question: 'What sample rate and bit depth will the WAV use?',
          answer:
            'The output WAV uses 16-bit PCM at the sample rate of the original MP3 — typically 44,100 Hz (CD standard) or 48,000 Hz. This matches the standard input requirements for most editing and production workflows.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
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
