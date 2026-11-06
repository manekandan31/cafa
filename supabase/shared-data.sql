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

create index if not exists cafe_sales_sale_date_idx
  on public.cafe_sales (sale_date);

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
