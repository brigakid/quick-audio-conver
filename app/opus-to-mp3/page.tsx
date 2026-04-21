import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'Opus to MP3 Converter',
  description:
    'Convert Opus audio files to MP3. Works with Discord voice messages, WhatsApp voice notes, WebRTC recordings, and any .opus file. Free, no account needed.',
  alternates: {
    canonical: '/opus-to-mp3',
  },

  openGraph: {
    title: 'Opus to MP3 Converter',
    description:
      'Convert Opus audio files to MP3. Works with Discord voice messages, WhatsApp voice notes, WebRTC recordings, and any .opus file. Free, no account needed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opus to MP3 Converter',
    description:
      'Convert Opus audio files to MP3. Works with Discord voice messages, WhatsApp voice notes, WebRTC recordings, and any .opus file. Free, no account needed.',
  },
};

export default function OpusToMp3Page() {
  return (
    <ToolPageLayout
      slug="/opus-to-mp3"
      title="OPUS to MP3 Converter"
      subtitle="Upload an OPUS audio file and convert it to MP3 — perfect for Discord voice messages, WhatsApp audio, and WebRTC recordings."
      inputFormat="opus"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'OPUS',
        description:
          'OPUS is a modern, open-source audio codec standardised by the IETF. It delivers excellent quality at very low bitrates (as low as 6 kbps) and is used by Discord, WhatsApp, WebRTC calls, Spotify, and most modern browsers. OPUS files use the .opus extension and are typically wrapped in an OGG container.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'Opus is technically superior to MP3, but MP3 wins on compatibility. Opus files from Discord, WhatsApp, or WebRTC recordings will not open in most standard audio software, media managers, or older devices. MP3 will. Converting from Opus to MP3 trades codec efficiency for the near-universal playback support that Opus lacks.',
      }}
      whyConvert="Opus is the codec behind almost all modern real-time audio — Discord voice messages, WhatsApp voice notes, Zoom calls recorded in the browser, Telegram audio. These files arrive as .opus or .ogg and often won't open in standard media players or audio editors. Converting to MP3 gives you a file that plays on any device, imports into any DAW, and shares without compatibility issues. It's also the right choice when archiving voice recordings you want to keep long-term."
      faqItems={[
        {
          question: 'Where do Opus files come from?',
          answer:
            'Opus files are produced by Discord (voice messages), WhatsApp (voice notes saved as .ogg on Android), Telegram voice messages, WebRTC browser recordings, Zoom (when using browser-based recording), and Mumble. They use .opus or .ogg extensions — both are OGG containers holding Opus audio.',
        },
        {
          question: 'What quality can I expect from the converted MP3?',
          answer:
            'Voice messages and calls are typically encoded at 24–64 kbps Opus — the source sets the quality ceiling. Converting to 128 kbps MP3 is appropriate for voice content and won\'t introduce noticeable additional degradation. Opus music files (usually 96–160 kbps) should be converted to 192 kbps MP3 for best results.',
        },
        {
          question: 'My Opus file has a .ogg extension — can I still upload it?',
          answer:
            'Yes. Opus audio is often stored in an OGG container with a .ogg extension — this is standard for WhatsApp voice notes and some other apps. Upload it normally; the converter reads the actual codec from the file, not just the extension.',
        },
        {
          question: 'Can I convert Discord voice messages with this tool?',
          answer:
            'Yes. Discord voice messages are encoded in Opus format. Save the voice message file from Discord and upload it here. The converted MP3 can then be played in any media player or imported into audio editing software.',
        },
        {
          question: 'Can I convert a WhatsApp voice note this way?',
          answer:
            'Yes. WhatsApp voice notes on Android are saved as .ogg files containing Opus audio. Export or locate the file (typically in WhatsApp/Media/WhatsApp Voice Notes on Android), upload it here, and download the MP3.',
        },
      ]}
      relatedTools={[
        { href: '/ogg-to-mp3',   label: 'OGG to MP3' },
        { href: '/aac-to-mp3',   label: 'AAC to MP3' },
        { href: '/m4a-to-mp3',   label: 'M4A to MP3' },
        { href: '/wav-to-mp3',   label: 'WAV to MP3' },
        { href: '/flac-to-mp3',  label: 'FLAC to MP3' },
        { href: '/mp3-to-wav',   label: 'MP3 to WAV' },
      ]}
      relatedGuides={[
        { href: '/guides/troubleshooting-audio-conversion',  label: 'Troubleshooting Audio Conversion' },
        { href: '/guides/how-to-choose-mp3-bitrate',         label: 'How to Choose MP3 Bitrate'        },
        { href: '/formats/opus',                        label: 'WikiSound: What Is Opus?'          },
        { href: '/wiki/what-is-bitrate',                     label: 'WikiSound: What Is Bitrate?'       },
        { href: '/wiki/what-is-lossy-audio',                 label: 'WikiSound: What Is Lossy Audio?'   },
      ]}
      lastUpdated="2026-03-28"
    />
  );
}
