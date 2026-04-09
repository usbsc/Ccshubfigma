import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teamsPath = path.join(__dirname, "../src/app/data/teams.ts");
let content = fs.readFileSync(teamsPath, "utf8");

// Define uniform colors for each team (home, away, alternate)
// Home: primary jersey with primary pants
// Away: white/light jersey (unless team is traditionally white/light)
// Alternate: secondary color combination or special design
const uniformSchemes = {
  riordan: {
    home: { primary: "#8B0000", secondary: "#FFD700", description: "Red jersey with gold accents" },
    away: { primary: "#FFFFFF", secondary: "#000000", description: "White jersey with maroon trim" },
    alternate: { primary: "#FFD700", secondary: "#8B0000", description: "Gold jersey (rare)" },
  },
  serra: {
    home: { primary: "#333333", secondary: "#FFCC00", description: "Dark gray jersey with gold" },
    away: { primary: "#FFFFFF", secondary: "#333333", description: "White jersey with gray trim" },
    alternate: { primary: "#FFCC00", secondary: "#333333", description: "Gold jersey" },
  },
  "st-francis": {
    home: { primary: "#003399", secondary: "#FFFFFF", description: "Blue jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#003399", description: "White jersey with blue trim" },
    alternate: { primary: "#999999", secondary: "#003399", description: "Gray alternate" },
  },
  "st-ignatius": {
    home: { primary: "#990033", secondary: "#FFFF00", description: "Maroon jersey with gold" },
    away: { primary: "#FFFFFF", secondary: "#990033", description: "White jersey with maroon" },
    alternate: { primary: "#FFFF00", secondary: "#990033", description: "Gold jersey" },
  },
  mitty: {
    home: { primary: "#FF6600", secondary: "#000000", description: "Orange jersey with black" },
    away: { primary: "#FFFFFF", secondary: "#FF6600", description: "White jersey with orange" },
    alternate: { primary: "#000000", secondary: "#FF6600", description: "Black jersey" },
  },
  wilcox: {
    home: { primary: "#000066", secondary: "#FFCC00", description: "Navy jersey with gold" },
    away: { primary: "#FFFFFF", secondary: "#000066", description: "White jersey with navy trim" },
    alternate: { primary: "#FFCC00", secondary: "#000066", description: "Gold alternate" },
  },
  palma: {
    home: { primary: "#336633", secondary: "#CCCC00", description: "Green jersey with gold" },
    away: { primary: "#FFFFFF", secondary: "#336633", description: "White jersey with green" },
    alternate: { primary: "#CCCC00", secondary: "#336633", description: "Gold jersey" },
  },
  "los-gatos": {
    home: { primary: "#003366", secondary: "#FFFFFF", description: "Dark blue with white" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with blue trim" },
    alternate: { primary: "#FF9900", secondary: "#003366", description: "Orange alternate" },
  },
  "sacred-heart": {
    home: { primary: "#8B0000", secondary: "#FFCC00", description: "Red jersey with gold" },
    away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with red trim" },
    alternate: { primary: "#FFCC00", secondary: "#8B0000", description: "Gold jersey" },
  },
};

// Extract all team IDs from the file
const teamIds = [];
const teamIdPattern = /id:\s*"([^"]+)"/g;
let match;
while ((match = teamIdPattern.exec(content)) !== null) {
  const teamId = match[1];
  if (!teamIds.includes(teamId) && teamId !== "generic") {
    teamIds.push(teamId);
  }
}

console.log(`Found ${teamIds.length} teams in teams.ts`);

// For each team, inject uniforms after colors if not present
teamIds.forEach((teamId) => {
  const uniforms = uniformSchemes[teamId];
  if (!uniforms) {
    console.log(`  ⚠ ${teamId}: Using default uniform scheme`);
    return;
  }

  // Find the team object and insert uniforms after colors
  const colorsPattern = new RegExp(
    `(id:\\s*"${teamId.replace(/[-]/g, "\\-")}"[\\s\\S]*?colors:\\s*\\{[\\s\\S]*?\\},)`,
    "g"
  );

  const replacement = `$1\n    uniforms: {\n      home: { primary: "${uniforms.home.primary}", secondary: "${uniforms.home.secondary}", description: "${uniforms.home.description}" },\n      away: { primary: "${uniforms.away.primary}", secondary: "${uniforms.away.secondary}", description: "${uniforms.away.description}" },\n      alternate: { primary: "${uniforms.alternate.primary}", secondary: "${uniforms.alternate.secondary}", description: "${uniforms.alternate.description}" },\n    },`;

  const before = content;
  content = content.replace(colorsPattern, replacement);

  if (before !== content) {
    console.log(`  ✓ ${teamId}: Added home/away/alternate uniforms`);
  } else {
    console.log(`  ℹ ${teamId}: Uniforms already present or not matched`);
  }
});

fs.writeFileSync(teamsPath, content, "utf8");
console.log("\n✓ All uniforms updated");
