import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Audio Conversion \u2014 In-Depth Articles',
  description:
    'Long-form explanations for audio format decisions, bitrate selection, conversion quality, and why some conversions are pointless. Practical and specific.',
};

const ARTICLES = [
  // Choosing a format
  {
    href: '/learn/wav-vs-mp3-for-editing-sharing-and-archiving',
    title: 'WAV vs MP3 for Editing, Sharing, and Archiving',
    description:
      "The right format depends entirely on what you\u2019re doing next. A workflow-first guide to avoiding bad decisions.",
    category: 'Choosing a format',
    readTime: '7 min',
  },
  {
    href: '/learn/aac-m4a-and-mp3-what-actually-matters',
    title: 'AAC, M4A, and MP3: What Actually Matters',
    description:
      "AAC and M4A are the same codec in different containers. MP3 is older but more compatible. Here\u2019s what that means in practice.",
    category: 'Choosing a format',
    readTime: '6 min',
  },
  {
    href: '/learn/best-audio-format-for-editing',
    title: 'Best Audio Format for Editing',
    description:
      'WAV or AIFF for your DAW, MP3 or M4A for everything else. A practical breakdown of what format to use at each stage of a project.',
    category: 'Choosing a format',
    readTime: '6 min',
  },
  {
    href: '/learn/best-audio-format-for-podcasts',
    title: 'Best Audio Format for Podcasts',
    description:
      'MP3 at 128\u2013192 kbps covers nearly every podcast use case. Here\u2019s when to reconsider, and what the hosting platforms actually accept.',
    category: 'Choosing a format',
    readTime: '5 min',
  },
  {
    href: '/learn/best-audio-format-for-voice-recordings',
    title: 'Best Audio Format for Voice Recordings',
    description:
      'Voice is narrowband audio. The format that sounds great for music often wastes space on speech. Here\u2019s what to use instead.',
    category: 'Choosing a format',
    readTime: '5 min',
  },
  {
    href: '/learn/extracting-audio-from-video-best-format-choices',
    title: 'Extracting Audio from Video: Best Format Choices',
    description:
      'When you pull audio from video, you pick a format twice. What you choose depends on whether you\u2019re editing, archiving, or publishing.',
    category: 'Choosing a format',
    readTime: '6 min',
  },
  // Quality and file size
  {
    href: '/learn/when-mp3-is-good-enough',
    title: "When MP3 Is Good Enough \u2014 and When It Isn\u2019t",
    description:
      "MP3 at 192 kbps is transparent for most listeners. The exceptions are narrower than most people think.",
    category: 'Quality and file size',
    readTime: '6 min',
  },
  {
    href: '/learn/how-bitrate-affects-file-size-and-sound-quality',
    title: 'How Bitrate Actually Affects File Size and Sound',
    description:
      "Bitrate is a rate \u2014 bits per second. The math is simple. The quality implications are specific and often misunderstood.",
    category: 'Quality and file size',
    readTime: '7 min',
  },
  {
    href: '/learn/when-converting-to-wav-does-not-improve-quality',
    title: 'When Converting to WAV Does Not Improve Quality',
    description:
      "WAV is a container, not a quality guarantee. Converting an MP3 to WAV makes the file larger \u2014 not better.",
    category: 'Quality and file size',
    readTime: '5 min',
  },
  // Troubleshooting
  {
    href: '/learn/why-audio-files-fail-to-convert',
    title: 'Why Some Audio Files Fail to Convert',
    description:
      "Conversion failures have specific causes. Understanding which one applies tells you whether a fix exists.",
    category: 'Troubleshooting',
    readTime: '7 min',
  },
];

const CATEGORIES = ['Choosing a format', 'Quality and file size', 'Troubleshooting'];

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
