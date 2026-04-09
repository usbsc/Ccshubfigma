import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.join(process.cwd());
const NORM_PLAYERS = path.join(ROOT, 'src/app/data/players.normalized.generated.ts');
const MP_PLAYERS = path.join(ROOT, 'src/app/data/players.maxpreps.generated.ts');
const OUT_REPORT = path.join(ROOT, 'src/app/data/players-validation-report.json');

function extractArray(text, exportName) {
  const re = new RegExp(`export const ${exportName}[\\s\\S]*?=\\s*(\\[[\\s\\S]*?\\]);`);
  const m = text.match(re);
  if (!m) return null;
  return JSON.parse(m[1]);
}

async function main() {
  const normText = await fs.readFile(NORM_PLAYERS, 'utf8');
  const mpText = await fs.readFile(MP_PLAYERS, 'utf8');

  const normArr = extractArray(normText, 'normalizedPlayers') || [];
  const mpArr = extractArray(mpText, 'maxprepsPlayers') || [];

  const byId = new Map();
  for (const p of normArr) byId.set(p.id || `${p.team}|${p.name}`, p);

  const report = {
    normalizedCount: normArr.length,
    maxprepsCount: mpArr.length,
    missingNumber: [],
    zeroNumber: [],
    duplicateNumbers: {},
    missingSeasons: [],
    nameAnomalies: [],
    sampleIssues: [],
    checkedTeams: {},
    generatedAt: new Date().toISOString(),
  };

  // check numbers and name anomalies
  for (const p of normArr) {
    if (p.number == null) report.missingNumber.push({ id: p.id, name: p.name, team: p.team });
    if (p.number === 0) report.zeroNumber.push({ id: p.id, name: p.name, team: p.team });

    // name anomalies
    if (typeof p.name === 'string') {
      const trimmed = p.name.trim();
      if (trimmed !== p.name) report.nameAnomalies.push({ id: p.id, name: p.name, reason: 'leading/trailing whitespace' });
      if (/\s{2,}/.test(p.name)) report.nameAnomalies.push({ id: p.id, name: p.name, reason: 'multiple spaces' });
      if (/[^\w\s\-'.]/.test(p.name)) report.nameAnomalies.push({ id: p.id, name: p.name, reason: 'weird characters' });
    }

    // seasons 2004-2024 presence
    const seasons = (p.stats && p.stats.seasons) ? Object.keys(p.stats.seasons) : [];
    const missingYears = [];
    for (let y = 2004; y <= 2024; y++) {
      if (!seasons.includes(String(y))) missingYears.push(y);
    }
    if (missingYears.length >= 21) { // basically no season data
      report.missingSeasons.push({ id: p.id, name: p.name, team: p.team, missingYearsCount: missingYears.length });
    }

    // collect team checks
    if (!report.checkedTeams[p.team]) report.checkedTeams[p.team] = { players: 0, numbers: {} };
    report.checkedTeams[p.team].players += 1;
    if (p.number != null) {
      const n = String(p.number);
      report.checkedTeams[p.team].numbers[n] = report.checkedTeams[p.team].numbers[n] || [];
      report.checkedTeams[p.team].numbers[n].push({ id: p.id, name: p.name });
    }
  }

  // detect duplicates per team
  for (const [team, info] of Object.entries(report.checkedTeams)) {
    for (const [num, arr] of Object.entries(info.numbers)) {
      if (arr.length > 1) {
        report.duplicateNumbers[team] = report.duplicateNumbers[team] || [];
        report.duplicateNumbers[team].push({ number: Number(num), players: arr });
      }
    }
  }

  // sample issues: show first 10 of each anomaly type
  report.sampleIssues = {
    missingNumber: report.missingNumber.slice(0, 10),
    zeroNumber: report.zeroNumber.slice(0, 10),
    missingSeasons: report.missingSeasons.slice(0, 10),
    nameAnomalies: report.nameAnomalies.slice(0, 10),
  };

  await fs.writeFile(OUT_REPORT, JSON.stringify(report, null, 2), 'utf8');
  console.log('Validation report written to', OUT_REPORT);
}

main().catch((e) => { console.error(e); process.exit(1); });
