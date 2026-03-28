import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'Best Audio Format for Editing',
  description:
    'WAV is the standard editing format — lossless, widely supported, and safe to save repeatedly. FLAC works for storage between sessions. The format you export to depends on your destination.',
  openGraph: {
    title: 'Best Audio Format for Editing',
    description:
      'WAV is the standard editing format — lossless, widely supported, and safe to save repeatedly. FLAC works for storage between sessions. The format you export to depends on your destination.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Audio Format for Editing',
    description:
      'WAV is the standard editing format — lossless, widely supported, and safe to save repeatedly. FLAC works for storage between sessions. The format you export to depends on your destination.',
  },
};

export default function BestFormatForEditingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/learn" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Learn
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Real-world workflows</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Best Audio Format for Editing
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Use <strong>WAV</strong> as your working format during editing. It's lossless,
        uncompressed, and every major audio editor supports it without any compatibility
        friction. Export to your target format — MP3, FLAC, M4A — only when the edit is
        complete. Never edit an MP3 and re-save as MP3.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why the editing format matters</h2>
          <p className="leading-relaxed">
            Most audio editing decisions don't hinge on format — volume adjustments, cuts,
            fades, and EQ work the same whether you're working on a WAV or an MP3. The format
            choice matters for one specific reason: <strong>what happens when you save</strong>.
          </p>
          <p className="leading-relaxed mt-3">
            If you open an MP3, make an edit, and save back as MP3, the encoder runs again.
            The file that went in was already compressed. The file that comes out has been
            compressed twice. Each encode discards audio data. Over multiple edit cycles, this
            accumulates into audible degradation — high frequencies smear, the stereo image
            narrows, transients sound soft. On a voice recording it might produce a hollow,
            slightly hollow quality; on music it's most obvious in cymbals and reverb tails.
          </p>
          <p className="leading-relaxed mt-3">
            Working in WAV sidesteps this entirely. WAV stores uncompressed PCM. There's no
            encoder. Saving a WAV is writing raw samples to disk — no quality cost, no matter
            how many times you do it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">WAV: the default choice for editing</h2>
          <p className="leading-relaxed">
            WAV is the audio equivalent of a TIFF in photography — large, uncompressed, and
            the format that professional tools are built around. The main characteristics that
            make it the right editing format:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>Universal DAW support.</strong> Audacity, Adobe Premiere, DaVinci
              Resolve, Logic Pro, Pro Tools, Reaper — every audio editor reads and writes WAV
              without any plugin or codec installation.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>No quality loss on save.</strong> PCM is not encoded or decoded —
              it's stored as-is. The 10th save is identical to the 1st.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>Accurate waveform display.</strong> Because there's no lossy
              compression, waveform visualisation in editors is accurate. What you see is
              what's there.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>Supports high sample rates and bit depths.</strong> 96 kHz / 32-bit
              float for professional work; 44.1 kHz / 16-bit (CD quality) for standard outputs.
              The format handles both.</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            The only downside is size. A one-hour stereo recording at CD quality is about 600 MB
            as WAV. For archival or long-term storage between sessions, FLAC is the practical
            alternative.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">FLAC: for storage between sessions</h2>
          <p className="leading-relaxed">
            FLAC (Free Lossless Audio Codec) compresses audio losslessly — like a ZIP file
            for audio data. The result is 40–60% smaller than WAV with zero quality
            difference. A 600 MB WAV becomes roughly 250–350 MB as FLAC.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC works well for storing project audio between sessions: exporting your
            working files to FLAC overnight, or archiving finished source material. Most DAWs
            and editors can import FLAC; some can't export it natively (in which case you
            export WAV and convert with a tool like QuickAudioConvert afterward).
          </p>
          <p className="leading-relaxed mt-3">
            FLAC is not as well-supported for real-time editing operations as WAV on some
            systems, because the decompressor adds a small processing overhead. For storage
            it's excellent. For the active working timeline, WAV is still the path of least
            resistance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AIFF: the Mac alternative</h2>
          <p className="leading-relaxed">
            AIFF (Audio Interchange File Format) is Apple's equivalent of WAV — uncompressed
            PCM in an Apple-developed container. It is technically identical in quality to
            WAV. Logic Pro and GarageBand use AIFF natively; many Apple users encounter it
            in exports from those tools.
          </p>
          <p className="leading-relaxed mt-3">
            For editing purposes, WAV and AIFF are interchangeable. On macOS-only workflows,
            AIFF is perfectly valid. For cross-platform projects — or if you're sending files
            to Windows users or non-Apple tools — WAV is safer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What to do when you only have an MP3</h2>
          <p className="leading-relaxed">
            If your source file is an MP3 and you don't have the original lossless version,
            convert to WAV before editing. This isn't a quality upgrade — the audio is still
            MP3-quality after conversion. But it means further edits and saves won't add
            additional compression artefacts on top of what's already there.
          </p>
          <p className="leading-relaxed mt-3">
            The rule is: lock in the MP3 quality ceiling by converting to WAV once, then edit
            from the WAV and export once at the end. This is better than the alternative of
            editing the MP3 directly and re-encoding it multiple times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Export format after editing</h2>
          <p className="leading-relaxed">
            What you export depends on where the file is going, not on the editing format:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-2">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Destination</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Export format</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Streaming / sharing / online upload',         'MP3 at 192 kbps'     ],
                  ['Podcast distribution',                        'MP3 at 128–192 kbps' ],
                  ['Mastering engineer or audio professional',    'WAV at full quality'  ],
                  ['Long-term personal archive',                  'FLAC'                 ],
                  ['Apple ecosystem (iPhone, iTunes, Podcasts)',  'M4A or MP3'           ],
                  ['Video editing software',                      'WAV (sync is simpler)'],
                ].map(([dest, fmt]) => (
                  <tr key={dest} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-700">{dest}</td>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'Prepare MP3 source for editing' },
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Export after editing is done'   },
          { href: '/wav-to-flac', label: 'WAV to FLAC', note: 'Archive working files compactly' },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/wav-vs-mp3-for-editing-sharing-and-archiving',   label: 'WAV vs MP3 by Workflow'           },
          { href: '/learn/when-converting-to-wav-does-not-improve-quality', label: 'When WAV Doesn\'t Help Quality'  },
          { href: '/learn/best-audio-format-for-podcasts',                  label: 'Best Audio Format for Podcasts'  },
          { href: '/formats/wav',                                           label: 'WAV format guide'                },
        ]}
      />

      <LastUpdated date="2026-03-26" />

    </div>
  );
}
