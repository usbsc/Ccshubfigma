#!/usr/bin/env node

/**
 * Validate Team Data: Check all teams have valid data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const teamsPath = path.join(__dirname, '../src/app/data/teams.ts');

// Read teams data
const teamsContent = fs.readFileSync(teamsPath, 'utf-8');

// Extract teams from the file using regex
const teamPattern = /\{([^{}]*?id:\s*["']([^"']+)["'][^{}]*?)\}/gs;
let match;
const teams = [];

while ((match = teamPattern.exec(teamsContent)) !== null) {
  const teamStr = match[1];
  const teamId = match[2];

  // Extract key fields
  const nameMatch = teamStr.match(/name:\s*["']([^"']+)["']/);
  const rankingMatch = teamStr.match(/ranking:\s*(\d+)/);
  const recordMatch = teamStr.match(/record:\s*\{[^}]*wins:\s*(\d+)[^}]*losses:\s*(\d+)/);

  teams.push({
    id: teamId,
    name: nameMatch ? nameMatch[1] : 'MISSING',
    ranking: rankingMatch ? parseInt(rankingMatch[1]) : null,
    record:
      recordMatch && recordMatch[1] && recordMatch[2]
        ? { wins: parseInt(recordMatch[1]), losses: parseInt(recordMatch[2]) }
        : null,
  });
}

console.log(`✓ Found ${teams.length} teams in teams.ts\n`);

// Validation checks
const errors = [];
const warnings = [];

// Check 1: All teams have required fields
teams.forEach((team) => {
  if (!team.name || team.name === 'MISSING') {
    errors.push(`Team "${team.id}": Missing name`);
  }
  if (!team.ranking && team.ranking !== 0) {
    errors.push(`Team "${team.id}": Missing ranking`);
  }
  if (!team.record) {
    warnings.push(`Team "${team.id}": Missing record data`);
  }
});

// Check 2: Ranking range (1-50)
teams.forEach((team) => {
  if (team.ranking && (team.ranking < 1 || team.ranking > 50)) {
    warnings.push(
      `Team "${team.id}": Ranking ${team.ranking} outside expected range 1-50`
    );
  }
});

// Check 3: Duplicate rankings (except 50)
const rankingMap = {};
teams.forEach((team) => {
  if (team.ranking && team.ranking !== 50) {
    if (rankingMap[team.ranking]) {
      errors.push(
        `Duplicate ranking ${team.ranking}: "${team.id}" and "${rankingMap[team.ranking]}"`
      );
    } else {
      rankingMap[team.ranking] = team.id;
    }
  }
});

// Check 4: All rankings 1-49 assigned exactly once
const assignedRankings = Object.keys(rankingMap).map((r) => parseInt(r));
for (let i = 1; i <= 49; i++) {
  if (!assignedRankings.includes(i)) {
    errors.push(`Missing ranking: ${i}`);
  }
}

// Check 5: Record validity
teams.forEach((team) => {
  if (team.record) {
    if (team.record.wins < 0 || team.record.losses < 0) {
      errors.push(`Team "${team.id}": Invalid wins/losses (negative)`);
    }
  }
});

// Print results
if (errors.length > 0) {
  console.log('❌ ERRORS:');
  errors.forEach((err) => console.log(`  - ${err}`));
  console.log();
}

if (warnings.length > 0) {
  console.log('⚠ WARNINGS:');
  warnings.forEach((warn) => console.log(`  - ${warn}`));
  console.log();
}

// Print summary
console.log('Ranking distribution:');
const rankCounts = {};
teams.forEach((team) => {
  const rank = team.ranking || 'UNASSIGNED';
  rankCounts[rank] = (rankCounts[rank] || 0) + 1;
});

Object.keys(rankCounts)
  .sort((a, b) => {
    if (a === 'UNASSIGNED') return 1;
    if (b === 'UNASSIGNED') return -1;
    return parseInt(a) - parseInt(b);
  })
  .forEach((rank) => {
    console.log(`  Ranking ${rank}: ${rankCounts[rank]} schools`);
  });

console.log();

if (errors.length === 0) {
  console.log('✅ All team data validation checks passed!');
  process.exit(0);
} else {
  console.log(`❌ Found ${errors.length} validation errors`);
  process.exit(1);
}
