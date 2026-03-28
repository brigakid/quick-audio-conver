import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is AIFF? Format Guide (AIF and AIFC)',
  description:
    "AIFF is Apple's uncompressed audio format — lossless PCM audio in an Apple-native container. Learn about AIFF, AIF, and AIFC, their differences, and when to convert them.",
  openGraph: {
    title: 'What Is AIFF? Format Guide (AIF and AIFC)',
    description:
      "AIFF is Apple's uncompressed audio format — lossless PCM audio in an Apple-native container. Learn about AIFF, AIF, and AIFC, their differences, and when to convert them.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is AIFF? Format Guide (AIF and AIFC)',
    description:
      "AIFF is Apple's uncompressed audio format — lossless PCM audio in an Apple-native container. Learn about AIFF, AIF, and AIFC, their differences, and when to convert them.",
  },
};

export default function AiffFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is AIFF?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          AIFF is Apple's uncompressed audio format — the macOS equivalent of WAV.
          It stores raw PCM audio with no quality loss and is the native format for
          Logic Pro, GarageBand, and Pro Tools on macOS. Files use the .aiff or .aif extension.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',             'Uncompressed lossless'],
            ['File extensions',  '.aiff, .aif, .aifc'],
            ['Developed by',     'Apple (1988)'],
            ['Typical file size','~30–50 MB per 3-min track'],
            ['Audio encoding',   'PCM (AIFF/AIF) or compressed (AIFC)'],
            ['Max bit depth',    '32-bit'],
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
            AIFF (Audio Interchange File Format) stores raw PCM audio — the same
            uncompressed format as WAV. There is no compression: every audio sample
            is stored exactly as captured. An AIFF file decoded back to PCM is
            bit-for-bit identical to the original recording.
          </p>
          <p className="leading-relaxed mt-3">
            AIFF and WAV contain technically identical audio. The difference is the
            container format: AIFF is Apple's design (big-endian byte order) and WAV
            is Microsoft's (little-endian). In practice they are interchangeable —
            both convert to MP3, FLAC, and other formats with equal results.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AIFF vs AIF vs AIFC</h2>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">.aiff</span>
              <span>The standard extension. Stores raw, uncompressed PCM audio. Fully lossless.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">.aif</span>
              <span>The older 3-character version of the same extension, used on older Macs and some systems. Technically identical to .aiff — same format, same quality.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">.aifc</span>
              <span>AIFC (AIFF Compressed) uses the same container but can store compressed audio codecs — IMA ADPCM, MACE, and others. AIFC files may be lossy depending on the codec used. Less common today, but appeared in older Apple Pro Audio gear and early Logic Pro sessions.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common uses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Logic Pro session audio — Logic exports and bounces in AIFF by default on macOS</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>GarageBand audio exports</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Pro Tools audio files on macOS</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>CD rips and audio masters stored on macOS systems</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Sample libraries for macOS-native instruments and samplers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Lossless — identical audio quality to the original recording</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Native format for Logic Pro, GarageBand, and macOS audio tools</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Supports high bit depths and sample rates</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>AIFF and WAV are technically equivalent — both work equally well as masters</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Very large files — typically 30–50 MB per 3-minute track</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Weaker metadata support compared to FLAC</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Less common than WAV outside the Apple ecosystem</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Not practical for sharing or streaming — far too large</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility</h2>
          <p className="leading-relaxed">
            AIFF plays natively on macOS and is well-supported in iTunes, QuickTime, and
            Logic Pro. VLC plays AIFF on any platform. Windows Media Player and most DAWs
            on Windows also handle AIFF without issues.
          </p>
          <p className="leading-relaxed mt-3">
            AIFC files are less universally supported and may require macOS-specific tools
            or FFmpeg-based software to decode certain compressed variants.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert AIFF</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Convert to MP3 for sharing, streaming, or playback on non-Apple devices</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Convert to FLAC for lossless archiving with a smaller file size and better metadata</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Convert to WAV when moving a project from macOS to Windows-based workflows</li>
          </ul>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Is AIFF the same quality as WAV?',
            a: 'Yes. Both store raw, uncompressed PCM audio. The decoded audio from an AIFF and a WAV of the same recording is bit-for-bit identical. The only difference is the container format — AIFF is Apple\'s design, WAV is Microsoft\'s. Either works equally well as an audio master.',
          },
          {
            q: 'Can I convert AIFF to FLAC?',
            a: 'Yes. Since AIFF is lossless, converting to FLAC is a legitimate lossless-to-lossless conversion — the audio quality is preserved while the file becomes 40–60% smaller than WAV or AIFF.',
          },
          {
            q: 'What is the difference between AIFF and AIFC?',
            a: 'AIFF stores uncompressed PCM audio and is always lossless. AIFC supports compressed codecs (IMA ADPCM, MACE) inside the same container. AIFC files may be lossy depending on how they were created. Today AIFC is rare; standard AIFF/AIF is far more common.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert AIFF"
        items={[
          { href: '/aiff-to-mp3',  label: 'AIFF to MP3',  note: 'Convert for sharing and universal playback' },
          { href: '/aiff-to-flac', label: 'AIFF to FLAC', note: 'Lossless compression — smaller file, same quality' },
          { href: '/aifc-to-mp3',  label: 'AIFC to MP3',  note: 'Convert compressed AIFC files to MP3' },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
          { href: '/guides/flac-vs-wav',             label: 'FLAC vs WAV'             },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
