---
title: "One product, five platforms: Next.js, Supabase and Flutter in MedTrack"
description: "How MedTrack, a personal medication efficacy tracker, runs on the web, iOS, Android, macOS and Windows from one Supabase backend and shared business logic."
author: Sean Herbert
draft: true
tags: [Next.js, TypeScript, Supabase, PostgreSQL, Flutter]
---


When you're adjusting a medication, the questions that matter are slow ones. Is this working better than the last one? Did the side effects ease after the dose change? Memory is bad at answering them, so I built **[MedTrack](https://www.seanherbert.me/projects/medtrack)**: a personal tracker for logging mood, efficacy, dosage and side effects, with reports that compare treatments over time.

The hard part wasn't any single screen. It was making the same product work on the **web, iOS, Android, macOS and Windows** without five diverging copies of the logic.

## The stack

- **Next.js + TypeScript** for the web app.
- **Supabase** for the backend: **PostgreSQL** for the data, plus auth and sync.
- **Flutter** for native apps on iOS, Android, macOS and Windows.

## Let PostgreSQL carry the shared rules

The most reliable way to share business logic across a TypeScript web app and a Dart mobile app is to put as much of it as possible where both already go: the database. Supabase makes that practical. PostgreSQL constraints, row-level security and views mean that "a user can only see their own entries" or "a dose must have a unit" are enforced once, server-side, and no client can get them wrong.

What can't live in the database, like how a report groups and compares treatment periods, is defined once and implemented to the same spec on each side, so the web and native reports agree.

## Auth and sync from one place

Supabase auth gives every client the same identity and session model. Sync runs through the same PostgreSQL tables, so an entry logged on a phone shows up in the web reports without a custom sync server to maintain.

## Designing the data for comparison

Logging is easy; comparison is the point. Entries are tied to the treatment and dose in effect at the time they were logged, so the reports can line up periods ("first 4 weeks on A" vs "first 4 weeks on B") instead of just plotting a timeline. Getting that model right early made every report afterwards simpler.

## Lessons

1. **Push shared rules into the database** when clients are written in different languages.
2. **A managed backend like Supabase** lets a small team (or one developer) ship auth, storage and sync on many platforms without running servers.
3. **Model the question you want to answer.** Structuring data around treatment periods made the comparison reports possible.

*MedTrack is a personal tracking tool, not medical advice. Talk to your doctor about any medication changes.*

*— Sean Herbert, senior PHP, WordPress & C#/.NET developer. Read the [MedTrack case study](https://www.seanherbert.me/projects/medtrack) or see more on my [portfolio](https://www.seanherbert.me/).*
