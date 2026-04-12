# Medexia Content Command Center

A Next.js 15 dashboard for remotely triggering AI content generation pipelines, reviewing and approving outputs, downloading assets, and (soon) auto-publishing to Instagram and TikTok.

**Live:** [medexia-akt.com/dashboard](https://medexia-akt.com/dashboard)
**Stack:** Next.js 15 (App Router) + Supabase (Postgres + Storage) + Tailwind CSS
**Hosting:** Vercel (auto-deploys on push to `main`)

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Dashboard Pages](#dashboard-pages)
- [API Routes](#api-routes)
- [Worker Daemon](#worker-daemon)
- [File Structure](#file-structure)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
                          Vercel (cloud)
                    ┌─────────────────────────┐
                    │  Next.js Dashboard       │
                    │  /dashboard/generate     │
                    │  /dashboard/review       │
                    │  /api/dashboard/*        │
                    └────────┬────────────────┘
                             │ reads/writes
                             ▼
                    ┌─────────────────────────┐
                    │  Supabase                │
                    │  ├─ Postgres (4 tables)  │
                    │  └─ Storage (akt-assets) │
                    └────────┬────────────────┘
                             │ polls for jobs
                             ▼
                    ┌─────────────────────────┐
                    │  Local Mac (always on)   │
                    │  Worker daemon (bun)     │
                    │  ├─ infographic pipeline │
                    │  └─ reel pipeline        │
                    └─────────────────────────┘
```

**Data flow:**
1. You open the dashboard on your phone or laptop
2. Submit a generation job (topic, style, count)
3. The worker daemon on your Mac picks up the job from Supabase
4. It runs the infographic and/or reel pipelines locally
5. Generated assets are uploaded to Supabase Storage
6. Asset metadata (URLs, captions) is inserted into the `content_assets` table
7. You review, approve/reject, regenerate with custom instructions, or download

**Two databases, separate concerns:**
- **Neon** (read-only): questions, users, app data — used by the pipeline to look up question content
- **Supabase** (read/write): content engine tables + asset storage — used by dashboard, worker, and the AKT Navigator app

---

## How It Works

### Job Lifecycle

```
pending → running → completed
                  → failed (with error message)
```

1. Dashboard POST to `/api/dashboard/jobs` creates a row in `content_jobs` with `status: 'pending'`
2. Worker polls Supabase every 15 seconds for pending jobs
3. Worker sets `status: 'running'` and shells out to the pipeline
4. On success: uploads assets to Storage, inserts `content_assets` rows, sets `status: 'completed'`
5. On failure: sets `status: 'failed'` with error message

### Regeneration

You can regenerate specific parts of an asset without re-running the entire pipeline:

| Target | What happens | Cost |
|--------|-------------|------|
| **Slide 1 only** | Re-runs infographic pipeline for slide 1, uploads to same Storage path, updates existing asset row | 1 API call |
| **Slide 2 only** | Same as above for slide 2 | 1 API call |
| **Reel** | Re-runs reel pipeline using existing infographic, creates new asset | Script + video generation |
| **Reel script only** | Re-generates the script, re-renders video | Script generation only |
| **Full** | Re-runs everything from scratch | Full pipeline cost |

Regeneration jobs include `custom_instructions` (free text) that get passed to the AI models.

### Authentication

Simple password-based auth:
- Password is stored as `DASHBOARD_PASSWORD` env var
- On login, a base64-encoded cookie (`dashboard_auth`) is set with 7-day expiry
- Middleware at `src/middleware.ts` checks for the cookie on all `/dashboard/*` and `/api/dashboard/*` routes
- No user accounts, no OAuth — just one shared password

### Asset Storage

All generated assets are stored in Supabase Storage in the `akt-assets` public bucket:

```
akt-assets/
  posts/<date>/<slug>/
    slide1.png
    slide2.png
    metadata.json
  reels/<date>/<slug>/
    <slug>.mp4
    thumbnail.jpg
    metadata.json
```

Public URLs are stored in the `content_assets` table. The AKT Navigator app reads approved assets directly from Supabase using the anon key.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project with the schema applied (see [Database Schema](#database-schema))
- The infographic and reel pipelines set up locally (separate repos)

### Install and run locally

```bash
# Clone
git clone https://github.com/tesvinjohn25/Medexia-akt-marketing.git
cd Medexia-akt-marketing

# Install dependencies
npm install

# Set up environment variables (see section below)
cp .env.example .env.local

# Run dev server
npm run dev
# → http://localhost:3000/dashboard
```

### Deploy to Vercel

The repo is connected to Vercel and auto-deploys on push to `main`. To set up from scratch:

1. Import the repo on [vercel.com](https://vercel.com)
2. Add all environment variables (see below) in Vercel project settings → Environment Variables
3. Deploy

---

## Environment Variables

Create `.env.local` for local development. Add the same variables in Vercel for production.

| Variable | Description | Where used |
|----------|-------------|------------|
| `SUPABASE_URL` | Supabase project URL (e.g. `https://xxx.supabase.co`) | Server-side API routes |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret key for full DB access (`sb_secret_...`) | Server-side API routes |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as `SUPABASE_URL`, exposed to client | Client components (future) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public key for read-only access (`sb_publishable_...`) | Client components (future) |
| `DASHBOARD_PASSWORD` | Password to access the dashboard | Auth middleware |

**Important:** `SUPABASE_SERVICE_ROLE_KEY` is a secret that bypasses Row Level Security. Never expose it client-side.

---

## Database Schema

Four tables on Supabase Postgres. Migration files are in `scripts/migrations/`.

### `content_jobs` — Pipeline job queue

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `status` | text | `pending` / `running` / `completed` / `failed` |
| `job_type` | text | `infographic` / `reel` / `both` |
| `style` | text | `classic` / `tight` / `both` |
| `topic` | text | Optional topic filter |
| `question_uid` | text | Optional specific question |
| `count` | int | Number of items to generate (1-10) |
| `custom_instructions` | text | AI instructions for regeneration |
| `regenerate_from` | uuid (FK) | Asset ID being regenerated |
| `regenerate_target` | text | `slide1` / `slide2` / `reel` / `reel_script` / `full` |
| `created_at` | timestamptz | When job was submitted |
| `started_at` | timestamptz | When worker picked it up |
| `completed_at` | timestamptz | When it finished |
| `error` | text | Error message if failed |

### `content_assets` — Generated outputs

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `job_id` | uuid (FK) | Which job created this |
| `question_uid` | text | Links back to the question in Neon |
| `asset_type` | text | `carousel` / `reel_classic` / `reel_tight` |
| `slug` | text | Human-readable identifier |
| `slide1_url` | text | Supabase Storage URL |
| `slide2_url` | text | Supabase Storage URL |
| `video_url` | text | Supabase Storage URL |
| `thumbnail_url` | text | Supabase Storage URL |
| `caption_carousel_ig` | text | Instagram carousel caption |
| `caption_reel_ig` | text | Instagram reel caption |
| `caption_reel_tiktok` | text | TikTok caption |
| `review_status` | text | `pending` / `approved` / `rejected` |
| `reviewed_at` | timestamptz | When reviewed |
| `review_notes` | text | Optional reviewer notes |
| `created_at` | timestamptz | When asset was created |

**RLS policy:** Anonymous users (anon key) can only SELECT rows where `review_status = 'approved'`. The service role key bypasses this.

### `publish_queue` — Scheduled posts (Sprint 2)

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `asset_id` | uuid (FK) | Which asset to publish |
| `platform` | text | `instagram` / `tiktok` |
| `post_type` | text | `carousel` / `reel` |
| `caption` | text | Caption to use |
| `scheduled_at` | timestamptz | When to publish |
| `published_at` | timestamptz | When actually published |
| `platform_post_id` | text | ID from the platform |
| `status` | text | `scheduled` / `publishing` / `published` / `failed` |
| `error` | text | Error message if failed |

### `post_metrics` — Engagement tracking (Sprint 3)

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `publish_id` | uuid (FK) | Which published post |
| `likes` / `comments` / `shares` / `saves` | int | Engagement counts |
| `reach` / `impressions` | int | Visibility counts |
| `video_views` | int | Video-specific |
| `fetched_at` | timestamptz | When metrics were fetched |

### Applying migrations

1. Go to your Supabase project → SQL Editor
2. Paste and run `scripts/migrations/001-content-command-center.sql`
3. Paste and run `scripts/migrations/002-regeneration.sql`

---

## Dashboard Pages

### `/dashboard/login`
Password entry form. Sets a 7-day auth cookie on success.

### `/dashboard/generate`
- **Job type:** Infographic only, Reel only, or Both
- **Style:** Classic, Tight, or Both
- **Topic:** Optional text filter (e.g. "dermatology")
- **Question UID:** Optional specific question (overrides topic)
- **Count:** 1-10 items to generate
- **Recent jobs list** below the form with status badges, auto-refreshes every 10 seconds

### `/dashboard/review`
- **Filter tabs:** Pending, Approved, Rejected, All
- **Asset grid:** Thumbnail cards with type badges and status
- **Detail modal** (tap a card):
  - Slide 1 + Slide 2 image previews (stacked on mobile, side-by-side on desktop)
  - Video player for reels
  - Download buttons for all asset files
  - Caption tabs: IG Carousel, IG Reel, TikTok
  - Approve / Reject buttons with optional notes
  - Regenerate panel: choose target (Slide 1, Slide 2, Reel, Full, etc.) and provide custom AI instructions

### `/dashboard/schedule` (Sprint 2 — placeholder)
Publishing calendar for scheduling approved content to Instagram and TikTok.

### `/dashboard/analytics` (Sprint 3 — placeholder)
Performance rankings, topic breakdown, engagement analytics.

---

## API Routes

All routes are protected by auth middleware (except `/api/dashboard/auth`).

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/dashboard/auth` | Verify password, set auth cookie |
| GET | `/api/dashboard/jobs` | List recent jobs (latest 50) |
| POST | `/api/dashboard/jobs` | Create a new job |
| GET | `/api/dashboard/jobs/[id]` | Get job detail + associated assets |
| GET | `/api/dashboard/assets?status=pending` | List assets, filterable by review status |
| POST | `/api/dashboard/assets/[id]/review` | Approve or reject an asset |

### POST `/api/dashboard/jobs` — request body

```json
{
  "job_type": "both",
  "style": "classic",
  "topic": "dermatology",
  "question_uid": null,
  "count": 3,
  "custom_instructions": "Make the hook more attention-grabbing",
  "regenerate_from": "uuid-of-existing-asset",
  "regenerate_target": "slide1"
}
```

### POST `/api/dashboard/assets/[id]/review` — request body

```json
{
  "status": "approved",
  "notes": "Looks great, ready to publish"
}
```

---

## Worker Daemon

The worker runs on your local Mac and polls Supabase for pending jobs. It lives in the **medexia-reel-pipeline** repo at `scripts/worker.ts`.

### How it runs

It's registered as a macOS launchd service that starts on boot and auto-restarts on crash:

```
~/Library/LaunchAgents/com.medexia.content-worker.plist
```

### Worker commands

```bash
# Check if running
launchctl list | grep medexia

# View logs
tail -f ~/clawd/work/medexia-reel-pipeline/logs/worker.log
tail -f ~/clawd/work/medexia-reel-pipeline/logs/worker.err

# Restart (picks up code changes)
launchctl kickstart -k gui/501/com.medexia.content-worker

# Stop
launchctl unload ~/Library/LaunchAgents/com.medexia.content-worker.plist

# Start
launchctl load ~/Library/LaunchAgents/com.medexia.content-worker.plist
```

### Worker environment

The worker reads `.env` from the reel-pipeline repo root. Required variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon connection string (read-only, for question lookups) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret key for writing to Supabase |
| `ANTHROPIC_API_KEY` | For Claude (script generation) |
| `GOOGLE_AI_API_KEY` | For Gemini (image generation) |
| `ELEVENLABS_API_KEY` | For voiceover generation |

### Worker flow

```
Poll Supabase (every 15s)
  → Pick up pending job
  → Set status = 'running'
  → Check regenerate_target:
      slide1/slide2 → regenSlide() — runs infographic pipeline only, updates existing asset
      reel/reel_script → regenReel() — runs reel pipeline with existing infographics
      full/null → executeFullJob() — runs complete pipeline
  → Upload outputs to Supabase Storage
  → Insert/update content_assets rows
  → Set status = 'completed' (or 'failed' with error)
```

---

## File Structure

```
src/
  app/
    dashboard/
      layout.tsx           — Dashboard shell (sidebar on desktop, bottom tabs on mobile)
      page.tsx             — Redirects to /dashboard/generate
      login/page.tsx       — Password entry
      generate/page.tsx    — Job creation form + job list
      review/page.tsx      — Asset grid, detail modal, approve/reject/regenerate
      schedule/page.tsx    — Placeholder (Sprint 2)
      analytics/page.tsx   — Placeholder (Sprint 3)
    api/
      dashboard/
        auth/route.ts      — Password verification
        jobs/route.ts      — GET: list jobs, POST: create job
        jobs/[id]/route.ts — GET: job + assets detail
        assets/route.ts    — GET: list assets with status filter
        assets/[id]/
          review/route.ts  — POST: approve/reject
        publish/route.ts   — Placeholder (Sprint 2)
  lib/
    supabase-server.ts     — Lazy-initialized Supabase admin client (service role)
    supabase-client.ts     — Public anon client (for client components)
    auth.ts                — Password verify + cookie helpers
  middleware.ts            — Auth guard for /dashboard/* routes

scripts/
  migrations/
    001-content-command-center.sql  — Core schema (4 tables, indexes, RLS)
    002-regeneration.sql            — Adds regeneration columns to content_jobs
```

---

## Common Tasks

### Change the dashboard password

1. Update `DASHBOARD_PASSWORD` in Vercel → Settings → Environment Variables
2. Redeploy (push any commit, or trigger manually in Vercel dashboard)
3. Clear your browser cookies for the site and log in with the new password

### Add a new field to an asset

1. Write a migration SQL file in `scripts/migrations/` (e.g. `003-add-field.sql`)
2. Run it in Supabase Dashboard → SQL Editor
3. Update the `Asset` TypeScript interface in `src/app/dashboard/review/page.tsx`
4. Update the relevant API route to read/write the new field
5. Update the worker in the reel-pipeline repo to populate the field

### Add a new dashboard page

1. Create `src/app/dashboard/<name>/page.tsx` (client component with `"use client"`)
2. Add a nav entry to the `navItems` array in `src/app/dashboard/layout.tsx`
3. Create any needed API routes in `src/app/api/dashboard/<name>/route.ts`
4. The auth middleware automatically protects all `/dashboard/*` routes

### Update the worker

1. Edit `scripts/worker.ts` in the `medexia-reel-pipeline` repo
2. Restart: `launchctl kickstart -k gui/501/com.medexia.content-worker`

### Read approved assets from the AKT Navigator app

```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const { data } = await supabase
  .from('content_assets')
  .select('asset_type, slide1_url, slide2_url, video_url, thumbnail_url')
  .eq('question_uid', questionUid)
  .eq('review_status', 'approved')
```

The anon key only returns approved assets (enforced by RLS policy).

---

## Troubleshooting

### Jobs stay "pending" forever
The worker isn't running. Check: `launchctl list | grep medexia`. If not listed, load it:
```bash
launchctl load ~/Library/LaunchAgents/com.medexia.content-worker.plist
```

### "Missing SUPABASE_URL" error on build
Environment variables aren't set. The Supabase client uses lazy initialization to avoid this at build time, but if you see it, check that `.env.local` exists with the correct values (or that Vercel env vars are set).

### Dashboard shows blank/white page
The CSS custom properties (`--bg-ink`, `--bg-surface`, etc.) are defined in the global stylesheet. Make sure `globals.css` is imported in the root layout.

### Images don't update after regeneration
Browser caching. The worker appends `?v=<timestamp>` to regenerated URLs, but if you still see stale images, hard-refresh (Cmd+Shift+R) or clear browser cache.

### Worker crashes on startup
Check logs: `cat ~/clawd/work/medexia-reel-pipeline/logs/worker.err`. Common causes:
- Missing `.env` file in the reel-pipeline repo
- Missing `@supabase/supabase-js` dependency (run `bun install`)
- Pipeline dependencies not installed

---

## Roadmap

- **Sprint 1 (done):** Remote trigger, review/approve, regeneration, download, mobile-responsive
- **Sprint 2 (next):** Auto-publishing to Instagram via Meta Graph API, scheduling calendar
- **Sprint 3:** TikTok publishing, engagement metrics, analytics dashboard with winner detection
