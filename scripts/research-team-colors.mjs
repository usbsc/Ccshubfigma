import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Team database with research URLs
const teamResearchData = [
  // Bay Foothill League (West Catholic)
  { id: "riordan", name: "Archbishop Riordan", league: "Bay Foothill", websites: ["https://www.riordanhs.org/athletics"] },
  { id: "serra", name: "Junipero Serra", league: "Bay Foothill", websites: ["https://www.serrahs.com/athletics"] },
  { id: "st-francis", name: "St. Francis", league: "Bay Foothill", websites: ["https://www.stfrancismv.org/athletics"] },
  { id: "st-ignatius", name: "St. Ignatius", league: "Bay Foothill", websites: ["https://www.siprep.org/athletics"] },
  { id: "mitty", name: "Archbishop Mitty", league: "Bay Foothill", websites: ["https://www.mittyhs.org/athletics"] },
  { id: "valley-christian", name: "Valley Christian", league: "Bay Foothill", websites: ["https://www.vcs.org/athletics"] },
  { id: "bellarmine", name: "Bellarmine Prep", league: "Bay Foothill", websites: ["https://www.bcp.org/athletics"] },
  { id: "sacred-heart", name: "Sacred Heart Cathedral", league: "Bay Foothill", websites: ["https://www.shcp.org/athletics"] },

  // Peninsula Athletic League
  { id: "los-gatos", name: "Los Gatos", league: "PAL", websites: ["https://www.lgusd.org/los-gatos-high"] },
  { id: "wilcox", name: "Wilcox", league: "PAL", websites: ["https://www.ewsd.org/wilcox"] },
  { id: "palo-alto", name: "Palo Alto", league: "PAL", websites: ["https://www.pausd.org/palo-alto-high"] },
  { id: "menlo-atherton", name: "Menlo-Atherton", league: "PAL", websites: ["https://www.mavesd.org/menlo-atherton"] },

  // PCAL (Pajaro Valley)
  { id: "salinas", name: "Salinas", league: "PCAL", websites: ["https://www.salinashs.org/athletics"] },
  { id: "palma", name: "Palma", league: "PCAL", websites: ["https://www.palmachristian.org/athletics"] },
  { id: "north-salinas", name: "North Salinas", league: "PCAL", websites: ["https://www.nsusd.org/north-salinas"] },
  { id: "gilroy", name: "Gilroy", league: "PCAL", websites: ["https://www.gusd.org/gilroy-high"] },
  { id: "morgan-hill", name: "Morgan Hill", league: "PCAL", websites: ["https://www.mhusd.org/morgan-hill-high"] },
  { id: "san-martin", name: "San Martin", league: "PCAL", websites: ["https://www.gilroyunified.org/san-martin"] },
  { id: "tennessee-williams", name: "Tennessee Williams", league: "PCAL", websites: ["https://www.gilroyunified.org/tennessee-williams"] },
];

// Create research document
const researchDoc = {
  createdAt: new Date().toISOString(),
  purpose: "Track team color research from official sources",
  teams: teamResearchData,
  sources: {
    official: "School district/athletics websites",
    maxpreps: "MaxPreps team pages",
    wikipedia: "Wikipedia team/school pages",
    logo: "Primary team logo colors"
  },
};

const outputPath = path.join(__dirname, "team-colors-research.json");
fs.writeFileSync(outputPath, JSON.stringify(researchDoc, null, 2), "utf8");

console.log(`✓ Research guide created: scripts/team-colors-research.json`);
console.log(`\nTeams to research: ${teamResearchData.length}`);
console.log("\nResearch priorities (start with these leagues):");
console.log("1. Bay Foothill League (8 teams) - prestigious, well-documented");
console.log("2. Peninsula Athletic League (4 teams) - easily accessible");
console.log("3. PCAL/Pajaro Valley (7 teams) - larger schools");
console.log("4. BVAL divisions (21 teams) - more diverse");
console.log("5. SCVAL divisions (6 teams)");
console.log("6. Other leagues (8 teams)");
