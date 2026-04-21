import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'FLAC to WAV Converter',
  description:
    'Convert FLAC audio to WAV for software that requires uncompressed PCM. Both are lossless — the conversion is entirely about compatibility, not quality.',
  alternates: {
    canonical: '/flac-to-wav',
  },

  openGraph: {
    title: 'FLAC to WAV Converter',
    description:
      'Convert FLAC audio to WAV for software that requires uncompressed PCM. Both are lossless — the conversion is entirely about compatibility, not quality.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FLAC to WAV Converter',
    description:
      'Convert FLAC audio to WAV for software that requires uncompressed PCM. Both are lossless — the conversion is entirely about compatibility, not quality.',
  },
};

export default function FlacToWavPage() {
  return (
    <ToolPageLayout
      slug="/flac-to-wav"
      title="FLAC to WAV Converter"
      subtitle="Convert lossless FLAC to lossless WAV — for software and hardware that cannot handle FLAC but requires uncompressed audio."
      inputFormat="flac"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'FLAC',
        description:
          'FLAC (Free Lossless Audio Codec) stores audio with lossless compression. The decoded output is bit-perfect — identical to the original uncompressed audio. FLAC files are 40–60% smaller than WAV while preserving every sample exactly.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV stores audio as raw, uncompressed PCM. It is the oldest and most universally supported lossless format. Every DAW, video editor, hardware sampler, and audio processing tool accepts WAV. Unlike FLAC, WAV requires no decoding step — the raw audio is simply read directly.',
      }}
      whyConvert={`This conversion is purely about compatibility. Both FLAC and WAV are lossless — converting between them causes zero quality loss. The decoded audio from a FLAC file is bit-perfect to its WAV equivalent.

The reasons to convert: (1) Hardware samplers (Akai MPC, Roland SP-404, etc.) often load WAV but not FLAC; (2) Some DAW plugins and sample library formats require WAV input; (3) Certain mastering tools, broadcast workflows, and hardware processors work exclusively with WAV; (4) Video editing software that accepts audio input sometimes rejects FLAC; (5) Game audio middleware (FMOD, Wwise) uses WAV as its working format.

The trade-off: WAV files are significantly larger. A 20 MB FLAC will expand to 35–50 MB as WAV. If you need to save the result long-term, convert back to FLAC after you are done — or keep the FLAC archive and convert only when needed.`}
      faqItems={[
        {
          question: 'Does converting FLAC to WAV reduce audio quality?',
          answer:
            'No. Both FLAC and WAV are lossless formats. The decoded audio is bit-identical — every sample is preserved exactly. This conversion changes the container and removes the compression, not the audio data.',
        },
        {
          question: 'My hardware sampler only loads WAV — is this the right converter?',
          answer:
            'Yes. Upload your FLAC file, download the WAV, and transfer it to the sampler. The audio will be identical to what was in your FLAC. Keep the original FLAC as your archive.',
        },
        {
          question: 'The resulting WAV is much larger than the FLAC — is this normal?',
          answer:
            'Yes, this is expected. FLAC uses lossless compression to reduce file size; WAV stores raw uncompressed samples. The audio content is identical — you are just seeing the difference between compressed and uncompressed storage.',
        },
        {
          question: 'Should I delete my FLAC files after converting?',
          answer:
            'No. Keep the FLAC — it is your compact lossless archive. Convert to WAV only as needed for specific tools or workflows, then discard the WAV when you are done. Re-converting from FLAC whenever you need WAV costs nothing in quality.',
        },
      ]}
      relatedTools={[
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/mp4-to-wav',  label: 'MP4 to WAV'  },
        { href: '/m4a-to-wav',  label: 'M4A to WAV'  },
        { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
      ]}
      relatedGuides={[
        { href: '/guides/flac-vs-wav',             label: 'FLAC vs WAV'             },
        { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
        { href: '/formats/flac',                   label: 'FLAC format guide'       },
        { href: '/formats/wav',                    label: 'WAV format guide'        },
        { href: '/wiki/what-is-lossless-audio',    label: 'What Is Lossless Audio?' },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
