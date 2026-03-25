import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'AAC, M4A, and MP3: What Actually Matters',
  description:
    'AAC is a codec. M4A is a container that holds AAC audio. MP3 is a different codec. The quality difference at high bitrates is small. Compatibility is the real deciding factor.',
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          AAC, M4A, and MP3: What Actually Matters
        </h1>
      </div>

      <QuickAnswer>
        <strong>M4A is not a different format from AAC</strong> — it's the same AAC audio
        codec inside an MPEG-4 container. MP3 is a separate, older codec. AAC is
        technically more efficient than MP3 at the same bitrate. But at 192 kbps or higher,
        both are effectively transparent. The real decision is compatibility: MP3 works
        everywhere; AAC/M4A works everywhere except some legacy hardware and platforms.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The codec versus container confusion</h2>
          <p className="leading-relaxed">
            Most confusion around AAC, M4A, and MP3 comes from not knowing the difference
            between a codec and a container.
          </p>
          <p className="leading-relaxed mt-3">
            A <strong>codec</strong> is the algorithm that encodes and decodes audio — it
            determines how the audio data is compressed and what quality trade-offs are made.
            MP3 is a codec. AAC is a codec.
          </p>
          <p className="leading-relaxed mt-3">
            A <strong>container</strong> is the file format that wraps the encoded audio
            and holds metadata (title, artist, cover art). M4A is a container. So is MP4.
            WAV is a container. The container tells your player how to read the file — the
            codec tells it how to decode the audio inside.
          </p>
          <p className="leading-relaxed mt-3">
            M4A files contain AAC audio in an MPEG-4 container. A file named{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">song.m4a</code> and
            a file named <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">song.aac</code>{' '}
            use the same codec. The difference is how the file is packaged. This is why they
            sound the same — they're encoded the same way.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What AAC actually is</h2>
          <p className="leading-relaxed">
            AAC stands for Advanced Audio Coding. It was developed in the mid-1990s as a
            direct successor to MP3, specifically designed to overcome its technical
            limitations. The patents were held by a consortium including Fraunhofer (who also
            held key MP3 patents), Dolby, and Sony.
          </p>
          <p className="leading-relaxed mt-3">
            Technically, AAC achieves better audio quality than MP3 at the same bitrate.
            It uses more sophisticated psychoacoustic modelling, supports more audio
            channels, handles stereo more efficiently, and compresses high-frequency content
            with less audible artefacting. At 128 kbps, the difference between AAC and MP3
            is clearly audible to most people. At 192 kbps, both are largely transparent
            and the difference is marginal.
          </p>
          <p className="leading-relaxed mt-3">
            AAC is used as the baseline audio codec for YouTube, iPhone video recordings,
            FaceTime, WhatsApp voice messages, and Apple Music. If you've played audio on
            an Apple device or watched a YouTube video, you've heard AAC.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What M4A actually is</h2>
          <p className="leading-relaxed">
            M4A is the file extension Apple uses for audio-only MPEG-4 files containing
            AAC audio. The "M4" prefix comes from MPEG-4; the "A" indicates it's audio-only
            (as opposed to M4V, which contains video).
          </p>
          <p className="leading-relaxed mt-3">
            When an iPhone records a voice memo, it saves as M4A. When you export audio from
            GarageBand, you get M4A. When you purchased music from iTunes (before Apple Music),
            it was often an M4A file — sometimes with DRM (FairPlay), which restricted which
            devices could play it. DRM-protected M4A files cannot be converted.
            Non-DRM M4A files convert normally.
          </p>
          <p className="leading-relaxed mt-3">
            Some software and devices display .aac and .m4a interchangeably because they
            decode identically. Others treat them as different formats because the container
            differs. If a tool rejects your M4A, renaming it to .aac sometimes works — the
            audio content is the same.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where MP3 still wins</h2>
          <p className="leading-relaxed">
            MP3 is older than AAC and technically less efficient — but it has three decades
            of universal support built into virtually every piece of hardware and software
            that handles audio.
          </p>
          <p className="leading-relaxed mt-3">
            The cases where MP3 is clearly better than AAC/M4A:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>Legacy car audio systems.</strong> Many older in-car entertainment units
              support MP3 from USB or CD but don't handle AAC or M4A.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>Older hardware devices.</strong> MP3 players from before 2010 often
              only support MP3. Many voice recorders, DJ controllers, and media players have
              MP3 as their primary or only format.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>Wide platform compatibility.</strong> Any software, online tool, or
              platform that processes audio files will accept MP3. AAC is broadly supported
              but occasionally causes issues with older tools or less common environments.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span><strong>Sharing without assumptions.</strong> If you don't know what the
              recipient's setup is, MP3 is the safe choice.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where AAC/M4A is better</h2>
          <p className="leading-relaxed">
            AAC has better audio quality per bit at low bitrates (128 kbps and below). If
            you're encoding for a constrained bandwidth environment — older streaming services,
            podcast distribution with tight size limits, voice-optimised clips — AAC at
            128 kbps will sound noticeably better than MP3 at 128 kbps.
          </p>
          <p className="leading-relaxed mt-3">
            AAC is also the native format for Apple's ecosystem. If files will primarily be
            played on iPhones, iPads, Macs, Apple TV, or through iTunes, M4A works without
            any conversion. Apple devices support it natively in every player, editor, and
            audio tool.
          </p>
          <p className="leading-relaxed mt-3">
            Most modern streaming platforms and operating systems support AAC without issue.
            The gap between AAC and MP3 compatibility has narrowed significantly since 2015.
            On modern Android, Windows, and web browsers, AAC plays natively.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Converting between them</h2>
          <p className="leading-relaxed">
            Converting M4A to MP3 is straightforward and common — it's the solution when
            you have iPhone voice memos or iTunes downloads that won't play on older hardware.
            The conversion involves one re-encode (AAC → MP3), which causes a small quality
            loss. At 192 kbps or 320 kbps output, the result is indistinguishable from the
            source for most listeners.
          </p>
          <p className="leading-relaxed mt-3">
            Converting AAC to MP3 at very low bitrates (128 kbps or below) will produce
            more audible quality loss, because you're re-encoding an already-lossy file.
            Use the highest output bitrate that's practical for your use case.
          </p>
          <p className="leading-relaxed mt-3">
            If the M4A is DRM-protected (purchased from iTunes before 2009, or downloaded
            from Apple Music for offline listening), it cannot be converted. The DRM prevents
            any tool from decoding the audio. You'll need to either use Apple's own export
            tools or obtain a DRM-free version of the file.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The practical summary</h2>
          <ul className="space-y-2">
            {[
              ['Using Apple devices exclusively?', 'Stay with M4A (AAC). It works natively everywhere in the Apple ecosystem.'],
              ['Need files to work on any device?', 'Convert to MP3. Universal compatibility, no surprises.'],
              ['Encoding at low bitrates (128 kbps)?', 'AAC is audibly better than MP3 at this bitrate.'],
              ['Encoding at 192 kbps or higher?', 'Both are fine. Choose based on compatibility needs.'],
              ['File is DRM-protected M4A?', 'Cannot be converted by any conversion tool.'],
            ].map(([q, a]) => (
              <li key={q} className="flex gap-3">
                <span className="text-brand flex-shrink-0 font-bold">Q</span>
                <div>
                  <p className="font-medium text-gray-800">{q}</p>
                  <p className="text-gray-600 leading-relaxed mt-0.5">{a}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/m4a-to-mp3', label: 'M4A to MP3', note: 'iPhone files, iTunes downloads'    },
          { href: '/aac-to-mp3', label: 'AAC to MP3', note: 'Raw AAC to universal MP3'           },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/how-bitrate-affects-file-size-and-sound', label: 'How Bitrate Affects Quality'      },
          { href: '/learn/when-mp3-is-good-enough',                 label: 'When MP3 Is Good Enough'          },
          { href: '/formats/aac',                                   label: 'AAC format guide'                  },
          { href: '/formats/m4a',                                   label: 'M4A format guide'                  },
          { href: '/formats/mp3',                                   label: 'MP3 format guide'                  },
        ]}
      />

      <LastUpdated date="2026-03-25" />

    </div>
  );
}
