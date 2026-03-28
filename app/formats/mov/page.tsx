import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is MOV? QuickTime Format Guide',
  description:
    "MOV is Apple's QuickTime video container format — commonly produced by iPhones, iPads, iMovie, and Final Cut Pro. Learn how to extract audio from MOV files and when to convert them.",
};

export default function MovFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Video Container</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is MOV?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          MOV is Apple&apos;s QuickTime video container format. It holds video, audio,
          and metadata together in a single file and is the default recording format
          for iPhone, iPad, iMovie, and Final Cut Pro. QuickAudioConvert can extract
          the audio track from a MOV file and save it as MP3, WAV, M4A, AAC, OGG, or OPUS.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',             'Video container (audio extraction)'],
            ['File extension',   '.mov'],
            ['Developed by',     'Apple (QuickTime, 1991)'],
            ['Typical audio',    'AAC (most files) or PCM (professional)'],
            ['Common sources',   'iPhone, iPad, iMovie, Final Cut Pro'],
            ['FLAC output',      'Not offered (source audio is typically lossy AAC)'],
          ].map(([label, value]) => (
            <div key={label} className="col-span-1">
              <dt className="text-xs text-gray-400">{label}</dt>
              <dd className="text-sm font-medium text-gray-800">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What MOV is</h2>
          <p className="leading-relaxed">
            MOV is a container format — a wrapper that holds separate video and audio
            streams in one file. Developed by Apple as part of QuickTime in 1991, it
            became the native format for Apple&apos;s video ecosystem. When you record
            a video on an iPhone, edit a timeline in iMovie, or export from Final Cut Pro,
            the result is a .mov file.
          </p>
          <p className="leading-relaxed mt-3">
            MOV is closely related to MP4: both use the ISO Base Media File Format
            (ISOBMFF) specification and contain compatible audio and video codecs. A
            file saved as .mov and a file saved as .mp4 can often be renamed to the
            other extension and still play correctly — the difference is mostly metadata
            and compatibility conventions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What audio is inside a MOV file</h2>
          <p className="leading-relaxed">
            The audio codec inside a MOV file depends on how it was created:
          </p>
          <ul className="space-y-3 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">AAC</span>
              <span>The most common case. iPhone and iPad record audio as AAC at 128–192 kbps.
              iMovie and Final Cut Pro exports typically use AAC as well. AAC is a lossy
              compressed codec — extracting to a higher bitrate cannot improve quality beyond
              the original.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">PCM (uncompressed)</span>
              <span>Professional MOV files — such as those captured with external audio
              recorders, high-end cameras, or Logic Pro — may contain uncompressed PCM
              audio. These files are lossless. Extracting to WAV from a PCM MOV is a
              true lossless operation.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">MP3 (rare)</span>
              <span>Older QuickTime files occasionally contain MP3 audio tracks. Uncommon
              today but handled correctly by the converter.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common sources of MOV files</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>iPhone and iPad video recordings (Camera app default format)</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>macOS screen recordings (QuickTime Player)</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>iMovie timeline exports</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Final Cut Pro exports</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Older digital cameras with QuickTime support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Choosing an output format</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">MP3 — for sharing and general use</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                The most compatible output. Small file, plays everywhere. 192 kbps is
                the recommended bitrate for music; 128 kbps is adequate for speech,
                lectures, and interviews.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">WAV — for editing</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Extract to WAV if you need to import the audio into editing software
                (Audacity, Premiere Pro, Final Cut, DaVinci Resolve). WAV is accepted
                universally by DAWs and video editors. Note: if the original MOV audio
                was compressed AAC, the WAV contains that same AAC-quality audio —
                it is not an upgrade, but it prevents further re-encoding during editing.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">M4A — for Apple devices and podcasting</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                If the MOV audio was AAC, extracting to M4A keeps the same codec in
                a pure-audio container — no re-encoding, no quality loss. Ideal for
                files destined for Apple Podcasts, iTunes, or iPhone playback.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why FLAC is not offered for MOV</h2>
          <p className="leading-relaxed">
            FLAC output is only available from confirmed lossless sources: WAV, AIFF, and ALAC.
            Most MOV files contain AAC audio (lossy), and encoding lossy audio to FLAC produces
            a large file with no quality benefit — it stores the AAC-degraded audio in a
            lossless container, which is misleading and wasteful.
          </p>
          <p className="leading-relaxed mt-3">
            The exception is a professional MOV with a PCM audio track. For those files,
            FLAC would be technically appropriate — but because the codec cannot be verified
            at upload time, FLAC is withheld for MOV uniformly. If you have a confirmed
            lossless MOV, extract to WAV first, then convert WAV to FLAC.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">MOV vs MP4</h2>
          <p className="leading-relaxed">
            For audio extraction purposes, MOV and MP4 behave identically. Both are
            container formats that most commonly carry AAC audio. Both are handled the
            same way by FFmpeg. If you have an MP4 file, use the MP4 converters. If you
            have a MOV file, use the MOV converters. The output quality will be the same.
          </p>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Can I extract audio from an iPhone video?',
            a: 'Yes. iPhone videos are saved as .mov files. Upload the .mov file and choose your output format — MP3 for sharing, WAV for editing, or M4A to keep the original AAC codec without re-encoding.',
          },
          {
            q: 'Why is my MOV file so large?',
            a: 'MOV files contain both a high-quality video stream and an audio stream. The video data accounts for most of the file size. Extracting the audio alone produces a much smaller file — typically 1–5 MB per minute as MP3.',
          },
          {
            q: 'Is MOV the same as MP4?',
            a: 'Structurally similar, but not identical. MOV is Apple\'s QuickTime format; MP4 is the international standard. Both can contain the same H.264 video and AAC audio codecs. For audio extraction purposes they behave the same way — the converter handles both.',
          },
          {
            q: 'What if my MOV file has multiple audio tracks?',
            a: 'The converter extracts the primary (first) audio track, which is the main audio in almost all cases. Multi-track MOV files from professional workflows may require specialized software to access secondary tracks.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Extract audio from MOV"
        items={[
          { href: '/mov-to-mp3', label: 'MOV to MP3', note: 'Extract audio for sharing and general use' },
          { href: '/mov-to-wav', label: 'MOV to WAV', note: 'Extract audio for editing software'       },
          { href: '/mov-to-m4a', label: 'MOV to M4A', note: 'Extract audio for Apple devices'          },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/extract-audio-from-video',                               label: 'How to Extract Audio from Video'             },
          { href: '/learn/extracting-audio-from-video-best-format-choices',         label: 'Best Format Choices When Extracting Audio'   },
          { href: '/learn/when-converting-to-wav-does-not-improve-quality',         label: 'When WAV Doesn\'t Improve Quality'           },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
