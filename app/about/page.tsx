import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'QuickAudioConvert is a free, server-side audio conversion tool. Learn how it works, what it supports, and how we handle your files.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          About QuickAudioConvert
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          A straightforward tool for converting audio and video files between common formats.
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What it does</h2>
          <p className="leading-relaxed">
            QuickAudioConvert accepts audio and video files in MP4, WAV, M4A, FLAC, MP3, AAC, and
            OGG formats and converts them to MP3, WAV, or M4A. Conversion happens server-side using
            FFmpeg — one of the most widely used open-source multimedia processing engines. There is
            nothing to install; the entire process runs in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why we built it</h2>
          <p className="leading-relaxed">
            Audio format converters online often come with ads covering the interface, forced
            signups, size limits that require upgrades, or client-side conversion that struggles
            with large files. QuickAudioConvert was built to be a no-fuss alternative: upload your
            file, pick your output, download the result. No account, no subscription, no tracking.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How your files are handled</h2>
          <p className="leading-relaxed">
            Files are uploaded to our server solely to perform the conversion. Both the original
            upload and the converted output are automatically deleted within 30 minutes. We do not
            read, index, share, or retain your files beyond what is necessary to process your
            request. For full details, see our{' '}
            <Link href="/privacy" className="text-brand hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Supported conversions</h2>
          <p className="leading-relaxed">
            The converter currently supports seven input formats and three output formats. The
            available outputs for your file are shown automatically after upload. See the{' '}
            <Link href="/supported-formats" className="text-brand hover:underline">
              Supported Formats
            </Link>{' '}
            page for the full conversion matrix.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
          <p className="leading-relaxed">
            Questions, bug reports, or format requests are welcome.{' '}
            <Link href="/contact" className="text-brand hover:underline">
              Email us directly
            </Link>{' '}
            and we will get back to you within 1–2 business days.
          </p>
        </section>
      </div>

      {/* Quick-link cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/supported-formats', label: 'Supported Formats', desc: 'See the full conversion matrix.' },
          { href: '/privacy', label: 'Privacy Policy', desc: 'How we handle your files.' },
          { href: '/contact', label: 'Contact', desc: 'Get in touch with questions.' },
        ].map((card) => (
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
