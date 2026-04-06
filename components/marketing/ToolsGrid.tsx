'use client';

import Link from 'next/link';
import { useState, useCallback, KeyboardEvent } from 'react';
import { TOOLS } from '@/lib/tools';
import type { ToolEntry } from '@/lib/tools';
import { cn } from '@/lib/utils';

// ── Constants ────────────────────────────────────────────────────────────────

/** Cards shown per tab before "Show more" appears */
const MAX_VISIBLE = 6;

// Quick lookup by href — keeps tab definitions readable
const toolByHref = Object.fromEntries(TOOLS.map((t) => [t.href, t]));

function byHrefs(hrefs: string[]): ToolEntry[] {
  return hrefs.map((h) => toolByHref[h]).filter((t): t is ToolEntry => Boolean(t));
}

// ── Tab definitions ──────────────────────────────────────────────────────────

type TabDef = { id: string; label: string; tools: ToolEntry[] };

const TABS: TabDef[] = [
  {
    id: 'popular',
    label: 'Popular',
    // Hand-picked: highest commercial value and search volume
    tools: byHrefs([
      '/mp4-to-mp3', '/wav-to-mp3', '/flac-to-mp3',
      '/mp3-to-wav', '/mov-to-mp3', '/alac-to-mp3',
    ]),
  },
  {
    id: 'mp3',
    label: 'To MP3',
    // All converters whose output is MP3 — ordered as in TOOLS (most popular first)
    tools: TOOLS.filter((t) => t.outputFormat === 'mp3'),
  },
  {
    id: 'wav',
    label: 'To WAV',
    tools: TOOLS.filter((t) => t.outputFormat === 'wav'),
  },
  {
    id: 'm4a',
    label: 'To M4A',
    tools: TOOLS.filter((t) => t.outputFormat === 'm4a'),
  },
  {
    id: 'lossless',
    label: 'Lossless',
    tools: byHrefs([
      '/wav-to-flac', '/aiff-to-flac', '/alac-to-flac',
      '/alac-to-wav', '/flac-to-wav',
    ]),
  },
  {
    id: 'video',
    label: 'Video',
    tools: byHrefs([
      '/mp4-to-mp3', '/mp4-to-wav',
      '/mov-to-mp3', '/mov-to-wav', '/mov-to-m4a',
    ]),
  },
  {
    id: 'legacy',
    label: 'Legacy',
    tools: byHrefs([
      '/wma-to-mp3', '/amr-to-mp3', '/amr-to-wav',
      '/ac3-to-mp3', '/ac3-to-wav', '/aifc-to-mp3',
    ]),
  },
];

// ── Compact tool card ─────────────────────────────────────────────────────────
// Single-row card design (~52px tall) — no description text, just the format
// badge, label, and arrow. Keeps the tab panel grid compact.

function MiniCard({ tool }: { tool: ToolEntry }) {
  return (
    <Link
      href={tool.href}
      aria-label={`${tool.inputFormat.toUpperCase()} to ${tool.outputFormat.toUpperCase()} Converter`}
      className="group flex items-center gap-2.5 px-3.5 py-3 bg-white rounded-xl border border-[#D9D9D9] hover:border-brand/40 hover:shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
    >
      {/* Format badge */}
      <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100 shrink-0">
        <span className="text-[11px] font-bold text-gray-700 uppercase">{tool.inputFormat}</span>
        <svg
          className="w-2.5 h-2.5 text-gray-400 shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <span className="text-[11px] font-bold text-brand uppercase">{tool.outputFormat}</span>
      </div>

      {/* Label */}
      <span className="text-sm font-medium text-gray-800 group-hover:text-brand-dark transition-colors truncate min-w-0">
        {tool.label}
      </span>

      {/* Arrow */}
      <svg
        className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand ml-auto shrink-0 group-hover:translate-x-0.5 transition-all"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}

// ── Tab panel ────────────────────────────────────────────────────────────────
// Manages its own expanded/collapsed state so expand persists when switching
// between tabs and returning.

function TabPanel({
  tab,
  isActive,
}: {
  tab: TabDef;
  isActive: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible   = expanded ? tab.tools : tab.tools.slice(0, MAX_VISIBLE);
  const moreCount = tab.tools.length - MAX_VISIBLE;

  return (
    <div
      id={`panel-${tab.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${tab.id}`}
      // Use HTML hidden attribute — semantically correct for ARIA tabs.
      // Links inside hidden panels are still present in SSR HTML for crawlers.
      hidden={!isActive}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {visible.map((t) => (
          <MiniCard key={t.href} tool={t} />
        ))}
      </div>

      {!expanded && moreCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark hover:underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 rounded"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Show {moreCount} more
        </button>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ToolsGrid() {
  const [activeTab, setActiveTab] = useState('popular');

  const activateTab = useCallback((id: string) => setActiveTab(id), []);

  // Keyboard navigation per ARIA tabs pattern:
  // Arrow keys move focus between tabs, Home/End jump to first/last.
  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
      let nextIdx: number | null = null;
      if (e.key === 'ArrowRight') nextIdx = (idx + 1) % TABS.length;
      if (e.key === 'ArrowLeft')  nextIdx = (idx - 1 + TABS.length) % TABS.length;
      if (e.key === 'Home')       nextIdx = 0;
      if (e.key === 'End')        nextIdx = TABS.length - 1;

      if (nextIdx !== null) {
        e.preventDefault();
        const next = TABS[nextIdx];
        setActiveTab(next.id);
        document.getElementById(`tab-${next.id}`)?.focus();
      }
    },
    []
  );

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Conversion Tools
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
            Select a converter, or use the tool above to convert any file directly.
          </p>
        </div>

        {/* Tab bar — scrollable on mobile, centred on desktop */}
        <div
          role="tablist"
          aria-orientation="horizontal"
          aria-label="Conversion tool categories"
          className="no-scrollbar flex gap-1.5 overflow-x-auto sm:justify-center pb-0.5 mb-4"
        >
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => activateTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
                activeTab === tab.id
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panels — all rendered in HTML for SEO/crawlability */}
        {TABS.map((tab) => (
          <TabPanel key={tab.id} tab={tab} isActive={tab.id === activeTab} />
        ))}

        {/*
          Fallback links for tools that don't fit any tab grouping.
          Visually hidden — present in DOM so crawlers follow them from the homepage.
          aria-hidden prevents screen readers from announcing duplicates.
        */}
        <ul className="sr-only" aria-hidden="true">
          <li><Link href="/wav-to-ogg">WAV to OGG Converter</Link></li>
          <li><Link href="/mp3-to-ogg">MP3 to OGG Converter</Link></li>
          <li><Link href="/wav-to-aac">WAV to AAC Converter</Link></li>
          <li><Link href="/bpm-changer">BPM Changer &amp; Detector</Link></li>
          <li><Link href="/key-changer">Audio Key Changer &amp; Detector</Link></li>
        </ul>

        {/* Bottom CTA */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <Link
            href="/converters"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark hover:underline underline-offset-2 transition-colors"
          >
            View full conversion matrix
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
