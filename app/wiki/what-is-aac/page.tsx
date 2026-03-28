import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is AAC? The Codec Inside M4A Files Explained',
  description:
    'AAC (Advanced Audio Coding) is a lossy codec that sounds better than MP3 at the same bitrate. It\'s inside every M4A file, used by Apple Music, YouTube, and most streaming platforms.',
};

export default function WhatIsAacPage() {
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
          What Is AAC?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        AAC (Advanced Audio Coding) is a <strong>lossy audio codec</strong> designed as the
        successor to MP3. It achieves better audio quality than MP3 at the same bitrate — or
        equal quality at a lower bitrate. AAC is the codec inside every M4A file, the default
        format for iTunes, Apple Music, and iOS devices, and the audio codec used by YouTube
        and most major streaming services.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AAC vs MP3: what actually changed</h2>
          <p className="leading-relaxed">
            MP3 was standardised in 1993. AAC followed in 1997 as part of the MPEG-2 standard,
            then improved further under MPEG-4. The goal was to fix the known limitations of MP3:
            better handling of high frequencies, improved stereo coding, support for up to 48
            channels, and a more efficient psychoacoustic model.
          </p>
          <p className="leading-relaxed mt-3">
            The practical result is measurable: AAC typically matches MP3 quality at about 70% of
            the bitrate. A 128 kbps AAC file generally sounds better than a 128 kbps MP3. A 256 kbps
            AAC file is considered transparent (indistinguishable from the original) by most listeners
            — the same threshold for MP3 sits closer to 320 kbps.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The AAC family: LC, HE, HEv2</h2>
          <p className="leading-relaxed">
            "AAC" refers to a family of profiles, not a single codec. The three most common are:
          </p>
          <div className="space-y-3 mt-3">
            {[
              {
                title: 'AAC-LC (Low Complexity)',
                body: 'The standard profile used for music and general audio. What you get when you encode to AAC in iTunes, Adobe Audition, or most converters. Best quality at mid-to-high bitrates (96–320 kbps).',
              },
              {
                title: 'HE-AAC (High Efficiency, v1)',
                body: 'Adds Spectral Band Replication (SBR) — a technique that encodes the upper frequencies separately at very low cost. Used for streaming and broadcast at bitrates from 32–128 kbps. Sounds dramatically better than AAC-LC at low bitrates.',
              },
              {
                title: 'HE-AAC v2',
                body: 'Adds Parametric Stereo on top of HE-AAC v1 — encodes stereo information as a single mono channel with spatial parameters. Used for very-low-bitrate streaming (16–48 kbps). Common in digital radio and internet radio broadcasting.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
                <p className="text-sm text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AAC and M4A: container vs codec</h2>
          <p className="leading-relaxed">
            AAC is the codec — the compression algorithm. M4A is the container — the file wrapper.
            An M4A file almost always contains AAC audio, but the file extension and the codec
            are technically separate things. The same AAC audio can also be stored in an MP4
            container (common for video with audio) or in an ADTS stream (.aac file extension).
          </p>
          <p className="leading-relaxed mt-3">
            This matters practically: when you convert an M4A file to MP3, you're decoding the
            AAC codec, discarding the M4A container, re-encoding to MP3, and wrapping it in an
            MP3 container. You're changing both the codec and the container in one step.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bitrate guide for AAC</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Bitrate</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Profile</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Quality</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['32–64 kbps',  'HE-AAC v2', 'Acceptable for voice',         'Internet radio, voice streaming'],
                  ['64–96 kbps',  'HE-AAC',    'Good for music streaming',     'Low-bandwidth streaming, podcasts'],
                  ['128 kbps',    'AAC-LC',    'Transparent for most — better than 128k MP3', 'General music distribution'],
                  ['192–256 kbps','AAC-LC',    'Transparent — indistinguishable by most listeners', 'Streaming platforms, downloads'],
                  ['320 kbps',    'AAC-LC',    'Maximum quality',               'Archiving lossy masters, audiophile use'],
                ].map(([bitrate, profile, quality, use]) => (
                  <tr key={bitrate} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{bitrate}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{profile}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{quality}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where AAC is used</h2>
          <p className="leading-relaxed">
            AAC is the dominant codec in the Apple ecosystem — every song on Apple Music, every
            audio track in a video purchased from iTunes, every voice memo recorded on an iPhone
            is AAC. iOS and macOS treat AAC as the default lossy codec.
          </p>
          <p className="leading-relaxed mt-3">
            Beyond Apple, AAC is the audio track format for most MP4 video, the codec used by
            YouTube (typically 128–256 kbps AAC-LC), and the audio format for DAB+ digital
            radio (HE-AAC). Android has supported AAC natively since version 3.1. Most modern
            Bluetooth headphones support AAC as a high-quality Bluetooth audio codec alongside SBC.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to use AAC and when to use MP3</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Use AAC when:</span>
              <span>You're in the Apple ecosystem, uploading to YouTube or a streaming platform, or distributing to devices manufactured after 2010 where AAC support is near-universal.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Use MP3 when:</span>
              <span>Compatibility is the priority — sharing with unknown recipients, uploading to services that specifically request MP3, or targeting legacy hardware (car stereos, old MP3 players) that may not support AAC.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Use neither when:</span>
              <span>Archiving or editing. Both AAC and MP3 are lossy — they discard audio data permanently. Use FLAC or WAV for anything you'll need to re-edit or re-export at full quality.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Converting to and from AAC</h2>
          <p className="leading-relaxed">
            Converting a lossless source (WAV, FLAC) to AAC produces a clean result at the chosen
            bitrate — no generation loss, no accumulated artifacts. This is the correct way to
            produce a distribution copy from an archive master.
          </p>
          <p className="leading-relaxed mt-3">
            Converting AAC to MP3 (or any other lossy format) involves decoding the AAC and
            re-encoding to MP3. Both codecs introduce their own artifacts, and the re-encoding
            step compounds them — the output will be lower quality than either a direct MP3 encode
            or the original AAC. Do this only when a specific format is required and no lossless
            source is available.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Convert AAC files"
        items={[
          { href: '/aac-to-mp3',  label: 'AAC to MP3',  note: 'Convert AAC for universal compatibility' },
          { href: '/m4a-to-mp3',  label: 'M4A to MP3',  note: 'M4A (AAC) to MP3 — same codec conversion' },
          { href: '/wav-to-aac',  label: 'WAV to AAC',  note: 'Encode lossless WAV to AAC' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Lossless FLAC to lossy distribution format' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-mp3',             label: 'What Is MP3?'              },
          { href: '/wiki/what-is-lossy-audio',      label: 'What Is Lossy Audio?'     },
          { href: '/wiki/what-is-bitrate',          label: 'What Is Bitrate?'         },
          { href: '/wiki/codec-vs-container',       label: 'Codec vs Container'       },
          { href: '/wiki/what-is-audio-codec',      label: 'What Is an Audio Codec?'  },
          { href: '/wiki/what-is-transcoding',      label: 'What Is Transcoding?'     },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
