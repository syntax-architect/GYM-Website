-- ==============================================================================
-- SHILPA'S GYM & BEAUTY SALON / WHITE-LABEL COMMERCIAL GYM SAAS
-- COMPLETE SUPABASE REAL-TIME DATABASE & STORAGE SCHEMA
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Site Brand & White-Label Theme Configuration
create table if not exists site_settings (
  id text primary key default 'current',
  gym_name text not null default 'SHILPA''S GYM & BEAUTY SALON',
  tagline text not null default 'STRENGTH MEETS GLAMOUR',
  location_short text not null default 'RAHARA · KHARDAHA · KOLKATA',
  full_address text not null default 'Naskarhat Madhya Para, Halder Bagan, Rahara, Khardaha, Kolkata 700118',
  plus_code text not null default 'P9FM+4V RAHARA · KHARDAHA',
  phone text not null default '074397 61994',
  whatsapp text not null default '917439761994',
  hours text not null default '06:00 AM – 10:00 PM DAILY',
  google_rating numeric(2,1) not null default 4.7,
  review_count int not null default 355,
  primary_color text not null default '#D9381E',    -- Infrared Crimson
  secondary_color text not null default '#C5A059',  -- Brushed Champagne Gold
  canvas_color text not null default '#F4F1EA',     -- Warm Alabaster
  dark_color text not null default '#0D0D0E',       -- Obsidian Carbon
  hero_loop_video_url text not null default '/assets/videos/v01-hero-loop.mp4',
  momentum_video_url text not null default '/assets/videos/v03-momentum.mp4',
  portal_video_url text not null default '/assets/videos/v09-portal.mp4',
  live_occupancy_override int,
  updated_at timestamptz not null default now()
);

-- 3. Curated Facility Wings / Disciplines
create table if not exists disciplines (
  id text primary key,
  order_index int not null default 0,
  number text not null,
  badge text not null,
  title text not null,
  serif_title text not null,
  subtitle text not null,
  description text not null,
  image_url text not null,
  video_url text,
  specs jsonb not null default '[]'::jsonb,
  cta_text text not null,
  plan_name text not null,
  created_at timestamptz not null default now()
);

-- 4. Starting Lineup Coaches & Specialists Roster
create table if not exists trainers (
  id text primary key,
  order_index int not null default 0,
  number text not null,
  position_code text not null,
  name text not null,
  role text not null,
  specialty_tag text not null,
  experience text not null,
  image_url text not null,
  quote text not null,
  accent_color text not null default '#D9381E',
  stats jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- 5. Split-Screen Transformation Scanner Cases
create table if not exists transformations (
  id text primary key,
  category_key text not null unique, -- 'fitness', 'salon', 'bridal'
  tab_label text not null,
  tag text not null,
  title text not null,
  serif_title text not null,
  description text not null,
  before_label text not null,
  after_label text not null,
  before_image_url text not null,
  after_image_url text not null,
  metrics jsonb not null default '[]'::jsonb,
  quote text not null,
  author text not null,
  plan_name text not null,
  created_at timestamptz not null default now()
);

-- 6. Membership Tiers & Atelier Passes
create table if not exists membership_tiers (
  id text primary key,
  order_index int not null default 0,
  code text not null,
  badge text not null,
  name text not null,
  serif_name text not null,
  monthly_price text not null,
  annual_price text not null,
  subtitle text not null,
  featured boolean not null default false,
  features text[] not null default '{}',
  cta text not null,
  created_at timestamptz not null default now()
);

-- 7. Flight-Board Weekly Timetable Slots
create table if not exists timetable_slots (
  id text primary key,
  day text not null default 'ALL', -- 'MON'..'SUN' or 'ALL'
  time text not null,
  duration text not null,
  title text not null,
  coach text not null,
  zone text not null,
  slots_left int not null default 8,
  category text not null default 'strength', -- 'strength' | 'cardio' | 'keratin' | 'bridal'
  created_at timestamptz not null default now()
);

-- 8. 3D Cylindrical Gallery Stream Tiles
create table if not exists gallery_stream (
  id text primary key,
  category text not null default 'gym', -- 'gym' | 'salon'
  src_url text not null,
  alt_text text not null,
  order_index int not null default 0
);

-- 9. Lead Inquiries & CRM Contract Dossier
create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  selected_track text,
  time_window text,
  notes text,
  status text not null default 'NEW' check (status in ('NEW', 'CONTACTED', 'TRIAL_BOOKED', 'CONVERTED'))
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table site_settings enable row level security;
alter table disciplines enable row level security;
alter table trainers enable row level security;
alter table transformations enable row level security;
alter table membership_tiers enable row level security;
alter table timetable_slots enable row level security;
alter table gallery_stream enable row level security;
alter table inquiries enable row level security;

-- Public read access for visitors
create policy "Allow public read access on site_settings" on site_settings for select using (true);
create policy "Allow public read access on disciplines" on disciplines for select using (true);
create policy "Allow public read access on trainers" on trainers for select using (true);
create policy "Allow public read access on transformations" on transformations for select using (true);
create policy "Allow public read access on membership_tiers" on membership_tiers for select using (true);
create policy "Allow public read access on timetable_slots" on timetable_slots for select using (true);
create policy "Allow public read access on gallery_stream" on gallery_stream for select using (true);

-- Lead creation policy (public can submit booking leads)
create policy "Allow public insert on inquiries" on inquiries for insert with check (true);
create policy "Allow staff read/update on inquiries" on inquiries for all using (true) with check (true);

-- Admin updates (Permit anon for live sales pitch demos or authenticated users)
create policy "Allow admin write on site_settings" on site_settings for all using (true) with check (true);
create policy "Allow admin write on disciplines" on disciplines for all using (true) with check (true);
create policy "Allow admin write on trainers" on trainers for all using (true) with check (true);
create policy "Allow admin write on transformations" on transformations for all using (true) with check (true);
create policy "Allow admin write on membership_tiers" on membership_tiers for all using (true) with check (true);
create policy "Allow admin write on timetable_slots" on timetable_slots for all using (true) with check (true);
create policy "Allow admin write on gallery_stream" on gallery_stream for all using (true) with check (true);

-- ==============================================================================
-- REALTIME SUBSCRIPTIONS
-- ==============================================================================

-- Enable Realtime for all tables
alter publication supabase_realtime add table site_settings;
alter publication supabase_realtime add table disciplines;
alter publication supabase_realtime add table trainers;
alter publication supabase_realtime add table transformations;
alter publication supabase_realtime add table membership_tiers;
alter publication supabase_realtime add table timetable_slots;
alter publication supabase_realtime add table gallery_stream;
alter publication supabase_realtime add table inquiries;

-- ==============================================================================
-- STORAGE BUCKET: gym-media
-- ==============================================================================

insert into storage.buckets (id, name, public)
values ('gym-media', 'gym-media', true)
on conflict (id) do nothing;

create policy "Allow public read on gym-media"
on storage.objects for select
using (bucket_id = 'gym-media');

create policy "Allow public/admin upload on gym-media"
on storage.objects for insert
with check (bucket_id = 'gym-media');

create policy "Allow public/admin update on gym-media"
on storage.objects for update
using (bucket_id = 'gym-media');

create policy "Allow public/admin delete on gym-media"
on storage.objects for delete
using (bucket_id = 'gym-media');
