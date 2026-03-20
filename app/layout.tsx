import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://quickaudioconvert.com'),
  title: {
    template: '%s | QuickAudioConvert',
    default: 'QuickAudioConvert — Free Online Audio Converter',
  },
  description:
    'Convert audio and video files to MP3, WAV, or M4A online. Free, private, no account required. Supports MP4, WAV, FLAC, M4A, MP3, AAC, and OGG.',
  openGraph: {
    title: 'QuickAudioConvert — Free Online Audio Converter',
    description:
      'Convert MP4, WAV, FLAC, M4A, MP3, AAC, and OGG to MP3, WAV, or M4A. Free, no account required. Files deleted automatically.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
