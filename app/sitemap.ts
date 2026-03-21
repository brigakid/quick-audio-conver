import type { MetadataRoute } from 'next';

// Sitemap is served by app/api/sitemap/route.ts (raw XML Route Handler)
// mapped to /sitemap.xml via the rewrite in next.config.ts.
// This file is intentionally empty to prevent a duplicate-route conflict.
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
