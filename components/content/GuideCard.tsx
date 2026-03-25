import Link from 'next/link';

interface GuideCardProps {
  title: string;
  description: string;
  href: string;
  /** Short category label, e.g. "Format comparison", "Troubleshooting" */
  category?: string;
}

/**
 * Used on the /guides hub page and the homepage educational block.
 */
export default function GuideCard({ title, description, href, category }: GuideCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col p-5 rounded-2xl border border-[#D9D9D9] bg-white shadow-sm hover:border-brand/40 hover:shadow-md transition-all"
    >
      {category && (
        <span className="text-xs font-medium text-brand uppercase tracking-widest mb-2">
          {category}
        </span>
      )}
      <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-dark transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed flex-1">{description}</p>
      <span className="mt-3 text-xs font-semibold text-brand group-hover:underline">
        Read guide →
      </span>
    </Link>
  );
}
