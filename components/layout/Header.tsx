'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_LINKS = [
  { href: '/converters',    label: 'Converters'      },
  { href: '/formats',       label: 'Formats'         },
  { href: '/guides',        label: 'Guides'          },
  { href: '/learn',         label: 'Learn'           },
  { href: '/wiki',          label: 'WikiSound'       },
  { href: '/about',         label: 'About'           },
  { href: '/contact',       label: 'Contact'         },
];

export default function Header() {
  const pathname       = usePathname();
  const router         = useRouter();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function handleConvertNow() {
    setOpen(false);
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
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
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
              <span className="font-bold text-gray-900 text-sm sm:text-lg tracking-tight group-hover:text-brand transition-colors">
                QuickAudioConvert
              </span>
            </Link>

            {/* Desktop nav — unchanged */}
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

            {/* Mobile: hamburger only */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {open ? (
                /* X icon */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile dropdown menu — renders below the sticky header */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 top-16 z-40 bg-black/20"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="md:hidden fixed top-16 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-lg">
            <nav className="max-w-6xl mx-auto px-4 py-3">

              {/* Nav links */}
              <ul className="space-y-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:text-brand hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Convert CTA */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleConvertNow}
                  className="w-full py-3 text-sm font-semibold bg-brand text-white rounded-xl hover:bg-brand-dark active:bg-brand-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  Convert Now
                </button>
              </div>

            </nav>
          </div>
        </>
      )}
    </>
  );
}
