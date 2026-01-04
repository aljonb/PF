-- Create todos table
create table public.todos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  is_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.todos enable row level security;

-- Create policies (adjust these based on your auth requirements)
create policy "Enable read access for all users" on public.todos
  for select using (true);

create policy "Enable insert for authenticated users only" on public.todos
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.todos
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.todos
  for delete using (auth.role() = 'authenticated');