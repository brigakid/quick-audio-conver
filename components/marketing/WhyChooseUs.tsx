const features = [
  {
    title: 'FFmpeg Server-Side Conversion',
    description:
      'Files are processed using FFmpeg — one of the most battle-tested audio conversion engines available. No browser plugins, no client-side processing that stalls on large files.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: '17 Input Formats, 7 Outputs',
    description:
      'Accepts MP4, MOV, WAV, FLAC, ALAC, M4A, MP3, AAC, OGG, AIFF, AMR, AC3, WMA, Opus, and more. Converts to MP3, WAV, M4A, FLAC, AAC, OGG, or OPUS. Available outputs are shown automatically based on what you upload.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    title: 'Files Deleted After 30 Minutes',
    description:
      'Uploaded files and converted outputs are removed from our servers automatically. We do not store your audio permanently, and we never share it with third parties.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'No Account Required',
    description:
      'Start converting immediately — no email address, no password, no subscription. Visit the site, upload your file, and download the result. That\'s it.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Built to be reliable
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            A fast, private, no-fuss tool you can trust with your files.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-brand flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
