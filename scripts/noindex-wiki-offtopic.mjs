#!/usr/bin/env node
/**
 * Add `robots: { index: false }` to off-topic wiki pages — mixing/production
 * concepts that dilute topical authority for an audio-conversion domain.
 * Idempotent: skips pages that already have `robots:`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const APP_DIR = join(process.cwd(), 'app', 'wiki');

// Off-topic for audio conversion — keep mixing-adjacent concepts out of the index.
// Already noindexed: reverb, delay, panning, sidechain-compression (skip those).
const PAGES = [
  'what-is-eq',
  'what-is-normalization',
  'what-is-clipping',
  'what-is-noise-reduction',
  'what-is-gain-staging',
  'what-is-distortion',
  'what-is-mixing-mastering',
  'what-is-a-limiter',
  'what-is-mono-stereo',
  'what-is-loudness',
];

let edited = 0;
let skipped = 0;

for (const slug of PAGES) {
  const path = join(APP_DIR, slug, 'page.tsx');
  let src;
  try {
    src = readFileSync(path, 'utf8');
  } catch {
    console.warn(`skip (no file): ${slug}`);
    continue;
  }

  if (/robots:\s*\{\s*index:\s*false/.test(src)) {
    skipped++;
    continue;
  }

  // Insert `robots: { index: false },` right after the opening `export const metadata: Metadata = {`.
  src = src.replace(
    /(export const metadata: Metadata = \{\n)/,
    `$1  robots: { index: false },\n`,
  );

  writeFileSync(path, src, 'utf8');
  edited++;
  console.log(`noindexed: ${slug}`);
}

console.log(`\nDone. Noindexed ${edited}, already-noindexed ${skipped}.`);
