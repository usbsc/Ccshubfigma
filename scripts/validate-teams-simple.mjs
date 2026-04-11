#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const teamsPath = path.join(__dirname, '../src/app/data/teams.ts');

const content = fs.readFileSync(teamsPath, 'utf-8');

// Extract all team IDs
const idMatches = [...content.matchAll(/id: ["']([^"']+)["']/g)];
const teamIds = idMatches.map((m) => m[1]);

console.log(`✓ Found ${teamIds.length} teams in teams.ts\n`);

// Extract all rankings
const rankingMatches = [...content.matchAll(/ranking:\s*(\d+)/g)];
const rankings = rankingMatches.map((m) => parseInt(m[1]));

// Check rankings 1-49 are all assigned
const rankingSet = new Set(rankings.filter((r) => r !== 50));
let missing = [];
for (let i = 1; i <= 49; i++) {
  if (!rankingSet.has(i)) {
    missing.push(i);
  }
}

if (missing.length > 0) {
  console.log('❌ Missing rankings:', missing.join(', '));
} else {
  console.log('✓ All rankings 1-49 assigned');
}

// Check for duplicates in 1-49
const rankCount = {};
rankings.forEach((r) => {
  rankCount[r] = (rankCount[r] || 0) + 1;
});

let duplicates = [];
Object.entries(rankCount).forEach(([rank, count]) => {
  if (count > 1 && rank !== '50') {
    duplicates.push(`${rank} appears ${count} times`);
  }
});

if (duplicates.length > 0) {
  console.log('❌ Duplicate rankings:', duplicates.join(', '));
} else {
  console.log('✓ No duplicate rankings (1-49)');
}

// Print distribution
console.log('\nRanking distribution:');
const dist = {};
rankings.forEach((r) => {
  dist[r] = (dist[r] || 0) + 1;
});
Object.keys(dist)
  .sort((a, b) => parseInt(a) - parseInt(b))
  .forEach((r) => {
    console.log(`  Ranking ${r}: ${dist[r]} schools`);
  });

const isValid = missing.length === 0 && duplicates.length === 0;
console.log(isValid ? '\n✅ All validations passed!' : '\n❌ Validation failed');
process.exit(isValid ? 0 : 1);
