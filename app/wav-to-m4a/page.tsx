import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WAV to M4A Converter',
  description:
    'Convert WAV audio to M4A (AAC) for Apple Podcasts, iTunes, and iOS devices. Better audio efficiency than MP3 at the same bitrate.',
  openGraph: {
    title: 'WAV to M4A Converter',
    description:
      'Convert WAV audio to M4A (AAC) for Apple Podcasts, iTunes, and iOS devices. Better audio efficiency than MP3 at the same bitrate.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAV to M4A Converter',
    description:
      'Convert WAV audio to M4A (AAC) for Apple Podcasts, iTunes, and iOS devices. Better audio efficiency than MP3 at the same bitrate.',
  },
};

export default function WavToM4aPage() {
  return (
    <ToolPageLayout
      title="WAV to M4A Converter"
      subtitle="Convert uncompressed WAV to M4A — the compressed format preferred by Apple Podcasts, iTunes, and the iOS ecosystem."
      inputFormat="wav"
      outputFormat="m4a"
      sourceFormatInfo={{
        name: 'WAV',
        description:
          'WAV is the working format: uncompressed, universally compatible with editing tools, but large. A recording session in WAV is the right way to capture audio for editing. The WAV is what you export from your DAW, not what you distribute.',
      }}
      targetFormatInfo={{
        name: 'M4A',
        description:
          'M4A uses AAC encoding — technically more efficient than MP3 at the same bitrate. A 128 kbps M4A typically sounds better than a 128 kbps MP3. It is the format Apple Podcasts recommends for submissions, the default for iTunes imports, and the native format on iOS. File sizes are comparable to MP3.',
      }}
      whyConvert={`Podcasters are the primary audience here. You record and edit in WAV, then need a distribution-ready file. Apple Podcasts explicitly recommends AAC-encoded audio (M4A) at 128 kbps mono or 192 kbps stereo. If your host accepts M4A, this gives you a marginally better-sounding compressed file than MP3 at the same bitrate — which matters most at lower bitrates.

Music producers distributing content through iTunes also export as M4A. Beyond Apple's ecosystem, M4A has broad support: Android, Windows, and most streaming services all handle it.

The one limitation is older hardware — car stereos, legacy players, and some broadcast tools prefer MP3. If compatibility is the priority above all else, choose MP3 instead.`}
      faqItems={[
        {
          question: 'Apple Podcasts says to submit AAC at 128 kbps mono — is that this?',
          answer:
            'Yes. Convert your WAV to M4A at 128 kbps. If your original recording is stereo, consider whether your podcast content actually needs stereo — most speech-only podcasts are fine in mono, and mono at 128 kbps halves the file size compared to stereo.',
        },
        {
          question: 'WAV to M4A vs WAV to MP3 — which sounds better?',
          answer:
            'M4A (AAC) sounds marginally better than MP3 at the same bitrate, particularly at 128 kbps where the efficiency gap between the two codecs is most audible. At 320 kbps both are effectively transparent, so the difference matters mainly at lower bitrates.',
        },
        {
          question: 'Can I play the M4A on Spotify or podcast apps?',
          answer:
            'Yes. M4A/AAC is supported by Spotify, Apple Podcasts, Overcast, Pocket Casts, and essentially all modern podcast apps and music players. Android has supported AAC natively for years.',
        },
        {
          question: 'Is M4A the right choice if my audience uses old car stereos?',
          answer:
            'Not guaranteed. Older car head units commonly support MP3 but have inconsistent or no AAC support. If broad compatibility across all devices — including legacy hardware — is essential, convert to MP3 instead.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/mp3-to-m4a',  label: 'MP3 to M4A'  },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/mp4-to-mp3',  label: 'MP4 to MP3'  },
      ]}
      relatedGuides={[
        { href: '/guides/best-audio-format-for-podcasting', label: 'Best Audio Format for Podcasting' },
        { href: '/learn/aac-m4a-and-mp3-what-actually-matters', label: 'AAC vs MP3: What Actually Matters' },
        { href: '/formats/m4a',                            label: 'M4A format guide'                  },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
