import Link from 'next/link';

const INPUT_FORMATS = ['MP4', 'MOV', 'MP3', 'WAV', 'FLAC', 'ALAC', 'M4A', 'AAC', 'OGG', 'AIFF', 'AIFC', 'AC3', 'AMR', 'WMA', 'Opus', 'OGA', 'WEBA'];
const OUTPUT_FORMATS = ['MP3', 'WAV', 'M4A', 'FLAC', 'AAC', 'OGG', 'OPUS'];

export default function FormatsAndHelp() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">

          {/* Supported formats */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">Supported Formats</h2>
            <p className="text-xs text-gray-500 mb-4">
              Upload any of these — converted output can be MP3, WAV, M4A, FLAC, AAC, OGG, or OPUS.
            </p>
            <div className="mb-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Input (17 formats)</p>
              <div className="flex flex-wrap gap-1.5">
                {INPUT_FORMATS.map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-gray-600"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Output (7 formats)</p>
              <div className="flex flex-wrap gap-1.5">
                {OUTPUT_FORMATS.map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-full bg-brand-tint text-xs font-medium text-brand"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/formats"
              className="mt-4 inline-block text-xs font-medium text-brand hover:text-brand-dark transition-colors"
            >
              Learn about each format →
            </Link>
          </div>

          {/* Troubleshooting callout */}
          <div className="flex flex-col justify-between p-5 rounded-2xl bg-amber-50 border border-amber-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <h2 className="text-sm font-bold text-amber-900">Conversion not working?</h2>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Common issues — unsupported files, size limits, unexpected output quality,
                or download errors — are usually quick to fix. Our troubleshooting guide
                covers the 7 most frequent failure scenarios with exact solutions.
              </p>
            </div>
            <Link
              href="/guides/troubleshooting-audio-conversion"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
            >
              View troubleshooting guide
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
