import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  title: 'What Is Opus Audio? Voice, Music, and Low-Bitrate Quality Explained',
  description:
    'Opus is a modern, royalty-free audio codec that outperforms MP3 and AAC at low bitrates. It\'s used by Discord, WhatsApp, Zoom, and most WebRTC applications for voice and audio streaming.',
};

export default function WhatIsOpusPage() {
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
          What Is Opus?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Opus is a <strong>modern, royalty-free audio codec</strong> standardised by the IETF in
        2012. It handles both voice and music efficiently across a wide range of bitrates —
        from 6 kbps for voice calls to 510 kbps for high-quality music. At low bitrates, Opus
        significantly outperforms MP3 and AAC. It's the audio codec inside Discord, WhatsApp,
        Zoom, and most WebRTC applications.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What makes Opus different</h2>
          <p className="leading-relaxed">
            Most codecs are optimised for one task — MP3 and AAC for music, codecs like SILK
            (originally by Skype) for voice calls. Opus is unusual because it was designed to handle
            both, by combining two underlying encoding technologies:
          </p>
          <div className="space-y-3 mt-3">
            {[
              {
                title: 'SILK mode (voice)',
                body: 'Used at lower bitrates, primarily for speech. A predictive codec that models how the human voice works and encodes accordingly — very efficient for voice calls and spoken audio. Derived from the SILK codec developed at Skype.',
              },
              {
                title: 'CELT mode (music)',
                body: 'Used at higher bitrates or for general audio including music. A transform codec similar in approach to AAC and Vorbis — effective across a wide frequency range. Based on the CELT project from Xiph.Org.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
                <p className="text-sm text-gray-600">{body}</p>
              </div>
            ))}
          </div>
          <p className="leading-relaxed mt-4">
            Opus automatically switches between these modes and blends them as needed. A 24 kbps
            Opus stream handles voice well and manages music adequately. At 96–128 kbps, Opus
            produces music quality that matches or exceeds AAC at 192 kbps.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Opus quality at different bitrates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Bitrate</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Best for</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Comparable to</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['6–12 kbps',   'Narrowband voice (walkie-talkie quality)',     'Better than most codecs at this rate'],
                  ['16–24 kbps',  'Wideband voice — acceptable for voice calls',  'Matches HE-AAC for voice'],
                  ['32–64 kbps',  'Good voice, acceptable music',                 'Better than MP3 at same bitrate'],
                  ['64–96 kbps',  'Excellent voice, good music',                  'Matches or beats AAC-LC 128 kbps'],
                  ['96–128 kbps', 'Transparent music for most listeners',         'Comparable to AAC 192 kbps'],
                  ['160–192 kbps','Near-lossless music',                          'Competitive with FLAC perceptually'],
                ].map(([bitrate, use, compare]) => (
                  <tr key={bitrate} className="border-t border-gray-100">
                    <td className="p-3 border border-gray-200 font-medium text-gray-800">{bitrate}</td>
                    <td className="p-3 border border-gray-200 text-gray-600 text-xs">{use}</td>
                    <td className="p-3 border border-gray-200 text-gray-500 text-xs">{compare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where Opus is used</h2>
          <p className="leading-relaxed">
            Opus is the dominant codec for real-time audio communication on the internet. Its low
            latency, efficiency at voice bitrates, and royalty-free status made it the unanimous
            choice when the IETF standardised WebRTC — the technology behind in-browser voice and
            video calls.
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Discord:</span>
              <span>Uses Opus for all voice channels and video calls. Voice quality at 64 kbps Opus is notably better than older VoIP codecs at the same bitrate.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">WhatsApp and Telegram:</span>
              <span>Voice messages and calls use Opus. The .ogg files WhatsApp sends are OGG containers holding Opus audio.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Zoom and Google Meet:</span>
              <span>WebRTC-based video conferencing uses Opus for audio transmission.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Spotify and streaming:</span>
              <span>Some streaming services use Opus internally for adaptive bitrate streaming — especially at lower quality tiers where it outperforms AAC.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Web browsers:</span>
              <span>All modern browsers (Chrome, Firefox, Safari, Edge) support Opus in the MediaRecorder API and WebAudio. Recorded audio from browser APIs is often Opus in a WebM container.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Opus file formats and containers</h2>
          <p className="leading-relaxed">
            Opus audio is typically stored in one of two containers:
          </p>
          <div className="mt-3 bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Container formats for Opus</p>
            <div className="space-y-2">
              {[
                ['.opus / .ogg', 'OGG container holding Opus audio — the standard standalone file format. WhatsApp voice messages use this.'],
                ['.webm',        'WebM container with Opus audio — common in browser recordings, video with Opus audio track, YouTube.'],
              ].map(([ext, desc]) => (
                <div key={ext} className="flex gap-3">
                  <span className="font-mono text-xs bg-white border border-gray-200 rounded px-2 py-1 flex-shrink-0">{ext}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="leading-relaxed mt-4">
            The .opus extension is an OGG container specifically declared as holding Opus audio. It
            is functionally identical to an .ogg file with Opus content — the extension is just a
            convention that helps software identify the codec without reading the file header.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compatibility: better than OGG, not universal</h2>
          <p className="leading-relaxed">
            Opus has better native platform support than OGG Vorbis in most environments, but still
            falls short of MP3 and AAC for hardware compatibility.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Platform</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Opus support</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Web browsers',              'Excellent — all major browsers natively'],
                  ['Android',                   'Native support since Android 5.0 (2014)'],
                  ['iOS / macOS',               'Native since iOS 14 / macOS 11 (2020)'],
                  ['Windows Media Player',      'Not native — requires codec pack or third-party app'],
                  ['VLC, foobar2000',           'Full support'],
                  ['Car stereos / hardware',    'Very rare — most support MP3/AAC only'],
                  ['Real-time comms (WebRTC)',  'Universal — it is the WebRTC standard codec'],
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert Opus files</h2>
          <p className="leading-relaxed">
            The most common scenario: you've received a voice message from WhatsApp or Telegram
            (sent as .ogg or .opus), or extracted audio from a browser recording, and need it in
            a format your device or application can handle.
          </p>
          <p className="leading-relaxed mt-3">
            Converting Opus to MP3 gives you universal compatibility — the result plays on any
            device that plays MP3. As with any lossy-to-lossy conversion, encoding at a reasonable
            bitrate (192 kbps MP3 from a 64 kbps+ Opus source) keeps quality acceptable. Converting
            a very-low-bitrate Opus voice message (16–32 kbps) to MP3 at 128 kbps or higher will
            be limited by the quality of the source, not the encoding.
          </p>
          <p className="leading-relaxed mt-3">
            If you have a lossless source and want Opus for distribution or streaming, encode
            directly from FLAC or WAV. This avoids generation loss and gives you control over the
            output bitrate.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Convert Opus files"
        items={[
          { href: '/opus-to-mp3', label: 'Opus to MP3', note: 'Convert for universal device compatibility' },
          { href: '/ogg-to-mp3',  label: 'OGG to MP3',  note: 'OGG/Opus voice messages to MP3'            },
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'If you have a lossless source, start fresh' },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-ogg',           label: 'What Is OGG?'            },
          { href: '/wiki/what-is-aac',           label: 'What Is AAC?'            },
          { href: '/wiki/what-is-mp3',           label: 'What Is MP3?'            },
          { href: '/wiki/what-is-lossy-audio',   label: 'What Is Lossy Audio?'    },
          { href: '/wiki/what-is-bitrate',       label: 'What Is Bitrate?'        },
          { href: '/wiki/codec-vs-container',    label: 'Codec vs Container'      },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
