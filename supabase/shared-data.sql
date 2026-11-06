create table if not exists public.cafe_sales (
  id text primary key,
  sale_date date not null,
  amount numeric(12, 2) not null check (amount >= 0),
  payment_method text not null,
  items jsonb not null default '[]'::jsonb,
  session_id text,
  table_id text,
  created_by text,
  created_at timestamptz not null default now()
);

alter table public.cafe_sales add column if not exists bill_number text;
alter table public.cafe_sales add column if not exists paid_at timestamptz;

create index if not exists cafe_sales_sale_date_idx
  on public.cafe_sales (sale_date);

create table if not exists public.cafe_kitchen_orders (
  id text primary key,
  kot_number text not null,
  table_id text not null,
  table_name text not null,
  items jsonb not null default '[]'::jsonb,
  special_notes text,
  status text not null default 'new',
  source text not null default 'QR Code',
  customer_name text,
  customer_phone text,
  collection_id text,
  created_at timestamptz not null default now()
);

create index if not exists cafe_kitchen_orders_table_idx
  on public.cafe_kitchen_orders (table_id, created_at);

alter table public.cafe_kitchen_orders enable row level security;
drop policy if exists "Cafe members can read kitchen orders" on public.cafe_kitchen_orders;
create policy "Cafe members can read kitchen orders"
  on public.cafe_kitchen_orders for select
  to anon, authenticated
  using (true);
drop policy if exists "Cafe members can add kitchen orders" on public.cafe_kitchen_orders;
create policy "Cafe members can add kitchen orders"
  on public.cafe_kitchen_orders for insert
  to anon, authenticated
  with check (true);

create table if not exists public.cafe_expenses (
  id text primary key,
  expense_date date not null,
  amount numeric(12, 2) not null check (amount > 0),
  category text not null,
  payment_method text not null,
  reason text not null,
  supplier text,
  reference text,
  created_by text,
  created_at timestamptz not null default now()
);

create index if not exists cafe_expenses_expense_date_idx
  on public.cafe_expenses (expense_date);

alter table public.cafe_sales enable row level security;
alter table public.cafe_expenses enable row level security;

drop policy if exists "Cafe members can read sales" on public.cafe_sales;
create policy "Cafe members can read sales"
  on public.cafe_sales for select
  to anon, authenticated
  using (true);

drop policy if exists "Cafe members can add sales" on public.cafe_sales;
create policy "Cafe members can add sales"
  on public.cafe_sales for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Cafe members can update sales" on public.cafe_sales;
create policy "Cafe members can update sales"
  on public.cafe_sales for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Cafe members can read expenses" on public.cafe_expenses;
create policy "Cafe members can read expenses"
  on public.cafe_expenses for select
  to anon, authenticated
  using (true);

drop policy if exists "Cafe members can add expenses" on public.cafe_expenses;
create policy "Cafe members can add expenses"
  on public.cafe_expenses for insert
  to anon, authenticated
  with check (true);
