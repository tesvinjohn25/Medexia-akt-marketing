-- Content Command Center — Supabase schema
-- Run via Supabase Dashboard → SQL Editor

-- Pipeline job queue
create table content_jobs (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending',
  job_type text not null,
  style text default 'classic',
  topic text,
  question_uid text,
  count int default 1,
  created_at timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz,
  error text
);

-- Generated assets (one row per output)
create table content_assets (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references content_jobs(id),
  question_uid text not null,
  asset_type text not null,
  slug text not null,
  slide1_url text,
  slide2_url text,
  video_url text,
  thumbnail_url text,
  caption_carousel_ig text,
  caption_reel_ig text,
  caption_reel_tiktok text,
  review_status text default 'pending',
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz default now()
);

-- Publishing schedule
create table publish_queue (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid references content_assets(id),
  platform text not null,
  post_type text not null,
  caption text not null,
  scheduled_at timestamptz not null,
  published_at timestamptz,
  platform_post_id text,
  status text default 'scheduled',
  error text,
  created_at timestamptz default now()
);

-- Engagement metrics
create table post_metrics (
  id uuid primary key default gen_random_uuid(),
  publish_id uuid references publish_queue(id),
  likes int default 0,
  comments int default 0,
  shares int default 0,
  saves int default 0,
  reach int default 0,
  impressions int default 0,
  video_views int,
  fetched_at timestamptz default now()
);

-- Indexes
create index idx_content_assets_question_uid on content_assets(question_uid);
create index idx_content_assets_review_status on content_assets(review_status);
create index idx_content_jobs_status on content_jobs(status);
create index idx_publish_queue_status on publish_queue(status);
create index idx_publish_queue_scheduled on publish_queue(scheduled_at);

-- Row Level Security: allow anon reads on approved content_assets
alter table content_assets enable row level security;
create policy "Public can read approved assets"
  on content_assets for select
  using (review_status = 'approved');
