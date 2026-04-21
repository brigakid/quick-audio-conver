import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** When true, render JSON-LD only (no visible trail). Useful inside dark hero sections. */
  schemaOnly?: boolean;
  className?: string;
}

/**
 * Breadcrumbs — visible trail + BreadcrumbList JSON-LD.
 * `items` should include the current page as the final item.
 */
export default function Breadcrumbs({ items, schemaOnly, className }: BreadcrumbsProps) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      {!schemaOnly && (
        <nav
          aria-label="Breadcrumb"
          className={className ?? 'text-xs text-gray-500'}
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-gray-300">/</span>}
                  {isLast ? (
                    <span className="text-gray-700 font-medium" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.path}
                      className="hover:text-brand transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
