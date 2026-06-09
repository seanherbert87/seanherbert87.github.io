import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svg = readFileSync(join(root, 'public', 'favicon.svg'));

await sharp(svg).resize(180, 180).png().toFile(join(root, 'public', 'apple-touch-icon.png'));
console.log('✓ apple-touch-icon.png (180×180)');

await sharp(svg).resize(32, 32).png().toFile(join(root, 'public', 'favicon-32x32.png'));
console.log('✓ favicon-32x32.png');

await sharp(svg).resize(16, 16).png().toFile(join(root, 'public', 'favicon-16x16.png'));
console.log('✓ favicon-16x16.png');
