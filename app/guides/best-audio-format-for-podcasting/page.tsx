import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'Best Audio Format for Podcasting',
  description:
    'Which audio format to use when recording, editing, and submitting your podcast. Specific recommendations for each stage of the workflow.',
};

export default function BestAudioFormatForPodcastingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/guides" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Guides
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Workflow guide</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          The Best Audio Format for Podcasting at Each Stage
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Record and edit in WAV. Submit in MP3 at 192 kbps stereo (or 128 kbps mono) — or M4A/AAC
        if your host specifically recommends it.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why format matters at each stage</h2>
          <p className="leading-relaxed">
            The format that is right for recording is wrong for distribution, and vice versa. These
            are genuinely different problems. At the recording and editing stage, you want lossless
            audio so that every processing step — EQ, compression, noise removal — works with the
            full signal. At the distribution stage, you want the smallest file that still sounds
            good to a listener on earbuds while commuting.
          </p>
          <p className="leading-relaxed mt-3">
            The mistake most beginners make is recording in a compressed format like MP3, or
            submitting a 300 MB WAV to a podcast host that will just transcode it anyway. Getting
            the format right at each stage costs nothing and avoids real problems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Recording: use WAV or FLAC</h2>
          <p className="leading-relaxed">
            WAV is the safe default for recording. It is uncompressed, records every sample without
            any processing, and every audio application on every platform can read it. Most
            recording software — Audacity, Adobe Audition, Logic Pro, GarageBand — defaults to WAV
            for good reason.
          </p>
          <p className="leading-relaxed mt-3">
            FLAC is also a good choice if storage is a concern. It is losslessly compressed, so
            decoded audio is identical to WAV, but files are 40–60% smaller. It is particularly
            useful for archiving finished interviews before you edit them.
          </p>
          <p className="leading-relaxed mt-3">
            Avoid recording directly to MP3. MP3 is a lossy format — data is permanently discarded
            during encoding. When you later edit the file and re-save, the encoder runs again, and
            artefacts accumulate. Starting in a lossy format puts a ceiling on your output quality
            before you have done anything with it.
          </p>
          <p className="leading-relaxed mt-3">
            Phone voice recorders typically produce M4A/AAC files. That is fine for a quick
            rough demo, but M4A is also lossy — the same problem applies. If you are recording
            a guest on a phone, it is a workable fallback, not a preferred production format.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Editing: stay in WAV</h2>
          <p className="leading-relaxed">
            Keep your project in WAV throughout the edit. Trim silences, apply EQ, run a
            noise gate, add compression — all in WAV. Only convert at the final export step.
          </p>
          <p className="leading-relaxed mt-3">
            If you need to send a rough cut to a co-host or producer mid-project, export as WAV.
            Sending an MP3 at that stage means the recipient is working from a lossy file, and
            when they hand it back and you export the final version, it gets encoded a second time.
            The quality hit may be small, but there is no reason to take it.
          </p>
          <p className="leading-relaxed mt-3">
            Re-encoding MP3 repeatedly introduces smearing on transients, pumping artefacts on
            compressed speech, and a general softening of clarity. None of this is dramatic at
            high bitrates, but it is completely avoidable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Platform submission requirements</h2>
          <p className="leading-relaxed mb-4">
            Most platforms transcode your upload before serving it to listeners. Submitting at
            192 kbps MP3 is more than sufficient — going higher wastes your storage quota and
            upload time without benefiting anyone.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Platform</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Accepted formats</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Apple Podcasts', 'MP3, AAC/M4A', 'MP3 192 kbps stereo, 128 kbps mono'],
                  ['Spotify', 'MP3', 'MP3 192–320 kbps'],
                  ['Buzzsprout', 'MP3, M4A', 'MP3 192 kbps'],
                  ['Anchor / Spotify for Podcasters', 'MP3', 'MP3 192 kbps'],
                  ['RSS.com', 'MP3', 'MP3 128–192 kbps'],
                  ['Transistor', 'MP3', 'MP3 128–192 kbps'],
                ].map(([platform, formats, rec]) => (
                  <tr key={platform} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-600 font-medium">{platform}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{formats}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">Platform requirements change. Check your host{'\u2019'}s documentation for current limits.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Stereo vs mono</h2>
          <p className="leading-relaxed">
            Most podcast content — conversation, interviews, solo narration — is mono. Stereo
            doubles the file size with no perceptible benefit for voice audio. A listener on
            earbuds cannot tell whether your spoken-word episode is stereo or mono.
          </p>
          <p className="leading-relaxed mt-3">
            Stereo is justified when the audio itself has meaningful spatial information: a
            produced music show, an episode with original music beds that span the stereo field,
            or a sound-designed narrative podcast where placement matters to the experience.
          </p>
          <p className="leading-relaxed mt-3">
            Set your DAW to mono output by default. If you later decide you need stereo for a
            specific episode, change it then — but stereo should be a deliberate choice, not the
            default because you never changed the setting.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Which bitrate to choose for distribution</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">128 kbps mono.</span>
              <span>The standard for speech-only podcasts. Clear, small files, works on every platform. There is no reason to go lower for a distributed podcast episode.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">192 kbps stereo.</span>
              <span>The recommended ceiling for produced audio, music shows, or anything with a stereo mix. Above this point, the improvement is not audible on typical listening equipment and podcast platforms often transcode down anyway.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0 font-bold">320 kbps.</span>
              <span>Unnecessary for podcasting. It produces larger files with no benefit to listeners. Save it for music distribution where the listener may be on high-end equipment.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Practical recommendations</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Recording a podcast: <strong>WAV at 44.1 kHz / 16-bit or 24-bit</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Editing and mixing: <strong>stay in WAV until final export</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Sharing a rough cut with a collaborator: <strong>export as WAV, not MP3</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Speech-only episode: <strong>MP3 128 kbps mono</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Music or produced audio episode: <strong>MP3 192 kbps stereo</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Archiving master files: <strong>WAV or FLAC — both are lossless</strong></li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">→</span>Host requires M4A: <strong>export at 192 kbps AAC — quality equivalent to MP3 at the same bitrate</strong></li>
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Related tools"
        items={[
          { href: '/wav-to-mp3', label: 'WAV to MP3', note: 'Convert your master to a distribution-ready file' },
          { href: '/wav-to-m4a', label: 'WAV to M4A', note: 'For hosts that prefer AAC' },
          { href: '/mp3-to-wav', label: 'MP3 to WAV', note: 'Convert back to lossless for editing' },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/how-to-choose-mp3-bitrate', label: 'How to Choose the Right MP3 Bitrate' },
          { href: '/guides/mp3-vs-wav', label: 'MP3 vs WAV' },
          { href: '/learn/aac-m4a-and-mp3-what-actually-matters', label: 'AAC, M4A, and MP3: What Actually Matters' },
        ]}
      />

      <LastUpdated date="2025-03-01" />

    </div>
  );
}
