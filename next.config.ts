import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Serve the raw-XML sitemap route handler at the canonical /sitemap.xml path.
      // This avoids Next.js metadata-route script injection present in some versions.
      { source: '/sitemap.xml', destination: '/api/sitemap' },
    ];
  },
};

export default nextConfig;
