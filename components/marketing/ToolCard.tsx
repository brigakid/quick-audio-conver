import Link from 'next/link';

interface ToolCardProps {
  href: string;
  inputFormat: string;
  outputFormat: string;
  description: string;
}

export default function ToolCard({ href, inputFormat, outputFormat, description }: ToolCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} Converter`}
      className="group flex flex-col gap-3 p-4 sm:p-5 bg-white rounded-2xl border border-[#D9D9D9] shadow-sm hover:shadow-md hover:border-brand/40 transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        {/* Format arrow badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
          <span className="text-xs font-bold text-gray-700 uppercase">{inputFormat}</span>
          <svg
            className="w-3 h-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="text-xs font-bold text-brand uppercase">{outputFormat}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-dark transition-colors">
          {inputFormat.toUpperCase()} to {outputFormat.toUpperCase()} Converter
        </h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center gap-1 text-brand text-xs font-semibold mt-auto">
        Convert now
        <svg
          className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </Link>
  );
}
