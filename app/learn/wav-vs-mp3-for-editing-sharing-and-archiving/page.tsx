import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'WAV vs MP3 for Editing, Sharing, and Archiving',
  description:
    'WAV and MP3 serve different purposes at different stages of working with audio. The decision changes depending on whether you are editing, distributing, or storing a file.',
};

export default function WavVsMp3Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/learn" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Learn
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Format decisions</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          WAV vs MP3 for Editing, Sharing, and Archiving
        </h1>
      </div>

      <QuickAnswer>
        Use <strong>WAV while editing</strong> — lossless, no re-encoding degradation. Use{' '}
        <strong>MP3 for sharing and distribution</strong> — small, universal. Use{' '}
        <strong>FLAC for archiving</strong> — lossless but 40–60% smaller than WAV.
        The mistake is treating one format as the answer for all three stages.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The question assumes one answer</h2>
          <p className="leading-relaxed">
            "WAV or MP3?" is the wrong framing, because the answer is different depending on
            what you're doing with the audio. These two formats don't compete — they belong at
            different stages of the same workflow. Using the wrong one at the wrong stage either
            wastes space or degrades quality unnecessarily.
          </p>
          <p className="leading-relaxed mt-3">
            The relevant question is: what are you doing with this file right now — editing it,
            sending it to someone, or storing it long-term?
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">While editing: WAV</h2>
          <p className="leading-relaxed">
            WAV is uncompressed PCM audio. Every bit of audio data is stored in full, which
            means editing software reads and writes it without any encoding overhead. There's
            no decoding step and no risk of compounding quality loss when you save.
          </p>
          <p className="leading-relaxed mt-3">
            MP3 files can be edited — most tools can open them — but every time you save the
            result as MP3, the encoder runs again. The second encode applies a new round of
            lossy compression on top of audio that was already lossy. Over two or three
            edit-save cycles this can produce audible artefacts: frequency smearing, stereo
            imaging problems, and that characteristic "watery" sound of over-compressed audio.
          </p>
          <p className="leading-relaxed mt-3">
            The practical rule: work in WAV (or AIFF, which is equivalent), and export to MP3
            only as the final step. Keep the WAV version as your project file.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">For sharing and distribution: MP3</h2>
          <p className="leading-relaxed">
            Once you're done editing, MP3 is the right output for anything that needs to reach
            someone else or be uploaded somewhere. The reasons are straightforward:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>A WAV file at CD quality (44.1 kHz / 16-bit / stereo) runs about 10 MB per
              minute. An MP3 at 192 kbps is about 1.4 MB per minute. That ratio matters for
              email attachments, upload limits, and storage on devices.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>MP3 plays on every device, player, car stereo, and platform without exception.
              WAV works broadly but some upload tools, messaging apps, and streaming services
              reject large files or prefer specific compressed formats.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>At 192 kbps, MP3 quality is transparent for most listeners in most
              conditions — meaning the compression isn't audible. You're not sacrificing
              meaningful quality by sending MP3 instead of WAV.</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            There are exceptions. If you're sending audio to a professional for further
            production work — a mixing engineer, a mastering service, a radio station — send
            the highest quality version you have. They'll want lossless to work from.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">For archiving: FLAC</h2>
          <p className="leading-relaxed">
            If you're storing audio for the long term — original recordings, masters, voice
            memos you might need later — neither WAV nor MP3 is the ideal format.
          </p>
          <p className="leading-relaxed mt-3">
            WAV is lossless and perfectly faithful to the original, but the files are large.
            A two-hour recording at CD quality is around 1.2 GB as WAV.
          </p>
          <p className="leading-relaxed mt-3">
            MP3 is much smaller, but you're permanently discarding audio data at encode time.
            If you need to re-process, re-encode, or transcode that recording years from now,
            you're starting from a degraded source.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC gives you lossless quality — bit-for-bit identical to the original — at
            roughly 40–60% smaller than WAV. A two-hour lossless recording is around 500 MB
            as FLAC instead of 1.2 GB as WAV. You can convert FLAC to any format later
            without any quality penalty, because you still have all the original audio data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The one-way quality problem</h2>
          <p className="leading-relaxed">
            Lossy compression works in one direction. MP3 discards audio data at encode time
            and that data is gone permanently. You can convert MP3 to WAV, but you end up
            with a large WAV file that contains MP3-quality audio — not a lossless restoration
            of the original.
          </p>
          <p className="leading-relaxed mt-3">
            This is why archive format matters. If you archive as MP3 and later need the
            original quality, it doesn't exist anymore. If you archive as FLAC or WAV, you
            can always generate the MP3 (or any other format) from the lossless source.
          </p>
          <p className="leading-relaxed mt-3">
            The right workflow: record or acquire in the best quality available, keep a lossless
            copy, and generate compressed versions as needed. Never work back from the lossy copy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Format by stage</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Stage</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Recording',               'WAV or AIFF',  'Uncompressed — no encoding artefacts from the start'          ],
                  ['Editing / production',    'WAV',          'Safe to save repeatedly without quality degradation'           ],
                  ['Archiving masters',       'FLAC',         'Lossless, 40–60% smaller than WAV'                            ],
                  ['Sharing / distributing',  'MP3 192 kbps', 'Transparent quality, small size, universal compatibility'     ],
                  ['Uploading to platforms',  'MP3 or WAV',   'Check the platform — most accept both, some prefer one'       ],
                  ['Sending to professionals','WAV or FLAC',  'They need lossless to work from'                              ],
                ].map(([stage, format, why]) => (
                  <tr key={stage} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-700">{stage}</td>
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{format}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{why}</td>
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
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Compress for sharing'              },
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'For software that needs WAV input' },
          { href: '/wav-to-flac', label: 'WAV to FLAC', note: 'Compact lossless for archiving'    },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/when-mp3-is-good-enough',                       label: 'When MP3 Is Good Enough'         },
          { href: '/learn/best-audio-format-for-editing',                  label: 'Best Audio Format for Editing'  },
          { href: '/learn/when-converting-to-wav-does-not-improve-quality', label: 'When WAV Doesn\'t Help Quality'},
          { href: '/formats/wav',                                          label: 'WAV format guide'                },
          { href: '/formats/flac',                                         label: 'FLAC format guide'               },
        ]}
      />

      <LastUpdated date="2026-03-26" />

    </div>
  );
}
