/**
 * generate-placeholders.mjs
 * Creates warm-neutral tonal-gradient placeholder JPEGs for any MISSING photo
 * in src/assets/images/ at the exact required size. Real photos are dropped in
 * later with the same filenames — this script never overwrites existing files,
 * so the build never fails because a photo is missing.
 *
 * Usage:  npm run placeholders   (also runs automatically via `prebuild`)
 */
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'assets', 'images');

/** [filename, width, height, gradient angle, tone pair] */
const PHOTOS = [
  ['hero-courtyard-house.jpg', 2400, 2000, 135, ['#e9e2d2', '#cfc4ab']],
  ['project-desert-pavilion.jpg', 1600, 1100, 115, ['#ecdfc8', '#d3bfa0']],
  ['project-ridge-house.jpg', 1600, 1100, 135, ['#efe9dc', '#d8cfba']],
  ['project-harborview-loft.jpg', 1600, 1100, 125, ['#e7e4d8', '#c9c4ae']],
  ['studio-interior.jpg', 1800, 1080, 135, ['#e3dcc9', '#c4b896']],
  ['og-image.jpg', 1200, 630, 135, ['#e9e2d2', '#cfc4ab']],
];

function gradientSvg(w, h, angle, [from, to]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;
}

mkdirSync(dir, { recursive: true });

let created = 0;
for (const [name, w, h, angle, tones] of PHOTOS) {
  const out = join(dir, name);
  if (existsSync(out)) {
    console.log(`skip  ${name} (exists)`);
    continue;
  }
  await sharp(Buffer.from(gradientSvg(w, h, angle, tones)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(`made  ${name} ${w}x${h}`);
  created += 1;
}

console.log(created === 0 ? 'All photos present.' : `Created ${created} placeholder(s).`);
