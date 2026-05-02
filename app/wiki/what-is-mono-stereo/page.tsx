import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';
import JsonLd from '@/components/seo/JsonLd';
import { articleSchema } from '@/lib/seo';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'What Is Mono vs Stereo Audio? When One Channel Is Better Than Two',
  description:
    'Mono is one channel. Stereo is two. Stereo sounds wider — but for voice, podcasts, and phone playback, mono is often the better choice. Here\'s the full breakdown.',
  alternates: {
    canonical: '/wiki/what-is-mono-stereo',
  },
  openGraph: {
    title: 'What Is Mono vs Stereo Audio? When One Channel Is Better Than Two',
    description:
      'Mono is one channel. Stereo is two. Stereo sounds wider — but for voice, podcasts, and phone playback, mono is often the better choice. Here\'s the full breakdown.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Mono vs Stereo Audio? When One Channel Is Better Than Two',
    description:
      'Mono is one channel. Stereo is two. Stereo sounds wider — but for voice, podcasts, and phone playback, mono is often the better choice. Here\'s the full breakdown.',
  },
};

export default function WhatIsMonoStereoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <JsonLd
        data={articleSchema({
          headline: "What Is Mono vs Stereo Audio? When One Channel Is Better Than Two",
          description: "Mono is one channel. Stereo is two. Stereo sounds wider — but for voice, podcasts, and phone playback, mono is often the better choice. Here's the full breakdown.",
          path: "/wiki/what-is-mono-stereo",
          datePublished: "2026-02-01",
          dateModified: "2026-04-28",
        })}
      />
      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Fundamentals</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Mono vs Stereo?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        <strong>Mono</strong> is one audio channel — the same signal plays from every speaker.
        <strong> Stereo</strong> is two independent channels (left and right) — different content
        can play from each side, creating a spatial image. Stereo is not always better. For voice
        recordings, podcasts, and phone playback, mono is often the right choice.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What a channel is</h2>
          <p className="leading-relaxed">
            An audio channel is a single stream of audio data. When a recording has one channel,
            every playback device — one speaker, two speakers, headphones — receives the exact
            same signal. When a recording has two channels, the left channel and right channel
            can carry different audio information.
          </p>
          <p className="leading-relaxed mt-3">
            In headphones, stereo audio means different sounds can appear in your left ear and
            your right ear. In speakers, stereo allows sounds to appear to come from different
            positions across the space between the speakers. This is called the stereo image.
          </p>
        </section>

        {/* Diagram */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mono vs stereo — visually</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-bold text-gray-900 text-sm mb-3 text-center">Mono</p>
              <div className="flex justify-center items-center gap-6">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-brand/20 border-2 border-brand/40 flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs text-brand font-bold">L</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-brand/80 border-2 border-brand flex items-center justify-center mx-auto mb-1">
                    <span className="text-sm text-white font-bold">1ch</span>
                  </div>
                  <p className="text-xs text-gray-500">source</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-brand/20 border-2 border-brand/40 flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs text-brand font-bold">R</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">Both speakers play the same signal</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-bold text-gray-900 text-sm mb-3 text-center">Stereo</p>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs text-blue-700 font-bold">L</span>
                  </div>
                  <p className="text-xs text-gray-500">ch 1</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs text-gray-600 font-bold">↔</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs text-green-700 font-bold">R</span>
                  </div>
                  <p className="text-xs text-gray-500">ch 2</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">Each speaker can carry different audio</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">File size: stereo is exactly double</h2>
          <p className="leading-relaxed">
            A stereo audio file contains two channels of audio data. Everything else being equal
            (same format, same bitrate or sample rate, same duration), a stereo file is exactly
            twice the size of a mono file.
          </p>
          <p className="leading-relaxed mt-3">
            For a WAV file at 44.1 kHz / 16-bit: mono is ~5 MB per minute; stereo is ~10 MB per
            minute. For an MP3 at 192 kbps: mono encodes at 96 kbps per channel (or you can
            encode at full 192 kbps for better quality in one channel); stereo at 192 kbps splits
            the bitrate budget across both channels.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mono vs stereo — when to use each</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Use case</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Recommended</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Reason</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Podcast (voice only)',       'Mono', 'Voice is inherently mono; stereo wastes half the bitrate budget'],
                  ['Music with spatial elements', 'Stereo', 'Instruments, reverb, panning all benefit from stereo image'],
                  ['Phone calls / voice messages','Mono', 'Devices and networks handle mono; stereo adds no benefit'],
                  ['Field recordings',            'Stereo', 'Captures spatial ambience; left-right separation is meaningful'],
                  ['Radio / broadcast voice',     'Mono', 'Traditional broadcast standard; wide device compatibility'],
                  ['Binaural / 3D audio',         'Stereo (binaural)', 'Headphone listening; spatial positioning via phase'],
                  ['Video voice-over',            'Mono', 'Centred in the stereo field; mixing easier from mono source'],
                  ['Electronic music',            'Stereo', 'Wide synths, stereo delays, panned elements'],
                ].map(([use, rec, reason]) => (
                  <tr key={use} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 text-gray-700">{use}</td>
                    <td className={`p-3 border border-gray-200 font-semibold ${rec === 'Mono' ? 'text-gray-800' : 'text-brand'}`}>{rec}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The dual-mono mistake</h2>
          <p className="leading-relaxed">
            Dual-mono means a stereo file where both channels carry identical audio. It's common
            when a voice recording is made with a single microphone, then exported as stereo —
            the same mono signal gets duplicated into both channels. The file is twice the size
            of a true mono file, the stereo image has no width, and you get no benefit from
            the second channel.
          </p>
          <p className="leading-relaxed mt-3">
            If you're recording voice and you don't have a genuine stereo source, export as mono.
            Check your recording software — many DAWs default to stereo even when the input
            is mono.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mono compatibility in music production</h2>
          <p className="leading-relaxed">
            Professional mix engineers always check their stereo mix in mono before signing off.
            Why? Many listening environments collapse stereo to mono: smartphones playing through
            a single speaker, Bluetooth speakers, some earbuds, car audio in mono mode, club PA
            systems.
          </p>
          <p className="leading-relaxed mt-3">
            Phase issues — where the left and right channels have content that partially cancels
            each other out when summed to mono — can cause elements to disappear or thin out
            dramatically when played back in mono. A mix that sounds wide and full in stereo can
            sound hollow in mono if this isn't addressed. Checking mono compatibility is a
            professional standard, not an edge case.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Mono WAV stays mono; stereo WAV stays stereo — channel layout preserved' },
          { href: '/flac-to-mp3', label: 'FLAC to MP3', note: 'Stereo FLAC converts to stereo MP3 — no channel downmix' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-loudness',      label: 'What Is Loudness?'      },
          { href: '/wiki/what-is-audio-quality', label: 'What Is Audio Quality?' },
          { href: '/wiki/what-is-bitrate',       label: 'What Is Bitrate?'       },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/best-audio-format-for-podcasting', label: 'Best Audio Format for Podcasting' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
