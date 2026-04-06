import Link from 'next/link';
import GuideCard from '@/components/content/GuideCard';

const FEATURED_GUIDES = [
  {
    href: '/guides/mp3-vs-wav',
    title: 'MP3 vs WAV: Which Format Should You Use?',
    description: 'The practical difference between the two most common audio formats, and when each one makes sense.',
    category: 'Format comparison',
  },
  {
    href: '/guides/lossless-vs-lossy-audio',
    title: 'Lossless vs Lossy Audio Explained',
    description: 'What these terms actually mean, why it matters for conversion, and which formats fall into each category.',
    category: 'Audio quality',
  },
  {
    href: '/guides/extract-audio-from-video',
    title: 'How to Extract Audio from a Video File',
    description: 'You have an MP4, MKV, or MOV. You just want the audio track. Here is the straightforward way to do it.',
    category: 'How-to',
  },
];

export default function GuidesBlock() {
  return (
    <section className="py-12 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Audio format guides
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Understand the formats before you convert.
            </p>
          </div>
          <Link
            href="/guides"
            className="hidden sm:inline-flex text-sm font-semibold text-brand hover:underline flex-shrink-0 ml-4"
          >
            All guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURED_GUIDES.map((guide) => (
            <GuideCard key={guide.href} {...guide} />
          ))}
        </div>

        <div className="mt-5 sm:hidden">
          <Link href="/guides" className="text-sm font-semibold text-brand hover:underline">
            Browse all guides →
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Want to understand audio formats in depth?{' '}
            <Link href="/wiki" className="font-semibold text-brand hover:underline">
              Browse WikiSound
            </Link>
            {' '}— codec explanations, bitrate guides, and format comparisons, all in plain language.
          </p>
        </div>

      </div>
    </section>
  );
}
