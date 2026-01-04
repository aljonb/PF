-- Disable Row Level Security on todos table
alter table public.todos disable row level security;

-- Drop existing policies
drop policy if exists "Enable read access for all users" on public.todos;
drop policy if exists "Enable insert for authenticated users only" on public.todos;
drop policy if exists "Enable update for authenticated users only" on public.todos;
drop policy if exists "Enable delete for authenticated users only" on public.todos;