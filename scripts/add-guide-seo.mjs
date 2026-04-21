#!/usr/bin/env node
/**
 * Add canonicals + Article JSON-LD + Breadcrumbs to /guides/* pages.
 * Idempotent — skips pages already edited.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const APP_DIR = join(process.cwd(), 'app', 'guides');

const GUIDES = {
  'mp3-vs-wav': {
    headline: 'MP3 vs WAV: Which Format Should You Use?',
    description:
      'The practical differences between MP3 and WAV — quality, file size, compatibility, and which one fits your situation.',
    crumb: 'MP3 vs WAV',
  },
  'lossless-vs-lossy-audio': {
    headline: 'Lossless vs Lossy Audio: What the Difference Actually Is',
    description:
      'How lossy and lossless audio compression differ, when each makes sense, and how to pick the right format for your use case.',
    crumb: 'Lossless vs Lossy',
  },
  'extract-audio-from-video': {
    headline: 'How to Extract Audio from a Video File',
    description:
      'Extract audio from MP4, MOV, and other video files. Which output format to choose, how quality works, and what to watch out for.',
    crumb: 'Extract Audio from Video',
  },
  'best-audio-format-for-podcasting': {
    headline: 'Best Audio Format for Podcasting',
    description:
      'MP3, M4A, or WAV for podcasting? The practical recommendation for publishing, distribution, and archiving podcast audio.',
    crumb: 'Audio for Podcasting',
  },
  'how-to-choose-mp3-bitrate': {
    headline: 'How to Choose the Right MP3 Bitrate',
    description:
      '128, 192, or 320 kbps — how to pick the MP3 bitrate that matches your source quality and your listeners.',
    crumb: 'Choosing MP3 Bitrate',
  },
  'flac-vs-wav': {
    headline: 'FLAC vs WAV: Which Lossless Format Should You Use?',
    description:
      'FLAC and WAV both preserve full audio quality — but one is half the size. How to choose between them for archiving and editing.',
    crumb: 'FLAC vs WAV',
  },
  'troubleshooting-audio-conversion': {
    headline: 'Troubleshooting Audio Conversion: Why Conversions Fail',
    description:
      'Common reasons audio conversions fail — DRM, corrupted files, unsupported codecs — and what to do about each.',
    crumb: 'Troubleshooting',
  },
};

let edited = 0;

for (const [slug, meta] of Object.entries(GUIDES)) {
  const path = join(APP_DIR, slug, 'page.tsx');
  let src;
  try {
    src = readFileSync(path, 'utf8');
  } catch {
    console.warn(`skip (no file): ${slug}`);
    continue;
  }

  const canonicalPath = `/guides/${slug}`;
  let changed = false;

  // 1. Alternates.canonical
  if (!/alternates:\s*\{[\s\S]*?canonical/.test(src)) {
    src = src.replace(
      /(\n  )(openGraph:\s*\{)/,
      `$1alternates: {\n    canonical: '${canonicalPath}',\n  },\n$1$2`,
    );
    changed = true;
  }

  // 2. Imports — insert after the last import statement.
  if (!/from '@\/components\/seo\/JsonLd'/.test(src)) {
    // Split, find last import line, inject three new imports right after it.
    const lines = src.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^import\s.+from\s+['"][^'"]+['"];?\s*$/.test(lines[i])) {
        lastImportIdx = i;
      }
    }
    if (lastImportIdx >= 0) {
      lines.splice(
        lastImportIdx + 1,
        0,
        `import JsonLd from '@/components/seo/JsonLd';`,
        `import Breadcrumbs from '@/components/seo/Breadcrumbs';`,
        `import { articleSchema } from '@/lib/seo';`,
      );
      src = lines.join('\n');
      changed = true;
    }
  }

  // 3. Inject JsonLd + Breadcrumbs inside the top-level wrapper div.
  if (!/<JsonLd/.test(src)) {
    const injection = `
      <JsonLd
        data={articleSchema({
          headline: ${JSON.stringify(meta.headline)},
          description: ${JSON.stringify(meta.description)},
          path: '${canonicalPath}',
          datePublished: '2026-01-15',
          dateModified: '2026-04-14',
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: ${JSON.stringify(meta.crumb)}, path: '${canonicalPath}' },
        ]}
        className="text-xs text-gray-500 mb-6"
      />`;

    // Insert after the opening `<div className="max-w-3xl ...">` line.
    // Match either LF or CRLF line endings (these files are mixed on Windows).
    const before = src;
    src = src.replace(
      /(<div className="max-w-3xl[^"]*">\r?\n)/,
      `$1${injection}\n`,
    );
    if (src !== before) changed = true;
  }

  if (changed) {
    writeFileSync(path, src, 'utf8');
    edited++;
    console.log(`updated: /guides/${slug}`);
  }
}

console.log(`\nDone. Edited ${edited}.`);
