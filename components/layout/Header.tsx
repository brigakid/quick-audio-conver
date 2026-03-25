'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_LINKS = [
  { href: '/converters', label: 'Converters' },
  { href: '/formats',    label: 'Formats'    },
  { href: '/guides',     label: 'Guides'     },
  { href: '/learn',      label: 'Learn'      },
  { href: '/about',      label: 'About'      },
  { href: '/contact',    label: 'Contact'    },
];

export default function Header() {
  const pathname = usePathname();
  const router   = useRouter();

  /**
   * "Convert Now" smart handler:
   * - On the homepage: reset the converter to a fresh state + scroll to it.
   * - On any other page: navigate to the homepage converter section.
   */
  function handleConvertNow() {
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent('converter:reset'));
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

          {/* Logo */}
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
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleConvertNow}
              className="ml-2 px-4 py-2 text-sm font-semibold bg-brand text-white rounded-lg hover:bg-brand-dark active:bg-brand-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Convert Now
            </button>
          </nav>

          {/* Mobile: compact nav + CTA */}
          <div className="md:hidden flex items-center gap-1 flex-shrink-0">
            <Link
              href="/formats"
              className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              Formats
            </Link>
            <Link
              href="/guides"
              className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/learn"
              className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              Learn
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
