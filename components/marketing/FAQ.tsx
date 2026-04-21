'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DEFAULT_FAQ_ITEMS, type FAQItem } from '@/lib/faq-items';

// Re-export for backward compatibility with existing callers.
export { DEFAULT_FAQ_ITEMS };
export type { FAQItem };

interface FAQProps {
  items?: FAQItem[];
}

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-gray-900 group-hover:text-brand-dark transition-colors leading-snug">
          {item.question}
        </span>
        <svg
          className={cn(
            'w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-600 leading-relaxed">
          {item.answer}
        </p>
      )}
    </div>
  );
}

export default function FAQ({ items = DEFAULT_FAQ_ITEMS }: FAQProps) {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Common questions about QuickAudioConvert.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6">
          {items.map((item) => (
            <FAQRow key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
