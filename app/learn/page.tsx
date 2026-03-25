import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Audio Conversion \u2014 In-Depth Articles',
  description:
    'Long-form explanations for audio format decisions, bitrate selection, conversion quality, and why some conversions are pointless. Practical and specific.',
};

const ARTICLES = [
  {
    href: '/learn/when-mp3-is-good-enough',
    title: "When MP3 Is Good Enough \u2014 and When It Isn\u2019t",
    description:
      "MP3 at 192 kbps is transparent for most listeners. The exceptions are narrower than most people think.",
    category: 'Quality decisions',
    readTime: '6 min',
  },
  {
    href: '/learn/wav-vs-mp3-editing-sharing-archiving',
    title: 'WAV vs MP3 for Editing, Sharing, and Archiving',
    description:
      "The right format depends entirely on what you\u2019re doing next. A workflow-first guide to avoiding bad decisions.",
    category: 'Format decisions',
    readTime: '7 min',
  },
  {
    href: '/learn/how-bitrate-affects-file-size-and-sound',
    title: 'How Bitrate Actually Affects File Size and Sound',
    description:
      "Bitrate is a rate \u2014 bits per second. The math is simple. The quality implications are specific and often misunderstood.",
    category: 'Technical',
    readTime: '7 min',
  },
  {
    href: '/learn/converting-to-wav-does-not-improve-quality',
    title: 'When Converting to WAV Does Not Improve Quality',
    description:
      "WAV is a container, not a quality guarantee. Converting an MP3 to WAV makes the file larger \u2014 not better.",
    category: 'Quality decisions',
    readTime: '5 min',
  },
  {
    href: '/learn/aac-m4a-mp3-what-matters',
    title: 'AAC, M4A, and MP3: What Actually Matters',
    description:
      "AAC and M4A are the same codec in different containers. MP3 is older but more compatible. Here\u2019s what that means in practice.",
    category: 'Format decisions',
    readTime: '6 min',
  },
  {
    href: '/learn/why-audio-files-fail-to-convert',
    title: 'Why Some Audio Files Fail to Convert',
    description:
      "Conversion failures have specific causes. Understanding which one applies tells you whether a fix exists.",
    category: 'Troubleshooting',
    readTime: '7 min',
  },
];

const CATEGORIES = ['Quality decisions', 'Format decisions', 'Technical', 'Troubleshooting'];

export default function LearnPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Audio Conversion &mdash; In-Depth
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-2xl leading-relaxed">
          Longer explanations for format decisions, quality trade-offs, and conversion mechanics.
          Written to help you make better decisions &mdash; not to rank for keywords.
        </p>
      </div>

      <div className="space-y-12">
        {CATEGORIES.map((cat) => {
          const articles = ARTICLES.filter((a) => a.category === cat);
          if (!articles.length) return null;
          return (
            <div key={cat}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                {cat}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group flex flex-col p-5 rounded-2xl border border-[#D9D9D9] bg-white hover:border-brand hover:shadow-sm transition-all"
                  >
                    <p className="text-xs text-gray-400 mb-2">{article.readTime} read</p>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-brand transition-colors leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {article.description}
                    </p>
                    <span className="mt-4 text-xs font-semibold text-brand">
                      Read article &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
