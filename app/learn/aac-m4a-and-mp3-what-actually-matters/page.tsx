import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'AAC, M4A, and MP3: What Actually Matters',
  description:
    'AAC is a codec. M4A is a container. MP3 is a different, older codec. Understanding the difference tells you when to convert and when compatibility is the only real concern.',
};

export default function AacM4aMp3Page() {
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
          AAC, M4A, and MP3: What Actually Matters
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        <strong>M4A is AAC audio in an MPEG-4 container.</strong> The codec is identical.
        MP3 is a different, older codec — technically less efficient but universally compatible.
        AAC beats MP3 clearly at 128 kbps; at 192 kbps and above, both are effectively
        transparent. The real decision is almost always about <strong>compatibility</strong>,
        not quality.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Codec versus container</h2>
          <p className="leading-relaxed">
            Understanding why these three things are confusing requires one distinction:
            a <strong>codec</strong> encodes and decodes audio data; a <strong>container</strong>{' '}
            is the file format that packages and delivers it.
          </p>
          <p className="leading-relaxed mt-3">
            MP3 is both a codec and its own container — the .mp3 file is the encoded audio,
            wrapped in its own format. AAC is a codec that can live inside several containers:
            most commonly M4A (.m4a extension, MPEG-4 container), but also raw ADTS (.aac),
            MP4 (.mp4), and others.
          </p>
          <p className="leading-relaxed mt-3">
            So when you have a file called <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">recording.m4a</code>,
            you have AAC audio in an MPEG-4 container. When you rename it
            to <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">recording.aac</code>{' '}
            (without converting), you often haven't changed the audio at all — just the wrapper.
            Some players will play both identically; others care about the extension. The audio
            data hasn't moved.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where AAC is genuinely better than MP3</h2>
          <p className="leading-relaxed">
            AAC was designed as MP3's successor in the 1990s and it genuinely is more
            technically capable. The differences that matter in practice:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>
                <strong>At 128 kbps, AAC sounds noticeably better than MP3.</strong> MP3 at
                128 kbps produces audible artefacts in music — pre-ringing on transients,
                smeared high frequencies, stereo image distortion. AAC at 128 kbps is clean
                enough for most listeners. This is the bitrate where the codec difference
                actually matters.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>
                <strong>AAC handles high frequencies more efficiently.</strong> MP3 uses a
                fixed-size frequency band structure; AAC uses variable-length windows and
                more sophisticated psychoacoustic modelling. In practice, this means AAC
                preserves the upper frequency range better at low bitrates.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>
                <strong>AAC supports more channels natively.</strong> MP3 maxes at 2 channels
                (stereo). AAC handles surround sound natively. For typical music this is
                irrelevant, but for video production it matters.
              </span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            At 192 kbps and above, both are transparent for most listeners and the quality
            argument mostly collapses. The choice above 192 kbps is about compatibility,
            not audio performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where MP3 still wins</h2>
          <p className="leading-relaxed">
            MP3 has been the universal audio format since the late 1990s. The compatibility
            breadth is genuine and significant:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>Every car audio system, even pre-2005 units, handles MP3 from CD or USB.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>Every online platform, CMS, podcast host, and audio tool accepts MP3. AAC
              is broadly supported on modern systems but occasionally trips up on older tools,
              specific embedded systems, or uncommon platforms.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>If you don't know what device or software will play the file, MP3 removes
              all uncertainty.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The DRM complication</h2>
          <p className="leading-relaxed">
            Some M4A files cannot be converted. Apple's FairPlay DRM was used on iTunes
            purchases before 2009, and Apple Music downloads for offline listening are
            DRM-protected.
          </p>
          <p className="leading-relaxed mt-3">
            A DRM-protected M4A will fail to convert with any standard tool, including
            QuickAudioConvert. The DRM prevents the file from being decoded outside Apple's
            authorised playback environment. If your M4A fails to convert and you purchased
            it from iTunes, this is almost certainly why.
          </p>
          <p className="leading-relaxed mt-3">
            DRM-free M4A — voice memos, GarageBand exports, files from third-party services,
            or iTunes Plus purchases after 2009 — convert normally.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Converting between them</h2>
          <p className="leading-relaxed">
            Converting M4A (AAC) to MP3 is a common operation — it's how you make iPhone
            voice memos or old iTunes downloads work on hardware that only accepts MP3. It
            involves one re-encode: AAC decoded to PCM, then re-encoded to MP3. At 192 kbps
            output, the quality loss is negligible for most content.
          </p>
          <p className="leading-relaxed mt-3">
            Converting at 128 kbps produces more degradation, because you're applying lossy
            compression to audio that was already lossy. Use 192 kbps or higher when converting
            between lossy formats.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Quick decisions</h2>
          <div className="space-y-2 mt-2">
            {[
              ['iPhone voice memos need to play on old hardware?', 'Convert M4A to MP3 at 192 kbps.'],
              ['Encoding for Apple devices only?', 'Stay with M4A. It works natively across the full Apple ecosystem.'],
              ['Low bitrate (128 kbps) and quality matters?', 'AAC is noticeably better than MP3 here.'],
              ['File must work absolutely everywhere?', 'MP3. No exceptions, no compatibility surprises.'],
              ['M4A won\'t convert and you bought it from iTunes?', 'Likely DRM-protected. Standard conversion tools cannot help.'],
            ].map(([q, a]) => (
              <div key={q} className="p-4 rounded-xl border border-gray-100 bg-slate-50">
                <p className="font-semibold text-gray-800 text-sm">{q}</p>
                <p className="text-gray-600 text-sm mt-1">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/m4a-to-mp3', label: 'M4A to MP3', note: 'iPhone files, iTunes downloads'  },
          { href: '/aac-to-mp3', label: 'AAC to MP3', note: 'Raw AAC to universal MP3'         },
          { href: '/wav-to-aac', label: 'WAV to AAC', note: 'Lossless to efficient compressed' },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/how-bitrate-affects-file-size-and-sound-quality', label: 'How Bitrate Affects Quality'    },
          { href: '/learn/when-mp3-is-good-enough',                          label: 'When MP3 Is Good Enough'       },
          { href: '/formats/aac',                                            label: 'AAC format guide'              },
          { href: '/formats/m4a',                                            label: 'M4A format guide'              },
        ]}
      />

      <LastUpdated date="2026-03-26" />

    </div>
  );
}
