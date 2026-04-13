import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /supported-formats is the legacy URL — redirect permanently to /formats
      {
        source:      '/supported-formats',
        destination: '/formats',
        permanent:   true,
      },
      // /learn/best-audio-format-for-podcasts duplicates the guide — consolidate to the stronger page
      {
        source:      '/learn/best-audio-format-for-podcasts',
        destination: '/guides/best-audio-format-for-podcasting',
        permanent:   true,
      },
    ];
  },

  async rewrites() {
    // beforeFiles runs BEFORE the filesystem/metadata-route check.
    // Without this, Next.js serves app/sitemap.ts first (which injects <script/>)
    // and the rewrite to the clean route handler never executes.
    return {
      beforeFiles: [
        { source: '/sitemap.xml', destination: '/api/sitemap' },
      ],
      afterFiles: [],
      fallback:   [],
    };
  },
};

export default nextConfig;
