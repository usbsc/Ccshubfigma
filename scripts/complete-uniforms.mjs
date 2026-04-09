import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teamsPath = path.join(__dirname, "../src/app/data/teams.ts");
let content = fs.readFileSync(teamsPath, "utf8");

// Extract team data to understand actual colors
const teamColorMap = {};
const teamPattern = /id:\s*"([^"]+)"[\s\S]*?colors:\s*\{\s*primary:\s*"([^"]+)",\s*secondary:\s*"([^"]+)"/g;
let match;
while ((match = teamPattern.exec(content)) !== null) {
  const [, id, primary, secondary] = match;
  teamColorMap[id] = { primary, secondary };
}

// Complete uniform schemes
const uniformSchemes = {
  "valley-christian": {
    home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White jersey with blue trim" },
    alternate: { primary: "#FFD700", secondary: "#0066CC", description: "Gold alternate" },
  },
  bellarmine: {
    home: { primary: "#8B0000", secondary: "#FFFFFF", description: "Maroon jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with maroon trim" },
    alternate: { primary: "#FFD700", secondary: "#8B0000", description: "Gold jersey" },
  },
  "palo-alto": {
    home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy trim" },
    alternate: { primary: "#FF6600", secondary: "#003366", description: "Orange alternate" },
  },
  "menlo-atherton": {
    home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
  },
  christopher: {
    home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FF6600", secondary: "#003366", description: "Orange jersey" },
  },
  leigh: {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000000", secondary: "#FF0000", description: "Black jersey" },
  },
  leland: {
    home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
  },
  "oak-grove": {
    home: { primary: "#228B22", secondary: "#FFFFFF", description: "Forest green with white" },
    away: { primary: "#FFFFFF", secondary: "#228B22", description: "White with green trim" },
    alternate: { primary: "#FFD700", secondary: "#228B22", description: "Gold jersey" },
  },
  salinas: {
    home: { primary: "#FF4500", secondary: "#000000", description: "Orange-red with black" },
    away: { primary: "#FFFFFF", secondary: "#FF4500", description: "White with orange trim" },
    alternate: { primary: "#000000", secondary: "#FF4500", description: "Black jersey" },
  },
  aptos: {
    home: { primary: "#8B0000", secondary: "#FFFFFF", description: "Maroon with white" },
    away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with maroon" },
    alternate: { primary: "#FFD700", secondary: "#8B0000", description: "Gold jersey" },
  },
  "sacred-heart-prep": {
    home: { primary: "#8B0000", secondary: "#FFCC00", description: "Red jersey with gold" },
    away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with red trim" },
    alternate: { primary: "#FFCC00", secondary: "#8B0000", description: "Gold jersey" },
  },
  "andrew-hill": {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000000", secondary: "#FF0000", description: "Black jersey" },
  },
  branham: {
    home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
  },
  "del-mar": {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000080", secondary: "#FF0000", description: "Navy jersey" },
  },
  "evergreen-valley": {
    home: { primary: "#228B22", secondary: "#FFFFFF", description: "Green jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#228B22", description: "White with green trim" },
    alternate: { primary: "#FFD700", secondary: "#228B22", description: "Gold jersey" },
  },
  gunderson: {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000000", secondary: "#FF0000", description: "Black jersey" },
  },
  independence: {
    home: { primary: "#008000", secondary: "#FFFFFF", description: "Green jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#008000", description: "White with green trim" },
    alternate: { primary: "#FFD700", secondary: "#008000", description: "Gold jersey" },
  },
  "james-lick": {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000000", secondary: "#FF0000", description: "Black jersey" },
  },
  lincoln: {
    home: { primary: "#000080", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#000080", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#000080", description: "Gold jersey" },
  },
  "live-oak": {
    home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FF6600", secondary: "#003366", description: "Orange jersey" },
  },
  "mt-pleasant": {
    home: { primary: "#FF4500", secondary: "#FFFFFF", description: "Orange-red with white" },
    away: { primary: "#FFFFFF", secondary: "#FF4500", description: "White with orange trim" },
    alternate: { primary: "#000000", secondary: "#FF4500", description: "Black jersey" },
  },
  overfelt: {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000000", secondary: "#FF0000", description: "Black jersey" },
  },
  "piedmont-hills": {
    home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
  },
  pioneer: {
    home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FF6600", secondary: "#003366", description: "Orange jersey" },
  },
  prospect: {
    home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
  },
  "san-jose": {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000000", secondary: "#FF0000", description: "Black jersey" },
  },
  "santa-teresa": {
    home: { primary: "#228B22", secondary: "#FFCC00", description: "Green with gold" },
    away: { primary: "#FFFFFF", secondary: "#228B22", description: "White with green" },
    alternate: { primary: "#FFCC00", secondary: "#228B22", description: "Gold jersey" },
  },
  "silver-creek": {
    home: { primary: "#C0C0C0", secondary: "#000000", description: "Silver with black" },
    away: { primary: "#FFFFFF", secondary: "#C0C0C0", description: "White with silver" },
    alternate: { primary: "#000000", secondary: "#C0C0C0", description: "Black jersey" },
  },
  sobrato: {
    home: { primary: "#8B4513", secondary: "#FFFFFF", description: "Brown with white" },
    away: { primary: "#FFFFFF", secondary: "#8B4513", description: "White with brown" },
    alternate: { primary: "#FFD700", secondary: "#8B4513", description: "Gold jersey" },
  },
  westmont: {
    home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FF6600", secondary: "#003366", description: "Orange jersey" },
  },
  "willow-glen": {
    home: { primary: "#FF0000", secondary: "#FFFFFF", description: "Red jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#FF0000", description: "White with red trim" },
    alternate: { primary: "#000000", secondary: "#FF0000", description: "Black jersey" },
  },
  "yerba-buena": {
    home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
  },
  cupertino: {
    home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with blue trim" },
    alternate: { primary: "#FFD700", secondary: "#0066CC", description: "Gold jersey" },
  },
  fremont: {
    home: { primary: "#FF6600", secondary: "#000000", description: "Orange with black" },
    away: { primary: "#FFFFFF", secondary: "#FF6600", description: "White with orange" },
    alternate: { primary: "#000000", secondary: "#FF6600", description: "Black jersey" },
  },
  gunn: {
    home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FF6600", secondary: "#003366", description: "Orange jersey" },
  },
  homestead: {
    home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with blue trim" },
    alternate: { primary: "#FFD700", secondary: "#0066CC", description: "Gold jersey" },
  },
  "los-altos": {
    home: { primary: "#8B0000", secondary: "#FFFFFF", description: "Maroon with white" },
    away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with maroon" },
    alternate: { primary: "#FFD700", secondary: "#8B0000", description: "Gold jersey" },
  },
  "monta-vista": {
    home: { primary: "#4B0082", secondary: "#FFFFFF", description: "Purple jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#4B0082", description: "White with purple trim" },
    alternate: { primary: "#FFD700", secondary: "#4B0082", description: "Gold jersey" },
  },
  "north-salinas": {
    home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
    away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
    alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
  },
  "santa-clara-high": {
    home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
    away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with blue trim" },
    alternate: { primary: "#FFD700", secondary: "#0066CC", description: "Gold jersey" },
  },
};

// Apply missing uniforms
let updated = 0;
Object.entries(uniformSchemes).forEach(([teamId, uniforms]) => {
  const pattern = new RegExp(
    `(id:\\s*"${teamId.replace(/[-]/g, "\\-")}"[\\s\\S]*?colors:\\s*\\{[\\s\\S]*?\\},)(?!\\s*uniforms:)`,
    "g"
  );

  const before = content;
  content = content.replace(pattern, `$1\n    uniforms: {\n      home: { primary: "${uniforms.home.primary}", secondary: "${uniforms.home.secondary}", description: "${uniforms.home.description}" },\n      away: { primary: "${uniforms.away.primary}", secondary: "${uniforms.away.secondary}", description: "${uniforms.away.description}" },\n      alternate: { primary: "${uniforms.alternate.primary}", secondary: "${uniforms.alternate.secondary}", description: "${uniforms.alternate.description}" },\n    },`);

  if (before !== content) {
    updated++;
    console.log(`  ✓ ${teamId}: Added uniforms`);
  }
});

fs.writeFileSync(teamsPath, content, "utf8");
console.log(`\n✓ Added uniforms to ${updated} teams`);
