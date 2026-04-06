import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is an OGG File? OGG Format Explained',
  description:
    'An OGG file is typically OGG Vorbis — an open-source, royalty-free audio format comparable in quality to MP3. Common in PC games, Linux, and open-source software. Here\'s how it compares to MP3 and AAC, and when to convert it.',
  alternates: {
    canonical: '/wiki/what-is-ogg',
  },
  openGraph: {
    title: 'What Is an OGG File? OGG Format Explained',
    description:
      'An OGG file is typically OGG Vorbis — an open-source, royalty-free audio format comparable in quality to MP3. Common in PC games, Linux, and open-source software. Here\'s how it compares to MP3 and AAC, and when to convert it.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is an OGG File? OGG Format Explained',
    description:
      'An OGG file is typically OGG Vorbis — open-source, royalty-free audio comparable to MP3. Common in games and Linux. Here\'s how it compares and when to convert.',
  },
};

export default function WhatIsOggPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Format Guides</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is an OGG File?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        An <strong>OGG file (.ogg)</strong> is almost always OGG Vorbis — an open-source,
        royalty-free container format developed by Xiph.Org, holding Vorbis audio: a lossy codec
        comparable in quality to MP3 and AAC. OGG is widely used in PC games (Minecraft, Godot,
        Unity), Linux audio, and open-source applications, but has limited support on hardware
        devices and the Apple ecosystem. If you need to play an OGG file on an iPhone or a car
        stereo, you'll need to convert it first.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">OGG the container, Vorbis the codec</h2>
          <p className="leading-relaxed">
            OGG is technically a container format — a file wrapper that can hold different types of
            audio and video content. The most common pairing is OGG + Vorbis audio, which is why
            the combination is often called "OGG Vorbis" and files use the .ogg extension.
          </p>
          <p className="leading-relaxed mt-3">
            The same OGG container can also hold FLAC audio (.oga extension), Opus audio (.opus
            extension), or Theora video. But the everyday usage of "OGG file" almost always means
            OGG Vorbis — a lossy compressed audio file with quality comparable to MP3 at the same
            bitrate.
          </p>
          <p className="leading-relaxed mt-3">
            Vorbis, the codec, was designed as a royalty-free alternative to MP3 at a time when
            MP3's patent status was uncertain and license fees were required for commercial use. MP3
            patents expired in 2017 in most jurisdictions, but the royalty-free ethos of OGG Vorbis
            kept it popular in open-source software regardless.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Audio quality compared to MP3 and AAC</h2>
          <p className="leading-relaxed">
            Vorbis quality is broadly comparable to AAC and slightly better than MP3 at equivalent
            bitrates. Vorbis uses a variable bitrate (VBR) encoding model by default — rather than
            specifying a bitrate in kbps, Vorbis uses a quality scale from -1 to 10, where quality 5
            (approximately 160 kbps average) is considered the standard recommendation.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Vorbis quality</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Approx. bitrate</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['q2', '~96 kbps',  'Voice, podcasts, casual music listening'],
                  ['q4', '~128 kbps', 'General music — transparent for most listeners'],
                  ['q5', '~160 kbps', 'Recommended default — good balance of size and quality'],
                  ['q7', '~220 kbps', 'High-quality music — excellent transparency'],
                  ['q9', '~320 kbps', 'Near-lossless — maximum Vorbis quality'],
                ].map(([q, bitrate, use]) => (
                  <tr key={q} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{q}</td>
                    <td className="p-3 border border-gray-200 font-mono text-xs text-gray-700">{bitrate}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where OGG is used</h2>
          <p className="leading-relaxed">
            OGG Vorbis found its largest user base in PC game audio. Games like Minecraft, World of
            Warcraft, and many indie titles store their sound effects, music, and ambient tracks as
            OGG files inside the game data. The royalty-free license made it the practical choice for
            developers building cross-platform games before AAC support was universal.
          </p>
          <p className="leading-relaxed mt-3">
            Outside gaming, OGG is common in:
          </p>
          <ul className="space-y-1 mt-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Linux audio:</span>
              <span>Many Linux distributions default to OGG for audio playback and music libraries. Banshee, Rhythmbox, and other Linux music players support OGG natively.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Open-source software:</span>
              <span>Applications built on GPL or similar licenses often prefer OGG because it has no patent encumbrances and no third-party dependencies to manage.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Web audio (older):</span>
              <span>HTML5 audio originally required OGG support because Firefox and Chrome couldn't agree on MP3 licensing. Modern browsers now support both MP3 and AAC natively, reducing OGG's web use.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility: where OGG falls short</h2>
          <p className="leading-relaxed">
            OGG has a clear hardware compatibility problem. Apple devices — iPhone, iPad, Mac — do
            not natively support OGG Vorbis. iTunes won't import it. iOS won't play it without a
            third-party app. This rules out a significant portion of mobile devices.
          </p>
          <p className="leading-relaxed mt-3">
            Car stereos, portable audio players, and most consumer electronics that play MP3 or AAC
            don't support OGG. The format is essentially a software-first codec — well-supported in
            desktop browsers, Linux, and PC games, but poorly supported outside those environments.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Platform</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">OGG support</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Windows (browser/media players)', 'Good — Chrome, Firefox, VLC, foobar2000'],
                  ['Android',                          'Native — built into the OS'],
                  ['macOS / iOS',                      'Not native — third-party apps required'],
                  ['Linux',                            'Excellent — native, often the default format'],
                  ['PC games',                         'Excellent — widely adopted in game audio'],
                  ['Car stereos / hardware players',   'Rare — most hardware supports MP3/AAC only'],
                  ['Smart speakers',                   'Limited — varies by device and service'],
                ].map(([platform, support]) => (
                  <tr key={platform} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-700">{platform}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 text-xs">{support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">OGG vs Opus: the newer alternative</h2>
          <p className="leading-relaxed">
            <Link href="/wiki/what-is-opus" className="underline hover:text-brand transition-colors">
              Opus
            </Link>{' '}
            is the newer Xiph.Org codec that supersedes Vorbis for most purposes. Opus handles
            both voice and music, achieves better quality at lower bitrates than Vorbis, and is
            standardised by the IETF as the audio codec for WebRTC (real-time communication on the
            web). Opus is also stored in OGG containers — .opus files are OGG + Opus audio.
          </p>
          <p className="leading-relaxed mt-3">
            For new projects requiring a royalty-free codec, Opus is the better choice over Vorbis.
            OGG Vorbis remains relevant where software already supports it and migrating isn't
            worthwhile — particularly in existing game audio systems built around Vorbis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert OGG files</h2>
          <p className="leading-relaxed">
            The most common reason to convert an OGG file is compatibility. If you've extracted
            audio from a game, downloaded something from a Linux system, or received a file from an
            open-source application,{' '}
            <Link href="/ogg-to-mp3" className="underline hover:text-brand transition-colors">
              converting OGG to MP3
            </Link>{' '}
            makes it playable on any device.
          </p>
          <p className="leading-relaxed mt-3">
            Converting OGG to MP3 involves decoding the Vorbis codec and re-encoding to MP3 —
            a lossy-to-lossy conversion that introduces a small quality cost. If the source file
            is high quality (q5 or above) and you're encoding to MP3 at 192 kbps or higher, the
            result will still be good. If the source is already low-quality, the re-encode will
            compound the existing artifacts.
          </p>
          <p className="leading-relaxed mt-3">
            Going the other direction — converting WAV or MP3 to OGG — is common in game
            development. If you're building in Godot, Unity, or another engine that prefers OGG
            for streaming audio, you can{' '}
            <Link href="/wav-to-ogg" className="underline hover:text-brand transition-colors">
              convert WAV to OGG
            </Link>{' '}
            or{' '}
            <Link href="/mp3-to-ogg" className="underline hover:text-brand transition-colors">
              convert MP3 to OGG
            </Link>{' '}
            to get royalty-free, game-ready audio files.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">What is the difference between OGG and MP3?</h3>
              <p className="leading-relaxed">
                Both are lossy compressed formats with similar file sizes at equivalent bitrates.
                OGG Vorbis is royalty-free and open-source; MP3 has broader hardware support. For
                game engines (Godot, Unity) and Linux, OGG is often the preferred format. For
                universal playback on hardware devices and car stereos, MP3 is the safer choice.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Can iPhones or Macs play OGG files?</h3>
              <p className="leading-relaxed">
                No — Apple devices do not natively support OGG Vorbis. iOS won't play an OGG file
                without a third-party app, and iTunes won't import OGG. To use an OGG file on Apple
                devices, convert it to MP3 or AAC first.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Is OGG better quality than MP3?</h3>
              <p className="leading-relaxed">
                OGG Vorbis is slightly more efficient than MP3, meaning it can achieve similar quality
                with a smaller file size at comparable bitrates. In practice, at common listening
                bitrates (160 kbps and above), the difference is negligible for most listeners.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">What programs open OGG files?</h3>
              <p className="leading-relaxed">
                VLC, foobar2000, and most modern desktop browsers (Chrome, Firefox) open OGG files
                natively. Windows Media Player does not support OGG by default. iTunes and macOS
                Finder require conversion or a third-party plugin.
              </p>
            </div>
          </div>
        </section>

      </div>

      <RelatedContent
        title="Convert OGG files"
        items={[
          { href: '/ogg-to-mp3',  label: 'OGG to MP3',  note: 'Convert for universal compatibility'          },
          { href: '/wav-to-ogg',  label: 'WAV to OGG',  note: 'For game engines and Linux audio pipelines'   },
          { href: '/mp3-to-ogg',  label: 'MP3 to OGG',  note: 'Convert to royalty-free format'               },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-opus',          label: 'What Is Opus?'           },
          { href: '/wiki/what-is-mp3',           label: 'What Is MP3?'            },
          { href: '/wiki/what-is-aac',           label: 'What Is AAC?'            },
          { href: '/wiki/what-is-lossy-audio',   label: 'What Is Lossy Audio?'    },
          { href: '/wiki/codec-vs-container',    label: 'Codec vs Container'      },
          { href: '/wiki/cbr-vs-vbr',            label: 'CBR vs VBR'              },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
