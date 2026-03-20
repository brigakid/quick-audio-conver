'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  /**
   * AdSense publisher ID — set via NEXT_PUBLIC_ADSENSE_CLIENT env var,
   * or pass directly as a prop. Format: "ca-pub-XXXXXXXXXXXXXXXX"
   */
  adClient?: string;
  /** AdSense ad-slot ID for this specific placement */
  adSlot?: string;
  /** AdSense ad format. Defaults to "auto" */
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  /**
   * Minimum height reserved once the slot is configured, preventing layout
   * shift when the ad loads. Has no effect when the slot is unconfigured
   * (the component returns null, so no space is reserved at all).
   */
  minHeight?: number;
  /** Extra Tailwind classes on the outer wrapper */
  className?: string;
}

/**
 * AdSlot — a ready-to-activate Google AdSense placement.
 *
 * INVISIBLE UNTIL CONFIGURED — when adClient + adSlot are both absent this
 * component returns null. No placeholder, no blank box, no reserved space.
 * The page layout stays completely clean before ads go live.
 *
 * HOW TO ACTIVATE:
 * 1. Add your publisher ID to .env.local:
 *      NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 * 2. Pass the slot ID unique to each placement via the `adSlot` prop.
 * 3. Add the AdSense script to app/layout.tsx <head>:
 *      <Script
 *        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"
 *        strategy="lazyOnload"
 *        crossOrigin="anonymous"
 *      />
 * 4. The <ins> element auto-fills once the script loads and AdSense approves
 *    the placement.
 */
export default function AdSlot({
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '',
  adSlot,
  adFormat = 'auto',
  minHeight = 250,
  className = '',
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);

  const isConfigured = Boolean(adClient && adSlot);

  // Push to adsbygoogle queue once the element is mounted and the script is
  // available. Safe to call multiple times — AdSense de-dupes internally.
  useEffect(() => {
    if (!isConfigured) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense script not yet loaded — will activate when the script loads
    }
  }, [isConfigured]);

  // Not configured → render nothing. No space reserved, no visible element.
  if (!isConfigured) return null;

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ minHeight }}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
