import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import sharp from 'sharp';

const ROOT = path.join(process.cwd());
const TEAMS_MAXPREPS = path.join(ROOT, 'src/app/data/teams.maxpreps.generated.ts');
const LOGO_DIR = path.join(ROOT, 'public', 'logos');
const OUT_DIR = path.join(LOGO_DIR, 'resized');
await fs.mkdir(OUT_DIR, { recursive: true });

const text = await fs.readFile(TEAMS_MAXPREPS, 'utf8');
// extract the object literal assigned to maxprepsTeamData
const m = text.match(/export const maxprepsTeamData[\s\S]*?=\s*(\{[\s\S]*\});/);
if (!m) {
  console.error('Could not find maxprepsTeamData in teams file');
  process.exit(1);
}

let teamData = {};
try {
  teamData = vm.runInNewContext(`(${m[1]})`, {});
} catch (e) {
  console.error('Failed to parse team data:', e.message);
  process.exit(1);
}

const entries = Object.entries(teamData).filter(([, v]) => v && v.schoolMascotUrl);
console.log(`Found ${entries.length} mascot URLs to fetch`);

async function fetchAndSave(teamId, url) {
  try {
    console.log('Fetching', teamId, url);
    const res = await fetch(url, { headers: { 'user-agent': 'ccshub-fetch-logo/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());

    // Attempt to read with sharp - convert to PNG canonical file
    const pngPath = path.join(LOGO_DIR, `${teamId}.png`);
    await sharp(buf).png().toFile(pngPath);

    // Create resized variants (contain, transparent)
    const img = sharp(pngPath).rotate();
    await img
      .clone()
      .resize(1200, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(path.join(OUT_DIR, `banner-${teamId}.png`));

    await img
      .clone()
      .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(path.join(OUT_DIR, `medium-${teamId}.png`));

    await img
      .clone()
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 80 })
      .toFile(path.join(OUT_DIR, `small-${teamId}.png`));

    console.log('Saved logos for', teamId);
  } catch (e) {
    console.error('Failed', teamId, e.message);
  }
}

for (const [teamId, data] of entries) {
  await fetchAndSave(teamId, data.schoolMascotUrl);
}

console.log('Done fetching and resizing mascots.');
