-- Project enquiries sent from the portfolio's "Start a project" form.
-- Applied to the guru-portfolio Supabase project (ref gxmxuztfliirqaoeooyi, ap-south-1). Kept here as the record of the schema.
create table public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  service     text not null check (service in ('Website or web app', 'iOS or mobile app', 'UI/UX design', 'Brand or graphic design')),
  budget      text not null check (char_length(budget) between 1 and 60),
  currency    text not null check (currency in ('USD', 'GBP', 'INR')),
  timeline    text not null check (char_length(timeline) between 1 and 60),
  client_type text not null check (char_length(client_type) between 1 and 60),
  name        text not null check (char_length(name) between 1 and 80),
  email       text not null check (char_length(email) <= 120 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone       text not null check (char_length(phone) between 7 and 20),
  website     text check (website is null or char_length(website) <= 200),
  project     text not null check (char_length(project) between 10 and 1500),
  fit         text check (fit is null or fit in ('A', 'B', 'C')),
  status      text not null default 'new' check (status in ('new', 'replied', 'won', 'archived'))
);

comment on table public.enquiries is 'Project enquiries from the portfolio contact form. Visitors may only insert; read them in the dashboard.';

create index enquiries_created_at_idx on public.enquiries (created_at desc);

-- Row Level Security: the public (anon) key can add an enquiry and nothing else.
alter table public.enquiries enable row level security;

create policy "Visitors can send an enquiry"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (status = 'new');

-- No select / update / delete policies: nobody can read or change enquiries with the public key.
revoke select, update, delete on public.enquiries from anon, authenticated;
