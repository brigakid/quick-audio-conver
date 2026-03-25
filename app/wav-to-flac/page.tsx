import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'WAV to FLAC Converter',
  description:
    'Convert uncompressed WAV audio to lossless FLAC — same quality, 40–60% smaller file. Free, server-side, no account needed.',
};

export default function WavToFlacPage() {
  return (
    <ToolPageLayout
      title="WAV to FLAC Converter"
      subtitle="Compress uncompressed WAV into lossless FLAC — identical audio quality, significantly smaller file."
      inputFormat="wav"
      outputFormat="flac"
      sourceFormatInfo={{
        name: 'WAV',
        description:
          'WAV stores raw, uncompressed PCM data. Every sample is preserved exactly, which makes WAV the reliable working format for audio editing. The trade-off is file size: a 3-minute stereo recording at CD quality (44.1 kHz, 16-bit) takes around 30 MB.',
      }}
      targetFormatInfo={{
        name: 'FLAC',
        description:
          'FLAC uses lossless compression. The audio data is encoded so the file is 40–60% smaller than the equivalent WAV — but when you decode a FLAC, you get the exact same PCM samples as the original. No data is discarded. It is the best format for archiving audio you want to keep: smaller than WAV, perfectly lossless, with reliable metadata support.',
      }}
      whyConvert={`The main use case is archiving. If you have a folder of WAV recordings — session exports, voice recordings, field recordings, mastered tracks — converting them to FLAC cuts the storage footprint by roughly half with zero quality penalty. The decoded audio is bit-identical to the WAV source.

Unlike converting WAV to MP3, there is nothing to feel ambivalent about here: FLAC is a lossless format. You lose nothing except file size.

A secondary use case: some platforms and streaming services (Tidal HiFi, Qobuz) accept FLAC for lossless streaming uploads. If you have master WAV files and need to submit them in FLAC format, this is the converter.

Note: FLAC is not universally supported by hardware. Car stereos, older devices, and some portable players may not play FLAC. If hardware compatibility is the priority, convert to MP3 instead.`}
      faqItems={[
        {
          question: 'Does converting WAV to FLAC change the audio quality?',
          answer:
            'No. Both are lossless. The decoded FLAC is bit-identical to the WAV. This is the one audio conversion where nothing is sacrificed.',
        },
        {
          question: 'How much smaller will the FLAC be?',
          answer:
            'Typically 40–60% smaller than the WAV. A 30 MB WAV file typically becomes 12–18 MB FLAC. Highly dynamic audio compresses more; consistent-level audio compresses less.',
        },
        {
          question: 'Can I convert back from FLAC to WAV later?',
          answer:
            'Yes, with zero quality loss. Lossless is round-trip: WAV→FLAC→WAV gives you the exact same audio as the original WAV.',
        },
        {
          question: 'My music player doesn\'t support FLAC — should I still convert?',
          answer:
            'Only if you are archiving and will keep both copies, or if you specifically need FLAC. If playback compatibility is your priority, WAV to MP3 at 320 kbps is the practical choice.',
        },
      ]}
      relatedTools={[
        { href: '/flac-to-mp3',  label: 'FLAC to MP3'  },
        { href: '/flac-to-wav',  label: 'FLAC to WAV'  },
        { href: '/wav-to-mp3',   label: 'WAV to MP3'   },
        { href: '/aiff-to-flac', label: 'AIFF to FLAC' },
        { href: '/wav-to-m4a',   label: 'WAV to M4A'   },
      ]}
      relatedGuides={[
        { href: '/guides/flac-vs-wav',              label: 'FLAC vs WAV'            },
        { href: '/guides/lossless-vs-lossy-audio',  label: 'Lossless vs Lossy Audio' },
        { href: '/formats/flac',                    label: 'FLAC format guide'      },
      ]}
      lastUpdated="2025-03-01"
    />
  );
}
