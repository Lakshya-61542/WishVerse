-- WishVerse production auth/ownership setup
-- Review before running on an existing project.

create extension if not exists pgcrypto;

-- PROFILES ---------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles
  add column if not exists full_name text,
  add column if not exists username text,
  add column if not exists avatar_url text,
  add column if not exists created_at timestamptz default now();

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'Creator'
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    )
  )
  on conflict (id) do update set
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

insert into public.profiles (id, full_name, avatar_url)
select
  id,
  coalesce(
    raw_user_meta_data ->> 'full_name',
    raw_user_meta_data ->> 'name',
    split_part(email, '@', 1),
    'Creator'
  ),
  coalesce(
    raw_user_meta_data ->> 'avatar_url',
    raw_user_meta_data ->> 'picture'
  )
from auth.users
on conflict (id) do nothing;

-- WEBSITES ---------------------------------------------------------------

alter table public.websites
  add column if not exists owner_id uuid references auth.users(id) on delete cascade,
  add column if not exists updated_at timestamptz default now();

alter table public.websites enable row level security;

do $$
declare
  p record;
begin
  for p in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'websites'
  loop
    execute format('drop policy if exists %I on public.websites', p.policyname);
  end loop;
end $$;

-- Published wishes remain readable for the current public-reveal implementation.
-- Owners can read their drafts too.
create policy "Public can view published wishes"
on public.websites
for select
to anon, authenticated
using (
  published = true
  or owner_id = auth.uid()
);

create policy "Users can create their own wishes"
on public.websites
for insert
to authenticated
with check (owner_id = auth.uid());

create policy "Users can update their own wishes"
on public.websites
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Users can delete their own wishes"
on public.websites
for delete
to authenticated
using (owner_id = auth.uid());

-- NOTE:
-- The current 6-digit reveal passcode is casual privacy, not strong authentication,
-- because the published row must be readable by the reveal page.
-- Do not place highly sensitive material behind that passcode alone.
