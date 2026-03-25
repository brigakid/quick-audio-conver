import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is AAC? Format Guide',
  description:
    'AAC (Advanced Audio Coding) is a lossy audio format designed to replace MP3. Learn how it works, where it\'s supported, and when to convert to or from AAC.',
};

export default function AacFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is AAC?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          AAC (Advanced Audio Coding) is a lossy audio format developed as the standardised
          successor to MP3. It produces better sound quality at the same file size — or smaller
          files at equal quality. It is the default audio format on Apple devices and the standard
          for most streaming platforms.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',              'Lossy compressed'],
            ['File extensions',   '.aac, .m4a, .mp4'],
            ['Developed by',      'ISO / IEC (1997)'],
            ['Common bitrates',   '96 / 128 / 192 / 256 kbps'],
            ['Typical file size', '~1 MB per minute at 128 kbps'],
            ['Output support',    'Convert to MP3, WAV, or M4A'],
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">How AAC works</h2>
          <p className="leading-relaxed">
            Like MP3, AAC uses psychoacoustic modelling to remove audio information that most
            listeners don't consciously perceive. AAC improves on MP3 with more advanced
            compression algorithms, better handling of high frequencies, and support for up to
            48 audio channels (versus MP3's 2).
          </p>
          <p className="leading-relaxed mt-3">
            In practical terms, an AAC file at 128 kbps sounds noticeably cleaner than an MP3
            at the same bitrate. At 256 kbps, AAC is indistinguishable from the original source
            for most listeners on most equipment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AAC vs M4A — what's the difference?</h2>
          <p className="leading-relaxed">
            M4A is a container format (an MPEG-4 audio file), and the audio inside it is almost
            always encoded in AAC. In practice, .aac and .m4a files are technically different
            things, but they contain the same kind of audio data. Most players handle both
            interchangeably.
          </p>
          <p className="leading-relaxed mt-3">
            Apple uses .m4a for iTunes purchases and voice memos. Streaming services like Spotify,
            Apple Music, and YouTube use AAC encoding inside various containers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where AAC is supported</h2>
          <p className="leading-relaxed">
            AAC has excellent compatibility across modern platforms:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-3">
            <li><strong>Apple devices</strong> — native support everywhere: iPhone, iPad, Mac, Apple TV, AirPods</li>
            <li><strong>Streaming</strong> — Spotify, Apple Music, YouTube, Tidal, and Amazon Music all use AAC</li>
            <li><strong>Browsers</strong> — supported in Chrome, Safari, Firefox, and Edge</li>
            <li><strong>Android</strong> — full native support since Android 1.0</li>
            <li><strong>Older hardware</strong> — some older car stereos and standalone audio players
              support only MP3. If hardware compatibility is the concern, converting to MP3 is safer.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths and weaknesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <h3 className="text-sm font-semibold text-green-800 mb-2">Strengths</h3>
              <ul className="space-y-1.5 text-xs text-green-700">
                <li>Better quality than MP3 at the same bitrate</li>
                <li>Default format on Apple ecosystem</li>
                <li>Used by all major streaming platforms</li>
                <li>Wide hardware and software support</li>
                <li>Efficient at low bitrates (good for podcasts, voice)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">Weaknesses</h3>
              <ul className="space-y-1.5 text-xs text-amber-700">
                <li>Not universally supported by old hardware</li>
                <li>Lossy — original data cannot be recovered</li>
                <li>Some DRM-protected .m4a files cannot be converted</li>
                <li>Slightly higher encoding complexity than MP3</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert from AAC</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>To MP3</strong> — if you need to play the file on older hardware (car stereos,
              legacy players) that doesn't support AAC. Expect a minor quality reduction since
              you're converting one lossy format to another.
            </li>
            <li>
              <strong>To WAV</strong> — if a professional audio application requires uncompressed
              input. The WAV will not be higher quality than the AAC source, but it will be
              universally compatible with editing software.
            </li>
            <li>
              <strong>To M4A</strong> — rarely needed; .aac and .m4a are closely related. Some
              tools handle one extension better than the other.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Is AAC better than MP3?</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                For equivalent file sizes, yes — AAC delivers better audio quality than MP3 due
                to more efficient compression. At high bitrates (320 kbps), the practical
                difference is minimal for most listeners.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Can I convert a DRM-protected AAC file?</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                No. Files purchased with FairPlay DRM (older iTunes purchases) are encrypted
                and cannot be converted by any standard converter, including this one. Only
                DRM-free AAC files can be processed.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Will converting AAC to WAV improve quality?</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                No. Converting a lossy format to a lossless one creates a larger file but
                does not restore the audio data that was discarded during AAC encoding. The
                quality ceiling is set by the original AAC file.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12">
        <RelatedContent
          items={[
            { label: 'Convert AAC to MP3', href: '/aac-to-mp3', note: 'For older hardware compatibility' },
            { label: 'What is M4A?', href: '/formats/m4a', note: 'AAC inside an MPEG-4 container' },
            { label: 'What is MP3?', href: '/formats/mp3' },
            { label: 'AAC vs MP3 — see the guide', href: '/guides/lossless-vs-lossy-audio' },
          ]}
        />
      </div>

      <div className="mt-6">
        <LastUpdated date="2025-01-01" />
      </div>

    </div>
  );
}
