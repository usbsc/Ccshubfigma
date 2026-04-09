import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load MaxPreps data
const maxprepsPath = path.join(__dirname, "../src/app/data/teams.maxpreps.generated.ts");
const maxprepsContent = fs.readFileSync(maxprepsPath, "utf8");

// Extract maxprepsTeamData object using a simple regex
const dataMatch = maxprepsContent.match(/export const maxprepsTeamData[:\s\w]*=\s*({[\s\S]*?});/);
if (!dataMatch) {
  console.error("Could not extract maxprepsTeamData");
  process.exit(1);
}

// Create a valid JS object by replacing TypeScript types
const dataStr = dataMatch[1]
  .replace(/Record<string, MaxprepsTeamData>/g, "")
  .replace(/MaxprepsTeamData/g, "");

const maxprepsTeamData = eval(`(${dataStr})`);

// Load teams.ts
const teamsPath = path.join(__dirname, "../src/app/data/teams.ts");
const teamsContent = fs.readFileSync(teamsPath, "utf8");

// Add uniforms interface if not present
let updatedContent = teamsContent;
if (!updatedContent.includes("uniforms?:")) {
  updatedContent = updatedContent.replace(
    "export interface Team {",
    `export interface Team {
  uniforms?: {
    home?: { primary: string; secondary: string; description?: string };
    away?: { primary: string; secondary: string; description?: string };
    alternate?: { primary: string; secondary: string; description?: string };
  };`
  );
}

// Sort teams by stateRank from MaxPreps (lower = better rank)
const teamIds = Object.keys(maxprepsTeamData).sort((a, b) => {
  const aRank = maxprepsTeamData[a].stateRank || 999;
  const bRank = maxprepsTeamData[b].stateRank || 999;
  return aRank - bRank;
});

// Create ranking map
const rankingMap = {};
teamIds.forEach((id, index) => {
  rankingMap[id] = index + 1;
});

console.log("Top 10 Rankings:");
teamIds.slice(0, 10).forEach((id, i) => {
  console.log(`${i + 1}. ${id} (MaxPreps rank: ${maxprepsTeamData[id].stateRank})`);
});

// Update team entries with new rankings and add uniform stubs
let inBaseTeams = false;
let braceDepth = 0;
let teamStartIdx = -1;
const lines = updatedContent.split("\n");
const result = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("export const baseTeams:")) {
    inBaseTeams = true;
  }

  if (inBaseTeams && line.includes("id:")) {
    // Extract team ID
    const idMatch = line.match(/id:\s*"([^"]+)"/);
    if (idMatch) {
      const teamId = idMatch[1];
      const newRanking = rankingMap[teamId];

      // Replace ranking line
      const rankingIdx = i;
      while (rankingIdx < lines.length && !lines[rankingIdx].includes("ranking:")) {
        rankingIdx++;
      }
      if (rankingIdx < lines.length && lines[rankingIdx].includes("ranking:")) {
        lines[rankingIdx] = lines[rankingIdx].replace(/ranking:\s*\d+/, `ranking: ${newRanking}`);
      }

      // Also update stateRank
      const stateRankIdx = i;
      while (stateRankIdx < lines.length && !lines[stateRankIdx].includes("stateRank")) {
        stateRankIdx++;
      }
      if (stateRankIdx < lines.length) {
        lines[stateRankIdx] = `    stateRank: ${maxprepsTeamData[teamId]?.stateRank || "undefined"},`;
      } else {
        // Insert stateRank after ranking if missing
        const afterRankIdx = rankingIdx + 1;
        if (afterRankIdx < lines.length) {
          lines.splice(
            afterRankIdx,
            0,
            `    stateRank: ${maxprepsTeamData[teamId]?.stateRank || "undefined"},`
          );
        }
      }

      console.log(`Updated ${teamId}: ranking ${newRanking}, stateRank ${maxprepsTeamData[teamId]?.stateRank || "undefined"}`);
    }
  }
}

updatedContent = lines.join("\n");

// Save updated teams.ts
fs.writeFileSync(teamsPath, updatedContent, "utf8");
console.log("\n✓ Updated teams.ts with new rankings and uniform interface");

// Log uniform guidance
console.log("\nUniform color scheme guidance:");
console.log("- Home: team primary colors (jersey + pants)");
console.log("- Away: typically white/light colors for jersey");
console.log("- Alternate: second color combination or special design");
