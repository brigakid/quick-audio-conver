/**
 * lib/analytics.ts — lightweight GA4 event helper.
 *
 * Wraps window.gtag safely so the app never crashes if the GA script
 * has not loaded (ad-blockers, SSR, slow connections, etc.).
 */

// Extend the Window type so TypeScript accepts window.gtag
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

type GaParams = Record<string, string | number | boolean>;

/**
 * Fire a GA4 custom event.  No-ops gracefully if gtag is unavailable.
 *
 * @param name   GA4 event name  (e.g. 'audio_conversion_completed')
 * @param params Key/value event parameters to send alongside the event
 */
export function trackEvent(name: string, params: GaParams): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
