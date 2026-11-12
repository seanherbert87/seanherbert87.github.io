// Writes out/sitemap.xml after `next build`. Runs automatically as the `postbuild` npm script.
// Static pages are listed below (bump `lastmod` when a page's content changes);
// published blog posts are read from content/posts.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://www.seanherbert.me';
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

const staticPages = [
  { loc: '/', lastmod: '2026-11-11', changefreq: 'monthly', priority: '1.0' },
  { loc: '/contact', lastmod: '2026-11-11', changefreq: 'yearly', priority: '0.5' },
  { loc: '/projects/pixelvault', lastmod: '2026-11-11', changefreq: 'yearly', priority: '0.7' },
  { loc: '/projects/medtrack', lastmod: '2026-11-11', changefreq: 'yearly', priority: '0.7' },
];

const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
};

const posts = fs.existsSync(POSTS_DIR)
  ? fs
      .readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
        const date = toDate(data.date);
        return { slug: f.replace(/\.md$/, ''), date, updated: toDate(data.updated), draft: Boolean(data.draft) || !date };
      })
      .filter((p) => !p.draft)
      .sort((a, b) => b.date.localeCompare(a.date))
  : [];

const entries = [...staticPages];
if (posts.length) {
  // The blog index is noindex while empty, so only list it once a post is published.
  entries.push({ loc: '/blog', lastmod: posts[0].updated ?? posts[0].date, changefreq: 'weekly', priority: '0.8' });
  for (const p of posts) {
    entries.push({ loc: `/blog/${p.slug}`, lastmod: p.updated ?? p.date, changefreq: 'yearly', priority: '0.7' });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

if (!fs.existsSync(OUT_DIR)) {
  console.error('generate-sitemap: out/ not found; run `next build` first.');
  process.exit(1);
}
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml);
console.log(`generate-sitemap: wrote ${entries.length} URLs (${posts.length} posts).`);
