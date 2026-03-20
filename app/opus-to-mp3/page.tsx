import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'OPUS to MP3 Converter — Free Online',
  description:
    'Convert OPUS to MP3 online for free. Convert Discord voice messages, WhatsApp audio, and WebRTC recordings to MP3. No signup required.',
};

export default function OpusToMp3Page() {
  return (
    <ToolPageLayout
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
          'MP3 (MPEG Audio Layer III) is the most universally supported audio format. Despite being older technology than OPUS, MP3 plays on virtually every device, car stereo, media player, and platform — making it the best choice for sharing and broad compatibility.',
      }}
      whyConvert="OPUS is highly efficient but not universally supported outside of browsers and modern apps. If you need to play a Discord voice message in a media player, edit a WhatsApp voice note in audio software, or archive a WebRTC recording in a standard format, converting to MP3 gives you the widest compatibility. MP3 is also better supported by older hardware and devices."
      faqItems={[
        {
          question: 'Where do OPUS files come from?',
          answer:
            'OPUS files are commonly produced by Discord (voice messages and call recordings), WhatsApp (voice notes on some platforms), WebRTC browser recordings, Mumble, and various web-based voice tools. They often have a .opus or .ogg extension.',
        },
        {
          question: 'Will the quality be good after converting OPUS to MP3?',
          answer:
            'OPUS files are often already compressed at low bitrates (e.g. 32–64 kbps for voice), so the source quality is the main limiting factor. Converting to MP3 at 128 kbps is a good choice for voice content. For music, choose 192 or 320 kbps.',
        },
        {
          question: 'My OPUS file has a .ogg extension — can I still upload it?',
          answer:
            'Yes. OPUS audio is often wrapped in an OGG container and saved with a .ogg extension. Upload it as normal — FFmpeg will correctly decode the Opus stream regardless of the extension.',
        },
        {
          question: 'Can I convert Discord voice messages with this tool?',
          answer:
            'Yes. Discord voice messages are typically encoded in OPUS format. Download the voice message file from Discord and upload it here to convert it to MP3.',
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
    />
  );
}
