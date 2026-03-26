import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'How to Choose the Right MP3 Bitrate',
  description:
    '128, 192, or 320 kbps — what actually changes between bitrates and which one you need for your use case.',
};

export default function HowToChooseMp3BitratePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/guides" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Guides
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Technical guide</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          How to Choose the Right MP3 Bitrate
        </h1>
      </div>

      <QuickAnswer>
        192 kbps is the right choice for most uses. Below 128 kbps, quality degrades noticeably
        for music. Above 320 kbps, MP3 does not exist. 320 kbps is worth it when converting from
        a lossless source and quality is a priority.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What bitrate actually controls</h2>
          <p className="leading-relaxed">
            Bitrate means bits per second — the rate at which data is stored in the file. More
            bits per second means more audio information is preserved, which produces a larger
            file that sounds closer to the original.
          </p>
          <p className="leading-relaxed mt-3">
            The relationship is not linear. Going from 128 to 192 kbps is a 50% increase in
            data, and the perceptible quality jump is significant — you are moving from audible
            compression artefacts to a file most people cannot distinguish from the source.
            Going from 256 to 320 kbps is a 25% increase in data, and the quality difference
            is essentially imperceptible on typical equipment. The upper end of the bitrate scale
            gives you diminishing returns quickly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">File size by bitrate and duration</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Duration</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">128 kbps</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">192 kbps</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">320 kbps</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1 minute',   '~1 MB',   '~1.4 MB',  '~2.4 MB' ],
                  ['3 minutes',  '~2.9 MB', '~4.3 MB',  '~7.2 MB' ],
                  ['10 minutes', '~9.6 MB', '~14.4 MB', '~24 MB'  ],
                  ['60 minutes', '~58 MB',  '~86 MB',   '~144 MB' ],
                ].map(([dur, b128, b192, b320]) => (
                  <tr key={dur} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-600">{dur}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{b128}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{b192}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{b320}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">Approximate values for stereo audio. Mono files are roughly half the size.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The 192 kbps threshold</h2>
          <p className="leading-relaxed">
            At 192 kbps, a well-encoded MP3 is effectively transparent to most listeners in
            blind tests — meaning they cannot reliably tell it apart from the uncompressed
            original. Audio engineers sometimes call this the transparency threshold.
          </p>
          <p className="leading-relaxed mt-3">
            Below 192 kbps, compression starts to affect audible content: cymbals and high
            frequencies smear, subtle ambience disappears, and dynamic passages can develop a
            pumping quality. At 128 kbps these artefacts are noticeable to careful listeners
            on decent headphones. Below 128 kbps they become obvious.
          </p>
          <p className="leading-relaxed mt-3">
            Above 192 kbps, the improvements are real but small. Most people cannot perceive
            them on typical headphones or speakers, and the files are meaningfully larger. The
            192 kbps range is where you get nearly all the quality at roughly 60% of the size
            of 320 kbps.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When each bitrate makes sense</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">64–96 kbps.</span>
              <span>Voice-only content where file size is the priority: telephony systems, audiobooks for bandwidth-limited delivery, spoken-word recordings for internal use. Not suitable for music.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">128 kbps.</span>
              <span>Acceptable for speech-only podcasts and audiobooks where quality matters less than download size. Audible compression on music, particularly on complex passages and high frequencies.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">192 kbps.</span>
              <span>The recommended default for music and produced audio. Transparent for most listeners on typical equipment. The right choice when you need a sensible balance of quality and file size.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">256 kbps.</span>
              <span>High-quality distribution. A reasonable choice when the source is lossless and you want a premium compressed file — for example, a music release on a download store.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">320 kbps.</span>
              <span>Maximum MP3 quality. The difference over 256 kbps is perceptible only on high-end equipment with quality source material. Worthwhile if you started from a lossless file and are archiving or distributing to audiophiles.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">VBR vs CBR</h2>
          <p className="leading-relaxed">
            CBR (constant bitrate) encodes every second at the same data rate. A 192 kbps CBR
            file uses 192 kbps whether the passage is a loud drum fill or a stretch of near-silence.
            Simple, predictable, universally compatible.
          </p>
          <p className="leading-relaxed mt-3">
            VBR (variable bitrate) allocates more bits to complex passages and fewer to quiet or
            simple ones. The result is better average quality at a smaller file size than CBR at
            the same nominal bitrate. A VBR file set to a quality level equivalent to 192 kbps
            CBR will typically sound better than the CBR file at the same or smaller size.
          </p>
          <p className="leading-relaxed mt-3">
            VBR is the better choice technically, but CBR is what most people use because it is
            simpler and compatibility with older hardware or software is easier to guarantee. For
            most purposes, CBR at 192 kbps is fine.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Converting from another lossy format</h2>
          <p className="leading-relaxed">
            If you are converting M4A to MP3, or OGG to MP3, picking a high bitrate does not
            recover quality that was already discarded. A 320 kbps MP3 made from a 128 kbps M4A
            still contains only 128 kbps worth of audio data — it is just a larger file carrying
            the same lossy signal.
          </p>
          <p className="leading-relaxed mt-3">
            When converting between lossy formats, match or go slightly below the source
            bitrate. Converting a 192 kbps M4A to a 256 kbps MP3 adds nothing and produces
            a file roughly 30% larger than necessary. Converting it to a 192 kbps MP3 is the
            sensible choice.
          </p>
          <p className="leading-relaxed mt-3">
            This only applies to lossy-to-lossy conversion. If your source is WAV or FLAC,
            converting to a high bitrate MP3 is appropriate and worthwhile.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Practical recommendations</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>General music from a lossless source: <strong>192 kbps</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Speech-only podcast or audiobook: <strong>128 kbps mono</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>High-quality music distribution or archiving: <strong>320 kbps</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Converting from a lossy source (M4A, OGG): <strong>match or go below the source bitrate</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>File size is critical, voice content only: <strong>64–96 kbps</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Unsure and want a safe default: <strong>192 kbps</strong></li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Related tools"
        items={[
          { href: '/wav-to-mp3', label: 'WAV to MP3', note: 'Convert lossless audio to MP3' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Convert lossless FLAC to MP3' },
          { href: '/m4a-to-mp3', label: 'M4A to MP3', note: 'Convert AAC audio to MP3' },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality', label: 'How Bitrate Affects File Size and Sound' },
          { href: '/learn/when-mp3-is-good-enough', label: 'When MP3 Is Good Enough' },
          { href: '/guides/mp3-vs-wav', label: 'MP3 vs WAV' },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
