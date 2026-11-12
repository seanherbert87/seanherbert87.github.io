---
title: "One product, five platforms: Next.js, Supabase and Flutter in MedTrack"
description: "How MedTrack, a personal medication efficacy tracker, runs on the web, iOS, Android, macOS and Windows from one Supabase backend, with offline-first clients and shared rules enforced in PostgreSQL."
author: Sean Herbert
date: 2026-11-11
tags: [Next.js, TypeScript, Supabase, PostgreSQL, Flutter]
---


When you're adjusting a medication, the questions that matter are slow ones. Is this working better than the last one? Did the side effects ease after the dose change? Memory is bad at answering them, so I built **[MedTrack](https://www.seanherbert.me/projects/medtrack)**: a personal tracker for logging mood, efficacy, dosage and side effects, with reports that compare medications over time.

The hard part wasn't any single screen. It was making the same product work on the **web, iOS, Android, macOS and Windows** without five diverging copies of the logic.

## The stack

- **Next.js + TypeScript** for the web app.
- **Supabase** for the backend: **PostgreSQL** for the data, plus auth.
- **Flutter** for native apps on iOS, Android, macOS and Windows, with the mobile and desktop apps sharing one core package.

## Let PostgreSQL carry the shared rules

The most reliable way to share business rules across a TypeScript web app and a Dart native app is to put as many of them as possible where both already go: the database. Supabase makes that practical. Row-level security means "a user can only see and change their own data" is enforced once, server-side, on every table. Check constraints keep mood and efficacy ratings between 1 and 10 and side-effect severity between 1 and 5, and a unique constraint allows only one entry per medication per day. No client can get those wrong.

What can't live in the database, like the stats behind the reports, is implemented separately in TypeScript and Dart. The two Flutter apps share one implementation in a core package, but keeping web and native in step is a manual job, and they aren't identical today: the web reports calculate more, such as trends and highs and lows. That's the honest cost of two languages without a shared code layer.

## Offline first, synced through Supabase

Every client reads and writes a local database first (Dexie over IndexedDB on the web, Drift over SQLite in Flutter), so no screen waits on the network. Each client then syncs its changes with the same Supabase tables. There's no custom sync server to run, but each client has its own sync code, written against the same schema.

Supabase auth gives every client the same identity and session model, so an entry logged on a phone shows up in the web reports after both have synced.

## Designing the data for comparison

Logging is easy; comparison is the point. Each entry belongs to a medication and records the dose actually taken that day, alongside mood, efficacy, side effects and symptoms. The reports work out per-medication averages and plot medications against each other on a shared timeline, with an optional date range, so you can see how one treatment did next to another.

The model has a limit worth admitting: each medication has a single start and end date. Stopping a medication and restarting it later can't be recorded as a second course, so comparing "first 4 weeks on A" with "first 4 weeks on B" isn't something the data supports yet. Adding treatment periods as a real part of the model would make that possible.

## Lessons

1. **Push shared rules into the database** when clients are written in different languages.
2. **A managed backend like Supabase** lets a small team (or one developer) ship auth, a database and sync on many platforms without running servers.
3. **Model the question you want to answer.** Grouping entries by medication made side-by-side comparison straightforward. Comparing courses of treatment needs treatment periods in the model, and that's much easier to design in early than to add later.

*MedTrack is a personal tracking tool, not medical advice. Talk to your doctor about any medication changes.*

*— Sean Herbert, senior PHP, WordPress & C#/.NET developer. Read the [MedTrack case study](https://www.seanherbert.me/projects/medtrack) or see more on my [portfolio](https://www.seanherbert.me/).*
