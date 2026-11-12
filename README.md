# SeanHerbert.me

Portfolio and blog for Sean Herbert, senior PHP, WordPress & C#/.NET developer. Live at
[www.seanherbert.me](https://www.seanherbert.me).

Built with Next.js 16 (pages router, static export), React 19, TypeScript and Tailwind CSS v3,
and hosted on Netlify.

## Local setup

Requires Node.js 22 (see `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Environment variables

None. The site is fully static and has no runtime configuration.

## Build & deploy

```bash
npm run build      # static export to out/, then writes out/sitemap.xml
```

`npm run build` runs `next build` and then the `postbuild` script
(`scripts/generate-sitemap.mjs`), which writes the sitemap from the static page list in that
script plus every published blog post.

Netlify builds `main` with `npm run build` and publishes `out/` (see `netlify.toml`).

## Writing a blog post

Posts are Markdown files in `content/posts/`. The filename is the URL slug:
`content/posts/my-post.md` → `/blog/my-post`.

```markdown
---
title: "Post title"
description: "One or two sentences, used for the meta description and the blog index."
date: 2026-11-20        # publish date; omit while drafting
updated: 2026-12-01     # optional, for later revisions
tags: [WordPress, PHP]
draft: true             # optional; remove (and set date) to publish
---

Body in Markdown. Start with `##` headings; the page renders the title itself.
```

- A post is a **draft** if it has `draft: true` or no `date`. Drafts show in `npm run dev`
  (labelled `[Draft]`) but are left out of production builds, the sitemap and the home page.
- When no posts are published, `/blog` is served with `noindex` so an empty page isn't indexed.
- When you change a static page, bump its `lastmod` in `scripts/generate-sitemap.mjs`.

## Project layout

| Path | Purpose |
| --- | --- |
| `pages/` | Routes: home, contact, case studies (`projects/`), blog (`blog/`) |
| `components/` | Layout, header, sections, case-study template |
| `lib/posts.ts` | Reads and renders Markdown posts at build time (Node only) |
| `content/posts/` | Blog post Markdown |
| `public/` | Static assets, `robots.txt`, `llms.txt` |
| `scripts/` | Icon and sitemap generation |
