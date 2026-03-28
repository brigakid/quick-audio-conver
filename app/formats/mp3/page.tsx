import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is MP3? Format Guide',
  description:
    'MP3 is the most widely supported audio format. Learn how it works, when to use it, its trade-offs, and which formats to compare it against.',
  openGraph: {
    title: 'What Is MP3? Format Guide',
    description:
      'MP3 is the most widely supported audio format. Learn how it works, when to use it, its trade-offs, and which formats to compare it against.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is MP3? Format Guide',
    description:
      'MP3 is the most widely supported audio format. Learn how it works, when to use it, its trade-offs, and which formats to compare it against.',
  },
};

export default function Mp3FormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is MP3?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          MP3 is a lossy audio format that achieves small file sizes by permanently removing
          audio data that most listeners can't detect. It is the most universally supported
          audio format in existence.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',            'Lossy compressed'],
            ['File extension',  '.mp3'],
            ['Developed by',    'Fraunhofer Society'],
            ['Common bitrates', '128 / 192 / 320 kbps'],
            ['Typical file size', '~1 MB per minute at 128 kbps'],
            ['Output support',  'MP3, WAV, M4A, AAC, OGG, OPUS'],
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">How it works</h2>
          <p className="leading-relaxed">
            MP3 compression works by analysing audio frequencies and removing those that are
            masked by louder sounds, or that fall outside the range most people notice on
            typical equipment. The result is a file that is 5–10x smaller than an equivalent
            WAV, with quality loss that is usually inaudible at 192 kbps or higher.
          </p>
          <p className="leading-relaxed mt-3">
            Once data is removed during MP3 compression, it cannot be recovered. Converting an
            MP3 to WAV gives you a larger file, but not better audio quality — the original
            lossy compression is permanent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common uses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Music libraries and offline playback</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Podcast distribution and audio streaming</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Sharing audio by email or messaging</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Uploading to platforms with file size limits</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Car stereos, portable players, and hardware with limited format support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Supported on every device, platform, and media player without exception</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Small file sizes — ideal for storage and transfer</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Adjustable bitrate gives control over the quality vs. size trade-off</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>At 192 kbps or above, quality loss is inaudible to most listeners on typical playback equipment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Lossy — audio data is permanently discarded. Not suitable for archiving masters.</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Quality degrades with each re-encode. Avoid converting MP3 to MP3.</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>At 128 kbps or lower, compression artefacts may be audible on headphones or decent speakers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility</h2>
          <p className="leading-relaxed">
            MP3 is supported natively on every major platform: Windows, macOS, iOS, Android,
            Linux, and all modern browsers. It plays on hardware devices including car stereos,
            Bluetooth speakers, and most portable media players. No conversion is needed for
            any mainstream platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use MP3</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Sharing audio with someone who might play it on any device</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Uploading to a platform that accepts MP3 input (most do)</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Distributing a podcast episode</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Reducing storage use from a large audio collection</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to avoid MP3</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Archiving original recordings — use WAV or FLAC instead</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Audio editing and mixing — work in WAV, convert to MP3 for release</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>If you already have a lossless copy and quality matters, keep using the lossless version</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Choosing a bitrate</h2>
          <p className="leading-relaxed">
            When converting to MP3, you choose a bitrate that controls the trade-off between
            file size and quality:
          </p>
          <ul className="mt-3 space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">128 kbps</span> — Noticeably compressed on good headphones. Acceptable for voice, podcasts, or low-storage situations.</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">192 kbps</span> — Recommended. Indistinguishable from the original for most listeners on most equipment.</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">320 kbps</span> — Maximum quality MP3. Only worth choosing if your source file is high quality and you are particular about audio fidelity.</li>
          </ul>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Is MP3 good enough for music?',
            a: 'For everyday listening, yes. At 192 kbps or higher, most people cannot tell the difference between MP3 and lossless audio on typical headphones or speakers. If you are an audiophile listening on high-end equipment, you may prefer FLAC.',
          },
          {
            q: 'Can I convert MP3 back to a lossless format?',
            a: 'You can convert an MP3 to WAV or FLAC, but the audio quality does not improve — the data discarded during MP3 compression is gone permanently. The resulting file is larger but not better-sounding.',
          },
          {
            q: 'What is the difference between MP3 and AAC?',
            a: 'Both are lossy. AAC (used in M4A files) is technically more efficient — it produces better quality at the same bitrate. However, MP3 is more universally supported on older hardware and software. For most purposes the difference is small.',
          },
          {
            q: 'Does re-encoding an MP3 reduce quality?',
            a: 'Yes. Each time you encode audio using a lossy format, quality is reduced. Avoid converting MP3 to MP3 or MP3 to AAC repeatedly. If you need to edit or re-encode, start from a lossless source whenever possible.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert to or from MP3"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Compress uncompressed WAV to MP3' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Convert lossless FLAC to MP3'     },
          { href: '/mp4-to-mp3',  label: 'MP4 to MP3',  note: 'Extract audio from a video file'  },
          { href: '/m4a-to-mp3',  label: 'M4A to MP3',  note: "Convert Apple M4A to MP3"          },
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'Convert MP3 to uncompressed WAV'  },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/mp3-vs-wav',              label: 'MP3 vs WAV'              },
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
          { href: '/guides/mp3-bitrate-guide',       label: 'MP3 Bitrate Guide'       },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
