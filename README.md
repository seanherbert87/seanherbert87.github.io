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

All are read at build time and inlined into the static export. Set them in Netlify under
Site configuration → Environment variables.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | No | Umami website ID. When unset, no analytics script is rendered. |

### Analytics (Umami)

Analytics use [Umami Cloud](https://umami.is), which is cookieless, so no consent banner is
needed. The browser never contacts Umami directly: `netlify.toml` proxies `/stats/script.js` and
`/stats/api/send` to `cloud.umami.is`. The script tag has `data-domains="www.seanherbert.me"`, so
local and deploy-preview visits aren't recorded.

To enable it, add the site in Umami with the domain `www.seanherbert.me`, copy its website ID
into `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in Netlify, and redeploy.

### Contact form (Netlify Forms)

The contact form is declared for Netlify's form detection in `public/__forms.html` (a hidden
copy, because the real form is rendered by React). `components/form.tsx` POSTs submissions there
as URL-encoded data with `form-name=contact`. A hidden `bot-field` input acts as a honeypot.
If you add or rename a field, update both files.

In Netlify, enable form detection (Forms) and add an email notification for the `contact` form
(Forms → contact → Form notifications) so submissions reach your inbox.

## Build & deploy

```bash
npm run build      # static export to out/, then writes out/sitemap.xml and out/blog/feed.xml
```

`npm run build` runs `next build` and then the `postbuild` scripts:

- `scripts/generate-sitemap.mjs` writes the sitemap from the static page list in that script
  plus every published blog post.
- `scripts/generate-feed.mjs` writes the RSS feed (`/blog/feed.xml`) with every published post.

The social share image `public/og-image.png` (1200×630) is committed. Regenerate it with
`node scripts/generate-og-image.mjs` after changing the name, title or profile photo.

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
| `scripts/` | Icon, share-image, sitemap and RSS feed generation |
