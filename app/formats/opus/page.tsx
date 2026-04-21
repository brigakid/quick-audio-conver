import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { articleSchema, faqPageSchema } from '@/lib/seo';

const FAQ_ITEMS = [
  {
    question: 'Is Opus better than MP3?',
    answer:
      'At any bitrate below 128 kbps, Opus sounds measurably better than MP3 — often dramatically so at low bitrates. At 96 kbps, Opus is comparable to MP3 at 192 kbps. MP3 only has one advantage: older hardware support.',
  },
  {
    question: 'Why can\u2019t I play .opus files on my iPhone?',
    answer:
      'iOS added native Opus support in iOS 17 (2023). On older versions, Opus files need a third-party player like VLC. For maximum compatibility with any Apple device, convert Opus to M4A or MP3.',
  },
  {
    question: 'Are WhatsApp voice messages Opus files?',
    answer:
      'Yes. WhatsApp sends voice messages as .ogg files that contain Opus-encoded audio. If you need to convert them for a device that does not support Opus, convert the .ogg file — the tool treats it as an Opus-in-OGG stream.',
  },
  {
    question: 'What is the difference between .opus and .ogg?',
    answer:
      '.opus is a file with a raw Opus stream. .ogg is an OGG container that can hold Opus or Vorbis audio. For practical purposes, both can contain Opus audio; most platforms handle them identically.',
  },
  {
    question: 'Should I convert Opus to MP3 for distribution?',
    answer:
      'Only if you need compatibility with older hardware (car stereos, legacy MP3 players). For any modern device — phones, laptops, smart speakers — Opus plays natively and sounds better at the same file size. Converting to MP3 discards quality.',
  },
];

export const metadata: Metadata = {
  title: 'What Is Opus? Modern Audio Codec for Voice and Music',
  description:
    'Opus is the royalty-free audio codec behind Discord, WhatsApp voice messages, WebRTC calls, and YouTube. Learn how Opus works, its bitrates, compatibility, and when to convert.',
  alternates: {
    canonical: '/formats/opus',
  },
  openGraph: {
    title: 'What Is Opus? Modern Audio Codec for Voice and Music',
    description:
      'Opus is the royalty-free audio codec behind Discord, WhatsApp voice messages, WebRTC calls, and YouTube. Learn how Opus works and when to convert.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Opus? Modern Audio Codec for Voice and Music',
    description:
      'Opus is the royalty-free audio codec behind Discord, WhatsApp voice messages, and WebRTC.',
  },
};

export default function OpusFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <JsonLd
        data={[
          articleSchema({
            headline: 'What Is Opus? Modern Audio Codec for Voice and Music',
            description:
              'Opus is the royalty-free audio codec behind Discord, WhatsApp voice messages, WebRTC calls, and YouTube.',
            path: '/formats/opus',
            datePublished: '2026-01-15',
            dateModified: '2026-04-14',
          }),
          faqPageSchema(FAQ_ITEMS),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Formats', path: '/formats' },
          { name: 'Opus', path: '/formats/opus' },
        ]}
        className="text-xs text-gray-500 mb-6"
      />

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is Opus?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          Opus is a modern, royalty-free lossy audio codec standardised by the IETF in 2012.
          It handles both voice and music efficiently across a wide bitrate range — from
          6&nbsp;kbps for voice up to 510&nbsp;kbps for high-quality music. It is the audio codec
          behind Discord, WhatsApp voice messages, and most WebRTC applications including Zoom
          and Google Meet.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',              'Lossy compressed (royalty-free)'],
            ['File extensions',   '.opus, .ogg'],
            ['Standardised by',   'IETF (RFC 6716, 2012)'],
            ['Typical bitrates',  '32 / 64 / 96 / 128 kbps'],
            ['Bitrate range',     '6 – 510 kbps'],
            ['Output support',    'MP3, WAV, M4A, AAC, OGG'],
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">How Opus works</h2>
          <p className="leading-relaxed">
            Opus combines two underlying encoding technologies: SILK (optimised for voice,
            derived from the codec Skype developed) and CELT (optimised for music, based on
            work from the Xiph.Org Foundation). The encoder automatically switches between
            them — and blends them as needed — based on the content and bitrate.
          </p>
          <p className="leading-relaxed mt-3">
            The result is a single codec that outperforms voice-specialised codecs at voice
            bitrates and competes with AAC for music at higher bitrates. A 24&nbsp;kbps Opus
            stream handles voice well and manages music adequately; at 96–128&nbsp;kbps Opus
            matches or exceeds AAC at 192&nbsp;kbps for music quality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where Opus is used</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Discord:</span>
              <span>All voice channels and video calls. Voice quality at 64&nbsp;kbps is notably better than older VoIP codecs at the same bitrate.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">WhatsApp &amp; Telegram:</span>
              <span>Voice messages and calls are Opus inside an OGG container — the .ogg files WhatsApp sends are Opus streams.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Zoom, Google Meet, Microsoft Teams:</span>
              <span>WebRTC-based video conferencing uses Opus for audio transmission.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">YouTube:</span>
              <span>Opus is one of the default audio codecs used for video delivery.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Browsers:</span>
              <span>Supported in Chrome, Firefox, Edge, and Safari (on recent versions).</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths and weaknesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <h3 className="text-sm font-semibold text-green-800 mb-2">Strengths</h3>
              <ul className="space-y-1.5 text-xs text-green-700">
                <li>Best-in-class quality at low bitrates</li>
                <li>Royalty-free and fully open</li>
                <li>Low latency — ideal for real-time audio</li>
                <li>Single codec handles both voice and music</li>
                <li>Native browser support (WebRTC standard)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">Weaknesses</h3>
              <ul className="space-y-1.5 text-xs text-amber-700">
                <li>Not supported on most legacy hardware</li>
                <li>iOS only added support in iOS 17 (2023)</li>
                <li>Many DAWs still prefer WAV or AIFF</li>
                <li>Older car stereos and MP3 players cannot play it</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert from Opus</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>To MP3</strong> — if you need to play a WhatsApp voice message or Discord
              recording on a device that does not support Opus (older car stereo, legacy MP3 player,
              some Bluetooth devices).
            </li>
            <li>
              <strong>To WAV</strong> — if you need to import a voice message or podcast recording
              into an audio editor that does not accept Opus input.
            </li>
            <li>
              <strong>To M4A</strong> — if you want good quality in a container Apple devices
              handle natively without third-party apps.
            </li>
          </ul>
        </section>

      </div>

      {/* FAQ */}
      <div className="mt-12 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        {FAQ_ITEMS.map(({ question, answer }) => (
          <div key={question} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{question}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>

      <RelatedContent
        title="Convert Opus"
        items={[
          { href: '/opus-to-mp3', label: 'OPUS to MP3', note: 'For older hardware and car stereos' },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/formats/ogg',                    label: 'What is OGG?',             note: 'Opus files often live in OGG containers' },
          { href: '/formats/aac',                    label: 'What is AAC?',             note: 'Closest comparable modern codec'          },
          { href: '/guides/lossless-vs-lossy-audio', label: 'Lossless vs Lossy Audio',  note: 'Where Opus fits in the landscape'          },
        ]}
      />

      <LastUpdated date="2026-04-21" />

    </div>
  );
}
