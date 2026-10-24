create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.grant_owner_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) = 'nitarastays@gmail.com' and new.email_confirmed_at is not null then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;

create trigger on_auth_user_owner_admin
after insert or update of email_confirmed_at on auth.users
for each row execute function public.grant_owner_admin();

-- Bookings
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  room_id text not null,
  room_name text not null,
  check_in date not null,
  check_out date not null,
  guests int not null default 1,
  guest_name text not null,
  email text not null,
  phone text not null default '',
  country text not null default '',
  addons text not null default '',
  notes text not null default '',
  total int not null default 0,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  constraint bookings_dates check (check_out > check_in),
  constraint bookings_guests check (guests between 1 and 20),
  constraint bookings_lengths check (length(guest_name) <= 100 and length(email) <= 255 and length(phone) <= 30 and length(notes) <= 1000 and length(country) <= 60),
  constraint bookings_status check (status in ('pending','confirmed','cancelled'))
);
grant insert on public.bookings to anon, authenticated;
grant select, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;
alter table public.bookings enable row level security;
create policy "Anyone can create a booking" on public.bookings for insert to anon, authenticated with check (status = 'pending');
create policy "Admins read bookings" on public.bookings for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update bookings" on public.bookings for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete bookings" on public.bookings for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Reviews added by admin
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  created_at timestamptz not null default now(),
  constraint reviews_len check (length(name) between 1 and 100 and length(quote) between 1 and 1500)
);
grant select on public.reviews to anon, authenticated;
grant insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "Public reads reviews" on public.reviews for select to anon, authenticated using (true);
create policy "Admins manage reviews" on public.reviews for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Photos added by admin (gallery or a room)
create table public.site_photos (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  room_id text,
  category text not null default 'Retreats',
  url text not null,
  storage_path text,
  alt text not null default '',
  created_at timestamptz not null default now(),
  constraint site_photos_section check (section in ('gallery','room'))
);
grant select on public.site_photos to anon, authenticated;
grant insert, update, delete on public.site_photos to authenticated;
grant all on public.site_photos to service_role;
alter table public.site_photos enable row level security;
create policy "Public reads photos" on public.site_photos for select to anon, authenticated using (true);
create policy "Admins manage photos" on public.site_photos for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Built-in items the admin has removed
create table public.hidden_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  item_key text not null,
  created_at timestamptz not null default now(),
  unique (kind, item_key),
  constraint hidden_kind check (kind in ('review','gallery','room'))
);
grant select on public.hidden_items to anon, authenticated;
grant insert, delete on public.hidden_items to authenticated;
grant all on public.hidden_items to service_role;
alter table public.hidden_items enable row level security;
create policy "Public reads hidden" on public.hidden_items for select to anon, authenticated using (true);
create policy "Admins manage hidden" on public.hidden_items for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));