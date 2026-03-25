import ToolCard from './ToolCard';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export default function ToolsGrid() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Popular Conversion Tools
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
            Select a tool to open a dedicated converter page, or use the converter above to convert
            any supported file directly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/formats"
            className="text-sm text-brand hover:text-brand-dark font-medium underline underline-offset-2 hover:no-underline transition-colors"
          >
            View the full conversion matrix →
          </Link>
        </div>
      </div>
    </section>
  );
}
