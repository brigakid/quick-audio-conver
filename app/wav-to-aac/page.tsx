import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WAV to AAC Converter',
  description:
    'Convert uncompressed WAV to a raw AAC file (.aac). Better compression efficiency than MP3 at the same bitrate. Free, no account.',
};

export default function WavToAacPage() {
  return (
    <ToolPageLayout
      title="WAV to AAC Converter"
      subtitle="Convert WAV to a raw AAC file — better compression than MP3 at the same bitrate, without wrapping it in an MP4 container."
      inputFormat="wav"
      outputFormat="aac"
      sourceFormatInfo={{
        name: 'WAV',
        description:
          'WAV is uncompressed PCM audio — the format used in editing, DAWs, and professional workflows. It contains every sample exactly, but produces large files. WAV is what you distribute from, not what you distribute.',
      }}
      targetFormatInfo={{
        name: 'AAC',
        description:
          'AAC (Advanced Audio Coding) is the codec used by Apple, YouTube, and most modern streaming platforms. At the same bitrate, AAC achieves better audio quality than MP3 — the difference is most noticeable below 192 kbps. This converter produces a raw .aac file in an ADTS container. This is different from M4A, which wraps AAC in an MP4 container — the audio codec is identical, but .aac files are slightly simpler and required by some hardware and broadcast workflows.',
      }}
      whyConvert={`Use this when you specifically need a raw .aac file rather than an .m4a container. Some broadcast systems, hardware encoders, hardware players, and streaming ingest pipelines require .aac (ADTS format) rather than .m4a (MP4 container).

If your destination is an Apple device, iTunes, or a podcast platform, .m4a is usually preferable because it supports metadata properly. If you need the raw AAC stream — for a hardware device, a broadcast encoder, or a system that rejects .m4a — this is the converter.

At 192 kbps, WAV to AAC produces excellent quality that is transparent for most listeners.`}
      faqItems={[
        {
          question: 'What is the difference between AAC (.aac) and M4A (.m4a)?',
          answer:
            'Same codec, different container. M4A wraps AAC audio inside an MP4 container, which supports metadata like album art and track info. A .aac file is the raw AAC bitstream without a container wrapper. Both sound identical at the same bitrate.',
        },
        {
          question: 'Is AAC better than MP3?',
          answer:
            'At equivalent bitrates, yes. AAC achieves noticeably better quality than MP3 below 192 kbps. At 192 kbps and above, the difference is minimal for most listeners on typical equipment.',
        },
        {
          question: 'Will a .aac file play on my phone?',
          answer:
            'On Android: yes, natively. On iPhone: yes. On Windows: yes via Windows Media Player and most apps. On Linux: with appropriate codecs installed. It is less universally supported than MP3 but well-supported on modern devices.',
        },
        {
          question: 'Should I use AAC or M4A?',
          answer:
            'If you need to store metadata or are targeting Apple/podcast workflows, use M4A. If you need a raw bitstream for a broadcast or hardware system, use AAC. If universal compatibility is the priority, MP3 is the safest choice.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/wav-to-m4a',  label: 'WAV to M4A'  },
        { href: '/aac-to-mp3',  label: 'AAC to MP3'  },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
        { href: '/wav-to-ogg',  label: 'WAV to OGG'  },
      ]}
      relatedGuides={[
        { href: '/learn/aac-m4a-mp3-what-matters', label: 'AAC, M4A, MP3: What Matters' },
        { href: '/formats/aac',                    label: 'AAC format guide'            },
        { href: '/guides/mp3-vs-wav',              label: 'MP3 vs WAV'                 },
      ]}
      lastUpdated="2025-03-01"
    />
  );
}
