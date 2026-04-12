-- Regeneration support
-- Run via Supabase Dashboard → SQL Editor

alter table content_jobs add column custom_instructions text;
alter table content_jobs add column regenerate_from uuid references content_assets(id);
alter table content_jobs add column regenerate_target text; -- 'slide1' | 'slide2' | 'reel_script' | 'reel' | 'full'
