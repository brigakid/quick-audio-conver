import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'WAV vs MP3 for Editing, Sharing, and Archiving',
  description:
    'The right audio format depends on what you\'re doing next — not on which format is technically "better". A workflow-first guide to avoiding avoidable quality loss.',
};

export default function WavVsMp3WorkflowPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/learn" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Learn
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Format decisions</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          WAV vs MP3 for Editing, Sharing, and Archiving
        </h1>
      </div>

      <QuickAnswer>
        <strong>Editing:</strong> WAV (or FLAC). Re-encoding a lossy file degrades quality
        every time you save.{' '}
        <strong>Sharing:</strong> MP3 at 192 kbps. Smaller, plays everywhere.{' '}
        <strong>Archiving:</strong> FLAC. Lossless quality, 40–60% smaller than WAV.{' '}
        The most common mistake is applying the wrong format to the wrong stage of the workflow.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The question that actually matters</h2>
          <p className="leading-relaxed">
            WAV is technically better than MP3 in a pure quality sense — it's uncompressed
            and lossless. But "better" only matters in context. The right question isn't
            which format is superior. It's: <em>what is happening to this file next?</em>
          </p>
          <p className="leading-relaxed mt-3">
            If the file is going into an editor, being re-processed, or stored for long-term
            use, the format choice has real consequences. If it's being sent to someone or
            uploaded to a platform, quality-per-byte matters more than absolute quality — and
            MP3 wins that trade-off decisively.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">If you're editing: use WAV</h2>
          <p className="leading-relaxed">
            The core problem with editing MP3 files is that MP3 is a lossy format. When you
            export (or auto-save) a project as MP3, the audio is re-encoded. That means
            another round of lossy compression is applied to already-compressed audio.
          </p>
          <p className="leading-relaxed mt-3">
            On a single save, the quality loss is often small. Across multiple edit-save
            cycles — trimming, normalising, adding effects, adjusting levels — the degradation
            compounds. The result is cumulative artefacts: muddy low-mids, smeared stereo
            image, or a "pre-ringing" quality around sharp transients.
          </p>
          <p className="leading-relaxed mt-3">
            WAV files don't have this problem. They're uncompressed, so saving a WAV doesn't
            re-encode anything. The data you write is the data that gets stored, every time.
            If you're working in Audacity, Adobe Audition, Logic Pro, GarageBand, or any DAW,
            keep your working files as WAV. Export to MP3 only for the final output — once,
            at the end, at the bitrate you need.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC is an alternative if disk space matters. It's lossless like WAV but
            compresses to roughly half the size. Not all editors support FLAC natively —
            check your software before committing to it as a working format.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">If you're sharing: use MP3</h2>
          <p className="leading-relaxed">
            A 3-minute song as WAV is around 30 MB. As MP3 at 192 kbps, it's around 4 MB.
            For sharing — email attachments, messaging apps, file transfer tools, online
            upload forms — that size difference matters.
          </p>
          <p className="leading-relaxed mt-3">
            Many platforms have file size limits that WAV files regularly exceed. Email
            attachments are typically capped at 10–25 MB. WhatsApp and iMessage limit audio
            file sizes. Even platforms that technically accept large files will process them
            more slowly and consume more bandwidth for the recipient.
          </p>
          <p className="leading-relaxed mt-3">
            More importantly, 192 kbps MP3 is indistinguishable from the lossless original
            for most listeners on typical equipment. Sending a WAV file to someone who will
            play it on their phone, laptop, or in a car doesn't give them a better listening
            experience — it just costs both of you bandwidth and storage.
          </p>
          <p className="leading-relaxed mt-3">
            For podcasts and streaming platforms: most platforms transcode your upload anyway.
            Sending a WAV doesn't guarantee listeners receive lossless audio. It just means
            the platform does the encoding instead of you. Upload MP3 at 192 kbps or higher
            and let the platform handle distribution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">If you're archiving: use FLAC</h2>
          <p className="leading-relaxed">
            WAV is the traditional archiving format, and it works well. But FLAC is a better
            choice for most personal archiving use cases. It's lossless — the decoded audio
            is bit-for-bit identical to the source — but the files are 40–60% smaller than
            WAV. On a large music library, that's meaningful.
          </p>
          <p className="leading-relaxed mt-3">
            The main argument for archiving in a lossless format is future flexibility. You
            don't know what you'll want to do with a recording in five or ten years. Maybe
            you'll want to re-encode it at a higher bitrate, process it differently, or use
            it in a new context that doesn't exist yet. Starting from lossless gives you that
            option. Starting from a lossy MP3 means you're already working from a degraded
            source with no way back.
          </p>
          <p className="leading-relaxed mt-3">
            One practical note: FLAC has limited native support on Apple devices (iOS and
            macOS don't play FLAC without third-party software or a converter). If you're
            archiving primarily for an Apple ecosystem, WAV or ALAC are safer. If you're on
            Windows, Linux, Android, or using desktop players like VLC or Foobar2000, FLAC
            works everywhere.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The one-way problem</h2>
          <p className="leading-relaxed">
            The biggest workflow mistake is converting to MP3 at the wrong stage and then
            wanting lossless quality later. Once a file is encoded as MP3, the discarded
            audio data is permanently gone. Converting that MP3 back to WAV creates a
            lossless container holding lossy audio — bigger file, same sound.
          </p>
          <p className="leading-relaxed mt-3">
            This is why keeping the source file matters. If someone sends you an MP3 and
            you need to edit it — or if you recorded directly to MP3 — you're working from
            the quality level of that MP3 and there's no upgrade available. The only version
            of "better quality" that exists is the original lossless recording from before
            the first encode. If you don't have that, you work with what you have.
          </p>
          <p className="leading-relaxed mt-3">
            The practical takeaway: convert to MP3 last, not first. Record or work in a
            lossless format. Convert once, for distribution, when the file is finished.
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
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Reason</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Recording',              'WAV or FLAC',          'No quality ceiling; editable without degradation'    ],
                  ['Editing / mixing',       'WAV (or FLAC)',        'Re-save without re-encoding losses'                  ],
                  ['Final export / master',  'WAV',                  'Lossless source to distribute from'                  ],
                  ['Sharing / uploading',    'MP3 at 192 kbps',      'Small file, plays everywhere, audibly transparent'   ],
                  ['Archiving',              'FLAC',                 'Lossless, 40-60% smaller than WAV'                   ],
                  ['Streaming platforms',    'MP3 at 192–320 kbps',  'Platforms transcode; provide good source quality'    ],
                ].map(([stage, fmt, reason]) => (
                  <tr key={stage} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{stage}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">{fmt}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{reason}</td>
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
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'For sharing and distribution'  },
          { href: '/mp3-to-wav',  label: 'MP3 to WAV',  note: 'For software that requires WAV' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Archive to shareable file'      },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/when-mp3-is-good-enough',                  label: 'When MP3 Is Good Enough'                 },
          { href: '/learn/converting-to-wav-does-not-improve-quality', label: 'When Converting to WAV Doesn\'t Help'  },
          { href: '/formats/wav',                                     label: 'WAV format guide'                        },
          { href: '/formats/flac',                                    label: 'FLAC format guide'                       },
        ]}
      />

      <LastUpdated date="2026-03-25" />

    </div>
  );
}
