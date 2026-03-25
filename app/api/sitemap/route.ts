const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quickaudioconvert.com';

const pages = [
  // Core
  { url: '/',           priority: '1.0', changefreq: 'weekly'  },
  { url: '/converters', priority: '0.9', changefreq: 'monthly' },
  { url: '/formats',    priority: '0.9', changefreq: 'monthly' },
  { url: '/guides',     priority: '0.9', changefreq: 'weekly'  },

  // Conversion tool pages
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
  // New output format converters — FLAC, OGG, AAC
  { url: '/wav-to-flac',  priority: '0.8', changefreq: 'monthly' },
  { url: '/aiff-to-flac', priority: '0.7', changefreq: 'monthly' },
  { url: '/wav-to-ogg',   priority: '0.8', changefreq: 'monthly' },
  { url: '/mp3-to-ogg',   priority: '0.8', changefreq: 'monthly' },
  { url: '/wav-to-aac',   priority: '0.7', changefreq: 'monthly' },

  // Format knowledge pages
  { url: '/formats/mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/wav',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/flac', priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/m4a',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/aac',  priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/ogg',  priority: '0.7', changefreq: 'monthly' },

  // Guides
  { url: '/guides/mp3-vs-wav',                        priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/lossless-vs-lossy-audio',           priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/extract-audio-from-video',          priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/best-audio-format-for-podcasting',  priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/how-to-choose-mp3-bitrate',         priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/flac-vs-wav',                       priority: '0.7', changefreq: 'monthly' },
  { url: '/guides/troubleshooting-audio-conversion',  priority: '0.7', changefreq: 'monthly' },

  // Learn articles
  { url: '/learn',                                                    priority: '0.8', changefreq: 'monthly' },
  { url: '/learn/when-mp3-is-good-enough',                           priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/wav-vs-mp3-editing-sharing-archiving',              priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/how-bitrate-affects-file-size-and-sound',           priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/converting-to-wav-does-not-improve-quality',        priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/aac-m4a-mp3-what-matters',                          priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/why-audio-files-fail-to-convert',                   priority: '0.7', changefreq: 'monthly' },

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
