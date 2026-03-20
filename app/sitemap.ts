import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://quickaudioconvert.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = [
    '/mp4-to-mp3',
    '/wav-to-mp3',
    '/m4a-to-mp3',
    '/flac-to-mp3',
    '/mp3-to-wav',
    '/aac-to-mp3',
    '/ogg-to-mp3',
  ];

  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/supported-formats', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.4, changeFrequency: 'monthly' as const },
    { url: '/terms', priority: 0.4, changeFrequency: 'monthly' as const },
  ];

  return [
    ...staticPages.map(({ url, priority, changeFrequency }) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...toolPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
