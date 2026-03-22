import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const legal = [
    { href: '/about',              label: 'About' },
    { href: '/privacy',            label: 'Privacy Policy' },
    { href: '/terms',              label: 'Terms of Service' },
    { href: '/supported-formats',  label: 'Supported Formats' },
    { href: '/contact',            label: 'Contact' },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 mt-12 sm:mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <span className="font-bold text-white text-base">QuickAudioConvert</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Fast, private, and simple audio conversion. Your files are never stored permanently.
            </p>
          </div>

          {/* Conversion Tools — sourced from lib/tools.ts */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Conversion Tools
            </h3>
            {/* Two-column grid keeps the list compact as tools expand */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {TOOLS.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Legal & Info
            </h3>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} QuickAudioConvert. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 text-center sm:text-right">
            Uploaded files are automatically deleted. We do not store your data.
          </p>
        </div>
      </div>
    </footer>
  );
}
