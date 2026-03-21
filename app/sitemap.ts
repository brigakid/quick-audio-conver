import type { MetadataRoute } from 'next';

// Next.js requires a default export here (filename convention).
// At runtime, /sitemap.xml is intercepted by the beforeFiles rewrite in
// next.config.ts and served by app/api/sitemap/route.ts instead,
// so this function is never actually called.
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
