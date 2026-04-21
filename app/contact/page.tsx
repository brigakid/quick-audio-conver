import type { Metadata } from 'next';
import Link from 'next/link';
import ContactPanel from '@/components/contact/ContactPanel';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the QuickAudioConvert team for support, bug reports, format requests, or any question about audio conversion.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact QuickAudioConvert',
    description:
      'Reach the QuickAudioConvert team for support, bug reports, format requests, or any question about audio conversion.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact QuickAudioConvert',
    description:
      'Reach the QuickAudioConvert team for support, bug reports, or format requests.',
  },
};

const topics = [
  {
    label: 'Support',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    label: 'Bug reports',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44a23.916 23.916 0 001.152 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
      </svg>
    ),
  },
  {
    label: 'Format requests',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.320.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    label: 'General questions',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Get in touch
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-md mx-auto leading-relaxed">
          Whether you have a support question, found a bug, want to request a new audio format,
          or just have feedback — email us directly.
        </p>

        {/* Topic chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {topics.map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-medium text-gray-600"
            >
              {t.icon}
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Email panel */}
      <ContactPanel />

      {/* Info cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">What to include</h3>
          <ul className="space-y-1.5 text-xs text-gray-500 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-gray-300 mt-0.5 flex-shrink-0">—</span>
              The input file format and what you were converting to
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-gray-300 mt-0.5 flex-shrink-0">—</span>
              The exact error message, if any
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-gray-300 mt-0.5 flex-shrink-0">—</span>
              What you expected to happen vs. what actually happened
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-gray-300 mt-0.5 flex-shrink-0">—</span>
              Your browser and operating system (for UI bugs)
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Before reaching out</h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Check our{' '}
            <Link href="/formats" className="text-brand hover:underline font-medium">
              Supported Formats
            </Link>{' '}
            page — your format may already be supported, or a conversion limit may explain
            the issue.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            For data or privacy questions, see our{' '}
            <Link href="/privacy" className="text-brand hover:underline font-medium">
              Privacy Policy
            </Link>
            . Files are never stored permanently.
          </p>
        </div>
      </div>

    </div>
  );
}
