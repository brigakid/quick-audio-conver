import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const GA_ID = 'G-XHEXJ0V2Y1';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quickaudioconvert.com';

const title       = 'QuickAudioConvert | Convert, Trim & Fade Audio Online';
const description = 'Convert audio files online, trim clips, apply fade in and fade out, and download instantly. Supports MP3, WAV, FLAC, M4A, AAC, OGG and more. Free, private, no account required.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    template: '%s | QuickAudioConvert',
    default: title,
  },

  description,

  openGraph: {
    title,
    description,
    type: 'website',
    url: siteUrl,
    siteName: 'QuickAudioConvert',
    // og:image is auto-wired from app/opengraph-image.tsx by Next.js App Router
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description,
    // twitter:image is auto-wired from app/twitter-image.tsx by Next.js App Router
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },

  // favicon + apple-touch-icon are auto-wired from app/icon.tsx + app/apple-icon.tsx
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5139615638375778"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
