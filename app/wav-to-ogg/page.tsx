import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WAV to OGG Converter',
  description:
    'Convert WAV to OGG/Vorbis online — the royalty-free format used in Godot, Unity, web audio, and Linux. Choose your bitrate, download instantly. Free, no account needed.',
  alternates: {
    canonical: '/wav-to-ogg',
  },
  openGraph: {
    title: 'WAV to OGG Converter',
    description:
      'Convert WAV to OGG/Vorbis online — the royalty-free format used in Godot, Unity, web audio, and Linux. Choose your bitrate, download instantly. Free, no account needed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAV to OGG Converter',
    description:
      'Convert WAV to OGG/Vorbis online — the royalty-free format used in Godot, Unity, web audio, and Linux. Free, no account needed.',
  },
};

export default function WavToOggPage() {
  return (
    <ToolPageLayout
      slug="/wav-to-ogg"
      title="WAV to OGG Converter"
      subtitle="Convert uncompressed WAV to OGG/Vorbis — the royalty-free format used in Godot, Unity, and Linux game audio pipelines."
      inputFormat="wav"
      outputFormat="ogg"
      sourceFormatInfo={{
        name: 'WAV',
        description:
          'WAV is the uncompressed working format. It is large — a 3-minute stereo track is around 30 MB — but universally supported by audio editing tools. WAV is the standard delivery format for game audio pipelines before compression.',
      }}
      targetFormatInfo={{
        name: 'OGG',
        description:
          'OGG/Vorbis is a royalty-free, open-source compressed audio format. It is the default audio format in the Godot engine, widely used in Unity and Unreal Engine for background music, and the standard for audio on Linux systems. OGG uses perceptual compression similar to MP3, but is completely free of patents and licensing restrictions. File sizes are comparable to MP3 at the same bitrate.',
      }}
      whyConvert={`Game audio is the primary use case. If you are building a game in Godot, Unity, or Unreal, OGG is often the preferred (or required) format for background music and ambient tracks. Godot loads OGG natively for streaming audio without requiring re-encoding.

Web developers also use OGG as the Firefox-compatible alternative to MP3. Converting your WAV masters to OGG at 192 kbps gives you a game-ready, web-compatible compressed file that respects the open-source licensing of the codec.

A secondary use: Linux environments where patent-encumbered formats like MP3 are avoided.`}
      faqItems={[
        {
          question: 'What is the difference between OGG and MP3?',
          answer:
            'Both are lossy compressed formats with similar file sizes at equivalent bitrates. OGG/Vorbis is royalty-free and open-source; MP3 has broader hardware support. For game engines and web, OGG is often preferred. For general sharing and hardware players, MP3 is safer.',
        },
        {
          question: 'Which bitrate should I use for game audio?',
          answer:
            '192 kbps for music tracks. 128 kbps works well for sound effects and ambient audio where the content is less complex.',
        },
        {
          question: 'Will OGG play in all browsers?',
          answer:
            'OGG is supported by Firefox, Chrome, and Opera. Safari and iOS do not support OGG natively — if you need cross-browser web audio, serve both OGG and MP3 or use MP3 as the fallback.',
        },
        {
          question: 'Does OGG support looping cleanly in game engines?',
          answer:
            'OGG/Vorbis has a small encoder delay that can cause a brief gap in loops. For seamlessly looping audio in Godot or Unity, encode with loop metadata or use a tool that trims the encoder delay. This is a codec characteristic, not a conversion issue.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/ogg-to-mp3',  label: 'OGG to MP3'  },
        { href: '/mp3-to-ogg',  label: 'MP3 to OGG'  },
        { href: '/wav-to-flac', label: 'WAV to FLAC' },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
      ]}
      relatedGuides={[
        { href: '/formats/ogg',              label: 'OGG format guide'         },
        { href: '/formats/wav',              label: 'WAV format guide'         },
        { href: '/guides/mp3-vs-wav',        label: 'MP3 vs WAV'               },
        { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
        { href: '/wiki/cbr-vs-vbr',          label: 'CBR vs VBR Encoding'      },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
