// Generates public/og-image.png (1200×630), the social share card used by og:image / twitter:image.
// Run manually after changing the name, title or photo:  node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;
const PHOTO = 300;
const PHOTO_X = 96;
const PHOTO_Y = (H - PHOTO) / 2;

// Palette from tailwind.config.js
const bg = '#0f130e'; // gray-950
const grid = 'rgba(132,170,120,0.08)';
const border = '#252c24'; // gray-800
const accent = '#a9cb9e'; // primary-300
const accentStrong = '#84b077'; // primary-400
const heading = '#f4f7f2'; // gray-50
const muted = '#98a692'; // gray-400

const sans = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const mono = "Consolas, 'SFMono-Regular', Menlo, monospace";
const textX = PHOTO_X + PHOTO + 72;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="${grid}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${accentStrong}"/>
  <rect x="${PHOTO_X - 8}" y="${PHOTO_Y - 8}" width="${PHOTO + 16}" height="${PHOTO + 16}" rx="4" fill="${bg}" stroke="${border}" stroke-width="2"/>
  <text x="${textX}" y="232" font-family="${mono}" font-size="22" fill="${accent}" letter-spacing="3">PORTFOLIO · BLOG</text>
  <text x="${textX}" y="318" font-family="${sans}" font-size="76" font-weight="600" fill="${heading}">Sean Herbert</text>
  <text x="${textX}" y="372" font-family="${sans}" font-size="30" fill="${muted}">Senior PHP, WordPress &amp; C#/.NET Developer</text>
  <text x="${textX}" y="440" font-family="${mono}" font-size="24" fill="${accent}">15+ years · 800+ WordPress sites</text>
  <text x="${W - 64}" y="${H - 44}" text-anchor="end" font-family="${mono}" font-size="24" fill="${muted}">seanherbert.me</text>
</svg>`;

const photo = await sharp(join(root, 'public', 'profile-photo.jpg'))
  .resize(PHOTO, PHOTO)
  .modulate({ saturation: 0.85 })
  .toBuffer();

// The accent badge overlaps the photo's corner, so it's composited on top of the photo.
await sharp(Buffer.from(svg))
  .composite([
    { input: photo, left: PHOTO_X, top: PHOTO_Y },
    {
      input: Buffer.from(
        `<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="18" height="18" rx="2" fill="${accentStrong}" stroke="${bg}" stroke-width="4"/></svg>`
      ),
      left: PHOTO_X + PHOTO - 6,
      top: PHOTO_Y + PHOTO - 6,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(join(root, 'public', 'og-image.png'));

console.log(`✓ og-image.png (${W}×${H})`);
