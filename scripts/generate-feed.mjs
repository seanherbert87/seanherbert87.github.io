// Writes out/blog/feed.xml (RSS 2.0) after `next build`. Runs as part of the `postbuild` npm script.
// Uses the same rules as lib/posts.ts: a post is published when it has a `date` and no `draft: true`.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const SITE_URL = 'https://www.seanherbert.me';
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const FEED_PATH = path.join(OUT_DIR, 'blog', 'feed.xml');

const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
};

const escapeXml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// CDATA can't contain "]]>", so split it if a post ever does.
const cdata = (s) => `<![CDATA[${String(s).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString();

const posts = fs.existsSync(POSTS_DIR)
  ? fs
      .readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
        const date = toDate(data.date);
        return {
          slug: f.replace(/\.md$/, ''),
          title: String(data.title),
          description: String(data.description ?? ''),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          date,
          draft: Boolean(data.draft) || !date,
          html: marked.parse(content, { async: false }),
        };
      })
      .filter((p) => !p.draft)
      .sort((a, b) => b.date.localeCompare(a.date))
  : [];

if (!fs.existsSync(OUT_DIR)) {
  console.error('generate-feed: out/ not found; run `next build` first.');
  process.exit(1);
}

const items = posts
  .map((p) => {
    const url = `${SITE_URL}/blog/${p.slug}`;
    return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <dc:creator>Sean Herbert</dc:creator>
      <description>${escapeXml(p.description)}</description>
${p.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
      <content:encoded>${cdata(p.html)}</content:encoded>
    </item>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Sean Herbert — Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Articles by Sean Herbert on WordPress and PHP plugin development, C#/.NET, Next.js, Supabase and privacy-first software.</description>
    <language>en-us</language>
${posts.length ? `    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;

fs.mkdirSync(path.dirname(FEED_PATH), { recursive: true });
fs.writeFileSync(FEED_PATH, xml);
console.log(`generate-feed: wrote ${posts.length} posts to blog/feed.xml.`);
