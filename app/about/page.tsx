import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'QuickAudioConvert is a free online audio converter. Upload a file, choose your output format, and download the result — no account, no software, no permanent storage.',
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
    href: '/contact',
    label: 'Contact',
    desc: 'Bug reports, format requests, and general questions.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          About QuickAudioConvert
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed max-w-2xl">
          A free, straightforward tool for converting audio files between common formats.
          No account required. No software to install. Files deleted automatically.
        </p>
      </div>

      <div className="space-y-10">

        {/* What it is */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What it does</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            QuickAudioConvert converts audio and video files between formats. Upload a file —
            MP4, WAV, FLAC, M4A, MP3, AAC, OGG, OPUS, WMA, or AIFF — choose an output
            format, and download the result. Conversion runs server-side using FFmpeg, so
            nothing processes in your browser and nothing installs on your device.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            Output formats are MP3, WAV, and M4A. The converter shows which outputs are
            available based on the file you upload. Files up to 200 MB are supported.
          </p>
        </section>

        {/* Who it is for */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Who it is for</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Anyone who needs to convert an audio file quickly without signing up for a service
            or installing software. Common use cases:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Extracting audio from a video file (MP4 to MP3)
            </li>
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Compressing a large WAV file for sharing or uploading
            </li>
            <li className="flex gap-2">
              <span className="text-brand mt-0.5 flex-shrink-0">—</span>
              Converting a FLAC or M4A file so it plays on a device that doesn't support it
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

        {/* Privacy / file handling */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How files are handled</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Files are uploaded to our server only to perform the conversion. Both the original
            and the converted output are automatically deleted within 30 minutes — whether you
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
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Maximum file size is 200 MB per upload.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Output formats are currently MP3, WAV, and M4A. FLAC and OGG output are not
              supported.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Converting from an already-compressed format (e.g. MP3 to WAV) does not restore
              quality lost during the original compression.
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">—</span>
              Files must be downloaded within 30 minutes of conversion. After that, they are
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
              Send us a request
            </Link>
            .
          </p>
        </section>

        {/* Closing trust line */}
        <section className="pt-2">
          <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-8">
            QuickAudioConvert is a maintained tool. The{' '}
            <Link href="/formats" className="text-brand hover:underline">formats</Link>,{' '}
            <Link href="/guides" className="text-brand hover:underline">guides</Link>, and
            conversion pages are updated when formats are added or behaviour changes.
            If something is not working as described, the{' '}
            <Link href="/contact" className="text-brand hover:underline">contact form</Link>{' '}
            is the fastest way to reach us.
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
