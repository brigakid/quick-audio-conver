import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MP3 to OGG Converter',
  description:
    'Convert MP3 to OGG/Vorbis for game engines, Linux, and royalty-free audio workflows. No account, no installation.',
  alternates: {
    canonical: '/mp3-to-ogg',
  },

  openGraph: {
    title: 'MP3 to OGG Converter',
    description:
      'Convert MP3 to OGG/Vorbis for game engines, Linux, and royalty-free audio workflows. No account, no installation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP3 to OGG Converter',
    description:
      'Convert MP3 to OGG/Vorbis for game engines, Linux, and royalty-free audio workflows. No account, no installation.',
  },
};

export default function Mp3ToOggPage() {
  return (
    <ToolPageLayout
      slug="/mp3-to-ogg"
      title="MP3 to OGG Converter"
      subtitle="Convert MP3 to OGG/Vorbis — for game engines, open-source projects, and environments where royalty-free formats are required."
      inputFormat="mp3"
      outputFormat="ogg"
      sourceFormatInfo={{
        name: 'MP3',
        description:
          'MP3 is the universal compressed audio format. It is lossy — some audio data was permanently removed during encoding. Converting an MP3 to OGG does not restore that data; both formats use different psychoacoustic compression algorithms, but the original quality ceiling is set by the MP3 source.',
      }}
      targetFormatInfo={{
        name: 'OGG',
        description:
          'OGG/Vorbis is the royalty-free, patent-free alternative to MP3. It is the native audio format in Godot, commonly used in Unity and Unreal Engine, and standard on Linux systems. At comparable bitrates, OGG quality is roughly equivalent to MP3.',
      }}
      whyConvert={`The most common scenario: you have audio assets in MP3 (downloaded music, sound effects, licensed audio) and your game engine requires or prefers OGG. Godot specifically works with OGG for streaming background music. Some open-source projects and Linux distributions prefer OGG for licensing reasons.

Important caveat: this is a lossy-to-lossy conversion. The OGG output will not sound better than the MP3 source — you are re-encoding already-compressed audio, which causes a small additional quality reduction. For best results, convert from the original WAV master if you have it. Use this converter when the WAV is not available.`}
      faqItems={[
        {
          question: 'Will the OGG sound better than the MP3?',
          answer:
            'No. Both formats are lossy. Re-encoding an MP3 to OGG introduces a small additional quality loss. For the best OGG quality, convert from the original WAV or lossless source if available.',
        },
        {
          question: 'Which bitrate should I choose?',
          answer:
            'Match the approximate bitrate of your source MP3, or go slightly lower. If your MP3 is 192 kbps, encode the OGG at 192 kbps. Going higher does not improve quality — it just enlarges the file without adding audio data that was not there.',
        },
        {
          question: 'Godot says it needs .ogg files — is this the right format?',
          answer:
            'Yes. Godot uses OGG/Vorbis for streaming background music. This converter produces standard OGG/Vorbis files compatible with Godot.',
        },
        {
          question: 'Can I use OGG on iOS?',
          answer:
            'OGG is not natively supported on iOS or Safari. For mobile apps or web pages targeting iOS, use MP3 or AAC instead.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-ogg',  label: 'WAV to OGG'  },
        { href: '/ogg-to-mp3',  label: 'OGG to MP3'  },
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
      ]}
      relatedGuides={[
        { href: '/formats/ogg',                    label: 'OGG format guide'           },
        { href: '/guides/mp3-vs-wav',              label: 'MP3 vs WAV'                 },
        { href: '/formats/mp3',  label: 'When MP3 Is Good Enough'    },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
