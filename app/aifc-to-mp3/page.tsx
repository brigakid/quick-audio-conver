import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AIFC to MP3 Converter — Free Online',
  description:
    'Convert AIFC to MP3 online for free. Convert compressed AIFF audio files to widely compatible MP3. No signup required.',
};

export default function AifcToMp3Page() {
  return (
    <ToolPageLayout
      title="AIFC to MP3 Converter"
      subtitle="Convert AIFC compressed audio to MP3 — a universally compatible format that plays on any device."
      inputFormat="aifc"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'AIFC',
        description:
          'AIFC (Audio Interchange File Format Compressed) is a variant of Apple\'s AIFF format that supports compressed audio codecs. While standard AIFF stores raw PCM audio, AIFC can encode audio using IMA ADPCM, MACE, or other codecs inside the same AIFF container structure. AIFC files use the .aifc extension and are less common than standard AIFF files.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. It plays on every device, operating system, car stereo, and media player. MP3 is the practical choice when you need a file that works everywhere without special software.',
      }}
      whyConvert="AIFC files are rarely playable in modern software outside of macOS and professional audio applications. Converting to MP3 produces a file that plays on any device. AIFC's compressed variants (IMA ADPCM, MACE) were used in older Apple Pro Audio gear, Logic Pro sessions, and legacy Mac audio workflows. If you have AIFC files from these sources and need to play or share them on modern systems, MP3 is the practical output format."
      faqItems={[
        {
          question: 'What is the difference between AIFF and AIFC?',
          answer:
            'AIFF stores raw uncompressed PCM audio. AIFC is a variant that supports compressed codecs (IMA ADPCM, MACE, and others) inside the same container structure. Both use the AIFF container but AIFC files contain compressed data. Standard .aiff files are always uncompressed; .aifc files may or may not be.',
        },
        {
          question: 'Can I also convert .aiff files here?',
          answer:
            'Yes. Standard AIFF files are supported — use the AIFF to MP3 converter. This converter is specifically for .aifc files, which are the compressed AIFC variant.',
        },
        {
          question: 'Where do AIFC files come from?',
          answer:
            'AIFC files were used by older Apple Pro Audio gear, early Logic Pro versions, and some legacy Mac audio applications. They are uncommon today but still appear in archives from that era.',
        },
        {
          question: 'Will the audio quality be good after converting AIFC to MP3?',
          answer:
            'It depends on the AIFC source. If the AIFC contained IMA ADPCM audio (a lossy codec), the quality is limited by that original encoding. If it contained MACE-compressed audio, quality is similarly constrained. At 192 kbps MP3, the output quality will match the AIFC source.',
        },
      ]}
      relatedTools={[
        { href: '/aiff-to-mp3',  label: 'AIFF to MP3' },
        { href: '/aiff-to-flac', label: 'AIFF to FLAC' },
        { href: '/wav-to-mp3',   label: 'WAV to MP3' },
        { href: '/flac-to-mp3',  label: 'FLAC to MP3' },
        { href: '/m4a-to-mp3',   label: 'M4A to MP3' },
      ]}
      relatedGuides={[
        { href: '/formats/aiff', label: 'What Is AIFF / AIF / AIFC?' },
      ]}
    />
  );
}
