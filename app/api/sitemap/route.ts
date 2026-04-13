const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://quickaudioconvert.com';

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
  // Output format converters — FLAC, OGG, AAC
  { url: '/wav-to-flac',  priority: '0.8', changefreq: 'monthly' },
  { url: '/aiff-to-flac', priority: '0.7', changefreq: 'monthly' },
  { url: '/wav-to-ogg',   priority: '0.8', changefreq: 'monthly' },
  { url: '/mp3-to-ogg',   priority: '0.8', changefreq: 'monthly' },
  { url: '/wav-to-aac',   priority: '0.7', changefreq: 'monthly' },
  // Wave 3 converters — MOV, ALAC, AMR, AC3, AIFC
  { url: '/mov-to-mp3',   priority: '0.9', changefreq: 'monthly' },
  { url: '/mov-to-wav',   priority: '0.8', changefreq: 'monthly' },
  { url: '/mov-to-m4a',   priority: '0.8', changefreq: 'monthly' },
  { url: '/alac-to-mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/alac-to-wav',  priority: '0.7', changefreq: 'monthly' },
  { url: '/alac-to-flac', priority: '0.7', changefreq: 'monthly' },
  { url: '/amr-to-mp3',   priority: '0.8', changefreq: 'monthly' },
  { url: '/amr-to-wav',   priority: '0.7', changefreq: 'monthly' },
  { url: '/ac3-to-mp3',   priority: '0.8', changefreq: 'monthly' },
  { url: '/ac3-to-wav',   priority: '0.7', changefreq: 'monthly' },
  { url: '/aifc-to-mp3',  priority: '0.6', changefreq: 'monthly' },

  // Format knowledge pages
  { url: '/formats/mp3',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/wav',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/flac', priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/m4a',  priority: '0.8', changefreq: 'monthly' },
  { url: '/formats/aac',  priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/ogg',  priority: '0.7', changefreq: 'monthly' },
  // New format pages
  { url: '/formats/aiff', priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/alac', priority: '0.7', changefreq: 'monthly' },
  { url: '/formats/amr',  priority: '0.6', changefreq: 'monthly' },
  { url: '/formats/ac3',  priority: '0.6', changefreq: 'monthly' },
  { url: '/formats/mov',  priority: '0.7', changefreq: 'monthly' },

  // Guides
  { url: '/guides/mp3-vs-wav',                        priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/lossless-vs-lossy-audio',           priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/extract-audio-from-video',          priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/best-audio-format-for-podcasting',  priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/how-to-choose-mp3-bitrate',         priority: '0.8', changefreq: 'monthly' },
  { url: '/guides/flac-vs-wav',                       priority: '0.7', changefreq: 'monthly' },
  { url: '/guides/troubleshooting-audio-conversion',  priority: '0.7', changefreq: 'monthly' },

  // Learn articles
  { url: '/learn',                                                              priority: '0.8', changefreq: 'monthly' },
  { url: '/learn/when-mp3-is-good-enough',                                     priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/wav-vs-mp3-for-editing-sharing-and-archiving',                priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/how-bitrate-affects-file-size-and-sound-quality',             priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/when-converting-to-wav-does-not-improve-quality',             priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/aac-m4a-and-mp3-what-actually-matters',                       priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/why-audio-files-fail-to-convert',                             priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/best-audio-format-for-editing',                               priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/best-audio-format-for-voice-recordings',                      priority: '0.7', changefreq: 'monthly' },
  { url: '/learn/extracting-audio-from-video-best-format-choices',             priority: '0.7', changefreq: 'monthly' },

  // WikiSound — audio education
  { url: '/wiki',                                   priority: '0.9', changefreq: 'weekly'  },
  // Audio Fundamentals
  { url: '/wiki/what-is-bitrate',                   priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-sample-rate',               priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-frequency',                 priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-audio-quality',             priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-loudness',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-mono-stereo',               priority: '0.8', changefreq: 'monthly' },
  // Compression & Formats
  { url: '/wiki/what-is-lossless-audio',            priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-lossy-audio',               priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-audio-compression',         priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-audio-codec',               priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-container-format',          priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/codec-vs-container',                priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/cbr-vs-vbr',                        priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-transcoding',               priority: '0.8', changefreq: 'monthly' },
  // Format Guides
  { url: '/wiki/what-is-mp3',                       priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-wav',                       priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-flac',                      priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-aac',                       priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-ogg',                       priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-opus',                      priority: '0.8', changefreq: 'monthly' },
  // Signal Processing
  { url: '/wiki/what-is-eq',                        priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-normalization',             priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-clipping',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-noise-reduction',           priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-audio-artifacting',         priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-gain-staging',              priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-distortion',                priority: '0.8', changefreq: 'monthly' },
  // Mixing & Production (reverb, delay, panning, sidechain-compression are noindexed — excluded from sitemap)
  { url: '/wiki/what-is-mixing-mastering',          priority: '0.8', changefreq: 'monthly' },
  { url: '/wiki/what-is-a-limiter',                 priority: '0.8', changefreq: 'monthly' },

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
