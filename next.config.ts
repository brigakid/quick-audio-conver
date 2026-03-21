import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
