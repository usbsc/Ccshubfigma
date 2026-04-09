import fs from 'node:fs/promises';
import path from 'node:path';

const PLAYERS_PATH = path.join(process.cwd(), 'src/app/data/players.maxpreps.generated.ts');
const OUT_PATH = path.join(process.cwd(), 'src/app/data/players.normalized.generated.ts');
const REPORT_PATH = path.join(process.cwd(), 'src/app/data/players-normalization-report.json');

function extractArray(text) {
  const m = text.match(/export const maxprepsPlayers[\s\S]*?=\s*(\[[\s\S]*?\]);/);
  if (!m) return null;
  return JSON.parse(m[1]);
}

function normalizeName(n) {
  return (n || '').trim().replace(/\s+/g, ' ');
}

function keyFrom(p) {
  const name = normalizeName(p.name || '').toLowerCase();
  const num = p.number || 0;
  return `${p.team || 'unknown'}|${name}|${num}`;
}

function merge(a, b) {
  // prefer non-empty values from a, then b
  const out = { ...a };
  for (const k of Object.keys(b)) {
    if (out[k] == null || out[k] === '' || (Array.isArray(out[k]) && out[k].length === 0)) {
      out[k] = b[k];
    }
  }
  return out;
}

async function main() {
  const text = await fs.readFile(PLAYERS_PATH, 'utf8');
  const arr = extractArray(text);
  if (!arr) {
    console.error('Failed to parse players array');
    process.exit(1);
  }

  const seenByUrl = new Map();
  const merged = new Map();
  let missingNumber = 0;
  let zeroNumber = 0;
  let genericImageCount = 0;

  for (const p of arr) {
    p.name = normalizeName(p.name);
    if (!p.id && p.maxprepsUrl) p.id = 'mp-' + encodeURIComponent(p.maxprepsUrl).slice(0, 60);
    p.number = Number.isFinite(p.number) ? Number(p.number) : null;
    if (p.number == null) missingNumber++;
    if (p.number === 0) zeroNumber++;
    if (!p.image || p.image.includes('unsplash') || p.image.includes('placeholder')) genericImageCount++;

    if (p.maxprepsUrl) {
      const key = p.maxprepsUrl;
      if (seenByUrl.has(key)) {
        seenByUrl.set(key, merge(seenByUrl.get(key), p));
      } else seenByUrl.set(key, p);
    } else {
      const key = keyFrom(p);
      if (merged.has(key)) merged.set(key, merge(merged.get(key), p));
      else merged.set(key, p);
    }
  }

  // combine maps
  const out = [];
  for (const v of seenByUrl.values()) out.push(v);
  for (const v of merged.values()) out.push(v);

  // canonicalize fields
  for (const p of out) {
    p.name = p.name || 'Unknown';
    p.number = Number.isFinite(p.number) ? p.number : null;
    p.team = (p.team || '').toLowerCase();
    // ensure stats structure
    if (!p.stats || typeof p.stats !== 'object') p.stats = { seasons: {} };
    if (!p.stats.seasons) p.stats.seasons = p.stats.seasons || {};
  }

  // write normalized file
  const header = `// Auto-generated normalized players\n// Source: players.maxpreps.generated.ts\n// Generated: ${new Date().toISOString()}\n\n`;
  const body = `export const NORMALIZED_GENERATED_AT = ${JSON.stringify(new Date().toISOString())};\n\nexport const normalizedPlayers = ${JSON.stringify(out, null, 2)};\n`;
  await fs.writeFile(OUT_PATH, header + body, 'utf8');

  const report = {
    originalCount: arr.length,
    normalizedCount: out.length,
    mergedByUrl: seenByUrl.size,
    mergedByKey: merged.size,
    missingNumber,
    zeroNumber,
    genericImageCount,
    generatedAt: new Date().toISOString(),
  };

  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log('Normalized players written to', OUT_PATH);
  console.log('Report written to', REPORT_PATH);
}

main().catch((e) => { console.error(e); process.exit(1); });
