import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'AIFF to FLAC Converter',
  description:
    'Convert Apple AIFF audio to lossless FLAC — compact archiving with no quality loss. Works with Logic Pro, Pro Tools, and GarageBand exports.',
  alternates: {
    canonical: '/aiff-to-flac',
  },

  openGraph: {
    title: 'AIFF to FLAC Converter',
    description:
      'Convert Apple AIFF audio to lossless FLAC — compact archiving with no quality loss. Works with Logic Pro, Pro Tools, and GarageBand exports.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIFF to FLAC Converter',
    description:
      'Convert Apple AIFF audio to lossless FLAC — compact archiving with no quality loss. Works with Logic Pro, Pro Tools, and GarageBand exports.',
  },
};

export default function AiffToFlacPage() {
  return (
    <ToolPageLayout
      slug="/aiff-to-flac"
      title="AIFF to FLAC Converter"
      subtitle="Convert Apple AIFF to lossless FLAC — same audio quality, significantly smaller file, better metadata support."
      inputFormat="aiff"
      outputFormat="flac"
      sourceFormatInfo={{
        name: 'AIFF',
        description:
          'AIFF (Audio Interchange File Format) is Apple\'s uncompressed audio format — the Mac equivalent of WAV. It stores raw PCM data, making it the working format in Logic Pro, GarageBand, and Pro Tools on macOS. AIFF files are large: a 3-minute stereo track at CD quality is around 30 MB.',
      }}
      targetFormatInfo={{
        name: 'FLAC',
        description:
          'FLAC is lossless compression for audio. The decoded output from a FLAC file is bit-identical to the original uncompressed audio — nothing is removed. FLAC files are 40–60% smaller than equivalent WAV or AIFF files. They also support proper metadata tags (artist, album, track number, artwork), which AIFF handles inconsistently across different software.',
      }}
      whyConvert={`AIFF is great for editing but large for archiving. If you export stems or masters from Logic Pro as AIFF and want to archive them compactly without losing quality, converting to FLAC is the right move. Storage for a large AIFF library is roughly halved.

The metadata improvement matters too — FLAC tags are reliably read by music players, streaming services, and archival software, while AIFF tagging can be inconsistent.

If you are submitting audio to a platform that accepts FLAC for lossless streaming (Tidal, Qobuz, Bandcamp), this is also the conversion to use.

Like WAV-to-FLAC, this is a lossless-to-lossless conversion: no quality is lost.`}
      faqItems={[
        {
          question: 'Is AIFF to FLAC actually lossless?',
          answer:
            'Yes. Both AIFF and FLAC are lossless. The conversion is purely a format change — the decoded audio from the FLAC is bit-identical to the AIFF source.',
        },
        {
          question: 'Why would I choose FLAC over keeping the AIFF?',
          answer:
            'File size and metadata. FLAC is typically 40–60% smaller and has more reliable tag support. If you are archiving a large library, FLAC is more practical.',
        },
        {
          question: 'Will the FLAC play in Logic Pro or other DAWs?',
          answer:
            'Logic Pro does not natively import FLAC. For DAW work, keep your AIFFs. Convert to FLAC for archiving and distribution, not for ongoing editing.',
        },
        {
          question: 'Can I convert it back to AIFF later with no quality loss?',
          answer:
            'Yes. FLAC is lossless — the round trip AIFF→FLAC→AIFF produces bit-identical audio.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-flac',  label: 'WAV to FLAC'  },
        { href: '/aiff-to-mp3',  label: 'AIFF to MP3'  },
        { href: '/flac-to-mp3',  label: 'FLAC to MP3'  },
        { href: '/flac-to-wav',  label: 'FLAC to WAV'  },
        { href: '/wav-to-mp3',   label: 'WAV to MP3'   },
      ]}
      relatedGuides={[
        { href: '/guides/flac-vs-wav',              label: 'FLAC vs WAV'            },
        { href: '/guides/lossless-vs-lossy-audio',  label: 'Lossless vs Lossy Audio' },
        { href: '/formats/flac',                    label: 'FLAC format guide'      },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
