import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is M4A? Format Guide',
  description:
    "M4A is Apple's audio format, built on the AAC codec. Learn how it compares to MP3, when it works well, and when you should convert it for broader compatibility.",
};

export default function M4aFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is M4A?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          M4A is an audio file format used primarily within the Apple ecosystem. It stores
          audio encoded with AAC (Advanced Audio Codec) — a lossy format that is more
          efficient than MP3 at the same bitrate, but with more limited compatibility outside
          Apple devices and software.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',           'Lossy (AAC codec)'],
            ['File extension', '.m4a'],
            ['Container',      'MPEG-4 (.mp4)'],
            ['Developed by',   'Apple / MPEG group'],
            ['Common sources', 'iPhone, iTunes, Apple Music, GarageBand'],
            ['Typical size',   'Similar to MP3 at same bitrate'],
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
            M4A is a container format built on the MPEG-4 standard — the same underlying
            format as MP4 video, but without the video track. Inside the container, audio is
            almost always encoded with AAC. AAC achieves better compression than MP3 at
            equivalent bitrates, meaning a 128 kbps M4A typically sounds better than a
            128 kbps MP3.
          </p>
          <p className="leading-relaxed mt-3">
            Like MP3, M4A uses lossy compression — some audio data is permanently discarded.
            Unlike MP3, M4A has historically been strongly tied to Apple's ecosystem, which
            creates compatibility issues on non-Apple platforms and older hardware.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common sources</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Voice memos recorded on an iPhone</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Music purchased from iTunes or Apple Music</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Audio exported from GarageBand</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Audio recorded in macOS QuickTime or similar Apple tools</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Podcast apps on iOS that export recordings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Better audio quality than MP3 at the same file size</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Native support on all Apple devices, macOS, and iOS</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Can also store lossless ALAC audio (Apple Lossless) in the same .m4a container</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Smaller file size than WAV or FLAC</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Not universally supported — older Android devices, car stereos, and some software may not play M4A</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Less compatible than MP3 for sending files to unknown recipients</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>DRM-protected M4A files from iTunes cannot be converted</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Lossy compression — quality cannot be recovered after encoding</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility</h2>
          <p className="leading-relaxed">
            M4A plays natively on iPhone, iPad, Mac, Apple TV, and iTunes/Music on Windows.
            Android has supported AAC audio since early versions, so most modern Android
            devices can play M4A. However, older Android versions, car stereos, portable
            media players, and some desktop software may not support it.
          </p>
          <p className="leading-relaxed mt-3">
            Windows Media Player does not support M4A without installing additional codecs.
            MP3 remains the safe choice when you are not sure what the recipient's device
            supports.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">M4A vs MP3</h2>
          <p className="leading-relaxed">
            M4A (AAC) produces better quality than MP3 at the same bitrate. If you are
            within the Apple ecosystem and you know the recipient or device will support it,
            M4A is a good choice. If you are sharing with someone who might play it on
            any device, MP3 is the safer format.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use M4A</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Working within Apple devices and software</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>When you want slightly better quality than MP3 at the same file size</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>GarageBand exports you plan to keep and use within macOS</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert M4A to MP3</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>The recipient's device or software may not support M4A</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Uploading to a platform that requires MP3 format</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Playing in a car stereo or portable player that doesn't support M4A</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Sharing with someone on a non-Apple device</li>
          </ul>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Is M4A higher quality than MP3?',
            a: 'At the same bitrate, AAC (used in M4A) generally produces better quality than MP3. However, both are lossy formats and the difference is small. Unless you are listening on high-quality equipment, you are unlikely to notice.',
          },
          {
            q: 'Why does my car stereo not play M4A?',
            a: 'Many car stereos were built before AAC/M4A became common. They support MP3 but not M4A. Converting your M4A files to MP3 is the straightforward fix.',
          },
          {
            q: "Can I convert a protected iTunes M4A file?",
            a: 'No. Files purchased from iTunes with DRM (FairPlay) protection cannot be converted by third-party tools including this one. DRM protection is only removed if Apple has specifically made the track DRM-free (most tracks purchased today are DRM-free, but older purchases may not be).',
          },
          {
            q: 'Is M4A the same as AAC?',
            a: 'M4A is a file container; AAC is the audio codec inside it. The .m4a extension indicates an MPEG-4 container that holds only audio (no video). The terms are often used interchangeably but technically AAC is the compression format and M4A is the file type.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert M4A"
        items={[
          { href: '/m4a-to-mp3', label: 'M4A to MP3', note: 'Convert for broader device support' },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
          { href: '/guides/mp3-vs-wav',              label: 'MP3 vs WAV'              },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
