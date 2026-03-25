import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'Why Some Audio Files Fail to Convert',
  description:
    'Conversion failures have specific causes. Understanding which one applies determines whether a fix exists — and what it is. A diagnostic guide to the most common failure types.',
};

export default function WhyAudioFilesFailPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/learn" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← Learn
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Troubleshooting</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Why Some Audio Files Fail to Convert
        </h1>
      </div>

      <QuickAnswer>
        Most conversion failures fall into one of four categories: the file is corrupt or
        incomplete, the file is DRM-protected, the actual codec inside the file isn't what
        the extension suggests, or the file exceeds a size or format limit. Which category
        you're in determines whether a fix exists.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What conversion actually does</h2>
          <p className="leading-relaxed">
            To understand why files fail, it helps to know what a converter is trying to do.
            The process has two steps: decode the input (read the compressed audio and
            reconstruct the raw PCM waveform) and encode the output (compress that raw audio
            into the target format).
          </p>
          <p className="leading-relaxed mt-3">
            Failures happen mostly in the decode step — when the converter tries to read the
            input file and can't. The encoder rarely fails; encoding from valid PCM audio is
            a well-understood operation. The problem is almost always in what's in the source
            file, or what's protecting it from being read.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Corrupt or incomplete files</h2>
          <p className="leading-relaxed">
            The most common cause of conversion failure. A corrupt file has damaged or
            missing data that prevents the decoder from reading the audio correctly.
          </p>
          <p className="leading-relaxed mt-3">
            Corruption happens in several ways: a file that was partially downloaded (the
            download stopped before it completed), a file that was saved incorrectly during
            recording, a file that was transferred with errors (bad USB drive, interrupted
            Bluetooth transfer), or a file that has been damaged by storage failure.
          </p>
          <p className="leading-relaxed mt-3">
            The tell: your media player may also struggle with the file — skipping, refusing
            to load, or showing incorrect duration. If a file won't play reliably, it
            probably won't convert reliably either.
          </p>
          <p className="leading-relaxed mt-3">
            The fix: get a clean copy of the file. Re-download it, re-export it from the
            source application, or re-transfer it from the original device. Corrupt files
            cannot generally be repaired unless specific recovery software is used for the
            exact failure type.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. DRM-protected files</h2>
          <p className="leading-relaxed">
            DRM (Digital Rights Management) is encryption applied to a file to prevent
            unauthorised copying or conversion. A DRM-protected file cannot be decoded by a
            conversion tool because the tool doesn't have the decryption key.
          </p>
          <p className="leading-relaxed mt-3">
            Common sources of DRM-protected files:
          </p>
          <ul className="space-y-1.5 mt-2">
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>Music purchased from iTunes before 2009 (Apple's FairPlay DRM)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>Apple Music downloads saved for offline listening (encrypted M4A)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>Spotify, Tidal, and other streaming service offline downloads</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>Audiobooks from Audible (.aax or .aa format)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand flex-shrink-0">→</span>
              <span>WMA files with PlaysForSure DRM from older Windows-era services</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            The tell: the file appears to load but the converter returns an error about being
            unable to read the audio, or the output file is empty or silent. Your media player
            may play it fine (because it has the key) while the converter cannot.
          </p>
          <p className="leading-relaxed mt-3">
            The fix: there isn't one through a conversion tool. DRM-protected files require
            the authorised playback software. If you purchased a file and want a DRM-free
            version, look for DRM-free re-downloads from the original store, or use the
            vendor's official export tools where available.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. The codec inside doesn't match the extension</h2>
          <p className="leading-relaxed">
            File extensions are labels, not guarantees. A file named{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">.mp4</code> might
            contain H.264 video with AAC audio, or HEVC video with Opus audio, or
            just audio with no video track. A{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">.ogg</code> file
            usually contains Vorbis audio, but could contain Opus, FLAC, or Speex. An{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">.m4a</code> file
            usually contains AAC, but could contain Apple Lossless (ALAC).
          </p>
          <p className="leading-relaxed mt-3">
            Conversion tools look at the actual codec data inside the file, not just the
            extension. If the tool doesn't support the codec it finds — or if the file
            contains an unusual variant of a codec — the decode step fails.
          </p>
          <p className="leading-relaxed mt-3">
            This is more common with files from unusual sources: game audio exports, files
            downloaded from obscure platforms, files produced by niche recording software, or
            files where the extension was manually changed without re-encoding.
          </p>
          <p className="leading-relaxed mt-3">
            The tell: the file plays fine in a versatile player like VLC (which supports
            nearly every codec), but conversion fails. This suggests the codec is valid but
            unusual — and the converter doesn't support it.
          </p>
          <p className="leading-relaxed mt-3">
            The fix: identify the actual codec using a tool like MediaInfo (free, shows the
            true codec, bitrate, sample rate, and container). Then find a converter that
            explicitly supports that codec. Alternatively, play the file in VLC and use
            VLC's own audio export function to produce a standard WAV, then convert from that.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. File size limits</h2>
          <p className="leading-relaxed">
            Online conversion tools have file size limits for practical reasons — server
            storage, processing time, and bandwidth. If your file exceeds the limit, it
            will be rejected before conversion begins.
          </p>
          <p className="leading-relaxed mt-3">
            QuickAudioConvert currently accepts files up to 200 MB. This covers most audio
            files — even a 90-minute WAV recording at CD quality is around 900 MB, which
            would exceed this. Very long recordings, full album WAV rips, or uncompressed
            multi-track exports may need to be split before upload.
          </p>
          <p className="leading-relaxed mt-3">
            The fix for large files: trim the recording to just the section you need, then
            convert. Tools like Audacity (free, all platforms) and VLC (free, all platforms)
            can trim or split audio files without re-encoding, preserving quality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Unusual sample rates or channel configurations</h2>
          <p className="leading-relaxed">
            Standard audio uses 44.1 kHz or 48 kHz sample rates and mono or stereo channel
            configurations. Files from professional audio equipment, certain video game
            audio engines, or specialist recording setups sometimes use unusual configurations:
            96 kHz, 192 kHz, 5.1 surround, or multi-channel formats.
          </p>
          <p className="leading-relaxed mt-3">
            MP3 has specific limits: it doesn't support sample rates above 48 kHz, and it
            doesn't support more than two channels natively. Converting a 96 kHz or surround
            file to MP3 requires the converter to downsample and downmix — which most tools
            handle, but some older or simpler converters don't.
          </p>
          <p className="leading-relaxed mt-3">
            The tell: the file is from a professional source, a video game extraction tool,
            or a high-definition audio download. Converting to WAV first (which handles most
            sample rates and channel configurations) and then to MP3 often resolves this.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Diagnosing which problem you have</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Symptom</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Likely cause</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Fix available?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['File won\'t play in any player',          'Corrupt file',              'Get a clean copy'],
                  ['Plays in Apple Music, not in converter',  'DRM protection',            'No — needs authorised software'],
                  ['Plays in VLC, fails to convert',         'Unsupported codec variant',  'Use VLC to export as WAV, then convert'],
                  ['Rejected before upload completes',        'File too large',            'Trim or split the file first'],
                  ['Plays everywhere, silent output',        'DRM or corrupt headers',     'Get original source file'],
                  ['Converts but output sounds wrong',       'Unusual sample rate/channels', 'Convert to WAV first, then to MP3'],
                ].map(([symptom, cause, fix]) => (
                  <tr key={symptom} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-700">{symptom}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{cause}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 text-xs">{fix}</td>
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
          { href: '/mp4-to-mp3',  label: 'MP4 to MP3',  note: 'Extract audio from video files'  },
          { href: '/m4a-to-mp3',  label: 'M4A to MP3',  note: 'iPhone and iTunes files'         },
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Compress large WAV files'        },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/aac-m4a-mp3-what-matters', label: 'AAC, M4A, and MP3: What Matters'    },
          { href: '/formats/aac',                    label: 'AAC format guide'                    },
          { href: '/formats/m4a',                    label: 'M4A format guide'                    },
        ]}
      />

      <LastUpdated date="2026-03-25" />

    </div>
  );
}
