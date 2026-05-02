import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'What Is ALAC? Apple Lossless Audio Format Guide',
  description:
    "ALAC is Apple's lossless audio codec — same quality as WAV, 40–60% smaller, natively supported on Apple devices. Learn when to use ALAC and how to convert it.",
  alternates: {
    canonical: '/formats/alac',
  },
  openGraph: {
    title: 'What Is ALAC? Apple Lossless Audio Format Guide',
    description:
      "ALAC is Apple's lossless audio codec — same quality as WAV, 40–60% smaller, natively supported on Apple devices. Learn when to use ALAC and how to convert it.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is ALAC? Apple Lossless Audio Format Guide',
    description:
      "ALAC is Apple's lossless audio codec — same quality as WAV, 40–60% smaller, natively supported on Apple devices. Learn when to use ALAC and how to convert it.",
  },
};

export default function AlacFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <JsonLd
        data={articleSchema({
          headline: "What Is ALAC? Apple Lossless Audio Format Guide",
          description: "ALAC is Apple's lossless audio codec — same quality as WAV, 40–60% smaller, natively supported on Apple devices. Learn when to use ALAC and how to convert it.",
          path: "/formats/alac",
          datePublished: "2026-02-01",
          dateModified: "2026-04-28",
        })}
      />
      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is ALAC?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          ALAC (Apple Lossless Audio Codec) is Apple's lossless compression format.
          Like FLAC, it stores audio without removing any data — the decoded output
          is bit-for-bit identical to the original. ALAC is natively supported on
          iPhones, iPads, Macs, iTunes, and Apple Music.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',             'Lossless compressed'],
            ['File extensions',  '.alac, .m4a (when in MPEG-4 container)'],
            ['Developed by',     'Apple (open sourced in 2011)'],
            ['Typical file size','~20–40 MB per 3-min track'],
            ['Compression',      '~40–60% smaller than WAV/AIFF'],
            ['Max bit depth',    '32-bit'],
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
            ALAC compresses audio data using a lossless algorithm — similar in principle to
            FLAC, though developed independently by Apple. When you decode an ALAC file,
            the output is bit-for-bit identical to the original PCM recording. Nothing is
            permanently removed during compression.
          </p>
          <p className="leading-relaxed mt-3">
            ALAC files are commonly stored with a .m4a extension (inside an MPEG-4 container)
            or with a standalone .alac extension. If you open a .m4a file and the codec shows
            as "Apple Lossless" or "ALAC", the audio is lossless. If it shows "AAC", the audio
            is lossy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">ALAC vs FLAC</h2>
          <p className="leading-relaxed">
            Both are lossless compression formats with essentially identical audio quality.
            The practical difference is ecosystem compatibility:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">—</span>
              <span><strong>ALAC</strong> plays natively on iPhone, iPad, Mac, iTunes, and Apple Music. Less support on Android and non-Apple platforms without third-party apps.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">—</span>
              <span><strong>FLAC</strong> plays natively on Android, Linux, VLC, and most PC-based music players. Not natively supported on iOS or iTunes.</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            Neither is objectively better — the right choice depends on your devices.
            Converting between them involves no quality loss.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common uses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Lossless music libraries on Apple devices via iTunes or Apple Music</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Hi-fi listening on iPhone or iPad with high-quality headphones</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Archiving recordings in lossless quality within the Apple ecosystem</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Apple Music's "Lossless Audio" feature streams in ALAC</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Lossless — perfect reproduction of the original audio</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>40–60% smaller than WAV or AIFF</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Native support on all Apple devices, iTunes, and Apple Music</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Open sourced by Apple — supported in VLC, ffmpeg, and other tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Not natively supported on Android without third-party apps</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Less compatible with non-Apple hardware (car stereos, hi-fi players)</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Still much larger than MP3 — not practical for sharing or streaming</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Files with .m4a extension may be confused with AAC-encoded M4A files</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert ALAC</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Convert to MP3 for sharing, streaming, or playback on any device</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Convert to FLAC for lossless quality with broader non-Apple platform support</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Convert to WAV for use in DAWs and editing software that do not handle ALAC</li>
          </ul>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Is ALAC the same quality as FLAC?',
            a: 'Yes. Both are lossless — the decoded audio from either format is identical to the original PCM source. ALAC is Apple\'s implementation; FLAC is open source. The audio quality is exactly the same.',
          },
          {
            q: 'How do I know if my .m4a file is ALAC or AAC?',
            a: 'Check the file info in iTunes/Music — it will say "Apple Lossless" or "AAC" under the codec or format field. You can also inspect with VLC (Media > Codec Information) or a tool like MediaInfo. If it\'s AAC, the audio is lossy; if it\'s Apple Lossless, it\'s lossless.',
          },
          {
            q: 'Can I play ALAC on Android?',
            a: 'Not natively. Android does not support ALAC without a third-party app. If you want lossless audio on Android, convert to FLAC, which Android plays natively.',
          },
          {
            q: 'Does converting ALAC to MP3 reduce quality?',
            a: 'Yes — MP3 is lossy. Converting from ALAC to MP3 permanently discards some audio data. At 320 kbps, the result is excellent for most listening. Since ALAC is lossless, you are starting from the best possible source.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert ALAC"
        items={[
          { href: '/alac-to-mp3',  label: 'ALAC to MP3',  note: 'Convert for universal playback' },
          { href: '/alac-to-flac', label: 'ALAC to FLAC', note: 'Lossless, broader cross-platform support' },
          { href: '/alac-to-wav',  label: 'ALAC to WAV',  note: 'Convert for DAWs and editing software' },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
          { href: '/guides/flac-vs-wav',             label: 'FLAC vs WAV'             },
          { href: '/formats/flac',                   label: 'What Is FLAC?'           },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
