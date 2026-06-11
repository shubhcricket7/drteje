-- APPOINTMENTS TABLE
create table if not exists appointments (
  id bigint generated always as identity primary key,
  patient_name text not null,
  phone text not null,
  location text not null,
  appointment_date date not null,
  time_slot text not null,
  reason text,
  status text default 'pending',
  booked_at timestamptz default now()
);

-- BLOCKED SLOTS TABLE  
create table if not exists blocked_slots (
  id bigint generated always as identity primary key,
  location text not null,
  blocked_date date not null,
  time_slot text,
  block_type text default 'slot', -- 'slot', 'full_day', 'custom_hours'
  from_time text,
  to_time text,
  reason text,
  created_at timestamptz default now()
);

-- Enable RLS but allow all operations for now
alter table appointments enable row level security;
alter table blocked_slots enable row level security;

create policy "Allow all" on appointments for all using (true);
create policy "Allow all" on blocked_slots for all using (true);
