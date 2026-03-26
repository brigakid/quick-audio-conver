import type { Metadata } from 'next';
import ToolPageLayout from '@/components/converter/ToolPageLayout';

export const metadata: Metadata = {
  title: 'MP4 to MP3 Converter',
  description:
    'Extract the audio from any MP4 video file and save it as MP3. Fast, private, no account required. Choose your bitrate and download in seconds.',
};

export default function Mp4ToMp3Page() {
  return (
    <ToolPageLayout
      title="MP4 to MP3 Converter"
      subtitle="Strip the audio track from an MP4 video and save it as an MP3. The video is discarded — only the audio is in the download."
      inputFormat="mp4"
      outputFormat="mp3"
      sourceFormatInfo={{
        name: 'MP4',
        description:
          'MP4 is a video container format. It typically holds both a video stream and an audio track — usually AAC-encoded audio. This converter extracts that audio track and discards the video.',
      }}
      targetFormatInfo={{
        name: 'MP3',
        description:
          'MP3 is the most widely supported audio format. It plays on every device, platform, and media player. Choose 192 kbps for a good balance of quality and file size, or 320 kbps if the source audio is high quality and you want to preserve it.',
      }}
      whyConvert={`If you have downloaded a video and only need the audio — a podcast recording, a music video, a lecture, a YouTube clip — this converter handles it. The resulting MP3 is typically 10–20x smaller than the original MP4 and plays on any device without needing video playback capability. This is also the right tool for extracting audio from screen recordings, interviews, or any video where the audio track is what you actually need.`}
      faqItems={[
        {
          question: 'Does the converter keep the audio quality from the original video?',
          answer:
            'The output quality is limited by the audio in the original MP4. If the video used a high-quality AAC track, choosing 192 or 320 kbps will preserve most of that quality. If the original audio was already compressed at a low bitrate, the output will reflect that — a higher output bitrate cannot recover quality that was not in the source.',
        },
        {
          question: 'What if the MP4 file has no audio?',
          answer:
            'Some screen recordings, animations, and video exports have no audio track. If this is the case, the conversion will produce an empty or very short silent file. Test the original video in a media player to confirm it has audio before uploading.',
        },
        {
          question: 'My MP4 is over 200 MB — can I still convert it?',
          answer:
            'The maximum upload size is 200 MB. For larger files, trim the video to the section you need before uploading — tools like VLC or Handbrake can do this. Alternatively, use a local tool like FFmpeg which has no size restrictions.',
        },
        {
          question: 'Which bitrate should I pick?',
          answer:
            '192 kbps is the recommended default. It is audibly transparent for most listeners on typical equipment and keeps the file size reasonable. 320 kbps is worth choosing if the original video had genuinely high-quality audio and you are particular about fidelity. 128 kbps is acceptable for voice-only recordings like lectures or interviews.',
        },
      ]}
      relatedTools={[
        { href: '/wav-to-mp3',  label: 'WAV to MP3'  },
        { href: '/m4a-to-mp3',  label: 'M4A to MP3'  },
        { href: '/flac-to-mp3', label: 'FLAC to MP3' },
        { href: '/aac-to-mp3',  label: 'AAC to MP3'  },
        { href: '/mp3-to-wav',  label: 'MP3 to WAV'  },
      ]}
      relatedGuides={[
        { href: '/guides/extract-audio-from-video', label: 'How to Extract Audio from Video' },
        { href: '/guides/mp3-vs-wav',               label: 'MP3 vs WAV'                      },
        { href: '/formats/mp3',                     label: 'MP3 format guide'                },
      ]}
      lastUpdated="2026-03-01"
    />
  );
}
