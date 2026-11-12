import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

// Drafts render in `next dev` so they can be previewed, but never ship in a production build.
const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string | null; // YYYY-MM-DD, null for undated drafts
  updated: string | null;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

const toDateString = (value: unknown): string | null => {
  if (!value) return null;
  // gray-matter parses bare YAML dates into Date objects
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
};

const readPost = (slug: string): Post => {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  const date = toDateString(data.date);
  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ''),
    date,
    updated: toDateString(data.updated),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    // A post without a date can't be published, so treat it as a draft.
    draft: Boolean(data.draft) || !date,
    readingMinutes: Math.max(1, Math.round(words / 230)),
    html: marked.parse(content, { async: false }) as string,
  };
};

const allSlugs = (): string[] =>
  fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
    : [];

export const getPost = (slug: string): Post => readPost(slug);

export const getPostSlugs = (): string[] =>
  allSlugs().filter((slug) => SHOW_DRAFTS || !readPost(slug).draft);

export const getAllPosts = (): PostMeta[] =>
  getPostSlugs()
    .map((slug): PostMeta => {
      const post: Partial<Post> = readPost(slug);
      delete post.html;
      return post as PostMeta;
    })
    .sort((a, b) => (b.date ?? '9999').localeCompare(a.date ?? '9999'));

