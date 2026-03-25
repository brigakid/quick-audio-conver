import Link from 'next/link';

interface RelatedItem {
  href: string;
  label: string;
  /** Optional one-line context — why this link is relevant */
  note?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
}

/**
 * Compact related-content block for converter pages, format pages, and guides.
 * Keeps links contextual — not "you might also like" fluff.
 */
export default function RelatedContent({ title = 'Related', items }: RelatedContentProps) {
  if (!items.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={item.note}
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:border-brand hover:text-brand transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
