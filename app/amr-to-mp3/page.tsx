import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'AMR to MP3 Converter',
  description:
    'Convert AMR voice recordings to MP3. Works with mobile phone call recordings, voice memos, and any .amr file. Free, no account, no install required.',
  openGraph: {
    title: 'AMR to MP3 Converter',
    description:
      'Convert AMR voice recordings to MP3. Works with mobile phone call recordings, voice memos, and any .amr file. Free, no account, no install required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMR to MP3 Converter',
    description:
      'Convert AMR voice recordings to MP3. Works with mobile phone call recordings, voice memos, and any .amr file. Free, no account, no install required.',
  },
};

export default function AmrToMp3Page() {
  return (
    <ToolPageLayout
      title="AMR to MP3 Converter"
      subtitle="Convert legacy AMR voice recordings from mobile phones to MP3 — a format that plays on any device, modern or old."
      inputFormat="amr"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'AMR',
        description:
          'AMR (Adaptive Multi-Rate) is a compressed audio codec designed for voice recordings on mobile phones. It was widely used in Nokia, Samsung, and early smartphone voice recorders and call recordings. AMR files have very small file sizes but are optimised for speech — not music — and have limited playback support on modern systems.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. It plays on every device, operating system, car stereo, and media player. For voice recordings, even a modest 128 kbps MP3 sounds clear and is far more compatible than AMR.',
      }}
      whyConvert="AMR was the default voice recording format on many Nokia handsets and Android phones from the 2000s and early 2010s. If you have old voice memos, recorded calls, or dictations in AMR format, you may find them unplayable on modern devices and software. Converting to MP3 makes the files immediately playable on any device. Since AMR is optimised for voice at narrow bandwidth, the quality will not dramatically improve by converting — but the compatibility will go from near-zero to universal."
      faqItems={[
        {
          question: 'Will converting AMR to MP3 improve the audio quality?',
          answer:
            'No. AMR files have very low bandwidth and are optimised for voice at small file sizes. Converting to MP3 does not add quality that was not in the original. The result will sound the same as the AMR file but play on any device.',
        },
        {
          question: 'What bitrate should I choose for AMR voice recordings?',
          answer:
            'For voice-only AMR files, 128 kbps MP3 is more than sufficient. The original AMR encoding operates at 4–13 kbps, so the MP3 at 128 kbps will not be the limiting factor — the original AMR quality is. Choosing 192 or 320 kbps does not improve the output.',
        },
        {
          question: 'Where do AMR files come from?',
          answer:
            'AMR files (.amr) typically come from Nokia phone voice recorders, early Android voice memo apps, and some VOIP applications that record calls. Older Samsung and Sony Ericsson phones also produced AMR recordings.',
        },
        {
          question: 'Can I also convert AMR to WAV?',
          answer:
            'Yes. AMR to WAV is also supported. WAV is useful if you need to edit the recording in audio software. The audio quality will be identical to the MP3 — the limitation is the original AMR encoding.',
        },
      ]}
      relatedTools={[
        { href: '/amr-to-wav',   label: 'AMR to WAV' },
        { href: '/m4a-to-mp3',   label: 'M4A to MP3' },
        { href: '/ogg-to-mp3',   label: 'OGG to MP3' },
        { href: '/opus-to-mp3',  label: 'OPUS to MP3' },
        { href: '/wma-to-mp3',   label: 'WMA to MP3' },
      ]}
      relatedGuides={[
        { href: '/formats/amr', label: 'What Is AMR?' },
      ]}
    />
  );
}
