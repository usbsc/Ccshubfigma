#!/usr/bin/env node

/**
 * Fix Rankings: Assigns proper CCS rankings 1-49 based on MaxPreps state rankings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { maxprepsTeamData } from '../src/app/data/teams.maxpreps.generated.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const teamsPath = path.join(__dirname, '../src/app/data/teams.ts');

// Get state rank data for all MaxPreps schools
const stateRankMap = {};
Object.entries(maxprepsTeamData).forEach(([schoolId, data]) => {
  if (data && data.stateRank) {
    stateRankMap[schoolId] = data.stateRank;
  }
});

console.log(`Found ${Object.keys(stateRankMap).length} schools with state rankings in MaxPreps`);

// Sort schools by state rank to assign CCS rankings
const sortedByStateRank = Object.entries(stateRankMap)
  .sort((a, b) => a[1] - b[1])
  .slice(0, 50); // Take top 50 for CCS rankings

console.log(`Top 50 schools by state rank:`);
sortedByStateRank.forEach(([id, rank], idx) => {
  console.log(`  ${idx + 1}. ${id}: state rank ${rank}`);
});

// Create ranking assignment
const ccsRankingMap = {};
sortedByStateRank.forEach(([id], idx) => {
  ccsRankingMap[id] = idx + 1; // Assign CCS ranking 1-50
});

// Read teams.ts
let teamsContent = fs.readFileSync(teamsPath, 'utf-8');

// Function to replace ranking for a team
function replaceTeamRanking(content, teamId, newRanking) {
  // Match the team object and its ranking field
  const teamRegex = new RegExp(
    `(id: ["']${teamId}["'][\\s\\S]*?ranking:)\\s*\\d+`,
    'g'
  );
  
  return content.replace(teamRegex, `$1 ${newRanking}`);
}

// Get all unique school IDs from team definitions
const allTeamIds = [];
const teamIdPattern = /id: ["']([^"']+)["']/g;
let match;
while ((match = teamIdPattern.exec(teamsContent)) !== null) {
  if (!allTeamIds.includes(match[1])) {
    allTeamIds.push(match[1]);
  }
}

console.log(`\nTotal schools in teams.ts: ${allTeamIds.length}`);

// Update all rankings
let updatedCount = 0;
allTeamIds.forEach(teamId => {
  const newRanking = ccsRankingMap[teamId] || 50;
  const oldContent = teamsContent;
  teamsContent = replaceTeamRanking(teamsContent, teamId, newRanking);
  if (teamsContent !== oldContent) {
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} schools with proper rankings`);

// Write updated content
fs.writeFileSync(teamsPath, teamsContent, 'utf-8');
console.log(`\n✓ Successfully updated rankings in ${teamsPath}`);

// Verify rankings
const rankingCounts = {};
const rankingPattern = /ranking:\s*(\d+)/g;
while ((match = rankingPattern.exec(teamsContent)) !== null) {
  const rank = match[1];
  rankingCounts[rank] = (rankingCounts[rank] || 0) + 1;
}

console.log('\nRanking distribution:');
Object.keys(rankingCounts)
  .sort((a, b) => parseInt(a) - parseInt(b))
  .forEach(rank => {
    console.log(`  Ranking ${rank}: ${rankingCounts[rank]} schools`);
  });


