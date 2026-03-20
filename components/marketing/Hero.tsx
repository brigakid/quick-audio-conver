import ConverterBox from '@/components/converter/ConverterBox';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#2B2B2F] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[size:24px_24px]"
      />
      {/* Accent gradient — bottom-left tint */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-[#3A2F2A]/60 rounded-full blur-3xl pointer-events-none -translate-x-1/4 translate-y-1/4"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline block */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1]">
            Convert audio files
            <span className="block text-brand">in seconds.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Upload MP4, WAV, FLAC, M4A, MP3, AAC, or OGG — choose your output format and
            download instantly. No installation, no account.
          </p>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No signup needed
            </span>
            <span className="hidden sm:block w-px h-3 bg-gray-600 flex-shrink-0" aria-hidden="true" />
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Files auto-deleted after conversion
            </span>
            <span className="hidden sm:block w-px h-3 bg-gray-600 flex-shrink-0" aria-hidden="true" />
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Secure server-side processing
            </span>
          </div>
        </div>

        {/* Converter */}
        <ConverterBox />

        {/* Subtle bottom link */}
        <p className="text-center text-xs text-gray-500 mt-4">
          <Link
            href="/supported-formats"
            className="hover:text-gray-300 transition-colors underline underline-offset-2"
          >
            View all supported formats and output options →
          </Link>
        </p>
      </div>
    </section>
  );
}
