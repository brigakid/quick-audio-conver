import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MP4 to WAV Converter',
  description:
    'Extract the audio from an MP4 video as an uncompressed WAV file — ready for audio editing, DAWs, and production workflows.',
  alternates: {
    canonical: '/mp4-to-wav',
  },

  openGraph: {
    title: 'MP4 to WAV Converter',
    description:
      'Extract the audio from an MP4 video as an uncompressed WAV file — ready for audio editing, DAWs, and production workflows.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP4 to WAV Converter',
    description:
      'Extract the audio from an MP4 video as an uncompressed WAV file — ready for audio editing, DAWs, and production workflows.',
  },
};

export default function Mp4ToWavPage() {
  return (
    <ToolPageLayout
      slug="/mp4-to-wav"
      title="MP4 to WAV Converter"
      subtitle="Pull the audio track from an MP4 and save it as uncompressed WAV — the format audio editing software and DAWs work with natively."
      inputFormat="mp4"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'MP4',
        description:
          'MP4 is a video container. It holds a video stream alongside an audio track — almost always AAC-encoded. This converter discards the video and extracts the audio into an uncompressed WAV file. The quality of the output is bounded by the quality of the AAC audio in the original MP4.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV stores audio as raw PCM samples — no compression, no encoding decisions, no codec overhead. It is the native working format for audio editing software: DAWs, video editors, audio restoration tools, and sample libraries all read WAV without needing to transcode it first. The trade-off is file size — WAV is typically 5–10x larger than the compressed equivalent.',
      }}
      whyConvert={`The distinction between MP4 to WAV and MP4 to MP3 comes down to what you are going to do with the audio. If you are editing it, use WAV.

Film and video shoots record sync audio alongside video; you extract it as WAV to bring into DaVinci Resolve's Fairlight, Pro Tools, or Logic Pro. Podcast interviews recorded over video calls, documentary interviews, lecture recordings, instrument takes captured on camera — all of these need the audio in WAV for clean editing, EQ, noise reduction, and layering. DAWs work better with WAV because there is no decode step on every playback pass.

MP3 is the right choice if you just want to listen to or share the audio. WAV is what you need if you are going to cut, process, or mix it.

One important note: the WAV will sound exactly as good as the AAC audio inside the original MP4. Uncompressing AAC into WAV does not restore the data that AAC discarded when the video was encoded. A 128 kbps AAC track extracted to WAV is still 128 kbps worth of audio quality — just in a larger, more editable container.`}
      faqItems={[
        {
          question: 'MP4 to WAV vs MP4 to MP3 — which should I choose?',
          answer:
            'WAV if you are editing the audio in a DAW, video editor, or any audio post-production tool. MP3 if you want a compact file to listen to or share. Both extractions produce identical audio quality — the difference is purely in how the file is stored and what tools accept it.',
        },
        {
          question: 'My video editor imports MP4 directly — why would I extract WAV separately?',
          answer:
            'Direct MP4 import works fine for many projects. But when you need precise audio editing — dialogue cleanup, noise reduction, multi-track mixing — having the audio as a standalone WAV gives you cleaner handling in dedicated audio tools like Audacity, iZotope RX, or an external DAW. It also avoids the transcoding overhead some editors impose when they convert AAC internally at import.',
        },
        {
          question: 'How large will the WAV file be?',
          answer:
            'Roughly 10 MB per minute for standard stereo 44.1 kHz 16-bit audio. A 10-minute interview extracted from an MP4 comes out around 100 MB as WAV — noticeably larger than the source video file, which had the audio compressed to a fraction of that size.',
        },
        {
          question: 'The original MP4 had low-quality audio — will converting to WAV improve it?',
          answer:
            'No. WAV unpacks the AAC into raw samples, but it cannot reconstruct what AAC discarded during encoding. If the source sounds muffled, clipped, or compressed, the WAV will sound the same way. Better source audio is the only path to better output quality.',
        },
      ]}
      relatedTools={[
        { href: '/mp4-to-mp3', label: 'MP4 to MP3' },
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/m4a-to-wav', label: 'M4A to WAV' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
        { href: '/flac-to-wav', label: 'FLAC to WAV' },
      ]}
      relatedGuides={[
        { href: '/guides/extract-audio-from-video', label: 'How to extract audio from video' },
        { href: '/guides/mp3-vs-wav', label: 'MP3 vs WAV' },
        { href: '/formats/wav', label: 'WAV format guide' },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
