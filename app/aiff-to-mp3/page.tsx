import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AIFF to MP3 Converter — Free Online',
  description:
    'Convert AIFF to MP3 online for free. Upload your Apple uncompressed audio file and download a high-quality MP3 in seconds. No signup, no limits.',
};

export default function AiffToMp3Page() {
  return (
    <ToolPageLayout
      title="AIFF to MP3 Converter"
      subtitle="Upload an AIFF file and convert it to a compact, universally compatible MP3 — instantly and privately."
      inputFormat="aiff"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'AIFF',
        description:
          'AIFF (Audio Interchange File Format) is Apple\'s uncompressed audio format. It stores raw PCM audio data — the same data as WAV, but in an Apple-native container. AIFF files are lossless and used natively by Logic Pro, GarageBand, and Pro Tools on macOS.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. It uses lossy compression to produce small files without dramatically sacrificing perceived audio quality. MP3 plays on every device, operating system, car stereo, and media player.',
      }}
      whyConvert="AIFF files are large — a 3-minute track can easily be 30–50 MB of raw audio data. Converting to MP3 compresses that down to 3–7 MB while maintaining good perceived quality, making files easy to share, stream, or store on mobile devices. AIFF is an ideal production format but a poor distribution format; MP3 solves that. This conversion is common for musicians, podcasters, and anyone working in Apple's audio ecosystem who needs files that play anywhere."
      faqItems={[
        {
          question: 'Does AIFF to MP3 conversion reduce audio quality?',
          answer:
            'Yes — MP3 is lossy, so some audio data is discarded during encoding. However, at 192 or 320 kbps, the quality loss is imperceptible to most listeners. Since AIFF is lossless, you are starting from the best possible source, which helps.',
        },
        {
          question: 'What\'s the difference between AIFF and WAV?',
          answer:
            'Both are uncompressed PCM audio formats with identical quality. AIFF is Apple\'s container format (big-endian) while WAV is Microsoft\'s (little-endian). They are interchangeable in practice — both convert equally well to MP3.',
        },
        {
          question: 'Can I also convert .AIF files?',
          answer:
            'Yes. AIF and AIFF are the same format — AIF is simply the older 3-character extension used on some systems. Both are fully supported on this converter.',
        },
        {
          question: 'Will Logic Pro or GarageBand export files this tool can convert?',
          answer:
            'Yes. Both Logic Pro and GarageBand can export AIFF files directly. Upload the exported .aiff file here to convert it to MP3 for distribution or playback on non-Apple devices.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3',   label: 'WAV to MP3' },
        { href: '/flac-to-mp3',  label: 'FLAC to MP3' },
        { href: '/m4a-to-mp3',   label: 'M4A to MP3' },
        { href: '/aac-to-mp3',   label: 'AAC to MP3' },
        { href: '/ogg-to-mp3',   label: 'OGG to MP3' },
        { href: '/mp3-to-wav',   label: 'MP3 to WAV' },
      ]}
    />
  );
}
