import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svg = readFileSync(join(root, 'public', 'favicon.svg'));

const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map(s => sharp(svg).resize(s, s).png().toBuffer())
);

// Write a minimal multi-size ICO
// ICO format: header (6 bytes) + directory entries (16 bytes each) + image data
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);       // reserved
header.writeUInt16LE(1, 2);       // type: 1 = ICO
header.writeUInt16LE(sizes.length, 4); // num images

const entries = [];
const images = [];
let offset = 6 + sizes.length * 16;

for (let i = 0; i < sizes.length; i++) {
  const size = sizes[i];
  const img = pngs[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0);  // width (0 = 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1);  // height
  entry.writeUInt8(0, 2);   // color palette size
  entry.writeUInt8(0, 3);   // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(img.length, 8);  // image data size
  entry.writeUInt32LE(offset, 12);     // image data offset
  entries.push(entry);
  images.push(img);
  offset += img.length;
}

const ico = Buffer.concat([header, ...entries, ...images]);
writeFileSync(join(root, 'public', 'favicon.ico'), ico);
console.log('✓ favicon.ico (16×16, 32×32, 48×48)');
