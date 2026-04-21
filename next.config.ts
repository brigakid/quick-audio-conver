import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Malformed-URL catcher ────────────────────────────────────────────────
      // Some indexed/shared links look like /https://www.quickaudioconvert.com
      // (the site URL pasted as a path). Collapse all /http… and /https… paths
      // to the homepage so the anomaly does not generate thin indexed URLs.
      {
        source:      '/:proto(https?)\\://:rest*',
        destination: '/',
        permanent:   true,
      },

      // ── Legacy hub URLs ──────────────────────────────────────────────────────
      {
        source:      '/supported-formats',
        destination: '/formats',
        permanent:   true,
      },

      // ── /wiki/what-is-<format> → /formats/<format> ───────────────────────────
      // Wiki format guides were cannibalising /formats/* — merge into the
      // format pages, which are stronger converter-adjacent destinations.
      { source: '/wiki/what-is-mp3',  destination: '/formats/mp3',  permanent: true },
      { source: '/wiki/what-is-wav',  destination: '/formats/wav',  permanent: true },
      { source: '/wiki/what-is-flac', destination: '/formats/flac', permanent: true },
      { source: '/wiki/what-is-aac',  destination: '/formats/aac',  permanent: true },
      { source: '/wiki/what-is-ogg',  destination: '/formats/ogg',  permanent: true },
      { source: '/wiki/what-is-opus', destination: '/formats/opus', permanent: true },

      // ── /learn/* → /guides/* or /formats/* ───────────────────────────────────
      // Learn articles overlapped with guides and format pages. Consolidating
      // into the stronger destinations to end cannibalisation.
      {
        source:      '/learn/best-audio-format-for-podcasts',
        destination: '/guides/best-audio-format-for-podcasting',
        permanent:   true,
      },
      {
        source:      '/learn/wav-vs-mp3-for-editing-sharing-and-archiving',
        destination: '/guides/mp3-vs-wav',
        permanent:   true,
      },
      {
        source:      '/learn/when-converting-to-wav-does-not-improve-quality',
        destination: '/guides/mp3-vs-wav',
        permanent:   true,
      },
      {
        source:      '/learn/aac-m4a-and-mp3-what-actually-matters',
        destination: '/formats/aac',
        permanent:   true,
      },
      {
        source:      '/learn/best-audio-format-for-editing',
        destination: '/guides/mp3-vs-wav',
        permanent:   true,
      },
      {
        source:      '/learn/best-audio-format-for-voice-recordings',
        destination: '/guides/best-audio-format-for-podcasting',
        permanent:   true,
      },
      {
        source:      '/learn/extracting-audio-from-video-best-format-choices',
        destination: '/guides/extract-audio-from-video',
        permanent:   true,
      },
      {
        source:      '/learn/how-bitrate-affects-file-size-and-sound-quality',
        destination: '/guides/how-to-choose-mp3-bitrate',
        permanent:   true,
      },
      {
        source:      '/learn/when-mp3-is-good-enough',
        destination: '/formats/mp3',
        permanent:   true,
      },
      {
        source:      '/learn/why-audio-files-fail-to-convert',
        destination: '/guides/troubleshooting-audio-conversion',
        permanent:   true,
      },
      // /learn hub itself — send to /guides (which is now the single IA home
      // for long-form educational content).
      {
        source:      '/learn',
        destination: '/guides',
        permanent:   true,
      },
      {
        source:      '/learn/:path*',
        destination: '/guides',
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
