-- GreenCompute schema
-- Run this in the Supabase SQL editor.

-- ---------------------------------------------------------------------------
-- calculations
-- ---------------------------------------------------------------------------
create table if not exists public.calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null references auth.users (id) on delete set null,
  device_type text not null,
  power_watts numeric not null,
  hours_per_day numeric not null,
  usage_days integer not null,
  electricity_rate numeric not null,
  energy_kwh numeric not null,
  monthly_cost numeric not null,
  co2_kg numeric not null,
  green_score integer not null,
  impact_level text not null,
  created_at timestamptz not null default now()
);

create index if not exists calculations_user_id_idx
  on public.calculations (user_id);

create index if not exists calculations_created_at_idx
  on public.calculations (created_at desc);

-- ---------------------------------------------------------------------------
-- green_tips
-- ---------------------------------------------------------------------------
create table if not exists public.green_tips (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The FastAPI backend uses the service role key (bypasses RLS) and filters
-- rows in application code. RLS still protects the tables if the anon key
-- is ever used from a client.
-- ---------------------------------------------------------------------------
alter table public.calculations enable row level security;
alter table public.green_tips enable row level security;

drop policy if exists "users read own calculations" on public.calculations;
create policy "users read own calculations"
  on public.calculations
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users insert own calculations" on public.calculations;
create policy "users insert own calculations"
  on public.calculations
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Demo-mode rows (user_id is null) are not readable via the anon/authenticated
-- keys. Only the backend service role can list them.

drop policy if exists "anyone can read tips" on public.green_tips;
create policy "anyone can read tips"
  on public.green_tips
  for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Seed tips (safe to re-run: skip if titles already exist)
-- ---------------------------------------------------------------------------
insert into public.green_tips (title, description, category)
select seed.title, seed.description, seed.category
from (
  values
    (
      'Enable Sleep Mode',
      'Set your device to sleep automatically when inactive so it draws far less power between tasks.',
      'Energy'
    ),
    (
      'Reduce Screen Brightness',
      'Lower brightness when maximum brightness is unnecessary. Displays are often a large share of device energy use.',
      'Energy'
    ),
    (
      'Unplug Idle Chargers',
      'Chargers and peripherals can draw small amounts of power even when not in use. Unplug them when practical.',
      'Energy'
    ),
    (
      'Extend Device Lifespan',
      'Maintain and repair devices instead of replacing them unnecessarily. Manufacturing new electronics has a large environmental cost.',
      'Device Lifespan'
    ),
    (
      'Recycle Responsibly',
      'Send obsolete electronics to appropriate e-waste recycling channels instead of household waste.',
      'E-Waste'
    ),
    (
      'Close Unused Apps and Tabs',
      'Idle software can keep CPUs and radios busy. Closing what you do not need reduces energy use on laptops and phones.',
      'Responsible Computing'
    ),
    (
      'Prefer Repair Over Replace',
      'Replace batteries, storage, or screens when feasible rather than discarding a working device.',
      'Device Lifespan'
    ),
    (
      'Donate or Trade In',
      'If a device still works, donate or trade it in so someone else can use it before it becomes e-waste.',
      'E-Waste'
    )
) as seed(title, description, category)
where not exists (
  select 1 from public.green_tips existing where existing.title = seed.title
);
