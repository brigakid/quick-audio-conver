import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema } from '@/lib/seo';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'What Is AC3? Dolby Digital Audio Format Guide',
  description:
    'AC3 (Dolby Digital) is a compressed multichannel audio format used in DVDs, Blu-rays, and broadcast media. Learn what AC3 is and how to convert AC3 files to MP3 or WAV.',
  alternates: {
    canonical: '/formats/ac3',
  },
  openGraph: {
    title: 'What Is AC3? Dolby Digital Audio Format Guide',
    description:
      'AC3 (Dolby Digital) is a compressed multichannel audio format used in DVDs, Blu-rays, and broadcast media. Learn what AC3 is and how to convert AC3 files to MP3 or WAV.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is AC3? Dolby Digital Audio Format Guide',
    description:
      'AC3 (Dolby Digital) is a compressed multichannel audio format used in DVDs, Blu-rays, and broadcast media. Learn what AC3 is and how to convert AC3 files to MP3 or WAV.',
  },
};

export default function Ac3FormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <JsonLd
        data={articleSchema({
          headline: "What Is AC3? Dolby Digital Audio Format Guide",
          description: "AC3 (Dolby Digital) is a compressed multichannel audio format used in DVDs, Blu-rays, and broadcast media. Learn what AC3 is and how to convert AC3 files to MP3 or WAV.",
          path: "/formats/ac3",
          datePublished: "2026-02-01",
          dateModified: "2026-04-28",
        })}
      />
      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is AC3 (Dolby Digital)?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          AC3 is the Dolby Digital audio codec — a compressed multichannel audio format
          used in DVDs, Blu-rays, broadcast television, and many video files. Standalone
          AC3 files use the .ac3 extension and are commonly extracted from video containers.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',              'Lossy, multichannel'],
            ['File extension',    '.ac3'],
            ['Developed by',      'Dolby Laboratories'],
            ['Typical bitrate',   '128–640 kbps'],
            ['Channel support',   'Up to 5.1 surround (6 channels)'],
            ['Used in',           'DVD, Blu-ray, broadcast TV, VOB/MKV/TS files'],
          ].map(([label, value]) => (
            <div key={label} className="col-span-1">
              <dt className="text-xs text-gray-400">{label}</dt>
              <dd className="text-sm font-medium text-gray-800">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How it works</h2>
          <p className="leading-relaxed">
            Dolby Digital (AC-3) uses perceptual coding to compress audio by removing
            sounds that the human ear is less likely to notice — similar in principle to
            MP3, but designed for multichannel audio. It supports up to 5.1 channels:
            front left, front right, centre, rear left, rear right, and a subwoofer (LFE)
            channel.
          </p>
          <p className="leading-relaxed mt-3">
            AC3 is most commonly found embedded inside video container formats like VOB
            (DVD), MKV (Matroska), TS (MPEG transport stream), and MP4. The .ac3 extension
            is used when the audio track has been extracted as a standalone file, typically
            by a tool like MKVToolNix or HandBrake.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where AC3 files come from</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>DVD rips — AC3 is the standard audio format on DVD video</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Blu-ray discs (alongside DTS and Dolby TrueHD)</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Broadcast television recordings (ATSC, DVB)</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>MKV and VOB files with extracted audio tracks</li>
            <li className="flex gap-2"><span className="text-brand flex-shrink-0">—</span>Downloaded video files from streaming or disc ripping tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Industry standard for DVD and broadcast — extremely well-established</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Supports multichannel surround sound (5.1)</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Good quality at moderate bitrates (192–448 kbps)</li>
            <li className="flex gap-2"><span className="text-green-600 flex-shrink-0">+</span>Widely supported in home theatre receivers and AV equipment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Weaknesses</h2>
          <ul className="space-y-1.5">
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Lossy — audio quality is lower than lossless formats like WAV or FLAC</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Standalone .ac3 files not supported by most standard audio players</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Requires Dolby decoding hardware or software for full playback</li>
            <li className="flex gap-2"><span className="text-red-500 flex-shrink-0">−</span>Converting to stereo formats (MP3, WAV) discards surround channel separation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Converting AC3 to stereo</h2>
          <p className="leading-relaxed">
            When you convert an AC3 file to MP3 or WAV, the multichannel audio is
            automatically downmixed to stereo. Centre dialogue, front speakers, and rear
            channels are all blended into two output channels. The surround experience
            is lost, but the result is a stereo file that plays on any device without
            Dolby hardware.
          </p>
          <p className="leading-relaxed mt-3">
            If preserving multichannel audio is important, specialist video tools that
            support multichannel WAV output are a better choice than this converter.
          </p>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {[
          {
            q: 'Is AC3 the same as Dolby Digital?',
            a: 'Yes. AC-3 is the technical name for the codec; "Dolby Digital" is the brand name Dolby uses. Both refer to the same standard compressed multichannel audio format.',
          },
          {
            q: 'Why can\'t I play my .ac3 file in a standard audio player?',
            a: 'Standalone .ac3 files require a player or codec that supports Dolby Digital decoding. VLC handles .ac3 files directly. Most built-in system audio players (Windows Media Player, macOS QuickTime) do not. Converting to MP3 or WAV makes the file playable in any application.',
          },
          {
            q: 'Will converting AC3 to MP3 sound worse than the original?',
            a: 'Both AC3 and MP3 are lossy. Re-encoding from one lossy format to another does cause some additional quality loss. At 192 kbps MP3, the dialogue and general audio is still clear. For archiving or editing, convert to WAV instead, which avoids additional compression.',
          },
          {
            q: 'What is the difference between AC3 and DTS?',
            a: 'Both are compressed multichannel audio formats used in DVDs and Blu-rays. DTS generally uses a higher bitrate and is considered slightly better sounding at equivalent settings. AC3 is more compact and was the primary standard on DVD. Both are commonly found on disc releases.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert AC3"
        items={[
          { href: '/ac3-to-mp3', label: 'AC3 to MP3', note: 'Convert for standard playback' },
          { href: '/ac3-to-wav', label: 'AC3 to WAV', note: 'Convert for editing and post-production' },
        ]}
      />

      <RelatedContent
        title="Related guides"
        items={[
          { href: '/guides/extract-audio-from-video', label: 'How to Extract Audio from Video' },
        ]}
      />

      <LastUpdated date="2026-03-28" />

    </div>
  );
}
