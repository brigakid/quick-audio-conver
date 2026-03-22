const steps = [
  {
    number: '01',
    title: 'Upload Your File',
    description:
      'Drag and drop your file onto the converter, or click to browse. Accepts MP4, WAV, M4A, FLAC, MP3, AAC, and OGG — up to 200 MB.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose Output Format',
    description:
      'After upload, all available output formats for your file are shown automatically. Select MP3, WAV, or M4A. For MP3, choose your preferred bitrate — 128, 192, or 320 kbps.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Download Your File',
    description:
      'Conversion typically completes in seconds. Click download and your file saves directly to your device. Both the original and converted files are automatically deleted from our servers afterwards.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Three steps from upload to download — no account, no waiting, no fuss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col gap-3 p-4 sm:p-6 rounded-2xl border border-gray-100 bg-gray-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand/20">
                  {step.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-black text-gray-100 select-none leading-none">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
