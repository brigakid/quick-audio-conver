import AdSlot from './AdSlot';

interface SideRailProps {
  side: 'left' | 'right';
  /**
   * AdSense slot ID for this rail. When absent the entire component renders
   * nothing — no DOM node, no reserved space, no visual artifact.
   */
  adSlot?: string;
}

/**
 * SideRail — a fixed desktop-only ad column that floats in the natural margin
 * space beside the centered main content on wide screens (≥1536px, "2xl").
 *
 * INVISIBLE UNTIL ACTIVATED — the component returns null when `adSlot` is
 * not provided. Pass a real AdSense slot ID to make the rail appear.
 *
 * ── Geometry ────────────────────────────────────────────────────────────────
 * At 2xl (1536px viewport):
 *   max-w-6xl container  = 1152px  (centered, includes its own px-8 padding)
 *   Margin per side      = (1536 − 1152) ÷ 2  = 192px
 *   Rail width           = 180px
 *   Gap to content edge  = 192 − 180             = 12px  ← safe clearance
 *
 * At 1800px viewport:
 *   Margin per side      = (1800 − 1152) ÷ 2  = 324px
 *   Gap to content edge  = 324 − 180             = 144px  ← generous
 *
 * The 180px width accommodates the standard "160×600 Wide Skyscraper" unit
 * with small breathing room, and the responsive "auto" format adapts to fill
 * it cleanly.
 *
 * ── Positioning ─────────────────────────────────────────────────────────────
 *  • `fixed`   — stays in view as the user scrolls
 *  • `top-16`  — clears the 64px sticky header
 *  • `z-40`    — below the z-50 header; above page content
 *  • `hidden 2xl:flex` — only appears at ≥1536px
 */
export default function SideRail({ side, adSlot }: SideRailProps) {
  // No slot configured → render nothing. The layout stays completely clean.
  if (!adSlot) return null;

  return (
    <aside
      aria-label="Advertisement"
      className={[
        'hidden 2xl:flex flex-col',
        'fixed top-16 bottom-0 z-40',
        'w-[180px]',
        side === 'left' ? 'left-0' : 'right-0',
      ].join(' ')}
    >
      <div className="sticky top-24 w-full px-3 pt-4">
        <AdSlot
          adSlot={adSlot}
          adFormat="vertical"
          minHeight={600}
          className="w-full"
        />
      </div>
    </aside>
  );
}
