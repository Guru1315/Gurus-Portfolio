-- Email alert for each new enquiry: an insert trigger pings the notify-enquiry Edge Function with the row id only.
-- The function loads the row with the service role, claims it by setting notified_at, and sends the email, so a
-- direct call can't forge an email's contents or send one twice.
alter table public.enquiries add column notified_at timestamptz;

create extension if not exists pg_net with schema extensions;

create or replace function public.notify_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform net.http_post(
    url     := 'https://gxmxuztfliirqaoeooyi.supabase.co/functions/v1/notify-enquiry',
    body    := jsonb_build_object('id', new.id),
    headers := jsonb_build_object('Content-Type', 'application/json'),
    timeout_milliseconds := 5000
  );
  return new;
end;
$$;

revoke execute on function public.notify_new_enquiry() from public, anon, authenticated;

create trigger enquiries_notify_after_insert
  after insert on public.enquiries
  for each row execute function public.notify_new_enquiry();
