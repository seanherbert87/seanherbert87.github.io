---
title: "Cookie consent without the third-party calls: building WP Local Consent"
description: "Why I built a WordPress cookie consent plugin that loads nothing from outside the site, and how I kept the banner under 10 KB of gzipped JavaScript."
author: Sean Herbert
draft: true
tags: [WordPress, PHP, Privacy, Performance, Google Consent Mode]
---


Most cookie consent tools have an awkward contradiction built in: the banner that asks visitors for permission to contact third parties is itself loaded from a third party. Before the visitor has clicked anything, their browser has already made a request to someone else's CDN.

I've built and maintained WordPress sites for more than 15 years, and that contradiction kept bothering me. So I built **[WP Local Consent](https://wplocalconsent.com)**, a cookie consent plugin and script blocker that renders entirely from the site's own assets.

## The constraint: nothing leaves the site

The one rule was that the banner, its styles, its scripts and its consent log all come from the WordPress install itself. The visitor's browser makes no third-party requests: no external domains, no remote config fetch, no hosted dashboard the banner has to call home to. (Server-side, the plugin can optionally download the MaxMind GeoLite2 database to pick opt-in or opt-out behaviour by country, and the Pro companion makes its own outbound webhook calls. None of that touches the visitor.)

That rule drives most of the design:

- **Script blocking happens server-side and in the page.** Scripts enqueued through WordPress are rewritten on the server so they never run until the visitor's choice allows them. Hardcoded scripts are caught in the page by a lightweight observer that runs as early as WordPress allows.
- **Configuration lives in WordPress.** Categories, copy and styling are stored as site options, so the banner can render without a network round-trip.
- **The consent log is stored locally.** Proof of consent stays in the site's own database. Because it's personal data in its own right, I put the logging path through a dedicated security review.

## Keeping it small

A consent banner appears on every page for every new visitor, so its weight is a direct tax on your Core Web Vitals. I set a hard budget: **the banner ships under 10 KB of gzipped JavaScript** (about 7.5 KB today).

Budgets only matter if something enforces them. The repo runs **Lighthouse CI in GitHub Actions** with a 15 KB script budget, a 5 KB stylesheet budget and performance-score, blocking-time and DOM-size limits, so a change that bloats the page fails the build instead of quietly shipping. I also wrote a measured performance benchmark so the "lightweight" claim is backed by numbers, not adjectives.

## Google Consent Mode v2

Plenty of sites need consent *and* Google Analytics or Ads to keep working. WP Local Consent fires **Google Consent Mode v2** signals, so Google tags get the right `granted` or `denied` state based on the visitor's choice, without the plugin depending on a Google-hosted script to manage consent.

## Built for agencies

Most of my work has been agency work: hundreds of WordPress and WooCommerce sites, many of them managed together. So the **Pro companion plugin** adds **agency and multi-site tooling**: WordPress Multisite network provisioning and a cross-site dashboard for checking many installs from one place. Keeping it separate means the free core stays small.

## What I'd tell other plugin developers

1. **Pick one hard constraint and let it make the design decisions.** "No third-party calls" settled dozens of smaller choices.
2. **Put your performance claims in CI.** A size budget that fails the build is worth more than a README badge.
3. **Treat consent records as sensitive data.** They identify visitors. Review that code path like you would a login form.

If you run WordPress sites and want consent handling that doesn't add another outside dependency, take a look at [wplocalconsent.com](https://wplocalconsent.com).

*— Sean Herbert, senior PHP, WordPress & C#/.NET developer. More of my work is on my [portfolio](https://www.seanherbert.me/).*
