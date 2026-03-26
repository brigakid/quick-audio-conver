import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'M4A to WAV Converter',
  description:
    'Convert M4A audio to WAV for use in DAWs, audio editing software, and professional workflows. Works with iPhone voice memos and GarageBand exports.',
};

export default function M4aToWavPage() {
  return (
    <ToolPageLayout
      title="M4A to WAV Converter"
      subtitle="Convert M4A to uncompressed WAV — the format required by most audio editing tools and professional workflows."
      inputFormat="m4a"
      outputFormat="wav"
      sourceFormatInfo={{
        name: 'M4A',
        description:
          'M4A uses AAC encoding inside an MPEG-4 container. It is the default output format from iPhone voice memos, GarageBand audio exports, and Apple Music libraries. The AAC codec is lossy — some audio data was permanently discarded at the moment the M4A was created. That data cannot be recovered by any conversion.',
      }}
      targetFormatInfo={{
        name: 'WAV',
        description:
          'WAV stores audio as uncompressed PCM. No further data is discarded during the conversion — the AAC is decoded into raw samples and written as-is. Most professional audio software — DAWs, video editors, audio restoration tools — work natively with WAV and do not need to transcode it at import. The conversion makes the file substantially larger but accepted universally by any audio tool.',
      }}
      whyConvert={`The primary use case is straightforward: you have a recording from an Apple device and you need to bring it into software that either does not support M4A or works better with WAV. Logic Pro, Ableton Live, DaVinci Resolve, Adobe Audition, and Audacity all accept WAV without any compatibility friction. Some video editors prefer WAV on the timeline to avoid decode overhead during playback. Sample pack creators typically require WAV submissions.

The iPhone voice memo workflow is common: record on phone, airdrop the M4A to desktop, convert to WAV, open in your DAW. It is one extra step but it avoids any import weirdness in tools that are not AAC-native.

Quality caveat: the WAV will sound exactly as good as the source M4A — no better. Converting a lossy format to WAV unpacks the samples but cannot restore what AAC discarded at recording time. If you want higher quality audio, you need to record at a higher bitrate from the start, or use a lossless recording format.`}
      faqItems={[
        {
          question: 'My GarageBand project exports M4A — can I bring it into Ableton Live?',
          answer:
            'Convert to WAV first. Ableton Live handles WAV natively without any re-encoding on import. While newer versions of Live do support AAC, WAV is the safe, zero-friction option and avoids any potential quality loss from a second decode-encode cycle in Ableton\'s import pipeline.',
        },
        {
          question: 'I recorded a voice memo on iPhone for a podcast — will WAV improve the quality?',
          answer:
            'It will not improve it, but it will make it compatible with any editing software without transcoding complications. The audio quality is fixed at whatever the iPhone recorded. Converting to WAV just puts that audio into a container that every piece of podcast editing software reads without complaint.',
        },
        {
          question: 'How much larger will the WAV file be compared to the M4A?',
          answer:
            'Roughly 10x larger. An M4A at 128 kbps for 30 minutes is around 30 MB; the WAV equivalent is around 300 MB. This is expected — WAV stores every sample uncompressed, where AAC was discarding data to keep the file small. Make sure you have the disk space before converting long recordings.',
        },
        {
          question: 'Should I convert my whole M4A library to WAV for archiving purposes?',
          answer:
            'No. For archiving, the right format is FLAC — losslessly compressed, smaller than WAV, bit-for-bit identical on decode. Converting M4A to WAV for archiving just gives you large files that still contain lossy audio. FLAC is better in every respect for storage. WAV makes sense for working files you are actively editing, not for long-term archiving.',
        },
      ]}
      relatedTools={[
        { href: '/m4a-to-mp3', label: 'M4A to MP3' },
        { href: '/mp4-to-wav', label: 'MP4 to WAV' },
        { href: '/mp3-to-wav', label: 'MP3 to WAV' },
        { href: '/wav-to-mp3', label: 'WAV to MP3' },
        { href: '/flac-to-wav', label: 'FLAC to WAV' },
      ]}
      relatedGuides={[
        { href: '/formats/m4a', label: 'M4A format guide' },
        { href: '/guides/mp3-vs-wav', label: 'MP3 vs WAV' },
        { href: '/learn/aac-m4a-and-mp3-what-actually-matters', label: 'AAC, M4A, and MP3 — what actually matters' },
      ]}
      lastUpdated="2025-03-01"
    />
  );
}
