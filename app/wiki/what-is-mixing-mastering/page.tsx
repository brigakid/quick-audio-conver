import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';

export const metadata: Metadata = {
  title: 'What Is Mixing and Mastering? Two Separate Jobs',
  description:
    'Mixing balances individual tracks into a cohesive recording. Mastering prepares that recording for distribution. They solve different problems at different stages.',
};

export default function WhatIsMixingMasteringPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Production</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Mixing and Mastering?
        </h1>
      </div>

      <QuickAnswer>
        Mixing is the process of combining and balancing individual recorded tracks into a single
        stereo (or surround) file. Mastering is what happens to that stereo file before it goes
        out into the world — levelling, limiting, final EQ, and preparing for different
        distribution formats. <strong>They're two separate jobs, usually done by different
        people.</strong>
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mixing: assembling the parts</h2>
          <p className="leading-relaxed">
            A recording session for a band might produce 30 or more individual tracks: kick drum,
            snare, hi-hat, bass guitar DI, bass guitar mic, rhythm guitar (left), rhythm guitar
            (right), lead guitar, keyboards, lead vocal, backing vocals... and so on. Each of these
            tracks was recorded separately and each sounds disconnected on its own.
          </p>
          <p className="leading-relaxed mt-3">
            Mixing is the work of making all those parts sound like one cohesive performance.
            That involves:
          </p>
          <ul className="space-y-1 mt-3 text-sm text-gray-600 list-disc list-inside">
            <li><strong>Level balancing</strong> — deciding how loud each track is relative to the others</li>
            <li><strong>Panning</strong> — placing elements in the stereo field (left, right, centre)</li>
            <li><strong>EQ</strong> — shaping each track's frequency content so they coexist without clashing</li>
            <li><strong>Compression</strong> — controlling dynamics, adding sustain, gluing elements together</li>
            <li><strong>Reverb and delay</strong> — adding space, depth, and atmosphere</li>
            <li><strong>Automation</strong> — changing levels, effects, or parameters over time as the song progresses</li>
          </ul>
          <p className="leading-relaxed mt-3">
            The output of mixing is a stereo mix file — typically exported as a 24-bit WAV at the
            project sample rate, before any final limiting is applied.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mastering: preparing for the world</h2>
          <p className="leading-relaxed">
            Mastering receives the stereo mix and prepares it for distribution. The mastering
            engineer listens to the mix on speakers they know extremely well and makes adjustments
            to ensure the record translates correctly across different playback systems — from
            earbuds to car speakers to nightclub sound systems.
          </p>
          <p className="leading-relaxed mt-3">
            Mastering typically involves:
          </p>
          <ul className="space-y-1 mt-3 text-sm text-gray-600 list-disc list-inside">
            <li><strong>Broad EQ adjustments</strong> — fixing problems with the mix's overall frequency balance that weren't apparent during mixing</li>
            <li><strong>Multiband compression or limiting</strong> — controlling the overall dynamic range</li>
            <li><strong>Loudness targeting</strong> — bringing the track to an appropriate level for its distribution platform (streaming, CD, broadcast)</li>
            <li><strong>True peak limiting</strong> — ensuring no inter-sample peaks exceed platform limits (-1 dBTP is the streaming standard)</li>
            <li><strong>Dithering</strong> — adding low-level noise when reducing bit depth (24-bit to 16-bit) to prevent quantization distortion</li>
            <li><strong>Sequencing</strong> — for albums, ordering tracks and setting the gap between them</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why they're separate jobs</h2>
          <p className="leading-relaxed">
            The separation exists for practical and perceptual reasons. Mixing is a detailed,
            close-focus task — the engineer spends hours or days inside the individual elements.
            After that much time, the ear loses perspective on the overall picture.
          </p>
          <p className="leading-relaxed mt-3">
            A mastering engineer comes to the mix fresh, with no attachment to the decisions
            made during mixing. They hear the sum with objective ears. They also typically work
            on speakers with a well-established reference point — they know exactly what a
            "correct" mix sounds like on their system, which makes them very good at spotting
            what the mix still lacks.
          </p>
          <p className="leading-relaxed mt-3">
            For home recordings and independent releases, one person often does both — but with
            a significant gap between the two sessions. Mastering your own mix immediately after
            finishing it is the worst of both worlds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What mastering cannot fix</h2>
          <p className="leading-relaxed">
            Mastering is not mix repair. It's a last-pass refinement, not a substitute for a
            well-executed mix. A mastering engineer working with a stereo file cannot:
          </p>
          <ul className="space-y-1 mt-3 text-sm text-gray-600 list-disc list-inside">
            <li>Pull down a vocal that's too loud relative to the backing track</li>
            <li>Remove a frequency problem on just the bass guitar without affecting everything in that range</li>
            <li>Fix clipping that happened in the mix</li>
            <li>Add reverb or effects to individual instruments</li>
            <li>Correct timing issues between tracks</li>
          </ul>
          <p className="leading-relaxed mt-3">
            This is why mixing matters so much: mastering amplifies the mix's character, for
            better or worse. A great master of a poor mix is still a poor recording. A great mix
            needs very little mastering work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The mix file format question</h2>
          <p className="leading-relaxed">
            When sending a mix to a mastering engineer, always export a lossless file —
            24-bit WAV or AIFF at the project sample rate. Never compress a mix down to MP3
            before mastering; the lossy encoding introduces artifacts that become more
            noticeable after the limiting and level increases applied during mastering.
          </p>
          <p className="leading-relaxed mt-3">
            The final mastered file delivered for distribution will typically be a 16-bit/44.1 kHz
            WAV (for CD or streaming) or a 24-bit version for streaming platforms that accept it.
            The loudness level will depend on the target platform.
          </p>
        </section>

      </div>

      <RelatedContent
        title="Converters"
        items={[
          { href: '/wav-to-mp3',  label: 'WAV to MP3',  note: 'Export lossless mix, encode for distribution' },
          { href: '/wav-to-flac', label: 'WAV to FLAC', note: 'Archive your lossless master'                 },
        ]}
      />

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-loudness',            label: 'What Is Loudness?'           },
          { href: '/wiki/what-is-eq',                  label: 'What Is EQ?'                 },
          { href: '/wiki/what-is-normalization',       label: 'What Is Normalization?'      },
          { href: '/wiki/what-is-a-limiter',           label: 'What Is a Limiter?'          },
          { href: '/wiki/what-is-gain-staging',        label: 'What Is Gain Staging?'       },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/learn/best-audio-format-for-editing', label: 'Best Format for Editing'    },
          { href: '/formats/wav',                         label: 'WAV format guide'            },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
