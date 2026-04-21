/**
 * lib/seo.ts — central SEO helpers.
 *
 * - `siteUrl()` — canonical base URL for the production site.
 * - `canonical(path)` — path-only canonical value for Next.js `alternates.canonical`.
 *   Returning a path (not an absolute URL) lets Next.js apply `metadataBase`
 *   automatically and keeps canonicals safe across preview deployments.
 * - Schema builders return plain JS objects to be passed to <JsonLd>.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://quickaudioconvert.com';

export const SITE_NAME = 'QuickAudioConvert';

export const ORG = {
  name: SITE_NAME,
  legalName: 'QuickAudioConvert',
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  email: 'contact@quickaudioconvert.com',
  founder: 'James',
  foundingDate: '2026',
};

export function canonical(path: string): string {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${canonical(path)}`;
}

// ─── Schema builders ────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/converters?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: {
      '@type': 'ImageObject',
      url: ORG.logo,
    },
    email: ORG.email,
    foundingDate: ORG.foundingDate,
    founder: {
      '@type': 'Person',
      name: ORG.founder,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: ORG.email,
      contactType: 'customer support',
      availableLanguage: ['en'],
    },
  };
}

export function softwareApplicationSchema(opts: {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.url),
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (web-based)',
    browserRequirements: 'Requires JavaScript. Modern browser.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: opts.featureList,
    publisher: { '@id': `${SITE_URL}#organization` },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(opts.path),
    },
    datePublished: opts.datePublished || '2026-01-01',
    dateModified: opts.dateModified || opts.datePublished || '2026-04-14',
    author: {
      '@type': 'Person',
      name: opts.author || ORG.founder,
    },
    publisher: { '@id': `${SITE_URL}#organization` },
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
