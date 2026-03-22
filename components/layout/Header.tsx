'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * "Convert Now" smart handler:
   * - On the homepage: reset the converter to a fresh state + scroll to it.
   * - On any other page: navigate to the homepage converter section.
   */
  function handleConvertNow() {
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent('converter:reset'));
      // Small delay lets React flush the reset state before we scroll
      setTimeout(() => {
        document.getElementById('convert')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      router.push('/#convert');
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — navigates home; full link area is clickable with hover + focus feedback */}
          <Link
            href="/"
            className="flex items-center gap-2 min-w-0 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm sm:text-lg tracking-tight truncate group-hover:text-brand transition-colors">
              QuickAudioConvert
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/supported-formats"
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Formats
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              About
            </Link>
            <button
              type="button"
              onClick={handleConvertNow}
              className="ml-2 px-4 py-2 text-sm font-semibold bg-brand text-white rounded-lg hover:bg-brand-dark active:bg-brand-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Convert Now
            </button>
          </nav>

          {/* Mobile: Formats link + CTA */}
          <div className="sm:hidden flex items-center gap-1.5 flex-shrink-0">
            <Link
              href="/supported-formats"
              className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              Formats
            </Link>
            <button
              type="button"
              onClick={handleConvertNow}
              className="px-3 py-1.5 text-xs font-semibold bg-brand text-white rounded-lg hover:bg-brand-dark active:bg-brand-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Convert
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
