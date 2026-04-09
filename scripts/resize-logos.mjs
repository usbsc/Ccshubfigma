import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.join(process.cwd());
const LOGO_DIR = path.join(ROOT, 'public', 'logos');
const OUT_DIR = path.join(ROOT, 'public', 'logos', 'resized');
await fs.mkdir(OUT_DIR, { recursive: true });

const files = (await fs.readdir(LOGO_DIR, { withFileTypes: true }))
  .filter((d) => d.isFile())
  .map((d) => d.name)
  .filter((n) => /\.(png|jpe?g|gif|webp)$/i.test(n));

if (files.length === 0) {
  console.log('No logo files found in', LOGO_DIR);
  process.exit(0);
}

console.log(`Found ${files.length} logos. Processing...`);

async function processOne(file) {
  const inPath = path.join(LOGO_DIR, file);
  const base = path.parse(file).name;
  try {
    const img = sharp(inPath).rotate(); // auto-orient

    // banner: contain into 1200x400, transparent background, centered
    await img
      .clone()
      .resize(1200, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(path.join(OUT_DIR, `banner-${base}.png`));

    // medium square 400x400
    await img
      .clone()
      .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(path.join(OUT_DIR, `medium-${base}.png`));

    // small square 64x64
    await img
      .clone()
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 80 })
      .toFile(path.join(OUT_DIR, `small-${base}.png`));

    console.log('Processed', file);
  } catch (e) {
    console.error('Error processing', file, e.message);
  }
}

for (const f of files) await processOne(f);
console.log('All logos processed into', OUT_DIR);
