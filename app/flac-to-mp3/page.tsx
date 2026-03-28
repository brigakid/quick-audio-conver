import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'FLAC to MP3 Converter',
  description:
    'Convert lossless FLAC to MP3 for broader device and platform compatibility. Choose your bitrate and download in seconds. Free, no account required.',
  openGraph: {
    title: 'FLAC to MP3 Converter',
    description:
      'Convert lossless FLAC to MP3 for broader device and platform compatibility. Choose your bitrate and download in seconds. Free, no account required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FLAC to MP3 Converter',
    description:
      'Convert lossless FLAC to MP3 for broader device and platform compatibility. Choose your bitrate and download in seconds. Free, no account required.',
  },
};

export default function FlacToMp3Page() {
  return (
    <ToolPageLayout
      title="FLAC to MP3 Converter"
      subtitle="Convert lossless FLAC audio to MP3. Get compatibility with devices, apps, and platforms that don't support FLAC."
      inputFormat="flac"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'FLAC',
        description:
          'FLAC is a lossless compressed format. No audio data is removed during compression — the decoded output is identical to the original. FLAC files are significantly smaller than WAV but much larger than MP3.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 plays on every device and platform without exception — including car stereos, older hardware, and streaming platforms that reject FLAC. The trade-off is that the compression is lossy: some audio data is permanently discarded. At 320 kbps, a FLAC-to-MP3 conversion sounds excellent for everyday listening.',
      }}
      whyConvert={`FLAC is the right format for archiving music or listening on hardware that supports it. The problem is that support is inconsistent. iPhone and iTunes do not play FLAC natively. Many car stereos, Bluetooth speakers, and older Android devices cannot play it either. Social media and messaging platforms reject FLAC uploads. Converting to MP3 at 320 kbps gives you a file with excellent sound quality that plays everywhere — while the FLAC remains your lossless archive.`}
      faqItems={[
        {
          question: 'Which bitrate should I choose for FLAC to MP3?',
          answer:
            '320 kbps is recommended when converting from a lossless source — you are starting with the best possible audio, so it makes sense to keep the MP3 quality high. 192 kbps is a good middle ground for everyday listening. 128 kbps will produce noticeable compression on music, though it is fine for voice recordings.',
        },
        {
          question: 'Can I convert the MP3 back to FLAC later?',
          answer:
            'Technically yes, but the resulting FLAC will not be lossless — it will be a large file containing the same audio as the MP3, with the same quality. Once you convert from FLAC to MP3, the discarded data is gone. This is why keeping your original FLAC files matters.',
        },
        {
          question: 'Why does my car stereo not play FLAC?',
          answer:
            'Most car stereos support MP3 and sometimes AAC, but FLAC support is not standard outside head units specifically marketed as hi-fi audio players. Converting your FLAC library to MP3 is the practical fix for in-car listening.',
        },
        {
          question: 'Is there a quality difference between FLAC and a 320 kbps MP3?',
          answer:
            'In blind listening tests, most people cannot reliably distinguish a 320 kbps MP3 from a lossless source on typical equipment. If you are listening through high-end audiophile gear, you may notice a small difference. For most uses, 320 kbps is excellent.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
        { href: '/aac-to-mp3',  label: 'AAC to MP3'  },
        { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
      ]}
      relatedGuides={[
        { href: '/guides/lossless-vs-lossy-audio',             label: 'Lossless vs Lossy Audio'              },
        { href: '/formats/flac',                               label: 'FLAC format guide'                    },
        { href: '/formats/mp3',                                label: 'MP3 format guide'                     },
        { href: '/wiki/what-is-flac',                          label: 'WikiSound: What Is FLAC?'             },
        { href: '/wiki/what-is-lossless-audio',                label: 'WikiSound: What Is Lossless Audio?'   },
        { href: '/wiki/what-is-transcoding',                   label: 'WikiSound: What Is Transcoding?'      },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
