import fs from "node:fs/promises";
import path from "node:path";
import * as vm from "node:vm";

const TEAMS_PATH = path.join(process.cwd(), "src/app/data/teams.ts");
const TEAMS_MAXPREPS_PATH = path.join(
  process.cwd(),
  "src/app/data/teams.maxpreps.generated.ts"
);

const RANKINGS_URL = (page) =>
  `https://www.maxpreps.com/ca/central-coast-section/football/rankings/${page}/`;

function extractNextData(html) {
  const m = html.match(/<script[^>]+id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
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

  return text.slice(braceStart, i);
}

async function readGeneratedTeamData() {
  try {
    const text = await fs.readFile(TEAMS_MAXPREPS_PATH, "utf8");
    const objText = extractExportedObjectLiteral(text, "maxprepsTeamData");
    if (!objText) return {};
    return vm.runInNewContext(`(${objText})`, {});
  } catch {
    return {};
  }
}

function normalizeText(s) {
  return (s || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function canonicalizeMaxprepsUrl(url) {
  if (typeof url !== "string") return null;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return null;
    if (u.hostname !== "www.maxpreps.com") return null;

    // Normalize trailing slash and strip hash.
    u.hash = "";
    if (!u.pathname.endsWith("/")) u.pathname += "/";

    return u.toString();
  } catch {
    return null;
  }
}

function slugifyName(name) {
  return (name || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cityFromMaxprepsTeamUrl(url) {
  try {
    const u = new URL(url);
    // /ca/<city>/<school-mascot>/football/
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[1] || "";
  } catch {
    return "";
  }
}

function parseExistingTeams(tsText) {
  /** @type {Array<{id: string, name: string, maxpreps?: string}>} */
  const teams = [];
  /** @type {{id: string, name?: string, maxpreps?: string}|null} */
  let current = null;
  let inBase = false;

  for (const line of tsText.split(/\r?\n/)) {
    if (!inBase && line.includes("export const baseTeams")) inBase = true;
    if (!inBase) continue;

    const idMatch = line.match(/^\s*id:\s*"([^"]+)"/);
    if (idMatch) {
      current = { id: idMatch[1] };
      teams.push(current);
      continue;
    }

    if (!current) continue;

    const nameMatch = line.match(/^\s*name:\s*"([^"]+)"/);
    if (nameMatch) current.name = nameMatch[1];

    const mpMatch = line.match(/\bmaxpreps:\s*"([^"]+)"/);
    if (mpMatch) current.maxpreps = mpMatch[1];

    if (line.trim() === "];") break;
  }

  return teams
    .filter((t) => t.id && t.name)
    .map((t) => ({ id: t.id, name: t.name ?? t.id, maxpreps: t.maxpreps }));
}

function findArrayBounds(text, marker) {
  const idx = text.indexOf(marker);
  if (idx < 0) return null;

  const start = text.indexOf("[", idx);
  if (start < 0) return null;

  let depth = 0;
  for (let i = start; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) return { start, end: i };
    }
  }
  return null;
}

function renderTeamStub({ id, name, maxpreps }) {
  return (
    `  {\n` +
    `    id: ${JSON.stringify(id)},\n` +
    `    name: ${JSON.stringify(name)},\n` +
    `    socials: {\n` +
    `      maxpreps: ${JSON.stringify(maxpreps)},\n` +
    `    },\n` +
    `  },\n`
  );
}

async function fetchRankingsPage(page) {
  const url = RANKINGS_URL(page);
  const res = await fetch(url, {
    headers: {
      "user-agent": "ccshub-maxpreps-ccs-sync/1.0",
      accept: "text/html,*/*",
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}: ${url}`);

  const html = await res.text();
  const next = extractNextData(html);
  const list = next?.props?.pageProps?.rankingsListData;
  const rankings = list?.rankings;

  if (!list || !Array.isArray(rankings)) throw new Error(`Missing rankingsListData: ${url}`);

  return { totalCount: list.totalCount, rankings };
}

async function main() {
  const tsText = await fs.readFile(TEAMS_PATH, "utf8");
  const existing = parseExistingTeams(tsText);
  const generatedTeamData = await readGeneratedTeamData();

  const existingIds = new Set(existing.map((t) => t.id));
  const existingNameNorm = new Set(existing.map((t) => normalizeText(t.name)));

  const existingMaxpreps = new Set(
    existing.map((t) => canonicalizeMaxprepsUrl(t.maxpreps)).filter(Boolean)
  );

  for (const v of Object.values(generatedTeamData)) {
    const mp = canonicalizeMaxprepsUrl(v?.maxprepsUrl);
    if (mp) existingMaxpreps.add(mp);
  }

  const first = await fetchRankingsPage(1);
  const total = typeof first.totalCount === "number" ? first.totalCount : 0;
  const pages = Math.max(1, Math.ceil(total / 25));

  /** @type {Array<any>} */
  const allRankings = [...first.rankings];

  for (let p = 2; p <= pages; p += 1) {
    // eslint-disable-next-line no-await-in-loop
    const next = await fetchRankingsPage(p);
    allRankings.push(...next.rankings);
  }

  const stubs = [];
  const newIds = new Set();

  for (const r of allRankings) {
    const name = typeof r?.schoolName === "string" ? r.schoolName.trim() : "";
    const maxpreps = canonicalizeMaxprepsUrl(r?.teamLink);
    if (!name || !maxpreps) continue;

    const nameNorm = normalizeText(name);
    if (existingNameNorm.has(nameNorm)) continue;

    if (existingMaxpreps.has(maxpreps)) continue;

    let id = slugifyName(name);
    if (!id) continue;

    if (existingIds.has(id) || newIds.has(id)) {
      const city = cityFromMaxprepsTeamUrl(maxpreps);
      if (city) id = `${id}-${city}`;
    }

    if (existingIds.has(id) || newIds.has(id)) {
      let n = 2;
      while (existingIds.has(`${id}-${n}`) || newIds.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }

    newIds.add(id);
    existingNameNorm.add(nameNorm);
    stubs.push({ id, name, maxpreps });
  }

  console.log(`MaxPreps CCS rankings total: ${allRankings.length} (expected ~${total})`);
  console.log(`Existing teams: ${existing.length}`);
  console.log(`Missing teams to add: ${stubs.length}`);

  if (stubs.length === 0) return;

  const bounds = findArrayBounds(tsText, "export const baseTeams");
  if (!bounds) throw new Error("Could not locate baseTeams array bounds");

  // Insert stubs before the closing ']' of baseTeams.
  let insertPos = bounds.end;
  let j = insertPos - 1;
  while (j >= 0 && /\s/.test(tsText[j])) j -= 1;
  const needsComma = j >= 0 && tsText[j] !== "," && tsText[j] !== "[";

  const insertText =
    (needsComma ? ",\n" : "\n") +
    stubs
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(renderTeamStub)
      .join("") +
    "\n";

  const updated = tsText.slice(0, insertPos) + insertText + tsText.slice(insertPos);
  await fs.writeFile(TEAMS_PATH, updated, "utf8");

  console.log(`Updated ${TEAMS_PATH} with ${stubs.length} new team stubs`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
