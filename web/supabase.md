# Supabase setup

Run the SQL below in the Supabase SQL editor. It creates the catalog, profiles, orders, order lines, and a public read policy for products. The app currently uses local placeholder data and localStorage for a zero-config demo; replace `lib/catalog.ts` with Supabase queries once `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set.

```sql
create extension if not exists pgcrypto;

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  image_url text not null,
  category text not null,
  badge text,
  inventory integer not null default 0 check (inventory >= 0),
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  subtotal numeric(10,2) not null check (subtotal >= 0),
  shipping numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null check (total >= 0),
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0)
);

alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "products are publicly readable" on public.products for select using (true);
create policy "users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "users can read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "users can create own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "users can read own order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles (id, email) values (new.id, new.email); return new; end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Optional seed row format:
-- insert into public.products (slug,name,brand,description,price,image_url,category,badge,inventory) values ('core-structure-cap','Core Structure Cap','NO CAPS','Reinforced six-panel crown.',55,'https://...','Fitted','BEST SELLER',25);
```

## Seed 15 caps per brand

Run this after the schema above. It inserts 15 caps each for New Era, Nike, Adidas, and Puma using the remote placeholder images already used by the frontend. The statement is safe to run again because each slug is upserted.

```sql
with brand_seed(brand, base_price, names, images) as (
  values
    ('NEW ERA', 32, array['Essential Logo','Heritage Club','Studio Panel','Core Twill','Archive Script','City Series','Seasonal League','Everyday Canvas','Mono Fitted','Utility Pack','Team Classic','Daily Runner','Premium Outline','Off-Duty Cotton','Limited Mark'], array['https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1508166977780-7a25b18f0b47?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306510-31ca015374b0?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85&sat=-30','https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85']),
    ('NIKE', 30, array['Essential Logo','Heritage Club','Studio Panel','Core Twill','Archive Script','City Series','Seasonal League','Everyday Canvas','Mono Fitted','Utility Pack','Team Classic','Daily Runner','Premium Outline','Off-Duty Cotton','Limited Mark'], array['https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1508166977780-7a25b18f0b47?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306510-31ca015374b0?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85&sat=-30','https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85']),
    ('ADIDAS', 28, array['Essential Logo','Heritage Club','Studio Panel','Core Twill','Archive Script','City Series','Seasonal League','Everyday Canvas','Mono Fitted','Utility Pack','Team Classic','Daily Runner','Premium Outline','Off-Duty Cotton','Limited Mark'], array['https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1508166977780-7a25b18f0b47?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306510-31ca015374b0?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85&sat=-30','https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85']),
    ('PUMA', 27, array['Essential Logo','Heritage Club','Studio Panel','Core Twill','Archive Script','City Series','Seasonal League','Everyday Canvas','Mono Fitted','Utility Pack','Team Classic','Daily Runner','Premium Outline','Off-Duty Cotton','Limited Mark'], array['https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1508166977780-7a25b18f0b47?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1556306510-31ca015374b0?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=900&q=85&sat=-30','https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85'])
)
insert into public.products (slug, name, brand, description, price, image_url, category, badge, inventory)
select lower(regexp_replace(brand, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || lpad(n::text, 2, '0'), names[n] || ' Cap', brand, 'A considered six-panel cap with durable cotton construction and an embroidered finish made for daily rotation.', base_price + ((n - 1) % 4) * 3, images[n], (array['Snapback','Fitted','Dad Hat','Trucker'])[((n - 1) % 4) + 1], case when n = 1 then 'NEW' when n = 7 then 'LIMITED' else null end, 25
from brand_seed cross join generate_series(1, 15) as series(n)
on conflict (slug) do update set name = excluded.name, brand = excluded.brand, price = excluded.price, image_url = excluded.image_url, category = excluded.category, badge = excluded.badge, inventory = excluded.inventory;
```
