#!/usr/bin/env node
/**
 * Plain-language readability gate.
 * Reads all markdown content files, computes Flesch-Kincaid grade level,
 * and exits 1 if the average grade exceeds the threshold.
 *
 * Threshold: avg FK grade ≤ 8 (readable at ~8th-grade level).
 * Run: node scripts/plain-language.mjs [--threshold=8] [--verbose]
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const args = process.argv.slice(2);
const threshold = parseFloat(args.find(a => a.startsWith('--threshold='))?.split('=')[1] ?? '8');
const verbose = args.includes('--verbose');

// ─── Readability helpers ──────────────────────────────────────────────────────

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  // Strip silent e and common suffixes
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? Math.max(1, m.length) : 1;
}

function stripMarkdown(text) {
  return text
    .replace(/^---[\s\S]*?---/m, '')   // frontmatter
    .replace(/```[\s\S]*?```/g, ' ')   // code blocks
    .replace(/`[^`]+`/g, ' ')          // inline code
    .replace(/!\[.*?\]\(.*?\)/g, ' ')  // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // links → text
    .replace(/#{1,6}\s+/g, '')         // headings
    .replace(/[*_~>|]+/g, ' ')         // emphasis, tables, blockquotes
    .replace(/[^\S\n]+/g, ' ')         // collapse horizontal whitespace, preserve newlines
    .replace(/\n{3,}/g, '\n\n')        // collapse blank lines
    .trim();
}

function fleschKincaid(text) {
  // Split on punctuation OR newlines — each bullet-point line is a sentence unit.
  const sentences = text
    .split(/[.!?]+|\n/)
    .map(s => s.trim())
    .filter(s => s.length > 8 && /[a-zA-Z]/.test(s));
  if (sentences.length === 0) return null;

  const words = text.split(/\s+/).filter(w => w.match(/[a-zA-Z]/));
  if (words.length < 10) return null; // too short to score

  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const asl = words.length / sentences.length; // avg sentence length
  const asw = syllables / words.length;         // avg syllables per word

  // Flesch-Kincaid Grade Level formula
  const grade = 0.39 * asl + 11.8 * asw - 15.59;
  return { grade: Math.round(grade * 10) / 10, words: words.length, sentences: sentences.length };
}

// ─── File walker ─────────────────────────────────────────────────────────────

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (['.md', '.mdx'].includes(extname(entry))) {
      files.push(full);
    }
  }
  return files;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const contentDir = join(process.cwd(), 'src/content');
const files = walk(contentDir);

if (files.length === 0) {
  console.log('No markdown files found in src/content — skipping plain-language check.');
  process.exit(0);
}

const results = [];
let failed = false;

for (const file of files) {
  const raw = readFileSync(file, 'utf-8');
  const text = stripMarkdown(raw);
  const score = fleschKincaid(text);
  const rel = file.replace(process.cwd() + '/', '');

  if (!score) {
    if (verbose) console.log(`  SKIP  ${rel} (too short)`);
    continue;
  }

  const status = score.grade <= threshold ? 'PASS' : 'FAIL';
  if (status === 'FAIL') failed = true;

  results.push({ file: rel, ...score, status });

  if (verbose || status === 'FAIL') {
    const icon = status === 'PASS' ? '✓' : '✗';
    console.log(`  ${icon} ${rel}`);
    console.log(`      grade=${score.grade}  words=${score.words}  sentences=${score.sentences}`);
  }
}

if (results.length === 0) {
  console.log('No scoreable content found — skipping plain-language check.');
  process.exit(0);
}

const avg = results.reduce((sum, r) => sum + r.grade, 0) / results.length;
const rounded = Math.round(avg * 10) / 10;
const pass = results.filter(r => r.status === 'PASS').length;
const total = results.length;

console.log('');
console.log(`Plain-language check — Flesch-Kincaid Grade Level`);
console.log(`  Threshold : ≤ ${threshold}`);
console.log(`  Average   : ${rounded}  (${pass}/${total} files pass individually)`);

if (failed) {
  console.log('');
  console.log('FAIL: One or more content files exceed the grade-level threshold.');
  console.log('Simplify sentences and use shorter words in the files listed above.');
  process.exit(1);
}

console.log('  Result    : PASS');
