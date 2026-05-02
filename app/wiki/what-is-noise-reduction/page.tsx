import type { Metadata } from 'next';
import Link from 'next/link';
import LastUpdated from '@/components/content/LastUpdated';
import RelatedContent from '@/components/content/RelatedContent';
import QuickAnswer from '@/components/content/QuickAnswer';
import Author from '@/components/content/Author';

export const metadata: Metadata = {
  robots: { index: false },
  title: 'What Is Noise Reduction in Audio? How It Works and When to Use It',
  description:
    'Noise reduction removes background hiss, hum, and ambient sound from recordings. Here\'s how it works, when it genuinely helps, and when it makes audio sound worse.',
  alternates: {
    canonical: '/wiki/what-is-noise-reduction',
  },
  openGraph: {
    title: 'What Is Noise Reduction in Audio? How It Works and When to Use It',
    description:
      'Noise reduction removes background hiss, hum, and ambient sound from recordings. Here\'s how it works, when it genuinely helps, and when it makes audio sound worse.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Noise Reduction in Audio? How It Works and When to Use It',
    description:
      'Noise reduction removes background hiss, hum, and ambient sound from recordings. Here\'s how it works, when it genuinely helps, and when it makes audio sound worse.',
  },
};

export default function WhatIsNoiseReductionPage() {
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
          What Is Noise Reduction?
        </h1>
      </div>

      <Author />

      <QuickAnswer>
        Noise reduction identifies and attenuates consistent background noise in a recording —
        hiss, hum, air conditioning, room tone. It works by analysing the noise profile and
        suppressing those frequencies during the actual content. <strong>Applied lightly, it
        helps. Applied too heavily, it creates its own artifacts</strong> that often sound
        worse than the original noise.
      </QuickAnswer>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-8 mt-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What types of noise it targets</h2>
          <p className="leading-relaxed">
            Noise reduction tools are designed for stationary or semi-stationary noise — noise
            that doesn't change much over time and exists throughout the recording at a relatively
            consistent level and frequency profile.
          </p>
          <ul className="space-y-1 mt-3 text-sm text-gray-600 list-disc list-inside">
            <li><strong>Microphone hiss</strong> — the broadband high-frequency noise from a mic's self-noise</li>
            <li><strong>Electrical hum</strong> — 50 Hz or 60 Hz interference from power lines or ground loops</li>
            <li><strong>Air conditioning / HVAC noise</strong> — constant low-frequency rumble and mid-frequency hiss</li>
            <li><strong>Fan noise</strong> — computers, cameras, equipment in the recording space</li>
            <li><strong>Room tone</strong> — the ambient acoustic fingerprint of the recording space</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How traditional noise reduction works</h2>
          <p className="leading-relaxed">
            Classic spectral noise reduction (used in tools like iZotope RX and Audacity) works
            in two stages:
          </p>
          <p className="leading-relaxed mt-3">
            <strong>Stage 1 — Noise profiling:</strong> You identify a section of the recording
            that contains only noise — no speech or music — and the tool analyses it. It builds
            a model of the noise's frequency spectrum: what frequencies are present, at what
            levels, varying over time.
          </p>
          <p className="leading-relaxed mt-3">
            <strong>Stage 2 — Attenuation:</strong> The tool applies that noise model to the
            entire recording. At any moment, frequencies that match the noise profile are
            attenuated (turned down) by a set amount. Frequencies carrying signal (speech, music)
            that differ from the noise profile are left alone.
          </p>
          <p className="leading-relaxed mt-3">
            The limitation: the distinction between "noise" and "signal" is probabilistic, not
            certain. When the algorithm is wrong — particularly during quiet passages where
            signal and noise are close in level — it attenuates some of the signal too, creating
            artifacts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AI-based noise reduction</h2>
          <p className="leading-relaxed">
            More recent tools use machine learning models trained on large datasets of clean and
            noisy recordings. Tools like Krisp, NVIDIA RTX Voice, Adobe's AI Enhance, and
            iZotope RX's Voice De-noise can separate speech from noise in real time without
            requiring a manual noise profile.
          </p>
          <p className="leading-relaxed mt-3">
            These models are often dramatically better on voice recordings specifically — they've
            been trained to recognise human speech patterns and preserve them while attenuating
            everything else. For non-voice content (music, environmental recordings), traditional
            spectral tools are still often more appropriate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">The trade-off: artifacts vs noise</h2>
          <p className="leading-relaxed">
            This is the most important practical insight about noise reduction: it introduces
            its own artifacts if pushed too hard. The most common noise reduction artifacts are:
          </p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Warbling or metallic shimmer:</span>
              <span>The noise reduction algorithm creates modulation artifacts in the frequency domain — the audio sounds as if it's underwater or being processed through a metallic filter.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Loss of natural room tone:</span>
              <span>Silence between words or phrases becomes unnaturally dead — the listener can hear the noise reduction "switching on and off."</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand font-semibold flex-shrink-0">Thinning of the audio:</span>
              <span>The tool attenuates noise and some signal together, leaving the voice or instrument sounding thinner or hollow.</span>
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            The goal isn't eliminating all noise — it's getting the noise below the threshold
            of distraction without introducing artifacts that are themselves distracting.
            Subtle reduction (3–6 dB of attenuation) often sounds more professional than
            aggressive reduction (12+ dB).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What noise reduction cannot fix</h2>
          <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside mt-2">
            <li><strong>Dynamic noise:</strong> A car horn, a dog barking, a slamming door — these vary too much for a static noise profile to capture. They need manual editing or multiband gating.</li>
            <li><strong>Noise that overlaps the signal:</strong> If the noise occupies the same frequencies as the voice, removing the noise removes part of the voice.</li>
            <li><strong>Clipping:</strong> Noise reduction doesn't repair distorted waveforms.</li>
            <li><strong>A bad room:</strong> Heavy reverb and echo aren't noise — they're reflections of the signal itself. Noise reduction makes them worse, not better.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Prevention is better than treatment</h2>
          <p className="leading-relaxed">
            The most reliable noise reduction is not recording the noise in the first place.
            Recording in a quiet room, using a directional microphone close to the source,
            turning off fans and air conditioning before recording, and managing gain staging
            properly all reduce the need for noise reduction in post-production.
          </p>
          <p className="leading-relaxed mt-3">
            A recording with light noise that's been carefully reduced will almost always
            sound better than a recording with heavy noise that's been aggressively treated.
          </p>
        </section>

      </div>

      <RelatedContent
        title="WikiSound"
        items={[
          { href: '/wiki/what-is-audio-quality',    label: 'What Is Audio Quality?'      },
          { href: '/wiki/what-is-audio-artifacting', label: 'What Is Audio Artifacting?' },
          { href: '/wiki/what-is-eq',               label: 'What Is EQ?'                 },
        ]}
      />

      <RelatedContent
        title="Related"
        items={[
          { href: '/guides/best-audio-format-for-podcasting', label: 'Best Format for Voice' },
        ]}
      />

      <LastUpdated date="2026-03-28" />
    </div>
  );
}
