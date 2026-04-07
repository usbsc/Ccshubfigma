import fs from "node:fs/promises";
import path from "node:path";
import * as vm from "node:vm";

const TEAMS_PATH = path.join(process.cwd(), "src/app/data/teams.ts");
const TEAMS_MAXPREPS_PATH = path.join(process.cwd(), "src/app/data/teams.maxpreps.generated.ts");
const OUT_PATH = path.join(process.cwd(), "src/app/data/players.maxpreps.generated.ts");

const GENERIC_PLAYER_IMAGE =
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&h=400&q=80";

function parseTeams(tsText) {
  /** @type {Array<{id:string,name?:string,maxpreps?:string,hudl?:string}>} */
  const teams = [];
  /** @type {{id:string,name?:string,maxpreps?:string,hudl?:string}|null} */
  let current = null;

  for (const line of tsText.split(/\r?\n/)) {
    const idMatch = line.match(/^\s*id:\s*"([^"]+)"/);
    if (idMatch) {
      current = { id: idMatch[1] };
      teams.push(current);
      continue;
    }

    if (!current) continue;

    const nameMatch = line.match(/^\s*name:\s*"([^"]+)"/);
    if (nameMatch) current.name = nameMatch[1];

    const mpMatch = line.match(/maxpreps:\s*"([^"]+)"/);
    if (mpMatch) current.maxpreps = mpMatch[1];

    const hudlMatch = line.match(/hudl:\s*"([^"]+)"/);
    if (hudlMatch) current.hudl = hudlMatch[1];

    if (line.trim() === "];") break;
  }

  return teams.filter((t) => t.id);
}

function extractExportedObjectLiteral(text, exportName) {
  const idx = text.indexOf(`export const ${exportName}`);
  if (idx < 0) return null;

  const eq = text.indexOf("=", idx);
  if (eq < 0) return null;

  const braceStart = text.indexOf("{", eq);
  if (braceStart < 0) return null;

  let depth = 0;
  let i = braceStart;
  for (; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        i += 1;
        break;
      }
    }
  }

  const objText = text.slice(braceStart, i);
  return objText;
}

async function readGeneratedTeamData() {
  try {
    const text = await fs.readFile(TEAMS_MAXPREPS_PATH, "utf8");
    const objText = extractExportedObjectLiteral(text, "maxprepsTeamData");
    if (!objText) return {};

    // Prettier will strip quotes from object keys, so JSON.parse isn't safe.
    // Evaluate the object literal in a sandboxed VM context instead.
    return vm.runInNewContext(`(${objText})`, {});
  } catch {
    return {};
  }
}

function rosterUrlFromMaxprepsUrl(maxprepsUrl) {
  try {
    return new URL("roster/", maxprepsUrl).toString();
  } catch {
    return null;
  }
}

function normalizeGrade(gradeStr) {
  const g = (gradeStr || "").trim().toLowerCase();
  if (g.startsWith("sr")) return 12;
  if (g.startsWith("jr")) return 11;
  if (g.startsWith("so")) return 10;
  if (g.startsWith("fr")) return 9;
  return 0;
}

function normalizePosition(raw) {
  const p = (raw || "").trim().toUpperCase();
  if (!p) return { position: "ATH", subPosition: undefined };
  if (p === "QB" || p === "RB" || p === "WR" || p === "TE") return { position: p, subPosition: undefined };
  if (["DE", "DT", "NT", "DL"].includes(p)) return { position: "DL", subPosition: p };
  if (["OT", "OG", "C", "OL"].includes(p)) return { position: "OL", subPosition: p };
  if (["LB", "ILB", "OLB", "MLB"].includes(p)) return { position: "LB", subPosition: p === "LB" ? undefined : p };
  if (["DB", "CB", "S", "FS", "SS"].includes(p)) return { position: "DB", subPosition: p === "DB" ? undefined : p };
  if (["K", "P", "LS"].includes(p)) return { position: p, subPosition: undefined };
  return { position: p, subPosition: undefined };
}

function extractNextData(html) {
  const m = html.match(/<script[^>]+id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

function makeHudlSearchUrl(playerName, teamName) {
  const q = teamName ? `${playerName} ${teamName}` : playerName;
  return `https://www.hudl.com/search?q=${encodeURIComponent(q)}`;
}

function playerIdFromMaxprepsUrl(teamId, athleteUrl) {
  try {
    const u = new URL(athleteUrl);
    const careerId = u.searchParams.get("careerid");
    if (careerId) return `player-${teamId}-mp-${careerId}`;
    const slug = u.pathname.split("/").filter(Boolean).pop();
    if (slug) return `player-${teamId}-mp-${slug}`;
  } catch {
    // fall through
  }
  return `player-${teamId}-mp-${Math.random().toString(16).slice(2)}`;
}

async function fetchRoster(team, teamLogo) {
  const rosterUrl = rosterUrlFromMaxprepsUrl(team.maxpreps);
  if (!rosterUrl) return [];

  const res = await fetch(rosterUrl, {
    headers: {
      "user-agent": "ccshub-roster-import/1.0 (github pages build)",
      accept: "text/html,*/*",
    },
  });

  if (!res.ok) {
    console.warn(`WARN: ${team.id} roster fetch failed: ${res.status} ${res.statusText}`);
    return [];
  }

  const html = await res.text();
  const next = extractNextData(html);
  const athleteRows = next?.props?.pageProps?.athleteData;

  if (!Array.isArray(athleteRows)) {
    console.warn(`WARN: ${team.id} roster parse failed: no athleteData`);
    return [];
  }

  /** @type {Map<string, any>} */
  const byUrl = new Map();

  for (const row of athleteRows) {
    if (!Array.isArray(row) || row.length < 37) continue;

    const athleteUrl = row[31];
    const fullName = row[33];
    if (typeof athleteUrl !== "string" || typeof fullName !== "string") continue;

    const jersey = typeof row[7] === "number" ? row[7] : 0;
    const rawPos = typeof row[12] === "string" ? row[12] : "";
    const height = typeof row[34] === "string" ? row[34] : "";
    const weight = typeof row[11] === "number" ? row[11] : 0;
    const gradeStr = typeof row[36] === "string" ? row[36] : "";

    const existing = byUrl.get(athleteUrl);
    if (!existing) {
      byUrl.set(athleteUrl, {
        fullName,
        athleteUrl,
        jersey,
        height,
        weight,
        gradeStr,
        positions: new Set(rawPos ? [rawPos] : []),
      });
    } else if (rawPos) {
      existing.positions.add(rawPos);
    }
  }

  const out = [];
  for (const entry of byUrl.values()) {
    const positions = Array.from(entry.positions);
    const primaryRaw = positions[0] || "";
    const norm = normalizePosition(primaryRaw);

    const extra = positions.filter((p) => p && p !== primaryRaw);
    const subPosition = [norm.subPosition, ...extra].filter(Boolean).join("/") || undefined;

    out.push({
      id: playerIdFromMaxprepsUrl(team.id, entry.athleteUrl),
      name: entry.fullName,
      team: team.id,
      position: norm.position,
      subPosition,
      number: entry.jersey || 0,
      grade: normalizeGrade(entry.gradeStr),
      height: entry.height || "",
      weight: entry.weight || 0,
      stats: { games: 0 },
      image: teamLogo || GENERIC_PLAYER_IMAGE,
      highlights: [],
      source: "maxpreps",
      maxprepsUrl: entry.athleteUrl,
      hudlSearchUrl: makeHudlSearchUrl(entry.fullName, team.name || ""),
    });
  }

  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

function renderTs(players, generatedAt) {
  const header = `// This file is auto-generated by scripts/update-maxpreps-rosters.mjs\n// Source: MaxPreps roster pages\n// Generated at: ${generatedAt}\n\n`;
  const body =
    `export const MAXPREPS_GENERATED_AT = ${JSON.stringify(generatedAt)};\n\n` +
    `export const maxprepsPlayers: import(\"./players\").Player[] = ${JSON.stringify(players, null, 2)};\n`;
  return header + body;
}

async function main() {
  const tsText = await fs.readFile(TEAMS_PATH, "utf8");
  const teams = parseTeams(tsText);
  const generatedTeamData = await readGeneratedTeamData();

  for (const t of teams) {
    if (!t.maxpreps) t.maxpreps = generatedTeamData?.[t.id]?.maxprepsUrl;
  }

  const teamsWithMaxpreps = teams.filter((t) => typeof t.maxpreps === "string" && t.maxpreps.length > 0);

  console.log(`Found ${teamsWithMaxpreps.length}/${teams.length} teams with MaxPreps links`);

  const allPlayers = [];
  for (const team of teamsWithMaxpreps) {
    console.log(`Fetching roster: ${team.id}`);
    const teamLogo = generatedTeamData?.[team.id]?.schoolMascotUrl;
    const rosterPlayers = await fetchRoster(team, teamLogo);
    console.log(`  players: ${rosterPlayers.length}`);
    allPlayers.push(...rosterPlayers);
  }

  allPlayers.sort((a, b) => (a.team + a.name).localeCompare(b.team + b.name));

  if (teamsWithMaxpreps.length !== teams.length) {
    const missing = teams.filter((t) => !t.maxpreps).map((t) => t.id);
    console.log(`Missing MaxPreps for ${missing.length} teams (first 25): ${missing.slice(0, 25).join(", ")}`);
  }

  const generatedAt = new Date().toISOString();
  const outText = renderTs(allPlayers, generatedAt);
  await fs.writeFile(OUT_PATH, outText, "utf8");

  console.log(`Wrote ${allPlayers.length} players to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
