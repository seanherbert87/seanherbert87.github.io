# CLAUDE.md — Universal Developer Context

This file is the source of truth for how Claude Code should behave in this repository.
Read it at the start of every session. Follow every rule here unless the project-specific
plan file (`docs/development-plan.md`) explicitly overrides a rule for that project.

---

## Developer Profile

- **Primary stacks:** C# / .NET 10 (preferred) and PHP / WordPress
- **Mobile:** Flutter (Dart) — growing, not expert-level yet
- **Preference:** Stay within the .NET ecosystem wherever possible. Avoid introducing
  additional language runtimes (e.g., Node.js / npm) unless the project has no reasonable
  alternative. Blazor WebAssembly is preferred over React for .NET projects.
- **Style:** Methodical. Phased roadmaps. Living documentation. Honest trade-off analysis
  over optimistic framing.

---

## Non-Negotiable Rules

These apply to every repo, every session, without exception.

### Commits

- **Every discrete change gets a commit.** No batching unrelated changes into one commit.
- **Commit message format:** `type(scope): description`
  - Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`
  - Examples: `feat(api): Add media upload endpoint`, `fix(blazor): Correct album sort order`
- **Never add a co-author line.** No `Co-authored-by:` tags, ever, under any circumstances.

### Branches & PRs

- All feature work happens on a dedicated branch: `feature/short-description`
- Bug fixes: `fix/short-description`
- Chores / maintenance: `chore/short-description`
- When a task is complete, **stop and ask before merging** a PR. Do not self-merge.

### Versioning

- All projects follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`).
  - `PATCH` — bug fixes, minor tweaks, no new functionality
  - `MINOR` — new features that are backwards-compatible
  - `MAJOR` — breaking changes, significant redesigns, or milestone releases
- **Proactively suggest a version bump** when the accumulated work since the last
  version tag warrants one. Do not wait to be asked. Use judgment: a single bug fix
  is a patch bump; a completed feature phase is a minor bump.
- Version is the source of truth in the project manifest:
  - .NET: `<Version>` in `Directory.Build.props` or the `.csproj`
  - WordPress plugin: `Version:` header in the main plugin file + `define( 'PLUGIN_VERSION', ... )`
  - Flutter: `version:` in `pubspec.yaml` (format: `1.2.3+4` where `+4` is the build number)
- After bumping, commit with: `chore(release): Bump version to X.Y.Z`
- Tag the commit: `git tag vX.Y.Z`

### Repository Files

#### `README.md`
- Must exist in every repository. Create one if it is missing and notify the developer.
- Keep it current. If a new project is scaffolded, a service is added, or setup steps change,
  update README.md in the same commit as the change.
- Minimum contents: project description, local setup steps, environment variable list,
  how to run, how to build/publish.

#### `TODO.md`
- Must exist in every repository. Create one if it is missing and notify the developer.
- Format: grouped by phase or area, with checkboxes (`- [ ]` / `- [x]`).
- Update it as tasks are completed or new ones are identified — in the same commit
  as the related work, not as a separate housekeeping pass.
- Do not pad it with aspirational items. Only add tasks that are real and actionable.

#### `.gitignore`
- Must exist in every repository. Create one if it is missing and notify the developer.
- Seed it from [gitignore.io](https://www.toptal.com/developers/gitignore) for the
  project's stack(s) + common IDEs (VisualStudio, Rider, VSCode).
- **Keep it current.** When a new tool, package manager, framework, or IDE config is
  introduced, update `.gitignore` in the same commit — not later.
- Standard entries that must always be present regardless of stack:
  - OS files: `.DS_Store`, `Thumbs.db`, `desktop.ini`
  - Editor/IDE: `.vs/`, `.idea/`, `*.user`, `*.suo`, `.vscode/` (except a shared
    `extensions.json` if intentionally committed for the team)
  - Secrets: `.env`, `.env.local`, `*.pem`, `*.key`, `secrets.json`,
    `appsettings.*.json` (except stub `appsettings.Development.json` with no real values)
  - Build output: `bin/`, `obj/`, `dist/`, `build/`, `out/`
- Never commit secrets, API keys, certificates, or credentials. If one is found in
  history, flag it to the developer immediately — do not silently remove it.

---

## Session Behavior

- **Do exactly what is asked. No more.** If the task is "implement the scanner service",
  do not also stub out the next service or refactor unrelated files. Scope creep per
  session is the primary failure mode.
- **If a plan file exists** (`docs/development-plan.md`, plus per-feature plans under
  `docs/plans/`), it is the source of truth for what to build and in what order. Read it
  before writing any code.
- **Verify before assuming.** If the task references a file, type, or schema — read it
  before writing code that depends on it. Do not generate from memory.
- **Build, then check.** After creating or modifying compilable/runnable code, run the
  appropriate verification command (`dotnet build`, `flutter pub get && flutter analyze`,
  `php -l`, etc.) before declaring the task done.
- **One task group per session.** Complete a task fully (all layers: data → logic →
  presentation), commit it, then stop. Do not roll into the next task.

---

## GitHub & CI/CD

### First Session in Any Repository

On the **first session in a new or existing repo**, before any feature work, evaluate and
propose a GitHub setup. Ask the developer to confirm before creating any files.

**Checklist to evaluate and discuss:**

- [ ] **GitHub Actions CI** — build and test on every push/PR. Propose a workflow appropriate
      to the stack (`.github/workflows/ci.yml`). Use the free GitHub-hosted runners (`ubuntu-latest`).
- [ ] **GitHub Actions CD** — automated deploy or publish on merge to `main` (if applicable).
      For .NET: publish to GHCR or self-hosted. For WordPress plugins: zip and attach to a
      GitHub Release. For Flutter: build APK/AAB and attach to a Release.
- [ ] **Dependabot** — automatic dependency update PRs. Propose `.github/dependabot.yml`
      covering the relevant package ecosystems (`nuget`, `composer`, `pub`, `github-actions`).
- [ ] **Branch protection rules** — require PR + passing CI before merge to `main`.
      Remind the developer to enable this in repo Settings → Branches (cannot be done via code).
- [ ] **GitHub Issue templates** — propose `.github/ISSUE_TEMPLATE/` with at minimum a
      bug report and feature request template.
- [ ] **PR template** — propose `.github/pull_request_template.md` with a checklist
      (summary of changes, testing notes, version bump if applicable).
- [ ] **GitHub Releases** — confirm that version tags (`vX.Y.Z`) will trigger a Release.
      Wire this into CD if one is set up.
- [ ] **Code scanning / CodeQL** — enable via GitHub Actions for security analysis
      (free on public repos; free for private repos on GitHub Free tier via default setup).
- [ ] **GitHub Projects** — suggest linking the repo to a Project board for task tracking
      if the project has a `PLAN.md` or multi-phase roadmap.

If CI/CD workflows already exist, read them before proposing changes. Do not duplicate
or conflict with existing automation. Be mindful and frugal with GitHub build minutes as there are limits.

### Build Trigger Optimization

Documentation-only commits (`README.md`, `TODO.md`, `CHANGELOG.md`, `CLAUDE.md`,
`docs/**`, `.gitignore`, GitHub templates) must **never trigger a paid or time-limited
build**. Apply path filtering at every platform in use.

#### GitHub Actions
Add `paths-ignore` to every workflow trigger. Documentation and meta files that never
affect a build belong here by default:

```yaml
on:
  push:
    paths-ignore:
      - '**.md'
      - '.gitignore'
      - 'docs/**'
      - 'LICENCE'
      - '.github/ISSUE_TEMPLATE/**'
      - '.github/pull_request_template.md'
  pull_request:
    paths-ignore:
      - '**.md'
      - '.gitignore'
      - 'docs/**'
      - 'LICENCE'
      - '.github/ISSUE_TEMPLATE/**'
      - '.github/pull_request_template.md'
```

#### Netlify (`netlify.toml`)
The `ignore` command exits `0` to cancel a build, non-zero to allow it.
`git diff --quiet` with exclusion pathspecs exits `0` when only excluded files changed:

```toml
[build]
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- . ':!*.md' ':!.gitignore' ':!docs/' ':!LICENCE' ':!.github/ISSUE_TEMPLATE/' ':!.github/pull_request_template.md'"
```

#### Vercel (`vercel.json`)
Same logic — `ignoreCommand` exits `0` to skip deployment:

```json
{
  "ignoreCommand": "git diff --quiet HEAD~1 HEAD -- . ':!*.md' ':!.gitignore' ':!docs/' ':!LICENCE' ':!.github/ISSUE_TEMPLATE/' ':!.github/pull_request_template.md'"
}
```

#### Railway (`railway.toml`)
Railway uses an allowlist (`watchPatterns`) rather than an ignorelist — only matching
paths trigger a deploy. Tailor to the actual project structure, but a safe default:

```toml
[deploy]
  watchPatterns = [
    "src/**",
    "*.csproj",
    "*.sln",
    "Directory.Build.props",
    "pubspec.yaml",
    "composer.json",
    "package.json",
    "Dockerfile",
    "docker-compose*.yml",
    ".github/workflows/**"
  ]
```

**Rule:** When setting up any of the above platforms for the first time, add the
appropriate path filtering in the same commit as the initial config file. Do not leave
it as a follow-up task.

### CI/CD Principles

- **Use GitHub-hosted runners** (`ubuntu-latest`, `windows-latest`, `macos-latest`).
  They are free within GitHub's monthly limits. Do not propose self-hosted runners
  unless the developer specifically needs them.
- **Cache aggressively.** Always cache dependency restoration steps:
  - .NET: cache the NuGet global packages folder
  - Flutter: cache the pub cache
  - WordPress/PHP: cache Composer's vendor directory
- **Fail fast.** Lint and build steps come before test steps so cheap failures surface first.
- **Artifacts.** Upload build outputs (binaries, APKs, zipped plugins) as workflow
  artifacts on every successful CI run, not just releases.
- **Secrets.** Never hardcode credentials in workflow files. Reference `${{ secrets.NAME }}`
  and remind the developer to set the secret in repo Settings → Secrets.

---

## Architecture Preferences

### General

- **Free/zero-cost tools first.** When evaluating any library, framework, service, or tool,
  default to the option with no licensing cost. Paid tiers, commercial licenses, and
  SaaS subscriptions require explicit developer approval before being proposed. When a
  free option has a meaningful trade-off versus a paid one, state it clearly and let the
  developer decide — do not silently choose the paid option.
- **Open source preferred.** Among free options, prefer OSS with an active community
  (MIT, Apache 2.0, GPL) over freeware, source-available, or unmaintained projects.
- **Monorepo** is the default when a project has multiple related components
  (e.g., API + frontend, web app + mobile app). Use clear top-level subdirectories
  with per-project tooling scoped correctly (separate `.gitignore` entries,
  workspace files, etc.).
- **Phased delivery.** Large projects are always broken into phases with explicit
  milestones. Do not design everything up front and then build it all at once.
- **Environment variables** for all secrets, URLs, and environment-specific config.
  Never hardcode. Use `.env` / `appsettings.json` / `flutter_dotenv` as appropriate.
- **No unused scaffolding.** Do not generate placeholder files, stub classes, or
  "you can add X here" comments unless explicitly asked.

### .NET / C#

- Target **.NET 10** unless the project specifies otherwise.
- Use **Blazor WebAssembly** for browser-based UIs on .NET projects. Do not introduce
  React, Vue, or any JS framework unless there is no Blazor-compatible alternative.
- Avoid `npm` / Node.js tooling inside .NET projects.
- Prefer **MariaDB** over MySQL for self-hosted projects using a relational database.
- Use **Entity Framework Core** with migrations. Never write raw DDL to mutate a schema
  that EF is managing.
- Solution structure: one `.sln` file, projects in named subdirectories
  (`src/ProjectName.Core`, `src/ProjectName.Api`, etc.).
- `Directory.Build.props` for shared SDK/version settings across projects.

### PHP / WordPress

- Follow WordPress coding standards.
- Plugin structure: `plugin-name/plugin-name.php` as the entry point,
  logic split into `includes/`, `admin/`, `public/` subdirectories.
- Use `wpdb` for queries; prefer prepared statements for all user-supplied input.
- No unnecessary third-party dependencies — keep the `vendor/` footprint minimal.

### Flutter / Dart

- State management: **Riverpod** (not Provider, not Bloc).
- Local database: **Isar** for document-style data, **Drift** for relational.
- HTTP: **Dio** with an interceptor layer for auth and error handling.
- Navigation: **go_router**.
- Models: **freezed** + **json_serializable**. Always run
  `flutter pub run build_runner build --delete-conflicting-outputs` after any model change
  before writing further code.
- Environment config: **flutter_dotenv**. No hardcoded URLs or keys.
- **Offline-first is the default for mobile.** All UI reads from the local database.
  Network calls happen in the sync layer only. No screen should block on the network.
- Every `AsyncValue` in the UI must explicitly handle loading, data, and error states.
- Monorepo layout: Flutter project lives in `mobile/`. All `flutter` CLI commands
  must be run from within `mobile/`, not the repo root.

---

## What to Do at the Start of Every Session

1. Read this file (`CLAUDE.md`).
2. Read `docs/development-plan.md` (and any relevant per-feature plan under `docs/plans/`).
3. Check whether `README.md` and `TODO.md` exist. If either is missing, create it
   and flag this before doing anything else.
4. **First session in this repo?** Run through the GitHub & CI/CD checklist above and
   present findings to the developer before writing any feature code.
5. Confirm the specific task to be worked on before writing any code.
6. **At the end of the session,** assess whether the completed work warrants a version
   bump per semantic versioning rules. If yes, propose the bump and tag before closing out.
