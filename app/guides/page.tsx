import type { Metadata } from 'next';
import GuideCard from '@/components/content/GuideCard';

export const metadata: Metadata = {
  title: 'Audio Guides',
  description:
    'Practical guides on audio formats, quality, conversion decisions, and troubleshooting. Format comparisons, bitrate explanations, and how-to walkthroughs.',
};

const GUIDES = [
  {
    category: 'Format comparison',
    guides: [
      {
        href: '/guides/mp3-vs-wav',
        title: 'MP3 vs WAV: Which Format Should You Use?',
        description: 'The practical difference between the two most common audio formats — and when each one makes sense.',
      },
      {
        href: '/guides/lossless-vs-lossy-audio',
        title: 'Lossless vs Lossy Audio Explained',
        description: 'What these terms actually mean, which formats fall into each category, and why it matters for conversion.',
      },
    ],
  },
  {
    category: 'How-to',
    guides: [
      {
        href: '/guides/extract-audio-from-video',
        title: 'How to Extract Audio from a Video File',
        description: 'You have an MP4 or MKV. You just want the audio track. Here is the straightforward way to do it.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    guides: [
      {
        href: '/guides/troubleshooting-audio-conversion',
        title: 'Why Did My Audio Conversion Fail?',
        description: 'Common reasons conversions fail — corrupt files, unsupported formats, size limits — and how to fix them.',
      },
    ],
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Audio Guides
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-2xl leading-relaxed">
          Practical explanations for common audio format questions. Format comparisons,
          quality trade-offs, and troubleshooting for when things go wrong.
        </p>
      </div>

      <div className="space-y-12">
        {GUIDES.map((group) => (
          <div key={group.category}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              {group.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.guides.map((guide) => (
                <GuideCard key={guide.href} {...guide} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon note */}
      <div className="mt-14 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-sm font-bold text-gray-900 mb-1.5">More guides coming</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Topics in progress include MP3 bitrate selection, best formats for podcasts and
          music production, and format-specific conversion tips. Check back or{' '}
          <a href="/contact" className="text-brand hover:underline">send a question</a> if
          there is something specific you want covered.
        </p>
      </div>

    </div>
  );
}
