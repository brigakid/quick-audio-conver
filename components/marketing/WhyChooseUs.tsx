import Link from 'next/link';

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
    href: null,
  },
  {
    title: '17 Input Formats, 7 Outputs',
    description:
      'Accepts MP4, MOV, WAV, FLAC, ALAC, M4A, MP3, AAC, OGG, AIFF, AMR, AC3, WMA, Opus, and more. Converts to MP3, WAV, M4A, FLAC, AAC, OGG, or OPUS. Available outputs shown automatically based on your file.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    href: null,
  },
  {
    title: 'BPM Detection & Tempo Change',
    description:
      'Automatically detect the BPM of any audio file after upload. Then change the tempo to any target BPM — pitch preserved using FFmpeg\'s atempo filter. Useful for DJs, workout playlists, and transcription.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    href: '/bpm-changer',
  },
  {
    title: 'Key Detection & Pitch Shifting',
    description:
      'Automatically detect the musical key of any audio file. Shift the key up or down by up to 12 semitones while preserving tempo, using the rubberband algorithm. Useful for singers, DJs, and music practice.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
      </svg>
    ),
    href: '/key-changer',
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
    href: null,
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
    href: null,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            What&apos;s included
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Conversion is the core — BPM detection, key detection, pitch shifting, and more are built right in.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f) => {
            const card = (
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
            );
            return f.href ? (
              <Link key={f.title} href={f.href} className="group hover:no-underline">
                {card}
              </Link>
            ) : (
              <div key={f.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
