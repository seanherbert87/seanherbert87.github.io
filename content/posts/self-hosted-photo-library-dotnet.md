---
title: "Building a self-hosted photo library on .NET 10: notes from PixelVault"
description: "Design notes from PixelVault, a privacy-first photo and video organizer built with ASP.NET Core: perceptual-hash duplicates, signed media URLs, and remote access without opening a port."
author: Sean Herbert
date: 2026-11-11
tags: [C#, .NET 10, ASP.NET Core, Security, Self-hosting]
---


Cloud photo services are convenient right up until you think about what you've handed over: every photo, its location data, and often face data too. I wanted a library that does the useful things (albums, tags, search, duplicate cleanup) while everything stays on hardware I own.

That became **[PixelVault](https://www.seanherbert.me/projects/pixelvault)**, a self-hosted photo and video organizer built as an **ASP.NET Core service on .NET 10**, with web, desktop and mobile clients. The project is private, so this post covers the design rather than the code.

## One service, many clients

All the library logic lives in one ASP.NET Core service: albums, **hierarchical tags**, ratings, captions and editing. Web, desktop and mobile clients all talk to the same API. That keeps the rules in one place: a tag hierarchy or a permission check behaves the same everywhere because there's only one implementation of it.

## Finding duplicates that aren't byte-identical

A file hash only catches exact copies. Real photo libraries are full of *near* duplicates: the same shot resized, re-compressed, or exported from a phone and then again from a laptop.

PixelVault uses **perceptual hashing**. Each image gets a compact fingerprint of its visual structure, and images whose fingerprints are close are flagged as likely duplicates even when the files differ. That's the difference between "you have 0 duplicates" and actually cleaning up a 20-year archive.

## Editing without destroying originals

Edits are **non-destructive**: the original file on disk is never modified. Rotation is stored as a setting on the item and applied when thumbnails and originals are served, while a crop creates a new item and leaves the original alone. Video thumbnails and duration metadata come from **ffmpeg**, and photos (including HEIC and AVIF) are decoded in-process.

## Security when the data is this personal

A personal photo library is about as sensitive as data gets, so security wasn't left until the end:

- **Argon2id** for password hashing, the current recommended memory-hard algorithm.
- **Mandatory TOTP two-factor authentication.** It's required, not an option buried in settings.
- **Signed media URLs**, so a photo can't be fetched just by guessing or sharing its path. Every media request carries a signature the server checks.
- **A PIN-gated private area** for items that need an extra layer even inside an authenticated session.

## Remote access without exposing the server

The usual way to reach a home server from outside is to open a port and put it on the public internet. PixelVault is designed around **Tailscale** instead: remote access runs over a private, encrypted network between my own devices, with no port forwarding or router changes (it even works behind CGNAT). The setup wizard configures it and generates a QR code for the mobile app. With nothing deliberately exposed to the public internet, there's far less attack surface.

## Takeaways

1. **"Self-hosted" raises the security bar.** You're the operator now, so build in strong auth, signed access and no public exposure from day one.
2. **Perceptual hashing is worth it** for any media app where users import from many devices.
3. **Keep the logic server-side** when you have several clients. It's the cheapest way to keep them consistent.

*— Sean Herbert, senior PHP, WordPress & C#/.NET developer. Read the full [PixelVault case study](https://www.seanherbert.me/projects/pixelvault) or see more on my [portfolio](https://www.seanherbert.me/).*
