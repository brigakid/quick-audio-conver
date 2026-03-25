import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is WAV? Format Guide',
  description:
    'WAV is an uncompressed audio format used widely in audio editing and professional production. Learn when to use it and when a smaller format makes more sense.',
};

export default function WavFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is WAV?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          WAV is an uncompressed audio format. Every sample is stored exactly as recorded —
          nothing is discarded. That makes it the standard for audio editing, but also the
          reason WAV files are so much larger than MP3 or FLAC.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',            'Uncompressed PCM'],
            ['File extension',  '.wav'],
            ['Developed by',    'Microsoft & IBM'],
            ['Typical file size', '~10 MB per minute (CD quality)'],
            ['Bit depth',       '16-bit or 24-bit'],
            ['Sample rate',     'Typically 44,100 or 48,000 Hz'],
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
            WAV files store raw audio samples in PCM (Pulse Code Modulation) format — the
            same way a CD stores audio. There is no compression algorithm removing anything.
            The file is a direct representation of the audio waveform, sample by sample.
          </p>
          <p className="leading-relaxed mt-3">
            This is why WAV files are large: a 3-minute song at CD quality is roughly 30 MB
            as WAV and 3–5 MB as a 192 kbps MP3. The audio quality is identical to the
            original recording, which is why professional tools work natively in WAV.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common uses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Audio editing in DAWs (Audacity, Adobe Audition, Logic Pro, Pro Tools)</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Video production — video editors require or prefer WAV for audio tracks</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Professional recording and broadcast</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Game sound design and audio assets</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Archiving recordings where lossless quality is required</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Lossless — no quality loss at any stage of editing or processing</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Universally supported by professional audio software</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>No generational quality loss — you can edit and re-save repeatedly without degradation</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Simple format — low processing overhead for audio tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Very large files — 5–10x larger than equivalent MP3</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Not practical for sharing, email, or streaming</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>No compression benefit — FLAC achieves the same quality at half the size</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility</h2>
          <p className="leading-relaxed">
            WAV is supported on all major operating systems (Windows, macOS, Linux) and most
            mobile devices. All professional audio software and DAWs support it natively.
            It plays in web browsers and most media players. The only practical limitation
            is file size — web platforms and email services often have upload limits that
            make sharing large WAV files impractical.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use WAV</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Working in an audio editor, DAW, or video editor that requires uncompressed input</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Recording or archiving audio at full quality</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Any workflow where you need to edit and re-save audio without quality loss</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to avoid WAV</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Sharing or distributing audio — convert to MP3 to reduce file size</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>Uploading to platforms with file size limits</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">—</span>If storage space is a concern — FLAC gives you the same quality at roughly half the size</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">WAV vs FLAC</h2>
          <p className="leading-relaxed">
            Both are lossless. The practical difference is file size: FLAC files are typically
            40–60% smaller than equivalent WAV files, with identical audio quality. If you are
            archiving audio for personal use, FLAC is the more efficient choice. If you need
            software compatibility (some tools don't support FLAC), WAV is safer.
          </p>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Is WAV better quality than FLAC?',
            a: 'No. Both are lossless. WAV and FLAC at the same source quality sound identical — the difference is that FLAC compresses the file without any quality loss, making it smaller. If quality is your concern, choose whichever your software supports.',
          },
          {
            q: 'Will converting MP3 to WAV improve quality?',
            a: 'No. Converting from a lossy format to WAV makes a larger file but does not restore any quality. The audio in the WAV will sound exactly the same as the MP3 source.',
          },
          {
            q: 'Why does my audio editor require WAV?',
            a: 'Many audio editors and DAWs work natively with uncompressed PCM audio because it is simpler to process in real time. They may import MP3 and convert it internally, or they may require WAV input explicitly. Either way, WAV is the reliable choice for editing workflows.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert to or from WAV"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Compress WAV for sharing' },
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'Convert MP3 for editing software' },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/mp3-vs-wav',              label: 'MP3 vs WAV'              },
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio' },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
