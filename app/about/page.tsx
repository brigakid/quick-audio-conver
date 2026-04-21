import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About QuickAudioConvert — Who Built It and How It Works',
  description:
    'QuickAudioConvert is a free, server-side audio converter built on FFmpeg. Learn who built it, how conversion works, and how uploaded files are handled.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About QuickAudioConvert',
    description:
      'A free, server-side audio converter built on FFmpeg. No account, no install, files deleted after 5 minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About QuickAudioConvert',
    description:
      'A free, server-side audio converter built on FFmpeg. No account, no install, files deleted after 5 minutes.',
  },
};

const quickLinks = [
  {
    href: '/converters',
    label: 'All Converters',
    desc: 'Browse every supported conversion.',
  },
  {
    href: '/formats',
    label: 'Audio Formats',
    desc: 'Understand the formats before you convert.',
  },
  {
    href: '/guides',
    label: 'Guides',
    desc: 'Format comparisons, quality tips, and how-to guides.',
  },
  {
    href: '/wiki',
    label: 'WikiSound',
    desc: 'Plain-English explanations of audio terminology.',
  },
  {
    href: '/contact',
    label: 'Contact',
    desc: 'Bug reports, format requests, and general questions.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
        schemaOnly
      />

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          About QuickAudioConvert
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed max-w-2xl">
          A free tool for converting audio files between common formats. No account required.
          No software to install. Files deleted automatically after 5 minutes.
        </p>
      </div>

      <div className="space-y-10">

        {/* Who built this */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Who built this</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            QuickAudioConvert was created by James in 2026 and is independently maintained.
            It grew out of a recurring frustration: most audio converters online are download
            funnels, subscription walls, or ad-heavy pages that happen to convert files on
            the side. The goal here was simpler — build a tool that does the conversion well,
            explains what happens to your file, and gets out of the way.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            The site also publishes written guidance on audio formats and conversion decisions.
            Every article is written in-house and updated when formats change or something
            turns out to be unclear. Nothing is generated, outsourced, or syndicated.
          </p>
        </section>

        {/* How conversion works */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How conversion works</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Every conversion runs server-side using{' '}
            <a
              href="https://ffmpeg.org/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand hover:underline"
            >
              FFmpeg
            </a>
            {' '}— the same open-source engine used by VLC, Handbrake, and most professional
            media tools. Your browser uploads the file to our server, FFmpeg performs the
            conversion with the codec parameters matched to the target format, and the
            result is returned for download. Nothing is processed inside your browser and
            nothing is installed on your device.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            Conversion parameters are chosen per format rather than exposed as options. MP3
            output uses LAME at 192 kbps VBR by default — the bitrate most listeners cannot
            distinguish from the source. FLAC uses level 5 compression — the ratio vs speed
            sweet spot. WAV output preserves the source sample rate and bit depth. These
            defaults are documented on each individual converter page.
          </p>
        </section>

        {/* What it does */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What it supports</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Upload a file — MP4, MOV, WAV, FLAC, ALAC, M4A, MP3, AAC, OGG, AIFF, AIFC, AMR,
            AC3, OPUS, WMA, and more — choose an output format, and download the result.
            Output formats are MP3, WAV, M4A, FLAC, AAC, OGG, and OPUS. The converter only
            shows outputs that make sense for your input — for example, FLAC output is only
            offered when the source is lossless (WAV, AIFF, or ALAC). Files up to 200 MB are
            supported.
          </p>
        </section>

        {/* Who it is for */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Who it is for</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Anyone who needs to convert an audio file without signing up for a service or
            installing software. Common use cases:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Extracting audio from a video file (MP4 or MOV to MP3, WAV, or M4A)
            </li>
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Compressing a large WAV file for sharing or uploading
            </li>
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Converting a FLAC or M4A file so it plays on a device that does not support it
            </li>
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Getting an MP3 into WAV format for use in audio editing software
            </li>
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Converting a voice recording, podcast file, or downloaded video clip
            </li>
          </ul>
        </section>

        {/* How files are handled */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How files are handled</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Files are uploaded to our server only to perform the conversion. Both the original
            and the converted output are automatically deleted within 5 minutes — whether you
            download them or not. We do not read, analyse, share, or retain your files beyond
            what is needed to process your request.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            Files are stored using randomised identifiers that are not publicly guessable. No
            account is created, no email is collected, and no file metadata is logged
            permanently. For full details, see the{' '}
            <Link href="/privacy" className="text-brand hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Limitations</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            These are real constraints, not hedging. Worth knowing before you upload:
          </p>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Maximum file size is 200 MB per upload.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              FLAC output is only available when converting from a lossless source (WAV, AIFF,
              or ALAC). Converting a lossy file like MP3 or AAC to FLAC produces a large file
              with unchanged lossy quality — so that option is not offered.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Converting from an already-compressed format (e.g. MP3 to WAV) does not restore
              quality lost during the original compression. The file will be larger, not better.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Files must be downloaded within 5 minutes of conversion. After that, they are
              permanently deleted.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Rate limiting applies: up to 10 requests per minute per IP address.
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Need a format that is not listed?{' '}
            <Link href="/contact" className="text-brand hover:underline">
              Send a request
            </Link>
            . Output formats get added when there is enough demand to warrant it.
          </p>
        </section>

        {/* Contact & editorial note */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact and corrections</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Email{' '}
            <a href="mailto:contact@quickaudioconvert.com" className="text-brand hover:underline">
              contact@quickaudioconvert.com
            </a>{' '}
            for bug reports, format requests, corrections to any article, or general questions.
            The site is actively maintained — the{' '}
            <Link href="/formats" className="text-brand hover:underline">format pages</Link>,{' '}
            <Link href="/guides" className="text-brand hover:underline">guides</Link>, and{' '}
            <Link href="/wiki" className="text-brand hover:underline">WikiSound entries</Link>{' '}
            are updated when formats change or something turns out to be unclear. If a
            conversion is not working as described, the{' '}
            <Link href="/contact" className="text-brand hover:underline">Contact page</Link>{' '}
            is the fastest way to flag it.
          </p>
        </section>

      </div>

      {/* Quick-link cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group p-5 rounded-2xl border border-[#D9D9D9] bg-white shadow-sm hover:border-brand/40 hover:shadow-md transition-all"
          >
            <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-dark transition-colors">
              {card.label}
            </p>
            <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}
