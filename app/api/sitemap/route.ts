const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://quickaudioconvert.com';

const pages = [
  // Core
  { url: '/',           priority: '1.0', changefreq: 'weekly'  },
  { url: '/converters', priority: '0.9', changefreq: 'monthly' },
  { url: '/formats',    priority: '0.9', changefreq: 'monthly' },
  { url: '/guides',     priority: '0.9', changefreq: 'weekly'  },

  // Conversion tool pages
  // ── Indexable converters only ─────────────────────────────────────────────
  // The following converters are intentionally excluded from the sitemap and
  // marked noindex on the page itself, because they are too narrow/templated
  // to evaluate as independent content landing pages:
  //   /aifc-to-mp3  (essentially a dead format)
  //   /aiff-to-flac /alac-to-flac /alac-to-wav  (lossless→lossless, very narrow audience)
  //   /ac3-to-wav   (highly technical, narrow)
  //   /amr-to-wav   (voicemail-editing niche)
  //   /mov-to-m4a   (Apple→Apple niche)
  // The tools themselves still work and remain reachable via /converters and
  // related-tool links from indexable converter pages.
  { url: '/mp4-to-mp3',  priority: '0.9', changefreq: 'monthly' },
  { url: '/wav-to-mp3',  priority: '0.9', changefreq: 'monthly' },
  { url: '/m4a-to-mp3',  priority: '0.9', changefreq: 'monthly' },
  { url: '/flac-to-mp3', priority: '0.9', changefreq: 'monthly' },
  { url: '/mp3-to-wav',  priority: '0.9', changefreq: 'monthly' },
  { url: '/mp4-to-wav',  priority: '0.9', changefreq: 'monthly' },
  { url: '/aac-to-mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/ogg-to-mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/aiff-to-mp3', priority: '0.8', changefreq: 'monthly' },
  { url: '/opus-to-mp3', priority: '0.8', changefreq: 'monthly' },
  { url: '/wma-to-mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/m4a-to-wav',  priority: '0.8', changefreq: 'monthly' },
  { url: '/flac-to-wav', priority: '0.8', changefreq: 'monthly' },
  { url: '/mp3-to-m4a',  priority: '0.8', changefreq: 'monthly' },
  { url: '/wav-to-m4a',  priority: '0.8', changefreq: 'monthly' },
  // Output format converters — FLAC, OGG, AAC
  { url: '/wav-to-flac',  priority: '0.8', changefreq: 'monthly' },
  { url: '/wav-to-ogg',   priority: '0.8', changefreq: 'monthly' },
  { url: '/mp3-to-ogg',   priority: '0.8', changefreq: 'monthly' },
  { url: '/wav-to-aac',   priority: '0.7', changefreq: 'monthly' },
  // Wave 3 converters — MOV, ALAC, AMR, AC3 (mainstream variants only)
  { url: '/mov-to-mp3',   priority: '0.9', changefreq: 'monthly' },
  { url: '/mov-to-wav',   priority: '0.8', changefreq: 'monthly' },
  { url: '/alac-to-mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/amr-to-mp3',   priority: '0.8', changefreq: 'monthly' },
  { url: '/ac3-to-mp3',   priority: '0.8', changefreq: 'monthly' },

  // Format knowledge pages
  // Excluded (noindex): /formats/amr and /formats/ac3 — too niche to act as
  // standalone content landing pages. Still reachable from their respective
  // converter pages and the formats index.
  { url: '/formats/mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/wav',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/flac', priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/m4a',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/aac',  priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/ogg',  priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/opus', priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/aiff', priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/alac', priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/mov',  priority: '0.7', changefreq: 'monthly' },

  // Standalone audio tools (distinct search intent from converters)
  { url: '/bpm-changer', priority: '0.8', changefreq: 'monthly' },
  { url: '/key-changer', priority: '0.8', changefreq: 'monthly' },

  // Guides
  { url: '/guides/mp3-vs-wav',                        priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/lossless-vs-lossy-audio',           priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/extract-audio-from-video',          priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/best-audio-format-for-podcasting',  priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/how-to-choose-mp3-bitrate',         priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/flac-vs-wav',                       priority: '0.7', changefreq: 'monthly' },
  { url: '/guides/troubleshooting-audio-conversion',  priority: '0.7', changefreq: 'monthly' },

  // WikiSound — audio education (conversion-relevant only)
  // Excluded (noindex):
  //   - Mixing / production concepts: eq, clipping, noise-reduction, gain-staging,
  //     distortion, mixing-mastering, a-limiter, reverb, delay, panning,
  //     sidechain-compression. (Topical dilution.)
  //   - Generic audio concepts that compete with Wikipedia and are not
  //     specific to file conversion: what-is-frequency, what-is-audio-quality,
  //     what-is-loudness, what-is-mono-stereo, what-is-normalization.
  //   - Format "what-is-{mp3,wav,flac,aac,ogg,opus}" pages: 301-redirected to
  //     /formats/* in next.config.ts.
  { url: '/wiki',                                   priority: '0.9', changefreq: 'weekly'  },
  // Audio Fundamentals (conversion-relevant only)
  { url: '/wiki/what-is-bitrate',                   priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-sample-rate',               priority: '0.8', changefreq: 'monthly' },
  // Compression & Formats
  { url: '/wiki/what-is-lossless-audio',            priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-lossy-audio',               priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-audio-compression',         priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-audio-codec',               priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-container-format',          priority: '0.7', changefreq: 'monthly' },
  { url: '/wiki/codec-vs-container',                priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/cbr-vs-vbr',                        priority: '0.7', changefreq: 'monthly' },
  { url: '/wiki/what-is-transcoding',               priority: '0.7', changefreq: 'monthly' },
  { url: '/wiki/what-is-audio-artifacting',         priority: '0.7', changefreq: 'monthly' },

  // Trust / legal pages
  { url: '/about',   priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.4', changefreq: 'monthly' },
  { url: '/terms',   priority: '0.4', changefreq: 'monthly' },
];

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = pages
    .map(
      ({ url, priority, changefreq }) =>
        `  <url>\n    <loc>${BASE_URL}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
