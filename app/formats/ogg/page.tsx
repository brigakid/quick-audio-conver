import type { Metadata } from 'next';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';

export const metadata: Metadata = {
  title: 'What Is OGG? Format Guide',
  description:
    'OGG Vorbis is a free, open-source audio format. Learn how it compares to MP3, where it\'s supported, and when you might need to convert OGG files.',
};

export default function OggFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-10">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Audio Format</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          What Is OGG?
        </h1>
        <p className="mt-3 text-base text-gray-500 leading-relaxed">
          OGG (or OGG Vorbis) is a free, open-source lossy audio format. It offers quality
          comparable to MP3 and AAC, but without patent restrictions. It is widely used in
          PC game audio, Linux audio pipelines, and open-source media tools — but has limited
          support on consumer hardware and Apple devices.
        </p>
      </div>

      {/* Key facts */}
      <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key facts</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            ['Type',              'Lossy compressed (open-source)'],
            ['File extensions',   '.ogg, .oga'],
            ['Developed by',      'Xiph.Org Foundation'],
            ['Common bitrates',   '96 / 128 / 192 / 256 kbps'],
            ['Typical file size', '~1 MB per minute at 128 kbps'],
            ['Output support',    'MP3, WAV, M4A, AAC, OPUS'],
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">How OGG Vorbis works</h2>
          <p className="leading-relaxed">
            Like MP3 and AAC, OGG Vorbis uses psychoacoustic modelling — analysing which parts
            of the audio signal are least perceptible and discarding them to achieve compression.
            Vorbis is technically comparable to AAC in quality at equivalent bitrates, and
            outperforms MP3 at lower bitrates.
          </p>
          <p className="leading-relaxed mt-3">
            The key distinction is licensing: OGG Vorbis is completely patent-free, which is
            why it became the standard for game audio (Steam games, Unity, Unreal Engine
            projects) and open-source software like VLC and Firefox.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">OGG vs MP3 — key differences</h2>
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Property</th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">OGG Vorbis</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">MP3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Licensing',        'Free, open-source',       'Royalty-free since 2017'],
                  ['Audio quality',    'Comparable to AAC',       'Slightly lower efficiency'],
                  ['Hardware support', 'Limited',                 'Universal'],
                  ['Apple devices',    'Not natively supported',  'Full support'],
                  ['Common use',       'Games, Linux, FOSS tools','Music, podcasts, everywhere'],
                ].map(([prop, ogg, mp3]) => (
                  <tr key={prop}>
                    <td className="py-2 pr-4 text-xs text-gray-500">{prop}</td>
                    <td className="py-2 pr-4 text-sm text-gray-700">{ogg}</td>
                    <td className="py-2 text-sm text-gray-700">{mp3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Where OGG is supported</h2>
          <p className="leading-relaxed">OGG has uneven support depending on where you're playing it:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-3">
            <li><strong>PC games</strong> — widely used; game engines handle it natively</li>
            <li><strong>Linux</strong> — full native support across the ecosystem</li>
            <li><strong>VLC, Firefox, Chrome</strong> — play OGG without plugins</li>
            <li><strong>Android</strong> — supported natively on most devices</li>
            <li><strong>Apple devices</strong> — not natively supported on iOS, macOS, or Safari without a third-party app</li>
            <li><strong>Car stereos and standalone players</strong> — rarely supported</li>
            <li><strong>Windows Media Player</strong> — not supported without a codec pack</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Strengths and weaknesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <h3 className="text-sm font-semibold text-green-800 mb-2">Strengths</h3>
              <ul className="space-y-1.5 text-xs text-green-700">
                <li>No licensing fees or patent restrictions</li>
                <li>Excellent quality at low bitrates</li>
                <li>Standard for game and Linux audio</li>
                <li>Supported by most open-source players</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">Weaknesses</h3>
              <ul className="space-y-1.5 text-xs text-amber-700">
                <li>Not supported on iPhone, iPad, or Safari</li>
                <li>Limited support on consumer hardware</li>
                <li>Not used by mainstream streaming platforms</li>
                <li>Lossy — original data cannot be recovered</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to convert from OGG</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>To MP3</strong> — the most common reason. If you need to play an OGG file
              on an iPhone, car stereo, or any device that doesn't support OGG, converting to
              MP3 gives you maximum compatibility.
            </li>
            <li>
              <strong>To WAV</strong> — if you need uncompressed audio for use in audio editing
              software or professional production. Be aware: the WAV will not be higher quality
              than the original OGG.
            </li>
            <li>
              <strong>To M4A</strong> — if you want a compact file that plays on Apple devices.
              M4A (AAC) is Apple's native format and will play on all iOS and macOS devices.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Why can't I play OGG on my iPhone?</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                Apple's iOS and macOS do not include a native OGG decoder. To play OGG files
                on an Apple device, you either need a third-party player app (like VLC for iOS)
                or convert the file to M4A or MP3 first.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Is OGG the same as OGG Vorbis?</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                OGG is a container format; Vorbis is the audio codec inside it. "OGG Vorbis"
                (or just "OGG") refers to the combination. Other codecs can be wrapped in
                an OGG container (e.g., Opus), but .ogg files almost always contain Vorbis audio.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Will converting OGG to MP3 reduce quality?</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                Yes, slightly. Converting from one lossy format to another always introduces
                generation loss — each encoding step discards more audio data. For most listeners
                the difference is inaudible at 192 kbps or above, but it is technically a
                degradation from the OGG original.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12">
        <RelatedContent
          items={[
            { label: 'Convert OGG to MP3', href: '/ogg-to-mp3', note: 'For iPhone and hardware compatibility' },
            { label: 'What is MP3?', href: '/formats/mp3' },
            { label: 'What is AAC?', href: '/formats/aac', note: 'Similar quality, better compatibility' },
            { label: 'Lossless vs Lossy Audio', href: '/guides/lossless-vs-lossy-audio' },
          ]}
        />
      </div>

      <div className="mt-6">
        <LastUpdated date="2025-01-01" />
      </div>

    </div>
  );
}
