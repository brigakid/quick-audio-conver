import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const GA_ID = 'G-XHEXJ0V2Y1';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quickaudioconvert.com';

const title       = 'QuickAudioConvert — Free Online Audio Converter';
const description = 'Convert audio files to MP3, WAV, FLAC, M4A, and more — free, no account. Fast server-side processing, files deleted automatically after 30 minutes.';

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
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5139615638375778" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white">
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
