import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'Best Audio Format for Podcasts',
  description:
    'Record in WAV. Edit in WAV. Publish in MP3. The format decisions in podcasting are straightforward once you understand which stage you are at and what the distribution platforms expect.',
};

export default function BestFormatForPodcastsPage() {
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
          Best Audio Format for Podcasts
        </h1>
      </div>

      <QuickAnswer>
        <strong>Record and edit in WAV. Publish in MP3.</strong> For voice-only podcasts,
        128 kbps mono MP3 is the standard — it sounds good, downloads fast, and works on
        every podcast app. For shows with music or sound design, use 192 kbps stereo.
        Don't edit MP3 files — always work from WAV during production.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Three separate stages, three separate answers</h2>
          <p className="leading-relaxed">
            Podcast production has three distinct phases where the format question comes up:
            recording, editing, and distribution. The right format at each stage is different,
            and mixing them up causes problems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Stage 1: Recording</h2>
          <p className="leading-relaxed">
            Record in WAV, or whatever lossless format your recording setup defaults to.
            Most dedicated audio interfaces and recording software default to WAV at
            44.1 kHz / 16-bit, which is standard CD quality and more than sufficient for
            voice recording. Some use 48 kHz — that's fine too.
          </p>
          <p className="leading-relaxed mt-3">
            A few recorder devices default to MP3. If you have a choice, switch to WAV.
            If your recorder only does MP3, use the highest bitrate it offers (typically
            320 kbps). You'll still have the MP3 quality ceiling, but you minimise additional
            degradation in later stages.
          </p>
          <p className="leading-relaxed mt-3">
            Phone recordings via apps like Voice Memos (which saves as M4A) or third-party
            recorders are workable for remote guests, but they're not ideal for main hosts.
            If you're recording on a phone:{' '}
            <Link href="/m4a-to-mp3" className="text-brand hover:underline">convert the M4A to WAV</Link>{' '}
            before editing — not because the quality improves, but to avoid compounding
            compression in subsequent steps.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Stage 2: Editing</h2>
          <p className="leading-relaxed">
            Edit in WAV. This applies regardless of what format the recordings came in as.
            If you received an MP3 from a remote guest, convert it to WAV first. Then cut,
            noise-reduce, normalise, add music, and export — all from WAV.
          </p>
          <p className="leading-relaxed mt-3">
            The reason is the same as in any audio editing context: opening and re-saving
            an MP3 multiple times applies lossy compression repeatedly. After two or three
            edit cycles, voice quality degrades noticeably. Staying in WAV through the entire
            edit means only one encode happens, at the very end.
          </p>
          <p className="leading-relaxed mt-3">
            Audacity, Adobe Audition, Hindenburg, Reaper, and Descript all handle WAV natively.
            None of them require you to work in MP3.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Stage 3: Distribution</h2>
          <p className="leading-relaxed">
            This is where format and bitrate decisions affect the listener. The podcast
            distribution ecosystem is built around MP3. Spotify, Apple Podcasts, Overcast,
            Pocket Casts, RSS aggregators — all accept MP3. All podcast hosting platforms
            accept MP3 as the standard format.
          </p>

          <div className="space-y-3 mt-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">Voice-only podcast</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                <strong>128 kbps mono MP3.</strong> Speech doesn't need stereo — the difference
                between mono and stereo for a voice sitting in front of a microphone is
                effectively zero to the listener, but mono halves the file size. At 128 kbps,
                voice is clean and artefact-free. A 45-minute episode is about 43 MB.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">Podcast with music and sound design</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                <strong>192 kbps stereo MP3.</strong> Music shows compression artefacts more
                than speech does at lower bitrates. If your show includes intro/outro music,
                sound effects, or is music-forward, 192 kbps stereo is the safe choice.
                A 45-minute episode is about 65 MB.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <p className="font-semibold text-gray-800 text-sm">High-quality music podcast</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                <strong>320 kbps stereo MP3 or lossless.</strong> For podcasts where audio
                fidelity is central (music criticism, audiophile content), 320 kbps or even
                a lossless FLAC is appropriate. Check whether your hosting platform supports
                FLAC — most don't for RSS feeds.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Does AAC perform better than MP3 for podcasts?</h2>
          <p className="leading-relaxed">
            AAC (often distributed as M4A) does produce better audio quality than MP3 at
            128 kbps. Apple Podcasts, Spotify, and several podcast apps support AAC. If your
            hosting platform supports it and you know your listeners use modern devices,
            128 kbps AAC is a reasonable choice.
          </p>
          <p className="leading-relaxed mt-3">
            The practical issue is compatibility. MP3 is guaranteed to work on every device,
            RSS reader, and podcast app. AAC has broad but not universal support. Older car
            systems, certain smart speakers, and some embedded podcast apps may not handle
            M4A/AAC from an RSS feed. For most podcasts, MP3 remains the safe default because
            you can't predict every listener's setup.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common mistakes</h2>
          <ul className="space-y-2 mt-2">
            <li className="flex gap-2">
              <span className="text-gray-400 flex-shrink-0">—</span>
              <span><strong>Recording in MP3 directly.</strong> Avoid if you can. You lock in
              a quality ceiling before you've done any editing.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 flex-shrink-0">—</span>
              <span><strong>Editing and re-encoding MP3 files.</strong> Each save through a
              lossy encoder degrades the audio further. Work in WAV.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 flex-shrink-0">—</span>
              <span><strong>Publishing in WAV.</strong> A 45-minute WAV is 600+ MB. Hosting
              costs, download times, and listener data usage all suffer. MP3 is the right
              output for distribution.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 flex-shrink-0">—</span>
              <span><strong>Using stereo for voice-only shows.</strong> It adds no noticeable
              quality to speech while doubling the file size.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 flex-shrink-0">—</span>
              <span><strong>Setting bitrate too low to save storage.</strong> 64 kbps MP3
              sounds noticeably degraded. 96 kbps is acceptable for pure speech but 128 kbps
              is the minimum worth publishing.</span>
            </li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/mp3-to-wav', label: 'MP3 to WAV',  note: 'Prepare compressed sources for editing' },
          { href: '/wav-to-mp3', label: 'WAV to MP3',  note: 'Export finished edit for distribution'  },
          { href: '/m4a-to-mp3', label: 'M4A to MP3',  note: 'Convert phone recordings for editing'   },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/best-audio-format-for-editing',                    label: 'Best Audio Format for Editing'          },
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality',  label: 'How Bitrate Affects Quality'            },
          { href: '/learn/aac-m4a-and-mp3-what-actually-matters',            label: 'AAC, M4A, and MP3: What Matters'        },
          { href: '/formats/mp3',                                            label: 'MP3 format guide'                        },
        ]}
      />

      <LastUpdated date="2026-03-26" />

    </div>
  );
}
