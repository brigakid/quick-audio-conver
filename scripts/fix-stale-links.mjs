#!/usr/bin/env node
/**
 * Rewrite stale internal links to their new canonical destinations.
 * These paths all 301 via next.config.ts, but internal links should
 * point directly to the canonical URL to avoid redirect hops.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = [
  join(process.cwd(), 'app'),
  join(process.cwd(), 'components'),
];

// Order matters — more-specific replacements first.
const MAP = [
  // /learn/* article redirects
  ['/learn/when-mp3-is-good-enough',                         '/formats/mp3'],
  ['/learn/wav-vs-mp3-for-editing-sharing-and-archiving',    '/guides/mp3-vs-wav'],
  ['/learn/how-bitrate-affects-file-size-and-sound-quality', '/guides/how-to-choose-mp3-bitrate'],
  ['/learn/when-converting-to-wav-does-not-improve-quality', '/guides/mp3-vs-wav'],
  ['/learn/aac-m4a-and-mp3-what-actually-matters',           '/formats/aac'],
  ['/learn/why-audio-files-fail-to-convert',                 '/guides/troubleshooting-audio-conversion'],
  ['/learn/best-audio-format-for-podcasts',                  '/guides/best-audio-format-for-podcasting'],
  ['/learn/best-audio-format-for-editing',                   '/guides/mp3-vs-wav'],
  ['/learn/best-audio-format-for-voice-recordings',          '/guides/best-audio-format-for-podcasting'],
  ['/learn/extracting-audio-from-video-best-format-choices', '/guides/extract-audio-from-video'],
  // /learn hub — must come AFTER all /learn/* to avoid prefix collision.
  ['/learn', '/guides'],

  // /wiki/what-is-{format} merged into /formats/*
  ['/wiki/what-is-mp3',  '/formats/mp3'],
  ['/wiki/what-is-wav',  '/formats/wav'],
  ['/wiki/what-is-flac', '/formats/flac'],
  ['/wiki/what-is-aac',  '/formats/aac'],
  ['/wiki/what-is-ogg',  '/formats/ogg'],
  ['/wiki/what-is-opus', '/formats/opus'],
];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|jsx?|mdx?)$/.test(entry)) out.push(full);
  }
  return out;
}

let filesChanged = 0;
let replacements = 0;

for (const root of ROOTS) {
  for (const path of walk(root)) {
    const src = readFileSync(path, 'utf8');
    let next = src;
    let localReplacements = 0;

    for (const [from, to] of MAP) {
      // Match only within quoted strings (href='/learn/...', href="/learn/...", href={`/learn/...`}).
      // Use word-boundary-like guard: the char after must be `"`, `'`, `\``, or path separator `/` is NOT allowed
      // (so /learn doesn't also match /learn-something). We handle this by matching end-of-string-or-non-path-char.
      const pattern = new RegExp(
        `(["'\`])${from.replace(/[/]/g, '\\/')}(?=["'\`?#])`,
        'g',
      );
      next = next.replace(pattern, (m, quote) => {
        localReplacements++;
        return `${quote}${to}`;
      });
    }

    if (localReplacements > 0) {
      writeFileSync(path, next, 'utf8');
      filesChanged++;
      replacements += localReplacements;
      console.log(`  ${path} — ${localReplacements} replacement${localReplacements === 1 ? '' : 's'}`);
    }
  }
}

console.log(`\nDone. ${filesChanged} files changed, ${replacements} total replacements.`);
