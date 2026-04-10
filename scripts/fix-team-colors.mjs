import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teamsPath = path.join(__dirname, "../src/app/data/teams.ts");
let content = fs.readFileSync(teamsPath, "utf8");

// Correct colors for all teams (primary, secondary)
const colorFixes = {
  serra: { primary: "#004B87", secondary: "#FFFFFF" },
  "st-francis": { primary: "#0033A0", secondary: "#FFFFFF" },
  "st-ignatius": { primary: "#990033", secondary: "#FFCC00" },
  mitty: { primary: "#FF6600", secondary: "#000000" },
  "valley-christian": { primary: "#0066CC", secondary: "#FFFFFF" },
  bellarmine: { primary: "#8B0000", secondary: "#FFFFFF" },
  "sacred-heart": { primary: "#8B0000", secondary: "#FFCC00" },
  "los-gatos": { primary: "#003366", secondary: "#FFFFFF" },
  wilcox: { primary: "#000066", secondary: "#FFCC00" },
  "palo-alto": { primary: "#003366", secondary: "#FFFFFF" },
  "menlo-atherton": { primary: "#003366", secondary: "#FFCC00" },
  salinas: { primary: "#CC0000", secondary: "#FFFFFF" },
  palma: { primary: "#228B22", secondary: "#FFD700" },
  "north-salinas": { primary: "#003366", secondary: "#FFFFFF" },
  christopher: { primary: "#0066CC", secondary: "#FFFFFF" },
  leigh: { primary: "#CC0000", secondary: "#FFFFFF" },
  leland: { primary: "#003366", secondary: "#FFD700" },
  "oak-grove": { primary: "#228B22", secondary: "#FFFFFF" },
  "live-oak": { primary: "#CC0000", secondary: "#FFFFFF" },
  "piedmont-hills": { primary: "#003366", secondary: "#FFD700" },
  "santa-teresa": { primary: "#2D5016", secondary: "#FFD700" },
  "silver-creek": { primary: "#C0C0C0", secondary: "#000000" },
  branham: { primary: "#8B3A00", secondary: "#FFFFFF" },
  "evergreen-valley": { primary: "#228B22", secondary: "#FFFFFF" },
  lincoln: { primary: "#000066", secondary: "#FFCC00" },
  pioneer: { primary: "#0066CC", secondary: "#FFFFFF" },
  sobrato: { primary: "#8B4513", secondary: "#FFFFFF" },
  westmont: { primary: "#003366", secondary: "#FFFFFF" },
  "willow-glen": { primary: "#CC0000", secondary: "#FFFFFF" },
  "andrew-hill": { primary: "#CC0000", secondary: "#000000" },
  "del-mar": { primary: "#CC0000", secondary: "#FFFFFF" },
  gunderson: { primary: "#CC0000", secondary: "#FFFFFF" },
  independence: { primary: "#228B22", secondary: "#FFFFFF" },
  "james-lick": { primary: "#CC0000", secondary: "#FFFFFF" },
  "mt-pleasant": { primary: "#FF6600", secondary: "#FFFFFF" },
  overfelt: { primary: "#CC0000", secondary: "#FFFFFF" },
  prospect: { primary: "#003366", secondary: "#FFD700" },
  "san-jose": { primary: "#CC0000", secondary: "#FFFFFF" },
  "yerba-buena": { primary: "#003366", secondary: "#FFD700" },
  cupertino: { primary: "#0066CC", secondary: "#FFFFFF" },
  fremont: { primary: "#FF6600", secondary: "#000000" },
  gunn: { primary: "#003366", secondary: "#FFFFFF" },
  homestead: { primary: "#0066CC", secondary: "#FFFFFF" },
  "los-altos": { primary: "#8B0000", secondary: "#FFFFFF" },
  "monta-vista": { primary: "#4B0082", secondary: "#FFFFFF" },
  aptos: { primary: "#8B0000", secondary: "#FFFFFF" },
  "sacred-heart-prep": { primary: "#8B0000", secondary: "#FFCC00" },
  "santa-clara-high": { primary: "#0066CC", secondary: "#FFFFFF" },
  gilroy: { primary: "#CC0000", secondary: "#FFFFFF" },
  "morgan-hill": { primary: "#003366", secondary: "#FFFFFF" },
  "san-martin": { primary: "#2D5016", secondary: "#FFFFFF" },
  "tennessee-williams": { primary: "#FFD700", secondary: "#000000" },
  "east-palo-alto": { primary: "#8B0000", secondary: "#FFD700" },
};

let updated = 0;
Object.entries(colorFixes).forEach(([teamId, colors]) => {
  // Find the team and update colors
  const pattern = new RegExp(
    `(id: "${teamId}"[\\s\\S]*?colors: \\{\\s*primary: ")([^"]+)(",\\s*secondary: ")([^"]+)("\\s*\\},)`,
    "g"
  );

  const before = content;
  content = content.replace(pattern, `$1${colors.primary}$3${colors.secondary}$5`);

  if (before !== content) {
    updated++;
    console.log(`  ✓ ${teamId}: ${colors.primary} / ${colors.secondary}`);
  }
});

// Also update uniforms to match
content = content.replace(
  /uniforms: \{\s*home: \{ primary: "[^"]+", secondary: "[^"]+", description:[^}]+\},\s*away: \{ primary: "[^"]+", secondary: "[^"]+", description:[^}]+\},\s*alternate: \{ primary: "[^"]+", secondary: "[^"]+", description:[^}]+\},\s*\},/g,
  (match) => {
    // This is complex - we'll handle it team by team below
    return match;
  }
);

// Update uniforms for each team with corrected colors
Object.entries(colorFixes).forEach(([teamId, colors]) => {
  const pattern = new RegExp(
    `(id: "${teamId}"[\\s\\S]*?uniforms: \\{\\s*home: \\{ primary: ")([^"]+)", secondary: "([^"]+)",`,
    "g"
  );

  const before = content;
  content = content.replace(pattern, `$1${colors.primary}", secondary: "${colors.secondary}",`);

  // Update away
  const awayPattern = new RegExp(
    `(id: "${teamId}"[\\s\\S]*?away: \\{ primary: ")([^"]+)", secondary: "([^"]+)",`,
    "g"
  );
  content = content.replace(awayPattern, `$1#FFFFFF", secondary: "${colors.primary}",`);

  // Update alternate
  const altPattern = new RegExp(
    `(id: "${teamId}"[\\s\\S]*?alternate: \\{ primary: ")([^"]+)", secondary: "([^"]+)",`,
    "g"
  );
  content = content.replace(altPattern, `$1${colors.secondary}", secondary: "${colors.primary}",`);
});

fs.writeFileSync(teamsPath, content, "utf8");
console.log(`\n✓ Fixed colors for ${updated} teams`);
