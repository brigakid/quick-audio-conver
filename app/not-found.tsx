import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
        Page not found
      </h1>
      <p className="text-base text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
        The page you are looking for does not exist or has moved. Try heading back to the converter.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-3 text-sm font-semibold bg-brand text-white rounded-xl hover:bg-brand-dark transition-colors shadow-sm"
        >
          Go to converter
        </Link>
        <Link
          href="/formats"
          className="px-6 py-3 text-sm font-semibold bg-white text-gray-700 border border-[#D9D9D9] rounded-xl hover:border-brand hover:text-brand transition-colors"
        >
          View supported formats
        </Link>
      </div>
    </div>
  );
}
