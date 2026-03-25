import type { Metadata } from 'next';
import Hero from '@/components/marketing/Hero';
import ToolsGrid from '@/components/marketing/ToolsGrid';
import HowItWorks from '@/components/marketing/HowItWorks';
import WhyChooseUs from '@/components/marketing/WhyChooseUs';
import GuidesBlock from '@/components/marketing/GuidesBlock';
import FormatsAndHelp from '@/components/marketing/FormatsAndHelp';
import FAQ from '@/components/marketing/FAQ';
import SideRail from '@/components/ads/SideRail';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Online Audio Converter',
  description:
    'Convert audio and video files to MP3, WAV, or M4A in seconds. Upload MP4, WAV, FLAC, M4A, MP3, AAC, OGG, AIFF, WMA, Opus, and more — no account required, files deleted automatically.',
};

export default function HomePage() {
  return (
    <>
      {/*
       * ── Desktop side rail ads ────────────────────────────────────────────
       * Fixed columns that sit in the natural margin space beside the centered
       * content. Visible only at ≥1536px (2xl) where at least 160px of
       * genuine margin space exists on each side. Hidden on all smaller screens.
       *
       * To activate: set NEXT_PUBLIC_ADSENSE_CLIENT in .env.local and pass
       * your AdSense slot IDs to the `adSlot` prop on each SideRail.
       * ─────────────────────────────────────────────────────────────────────
       */}
      <SideRail side="left"  /* adSlot="XXXXXXXXXX" */ />
      <SideRail side="right" /* adSlot="XXXXXXXXXX" */ />

      {/* ── Page sections ─────────────────────────────────────────────────── */}
      <Hero />
      <ToolsGrid />

      {/*
       * ── Mobile / mid-size in-content ad slot ─────────────────────────────
       * Sits between the tools grid and "How It Works" — after the converter
       * flow, well clear of any critical conversion action.
       * • Hidden on 2xl+ screens where the fixed side rails handle ad delivery
       * • When adSlot is absent, AdSlot returns null → this wrapper collapses
       *   to zero height, leaving no gap in the layout
       *
       * To activate: pass your AdSense slot ID to `adSlot`.
       * ─────────────────────────────────────────────────────────────────────
       */}
      <div className="2xl:hidden">
        <AdSlot
          adFormat="rectangle"
          minHeight={250}
          className="mx-auto max-w-2xl px-4 sm:px-6 py-6"
          /* adSlot="XXXXXXXXXX" */
        />
      </div>

      <HowItWorks />
      <WhyChooseUs />
      <GuidesBlock />
      <FormatsAndHelp />
      <FAQ />
    </>
  );
}
