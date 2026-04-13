import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'M4A to MP3 Converter',
  description:
    'Convert M4A audio files to MP3 for broader device and platform compatibility. Works with iPhone voice memos, GarageBand exports, and iTunes audio.',
  openGraph: {
    title: 'M4A to MP3 Converter',
    description:
      'Convert M4A audio files to MP3 for broader device and platform compatibility. Works with iPhone voice memos, GarageBand exports, and iTunes audio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M4A to MP3 Converter',
    description:
      'Convert M4A audio files to MP3 for broader device and platform compatibility. Works with iPhone voice memos, GarageBand exports, and iTunes audio.',
  },
};

export default function M4aToMp3Page() {
  return (
    <ToolPageLayout
      title="M4A to MP3 Converter"
      subtitle="Convert M4A audio files to MP3. Useful when the recipient's device, car stereo, or software doesn't support M4A."
      converterNote="Common M4A sources: iPhone Voice Memos, GarageBand exports, iTunes purchases. Note: Apple Music downloads with active DRM cannot be converted by any online tool."
      inputFormat="m4a"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'M4A',
        description:
          "M4A is Apple's audio format — an MPEG-4 container using AAC encoding. It is produced by iPhone voice memos, GarageBand, Apple Music downloads, and audio exported from macOS apps. It works well within Apple devices but has inconsistent support elsewhere.",
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 is supported universally — on Android, Windows, car stereos, Bluetooth players, streaming platforms, and older hardware that may reject M4A. The quality difference between M4A and MP3 at comparable bitrates is negligible in everyday listening.',
      }}
      whyConvert={`M4A is perfectly fine within the Apple ecosystem, but it runs into problems outside of it. Older Android devices, most car stereos, Windows Media Player (without extra codecs), and many platforms that accept audio uploads do not support M4A. A common scenario: you record a voice memo on iPhone, try to share it, and the recipient can't play it. Or you export audio from GarageBand and the platform you're uploading to rejects the file. Converting to MP3 solves the compatibility problem.`}
      faqItems={[
        {
          question: 'Does converting M4A to MP3 reduce the audio quality?',
          answer:
            'Both M4A (AAC) and MP3 are lossy formats. Converting from one lossy format to another causes a small additional quality reduction. For typical use — voice memos, music exports, podcast drafts — the difference is not noticeable. Choose 192 kbps or higher to minimise the impact. If quality is critical, keep the original M4A.',
        },
        {
          question: 'My iPhone voice memo is in M4A — will this work?',
          answer:
            'Yes. iPhone voice memos are M4A files. Upload directly from your device using the file browser. The conversion works on mobile browsers including Safari on iOS.',
        },
        {
          question: 'Why doesn\'t my car stereo play M4A?',
          answer:
            'Most car stereos support MP3 and sometimes WMA, but M4A/AAC support is not standard in older or mid-range head units. Converting to MP3 is the reliable fix.',
        },
        {
          question: 'Can I convert protected iTunes downloads?',
          answer:
            'No. Files with Apple FairPlay DRM protection cannot be converted by any third-party tool. Most music purchased from iTunes today is DRM-free, but older purchases or tracks downloaded from Apple Music for offline playback are protected.',
        },
      ]}
      relatedTools={[
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/aac-to-mp3',  label: 'AAC to MP3'  },
        { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
      ]}
      relatedGuides={[
        { href: '/formats/m4a',                                        label: 'M4A format guide'                          },
        { href: '/guides/lossless-vs-lossy-audio',                     label: 'Lossless vs Lossy Audio'                   },
        { href: '/formats/mp3',                                        label: 'MP3 format guide'                          },
        { href: '/learn/aac-m4a-and-mp3-what-actually-matters',        label: 'AAC, M4A and MP3 — What Actually Matters'  },
        { href: '/wiki/what-is-aac',                                   label: 'WikiSound: What Is AAC?'                   },
        { href: '/wiki/what-is-transcoding',                           label: 'WikiSound: What Is Transcoding?'           },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
