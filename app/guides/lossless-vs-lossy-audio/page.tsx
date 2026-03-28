import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'Lossless vs Lossy Audio Explained',
  description:
    'What lossless and lossy audio mean, which formats fall into each category, and why the distinction matters when you are converting or archiving audio.',
  openGraph: {
    title: 'Lossless vs Lossy Audio Explained',
    description:
      'What lossless and lossy audio mean, which formats fall into each category, and why the distinction matters when you are converting or archiving audio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lossless vs Lossy Audio Explained',
    description:
      'What lossless and lossy audio mean, which formats fall into each category, and why the distinction matters when you are converting or archiving audio.',
  },
};

export default function LosslessVsLossyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/guides" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Guides
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio quality</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Lossless vs Lossy Audio Explained
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        <strong>Lossy formats (MP3, AAC, OGG)</strong> permanently discard audio data to
        create smaller files. Quality cannot be recovered after encoding.{' '}
        <strong>Lossless formats (FLAC, WAV, ALAC)</strong> keep all original audio data —
        the decoded output is identical to the source. Lossless files are much larger.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What "lossy" means</h2>
          <p className="leading-relaxed">
            Lossy audio compression works by removing audio data that psychoacoustic models
            suggest most listeners won't notice. This includes sounds masked by louder
            simultaneous sounds, very high and low frequencies at the edge of human hearing,
            and quiet details buried beneath more prominent audio.
          </p>
          <p className="leading-relaxed mt-3">
            The result: dramatically smaller files. A 40 MB WAV file becomes 3–5 MB as an
            MP3. The trade-off is that the removed data is gone permanently — there is no
            way to recover it later. The more aggressive the compression (lower bitrate),
            the more is removed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What "lossless" means</h2>
          <p className="leading-relaxed">
            Lossless compression reduces file size without removing any audio data. Think of
            it like a ZIP file for audio — the data is stored more efficiently, but when
            decoded, the output is bit-for-bit identical to the original.
          </p>
          <p className="leading-relaxed mt-3">
            Lossless compression typically achieves a 40–60% reduction in file size compared
            to uncompressed audio (WAV). It is not as small as MP3, but it is significantly
            smaller than a raw WAV file. The audio quality is identical to the original.
          </p>
        </section>

        {/* Format table */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Which formats are which</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Relative size</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Common use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['WAV',  'Uncompressed lossless', 'Largest',       'Editing, production'   ],
                  ['FLAC', 'Compressed lossless',   'Large',         'Archiving, hi-fi'      ],
                  ['ALAC', 'Compressed lossless',   'Large',         'Apple devices'         ],
                  ['MP3',  'Lossy',                 'Small',         'Sharing, streaming'    ],
                  ['AAC',  'Lossy',                 'Small',         'Apple, streaming'      ],
                  ['OGG',  'Lossy',                 'Small',         'Games, open source'    ],
                  ['OPUS', 'Lossy',                 'Very small',    'Voice, real-time audio'],
                  ['M4A',  'Lossy (AAC)',            'Small',         'iPhone, iTunes'        ],
                ].map(([fmt, type, size, use]) => (
                  <tr key={fmt} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{fmt}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{size}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Does lossy compression sound bad?</h2>
          <p className="leading-relaxed">
            Not necessarily. At 192 kbps, most people cannot distinguish an MP3 from the
            lossless original during normal listening. The compression becomes audible at
            lower bitrates (128 kbps and below) — you may notice a slightly muddy or metallic
            quality in complex audio passages.
          </p>
          <p className="leading-relaxed mt-3">
            Whether lossy audio "sounds bad" depends on the bitrate, the source material, the
            listener, and the playback equipment. For most everyday uses — podcast listening,
            music on the go, sharing audio clips — lossy compression at a sensible bitrate
            is entirely acceptable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why this matters for conversion</h2>
          <p className="leading-relaxed">
            Converting between lossy formats causes quality loss. Every time you encode to
            MP3 or AAC, some audio data is discarded. Converting MP3 to AAC and back to MP3
            will degrade quality measurably.
          </p>
          <p className="leading-relaxed mt-3">
            Converting from lossless to lossy causes quality loss — but only once. A FLAC
            converted to MP3 at 320 kbps sounds excellent. The FLAC file captures the
            original perfectly; the MP3 represents a one-time, controlled quality reduction.
          </p>
          <p className="leading-relaxed mt-3">
            Converting from lossy to lossless (e.g. MP3 to WAV) does not recover quality.
            You get a larger file that sounds identical to the MP3 — the lost data does not
            come back. This is sometimes necessary when software requires WAV input, but
            should not be confused with a quality improvement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Which to use</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Archiving recordings:</span>
              <span>Use FLAC. Lossless quality, significantly smaller than WAV.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Editing in software:</span>
              <span>Use WAV. Lossless and universally supported by professional tools.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Sharing, uploading, distributing:</span>
              <span>Use MP3 at 192 kbps. Small, compatible everywhere, audibly transparent for most listeners.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">Apple ecosystem:</span>
              <span>M4A (AAC) works well within Apple devices. Convert to MP3 for broader compatibility.</span>
            </li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless to lossy'           },
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Uncompressed to compressed'  },
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'For editing software input'  },
        ]}
      />

      <RelatedContent
        title="Format guides"
        items={[
          { href: '/formats/mp3',  label: 'MP3 format guide'  },
          { href: '/formats/flac', label: 'FLAC format guide' },
          { href: '/formats/wav',  label: 'WAV format guide'  },
          { href: '/formats/m4a',  label: 'M4A format guide'  },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
