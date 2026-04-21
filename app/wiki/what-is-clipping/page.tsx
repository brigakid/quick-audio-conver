import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'What Is Clipping in Audio? Why It Sounds Harsh and How to Avoid It',
  description:
    'Clipping happens when audio exceeds the maximum level a system can handle. The waveform gets cut off — creating a harsh, distorted sound. Here\'s what causes it and how to fix it.',
  openGraph: {
    title: 'What Is Clipping in Audio? Why It Sounds Harsh and How to Avoid It',
    description:
      'Clipping happens when audio exceeds the maximum level a system can handle. The waveform gets cut off — creating a harsh, distorted sound. Here\'s what causes it and how to fix it.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Clipping in Audio? Why It Sounds Harsh and How to Avoid It',
    description:
      'Clipping happens when audio exceeds the maximum level a system can handle. The waveform gets cut off — creating a harsh, distorted sound. Here\'s what causes it and how to fix it.',
  },
};

export default function WhatIsClippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="mb-4">
        <Link href="/wiki" className="text-xs text-gray-400 hover:text-brand transition-colors">
          ← WikiSound
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">Signal Processing</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          What Is Clipping in Audio?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Clipping happens when an audio signal exceeds the maximum level a system can handle. The
        peaks of the waveform get <strong>cut flat</strong> — "clipped" — because there's no
        room to represent them. The result is a harsh, buzzing distortion. In digital audio,
        it happens at 0 dBFS. Once digital audio is clipped, the damage is permanent.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The water-in-a-glass analogy</h2>
          <p className="leading-relaxed">
            Imagine filling a glass to the brim and then adding more. The water overflows — you
            can't fit more in the glass than it holds. Clipping is the audio equivalent. A digital
            audio system has a maximum value it can represent (0 dBFS — zero decibels relative to
            full scale). Any signal that would exceed that ceiling gets cut to the ceiling instead.
          </p>
          <p className="leading-relaxed mt-3">
            A normal audio waveform has smooth, rounded peaks. A clipped waveform has flat tops —
            the rounded peak was "cut off" at the ceiling and replaced with a flat line. That
            shape change is what causes the harsh sound.
          </p>

          {/* Waveform comparison */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 mb-3 text-center">Normal waveform</p>
              <svg viewBox="0 0 120 60" className="w-full h-12" fill="none">
                <path d="M0 30 Q15 5 30 30 Q45 55 60 30 Q75 5 90 30 Q105 55 120 30" stroke="#6366f1" strokeWidth="2" fill="none"/>
              </svg>
              <p className="text-xs text-gray-400 text-center mt-2">Rounded, smooth peaks</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 mb-3 text-center">Clipped waveform</p>
              <svg viewBox="0 0 120 60" className="w-full h-12" fill="none">
                <line x1="0" y1="8" x2="120" y2="8" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2"/>
                <line x1="0" y1="52" x2="120" y2="52" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2"/>
                <path d="M0 30 L12 8 L18 8 L30 30 L42 52 L48 52 L60 30 L72 8 L78 8 L90 30 L102 52 L108 52 L120 30" stroke="#ef4444" strokeWidth="2" fill="none"/>
              </svg>
              <p className="text-xs text-gray-400 text-center mt-2">Flat tops — peaks cut off</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why clipping sounds harsh</h2>
          <p className="leading-relaxed">
            The flattened waveform contains sharp edges — the corners where the rounded peak
            transitions abruptly to the flat ceiling. Sharp edges in a waveform correspond to
            high-frequency harmonic content, specifically odd harmonics (3rd, 5th, 7th...) that
            weren't present in the original signal.
          </p>
          <p className="leading-relaxed mt-3">
            These new harmonics are inharmonic relative to the musical content — they don't
            belong to the note being played. That's why clipping sounds harsh, buzzy, and
            unpleasant rather than just louder. The distortion isn't adding a musical quality;
            it's adding noise.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Digital vs analog clipping</h2>
          <p className="leading-relaxed">
            Digital clipping is immediate and harsh. The moment a signal exceeds 0 dBFS, the
            waveform is cut to a flat line. There's no gradient — above the ceiling, the waveform
            is destroyed. The audible result is an unpleasant crack or buzz.
          </p>
          <p className="leading-relaxed mt-3">
            Analog clipping — from an overdriven tube amplifier or tape recorder — is softer.
            Analog circuits saturate gradually, rounding off the peaks rather than abruptly
            cutting them. The harmonic content produced is different: more even harmonics
            (2nd, 4th), which integrate more musically. This is why "tape saturation" and
            "tube warmth" are desirable in music production — they're forms of controlled,
            soft clipping.
          </p>
          <p className="leading-relaxed mt-3">
            The distinction matters: analog-style saturation can be used intentionally and
            sounds good. Digital clipping almost always sounds bad and should be avoided.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Intentional vs accidental clipping</h2>
          <p className="leading-relaxed">
            Some producers intentionally clip audio for creative effect — particularly in
            electronic music and lo-fi genres, or when emulating the sound of overdriven
            equipment. Soft-clipping plugins and tape saturation plugins replicate the analog
            clipping character without the harshness of hard digital clipping.
          </p>
          <p className="leading-relaxed mt-3">
            Accidental clipping — an input signal recorded too hot, a master that exceeded
            0 dBFS before export, a voice that peaked during an interview — is always a problem.
            The goal in recording is to leave headroom: record at levels below the ceiling (a
            target of -18 to -12 dBFS during recording is typical) so transients have room to
            breathe without hitting 0 dBFS.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to avoid clipping</h2>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Record with headroom:</span>
              <span>Aim for peaks around -18 to -12 dBFS during recording. You can always raise the level later; you can't unclip a signal that was clipped at recording.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Use a limiter before export:</span>
              <span>A brickwall limiter set at -1 dBTP prevents any samples from exceeding that level. Streaming platforms also specify true peak limits (-1 dBTP is standard).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Monitor your meters:</span>
              <span>Most DAWs show a red indicator when clipping has occurred. Check after recording; don't just assume the levels were fine.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Watch for inter-sample peaks:</span>
              <span>When digital audio is converted to analog for playback, inter-sample peaks can exceed 0 dBFS even if no individual sample clipped. A true peak limiter catches these.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What to do if you have clipped audio</h2>
          <p className="leading-relaxed">
            Once audio is clipped digitally, the information is genuinely gone. The flattened
            peak can't be restored because the original waveform data wasn't stored. Declipping
            tools exist (iZotope RX, Adobe Audition's diagnostics) and they can partially reconstruct
            the original peak shape using educated guessing — but results vary from "acceptable"
            to "still clearly damaged" depending on how severe the clipping is.
          </p>
          <p className="leading-relaxed mt-3">
            Mild clipping (a few samples occasionally touching 0 dBFS) is sometimes repaired well.
            Sustained clipping — an entire vocal that was recorded too hot — is difficult to
            salvage fully. Prevention is far easier than correction.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-gain-staging', label: 'What Is Gain Staging?'       },
          { href: '/wiki/what-is-distortion',   label: 'What Is Distortion?'         },
          { href: '/wiki/what-is-a-limiter',    label: 'What Is a Limiter?'          },
          { href: '/wiki/what-is-audio-quality', label: 'What Is Audio Quality?'     },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
