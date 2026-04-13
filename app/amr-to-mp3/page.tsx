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
          'AMR support is essentially absent from modern devices and software. MP3 plays on everything that does not support AMR — which is most current hardware. For voice content, 128 kbps MP3 is more than sufficient. The audio quality ceiling is set by the original AMR encoding, not the MP3 output.',
      }}
      whyConvert="AMR was the default voice recording format on many Nokia handsets and Android phones from the 2000s and early 2010s. If you have old voice memos, recorded calls, or dictations in AMR format, you may find them unplayable on modern devices and software. Converting to MP3 makes the files immediately playable on any device. Since AMR is optimised for voice at narrow bandwidth, the quality will not dramatically improve by converting — but the compatibility will go from near-zero to universal."
      faqItems={[
        {
          question: 'Will converting AMR to MP3 improve the audio quality?',
          answer:
            'No. AMR files have very low bandwidth and are optimised for voice at small file sizes. Converting to MP3 does not add quality that was not in the original. The result will sound the same as the AMR file but play on any device.',
        },
        {
          question: 'What is the difference between AMR-NB and AMR-WB?',
          answer:
            'AMR-NB (Narrowband) is the original format, operating at 4.75–12.2 kbps with a frequency range of roughly 200–3400 Hz — the narrow band used for telephone calls. AMR-WB (Wideband) operates at 6.6–23.85 kbps and covers 50–7000 Hz, producing noticeably clearer voice audio. Most AMR recordings from older Nokia, Samsung, and Sony Ericsson phones are AMR-NB. Both convert to MP3 with this tool. AMR-WB files will sound better in the output, but neither can exceed the quality ceiling set during original recording.',
        },
        {
          question: 'What bitrate should I choose for AMR voice recordings?',
          answer:
            'For AMR-NB recordings, 128 kbps MP3 is more than sufficient — the source is encoded at 4–13 kbps, so the MP3 is not the limiting factor. For AMR-WB recordings, 128 kbps is still adequate for voice. Choosing 192 or 320 kbps will not improve the output beyond what the original AMR contained.',
        },
        {
          question: 'Where do AMR files come from?',
          answer:
            'AMR files (.amr) typically come from Nokia phone voice recorders, early Android voice memo apps, and some VOIP and call-recording applications. Older Samsung, LG, and Sony Ericsson phones also produced AMR recordings as the default voice memo format.',
        },
        {
          question: 'Can I also convert AMR to WAV?',
          answer:
            'Yes. AMR to WAV is supported. WAV is the better choice if you need to edit the recording in audio software — it is uncompressed and imports cleanly into any DAW or editor. The audio quality is identical to MP3; the limitation is the original AMR encoding in both cases.',
        },
        {
          question: 'Why won\'t my AMR file play on my computer or phone?',
          answer:
            'AMR is not supported by most modern operating systems or media players without additional codec packs. Windows Media Player, Apple Music, and Android\'s default music apps do not play AMR natively. Converting to MP3 removes the dependency on any AMR decoder and produces a file that plays everywhere.',
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
        { href: '/formats/amr',                              label: 'What Is AMR?'                        },
        { href: '/wiki/what-is-audio-codec',                 label: 'WikiSound: What Is an Audio Codec?'  },
        { href: '/wiki/what-is-lossy-audio',                 label: 'WikiSound: What Is Lossy Audio?'     },
        { href: '/wiki/what-is-audio-artifacting',           label: 'WikiSound: What Are Audio Artifacts?' },
        { href: '/guides/troubleshooting-audio-conversion',  label: 'Troubleshooting Audio Conversion'    },
      ]}
      lastUpdated="2026-04-14"
    />
  );
}
