import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is AMR? Audio Format Guide',
  description:
    'AMR is a voice-optimised audio codec used in mobile phone recordings. Learn what AMR is, where it comes from, and how to convert AMR files to MP3 or WAV.',
};

export default function AmrFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is AMR?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          AMR (Adaptive Multi-Rate) is a compressed audio codec designed specifically
          for voice. It was the default recording format on millions of Nokia phones,
          early Android voice recorders, and VOIP call logging systems. AMR files are
          tiny but narrowly targeted at speech — not music.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',              'Lossy, voice-optimised'],
            ['File extension',    '.amr'],
            ['Developed by',      '3GPP (standardised for GSM networks)'],
            ['Typical file size', '~300 KB per minute'],
            ['Bitrate range',     '4.75–12.2 kbps (AMR-NB) / 6.6–23.85 kbps (AMR-WB)'],
            ['Audio bandwidth',   'Narrow-band (300–3400 Hz speech range)'],
          ].map(([label, value]) => (
            <div key={label} className="col-span-1">
              <dt className="text-xs text-gray-400">{label}</dt>
              <dd className="text-sm font-medium text-gray-800">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How it works</h2>
          <p className="leading-relaxed">
            AMR was designed for mobile phone voice transmission over GSM and 3G networks.
            It uses a variable bitrate — the encoder selects the bitrate dynamically based
            on the complexity of the audio — to achieve very small file sizes while keeping
            speech intelligible.
          </p>
          <p className="leading-relaxed mt-3">
            There are two variants: AMR-NB (Narrow Band, the original) and AMR-WB (Wide
            Band, sometimes called AMR+), which offers higher quality speech by encoding
            a wider frequency range. Both store audio at much lower quality than even
            the most compressed MP3 settings — they are optimised for voice, not fidelity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where AMR files come from</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Nokia phone voice recorders (2000s–2010s) — the most common source</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Early Samsung and Sony Ericsson handsets</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Android voice recorder apps on older or budget phones</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>VOIP call recording applications</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>3GPP video containers (.3gp, .3g2) may embed AMR audio</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Extremely small file size — very efficient for voice recordings</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Speech remains intelligible even at the lowest bitrate modes</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Standardised format — widely supported in telecom equipment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Very poor audio quality for anything other than speech</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Limited playback support on modern devices and software</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Narrow audio bandwidth — music, background sound, and high frequencies are degraded</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Converting AMR to a higher bitrate does not improve quality — quality is set at recording time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert AMR</h2>
          <p className="leading-relaxed">
            Convert AMR to MP3 or WAV when you need to play the file on modern
            devices, edit it in audio software, or run it through transcription tools.
            Most modern audio players and applications do not support AMR natively.
          </p>
          <p className="leading-relaxed mt-3">
            Converting to MP3 is suitable for playback and sharing. Converting to WAV
            is better for editing — Audacity, transcription services, and speech recognition
            tools generally accept WAV without issue.
          </p>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Can I improve the quality of an AMR file by converting it?',
            a: 'No. AMR quality is determined at recording time. Converting to MP3 or WAV does not recover audio information that was discarded during the original AMR encoding. The output will be compatible with more devices but will not sound better than the source.',
          },
          {
            q: 'What bitrate should I use when converting AMR to MP3?',
            a: 'For voice-only AMR recordings, 128 kbps is more than sufficient. The original AMR encoding operates at 4–13 kbps, so MP3 at 128 kbps is not the limiting factor — the AMR quality ceiling is. Higher bitrates will not audibly improve the result.',
          },
          {
            q: 'Why can\'t I play my AMR file on Windows or macOS?',
            a: 'AMR is not natively supported by Windows Media Player, macOS QuickTime, or most mainstream audio players. You need a player with AMR support (like VLC) or you need to convert the file to a standard format like MP3 or WAV first.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert AMR"
        items={[
          { href: '/amr-to-mp3', label: 'AMR to MP3', note: 'Convert for universal playback' },
          { href: '/amr-to-wav', label: 'AMR to WAV', note: 'Convert for editing and transcription' },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
