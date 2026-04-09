import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teamsPath = path.join(__dirname, "../src/app/data/teams.ts");
const maxprepsPath = path.join(__dirname, "../src/app/data/teams.maxpreps.generated.ts");

let teamsContent = fs.readFileSync(teamsPath, "utf8");
const maxprepsContent = fs.readFileSync(maxprepsPath, "utf8");

// Parse state ranks from maxpreps (looking for top-level keys followed by stateRank)
const rankMap = {};
const lines = maxprepsContent.split("\n");
let currentTeam = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  // Match team ID at start of object: "team-id": {
  const teamMatch = line.match(/^"(\w+-?\w+)":\s*\{/);
  if (teamMatch) {
    currentTeam = teamMatch[1];
  }
  // Match stateRank within team object
  if (currentTeam && line.includes('"stateRank":')) {
    const rankMatch = line.match(/"stateRank":\s*(\d+)/);
    if (rankMatch) {
      rankMap[currentTeam] = parseInt(rankMatch[1]);
      currentTeam = null;
    }
  }
}

console.log("Teams with state rankings (top 15):");
Object.entries(rankMap)
  .sort((a, b) => a[1] - b[1])
  .slice(0, 15)
  .forEach(([id, rank], idx) => {
    console.log(`  ${idx + 1}. ${id}: #${rank}`);
  });

// Create ranking positions (1-based, sorted by state rank)
const rankedTeams = Object.entries(rankMap)
  .sort((a, b) => a[1] - b[1])
  .map(([id], idx) => [id, idx + 1]);

const rankPositions = Object.fromEntries(rankedTeams);

// Add uniforms interface if not present
if (!teamsContent.includes("uniforms?:")) {
  teamsContent = teamsContent.replace(
    "export interface Team {",
    `export interface Team {
  uniforms?: {
    home?: { primary: string; secondary: string; description?: string };
    away?: { primary: string; secondary: string; description?: string };
    alternate?: { primary: string; secondary: string; description?: string };
  };`
  );
  console.log("\n✓ Added uniforms interface to Team");
}

// Update rankings in teams.ts
const updatedLines = [];
let inTeamObject = false;
let currentTeamId = null;

for (let i = 0; i < teamsContent.split("\n").length; i++) {
  let line = teamsContent.split("\n")[i];

  // Detect team id
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  if (idMatch && i > 40) {
    currentTeamId = idMatch[1];
  }

  // Update ranking line
  if (currentTeamId && line.trim().startsWith("ranking:")) {
    const newRank = rankPositions[currentTeamId] || 999;
    line = line.replace(/ranking:\s*\d+,?/, `ranking: ${newRank},`);
  }

  // Update stateRank line
  if (currentTeamId && line.trim().startsWith("stateRank")) {
    const stateRank = rankMap[currentTeamId] || 0;
    line = line.replace(/stateRank:\s*\d+,?/, `stateRank: ${stateRank},`);
  }

  updatedLines.push(line);
}

teamsContent = updatedLines.join("\n");
fs.writeFileSync(teamsPath, teamsContent, "utf8");
console.log("✓ Updated team rankings in teams.ts\n");
