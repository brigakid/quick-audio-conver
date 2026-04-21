import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { articleSchema, faqPageSchema } from '@/lib/seo';

const FAQ_ITEMS = [
  {
    question: 'Is FLAC better than WAV?',
    answer:
      'The audio quality is identical — both are lossless. FLAC is more practical for storage because it is 40–60% smaller. WAV has broader software compatibility, particularly with older tools. For archiving, FLAC is the better choice if your software supports it.',
  },
  {
    question: 'Can I play FLAC on my iPhone?',
    answer:
      'Not without a third-party app. iOS does not support FLAC natively. If you need lossless audio on an iPhone, convert to M4A (which can use ALAC lossless encoding). For general compatibility, MP3 at 320 kbps is the most practical option.',
  },
  {
    question: 'Does converting FLAC to MP3 reduce quality?',
    answer:
      'Yes. MP3 is lossy, so converting from FLAC to MP3 permanently discards some audio data. At 320 kbps, the result sounds excellent for most listeners. At 192 kbps, it is still good for everyday use. The original FLAC quality cannot be recovered once you convert.',
  },
  {
    question: 'Is FLAC royalty-free?',
    answer:
      'Yes. FLAC is a fully open and royalty-free format maintained by the Xiph.Org Foundation. There are no licensing restrictions on its use, encoding, or distribution — which is one reason it has broad support across open-source software.',
  },
];

export const metadata: Metadata = {
  title: 'What Is FLAC? Lossless Audio Format Guide',
  description:
    'FLAC is a free, lossless audio format that reduces WAV file sizes by 40–60% with no quality loss. Learn when to use FLAC, its compatibility, and how it compares to WAV, ALAC, and MP3.',
  alternates: {
    canonical: '/formats/flac',
  },
  openGraph: {
    title: 'What Is FLAC? Format Guide',
    description:
      'FLAC is a lossless compressed audio format. Learn what makes it different from MP3 and WAV, its compatibility limitations, and when to use or convert it.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is FLAC? Format Guide',
    description:
      'FLAC is a lossless compressed audio format. Learn what makes it different from MP3 and WAV, its compatibility limitations, and when to use or convert it.',
  },
};

export default function FlacFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <JsonLd
        data={[
          articleSchema({
            headline: 'What Is FLAC? Lossless Audio Format Guide',
            description:
              'FLAC is a free, lossless audio format that reduces WAV file sizes by 40–60% with no quality loss.',
            path: '/formats/flac',
            datePublished: '2026-01-15',
            dateModified: '2026-04-14',
          }),
          faqPageSchema(FAQ_ITEMS),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Formats', path: '/formats' },
          { name: 'FLAC', path: '/formats/flac' },
        ]}
        className="text-xs text-gray-500 mb-6"
      />

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is FLAC?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          FLAC is a lossless audio format — it compresses audio without removing any data.
          The file you decode is bit-for-bit identical to the original. It is the standard
          choice for music archiving and high-fidelity listening.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',            'Lossless compressed'],
            ['File extension',  '.flac'],
            ['Developed by',    'Xiph.Org Foundation (open source)'],
            ['Typical file size', '~20–40 MB per 3-min track'],
            ['Compression ratio', '~50–60% smaller than WAV'],
            ['Max bit depth',   '32-bit'],
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
            Think of FLAC like a ZIP file for audio. It compresses the raw audio data into
            a smaller package — typically 40–60% of the original WAV size — but when you
            play or decode it, the output is exactly identical to the source. No data is
            permanently removed.
          </p>
          <p className="leading-relaxed mt-3">
            This is different from MP3, which achieves compression by permanently deleting
            audio frequencies. With FLAC, the compression is fully reversible. Converting
            FLAC to WAV gives you the exact original audio. Converting FLAC to MP3 does cause
            quality loss, because you are then applying lossy compression to a lossless source.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common uses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Archiving music collections in full quality</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Hi-fi listening on dedicated music players or home audio systems</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Storing original recordings before distribution</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Audio enthusiast communities and lossless music platforms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Lossless — identical audio quality to the original</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Significantly smaller than WAV — 40–60% size reduction with no quality trade-off</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Open source and royalty-free</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Supports high bit depths (up to 32-bit) and high sample rates</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Supports metadata tags (artist, album, track info)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Not supported on iPhone or iTunes without a third-party app</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Car stereos, many Bluetooth devices, and older hardware often cannot play FLAC</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Still much larger than MP3 — not practical for sharing or streaming</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Not supported by all streaming platforms and upload tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility</h2>
          <p className="leading-relaxed">
            FLAC plays natively on Android, Linux, VLC, and most PC-based music players
            (foobar2000, Winamp, MusicBee). It is supported in Windows Media Player on
            Windows 10 and later, and in macOS through third-party apps.
          </p>
          <p className="leading-relaxed mt-3">
            It does not play natively on iPhone or in iTunes. Apple uses ALAC (Apple Lossless)
            instead, which is stored in M4A containers. If you need lossless audio on an Apple
            device, ALAC is the alternative — or convert FLAC to M4A.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use FLAC</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Archiving music in full quality on a computer or NAS drive</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Playing music on a device you know supports FLAC</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Storing masters before you create distribution copies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to avoid FLAC</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Sharing audio — convert to MP3 first, FLAC files are too large and not universally playable</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Playing on an iPhone or Apple device (use M4A with ALAC encoding instead)</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Uploading to streaming platforms — they transcode to their own format anyway</li>
          </ul>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {FAQ_ITEMS.map(({ question, answer }) => (
          <div key={question} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{question}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert FLAC"
        items={[
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Convert for sharing and compatibility' },
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
