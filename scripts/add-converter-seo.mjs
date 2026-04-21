#!/usr/bin/env node
/**
 * One-off migration: add `alternates: { canonical }` to converter page metadata
 * and pass `slug` prop to <ToolPageLayout>.
 *
 * Run once after all converter pages are refactored to accept `slug`.
 * Safe to re-run — idempotent (skips files that already have canonical).
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const APP_DIR = join(process.cwd(), 'app');

// Converter page slugs from lib/tools.ts + BPM / key / vocal-remover tools
const SLUGS = [
  'mp4-to-mp3', 'wav-to-mp3', 'flac-to-mp3', 'm4a-to-mp3', 'aiff-to-mp3',
  'wma-to-mp3', 'opus-to-mp3', 'aac-to-mp3', 'ogg-to-mp3',
  'mp3-to-wav', 'mp4-to-wav', 'm4a-to-wav', 'flac-to-wav',
  'mp3-to-m4a', 'wav-to-m4a',
  'wav-to-flac', 'aiff-to-flac',
  'wav-to-ogg', 'mp3-to-ogg',
  'wav-to-aac',
  'mov-to-mp3', 'mov-to-wav', 'mov-to-m4a',
  'alac-to-mp3', 'alac-to-wav', 'alac-to-flac',
  'amr-to-mp3', 'amr-to-wav',
  'ac3-to-mp3', 'ac3-to-wav',
  'aifc-to-mp3',
];

let edited = 0;
let skipped = 0;

for (const slug of SLUGS) {
  const path = join(APP_DIR, slug, 'page.tsx');
  let src;
  try {
    src = readFileSync(path, 'utf8');
  } catch (e) {
    console.warn(`skip (no file): ${slug}`);
    continue;
  }

  let changed = false;

  // 1. Inject alternates.canonical before openGraph block if missing.
  if (!/alternates:\s*\{[\s\S]*?canonical/.test(src)) {
    src = src.replace(
      /(\n  )(openGraph:\s*\{)/,
      `$1alternates: {\n    canonical: '/${slug}',\n  },\n$1$2`,
    );
    changed = true;
  }

  // 2. Inject slug prop on <ToolPageLayout ...> if missing.
  if (!/slug=/.test(src)) {
    src = src.replace(
      /(<ToolPageLayout\s*\n\s*)(title=)/,
      `$1slug="/${slug}"\n      $2`,
    );
    changed = true;
  }

  if (changed) {
    writeFileSync(path, src, 'utf8');
    edited++;
    console.log(`updated: ${slug}`);
  } else {
    skipped++;
  }
}

console.log(`\nDone. Edited ${edited}, skipped ${skipped}.`);
