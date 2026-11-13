-- My Budget: run this once in Supabase → SQL Editor → New query → Run.
create table if not exists public.docs (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  coll       text not null,
  id         text not null,
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, coll, id)
);

-- Only you can see or change your own rows.
alter table public.docs enable row level security;
drop policy if exists "read own"   on public.docs;
drop policy if exists "add own"    on public.docs;
drop policy if exists "change own" on public.docs;
drop policy if exists "remove own" on public.docs;
create policy "read own"   on public.docs for select to authenticated using (auth.uid() = user_id);
create policy "add own"    on public.docs for insert to authenticated with check (auth.uid() = user_id);
create policy "change own" on public.docs for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "remove own" on public.docs for delete to authenticated using (auth.uid() = user_id);
grant select, insert, update, delete on public.docs to authenticated;
revoke all on public.docs from anon;

-- Live sync between your devices.
alter table public.docs replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.docs;
exception when duplicate_object then null; end $$;
