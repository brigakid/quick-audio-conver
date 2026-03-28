import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'MP3 vs WAV: Which Format Should You Use?',
  description:
    'The practical differences between MP3 and WAV — quality, file size, compatibility, and which one fits your situation. No fluff, just the decision.',
  openGraph: {
    title: 'MP3 vs WAV: Which Format Should You Use?',
    description:
      'The practical differences between MP3 and WAV — quality, file size, compatibility, and which one fits your situation. No fluff, just the decision.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP3 vs WAV: Which Format Should You Use?',
    description:
      'The practical differences between MP3 and WAV — quality, file size, compatibility, and which one fits your situation. No fluff, just the decision.',
  },
};

export default function Mp3VsWavPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/guides" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Guides
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Format comparison</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          MP3 vs WAV: Which Format Should You Use?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        <strong>For most purposes, use MP3.</strong> It is smaller, plays everywhere, and
        the quality loss is inaudible to most people at 192 kbps or above.{' '}
        Use WAV if you are editing audio in software, working in a professional workflow,
        or need to make multiple edits without losing quality each time.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The core difference</h2>
          <p className="leading-relaxed">
            WAV stores audio as raw, uncompressed data. Every sample is preserved exactly —
            nothing is removed. A 3-minute song at CD quality takes up around 30 MB.
          </p>
          <p className="leading-relaxed mt-3">
            MP3 uses lossy compression. It analyses the audio and permanently removes
            frequencies that most people don't notice — things masked by other sounds, or
            outside typical hearing range. The same 3-minute song becomes 3–5 MB at 192 kbps.
            The trade-off is that some audio data is gone forever.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">File size comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Duration</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">WAV (CD quality)</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">MP3 @ 320 kbps</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">MP3 @ 192 kbps</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1 minute',   '~10 MB',  '~2.4 MB', '~1.4 MB'],
                  ['3 minutes',  '~30 MB',  '~7 MB',   '~4 MB'  ],
                  ['10 minutes', '~100 MB', '~24 MB',  '~14 MB' ],
                  ['1 hour',     '~600 MB', '~144 MB', '~86 MB' ],
                ].map(([dur, wav, mp3hi, mp3lo]) => (
                  <tr key={dur} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-600">{dur}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{wav}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{mp3hi}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{mp3lo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">Approximate values. Actual size varies by content and source material.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Quality: can you hear the difference?</h2>
          <p className="leading-relaxed">
            On typical headphones and speakers, most people cannot distinguish between a
            well-encoded 192 kbps MP3 and the equivalent WAV. The human ear does not perceive
            the removed frequencies in normal listening conditions.
          </p>
          <p className="leading-relaxed mt-3">
            The difference becomes more audible at lower bitrates (128 kbps and below), on
            high-end audio equipment, or in very quiet or complex passages where compression
            artefacts are more noticeable.
          </p>
          <p className="leading-relaxed mt-3">
            If you are distributing music or a podcast for general audiences, 192 kbps MP3
            is more than adequate. If you are an audiophile listening through a high-end
            system, you may prefer the lossless original.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When WAV is the right choice</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Editing.</span>
              <span>Work in WAV when using audio editing software (Audacity, Adobe Audition, Logic Pro, etc.). Each time you save a lossy format like MP3, you re-encode and lose a bit more quality. WAV lets you edit and save repeatedly without degradation.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Production.</span>
              <span>Video editors and DAWs typically prefer or require WAV input. Keep your working files as WAV and convert to MP3 for distribution.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Archiving.</span>
              <span>If you want to keep a perfect copy of a recording, WAV is reliable. (FLAC achieves the same lossless quality at half the size — a better choice for long-term storage.)</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When MP3 is the right choice</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Sharing.</span>
              <span>Email attachments, messaging apps, and upload tools all have size limits. MP3 files are 5–10x smaller than WAV.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Streaming and podcasts.</span>
              <span>Podcast platforms and music streaming services accept MP3. Most platforms transcode your upload anyway — sending a WAV wastes bandwidth without benefiting listeners.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Storage.</span>
              <span>If you have a large music library and limited storage, MP3 at 192 kbps is a practical choice that sounds good without eating disk space.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Compatibility.</span>
              <span>MP3 plays on every device and platform without exception. WAV has good support too, but some online tools and older hardware have file size limitations that make large WAV files impractical.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Converting between the two</h2>
          <p className="leading-relaxed">
            You can convert WAV to MP3 to get a smaller, shareable file. The quality loss
            depends on the bitrate you choose — 192 kbps is the recommended starting point.
          </p>
          <p className="leading-relaxed mt-3">
            You can convert MP3 to WAV, but this does not restore quality. The WAV will be
            larger but will sound identical to the MP3 source. This is only useful when a
            tool requires WAV input and you do not have the original lossless file.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Practical recommendation</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Editing or working in software? <strong>Keep WAV.</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Sharing, uploading, or distributing? <strong>Convert to MP3 at 192 kbps.</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Archiving lossless audio? <strong>Use FLAC — same quality as WAV but 40–60% smaller.</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Playing on a device you're not sure about? <strong>MP3 works everywhere.</strong></li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Convert between MP3 and WAV"
        items={[
          { href: '/wav-to-mp3', label: 'WAV to MP3', note: 'Compress WAV for sharing' },
          { href: '/mp3-to-wav', label: 'MP3 to WAV', note: 'Convert for editing software' },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/formats/mp3',                    label: 'MP3 format guide'         },
          { href: '/formats/wav',                    label: 'WAV format guide'         },
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio'  },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
