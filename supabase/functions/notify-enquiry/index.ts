// notify-enquiry: emails Guru each new enquiry from the portfolio's "Start a project" form.
//
// Called by the enquiries_notify_after_insert trigger with { "id": "<enquiry uuid>" } and nothing else. The function
// loads that row itself with the service role and claims it by setting notified_at, so a direct call can't forge an
// email's contents, and each enquiry is emailed at most once. If the email can't be sent, the claim is released so a
// later call can retry.
//
// Secrets (Supabase dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY  required  API key from resend.com
//   NOTIFY_EMAIL    optional  where alerts go (defaults to the portfolio's contact address)
//   NOTIFY_FROM     optional  sender; defaults to Resend's shared test sender, which can only email the Resend
//                             account's own address until a domain is verified in Resend
import { createClient } from "npm:@supabase/supabase-js@2";

const TO = Deno.env.get("NOTIFY_EMAIL") ?? "gurumurugan291@gmail.com";
const FROM = Deno.env.get("NOTIFY_FROM") ?? "Portfolio enquiries <onboarding@resend.dev>";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Enquiry = {
  id: string;
  created_at: string;
  service: string;
  budget: string;
  currency: string;
  timeline: string;
  client_type: string;
  name: string;
  email: string;
  phone: string;
  website: string | null;
  project: string;
  fit: string | null;
};

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

function compose(e: Enquiry) {
  const grade = e.fit ?? "–";
  const subject = `[${grade}] New enquiry · ${e.service} · ${e.budget} · ${e.name}`;
  const rows: [string, string][] = [
    ["Service", e.service],
    ["Budget", e.budget],
    ["Start", e.timeline],
    ["For", e.client_type],
    ...(e.website ? [["Company / site", e.website] as [string, string]] : []),
    ["Email", e.email],
    ["Phone", e.phone],
    ["Lead grade", `${grade}  (A = bigger budget, real business, starting soon)`],
    ["Received", new Date(e.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST"],
  ];
  const text = `New enquiry from ${e.name}\n\n${e.project}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nReply to this email to answer ${e.name} directly.`;
  const html = `<!doctype html><html><body style="margin:0;background:#F3F0EC;font-family:Arial,Helvetica,sans-serif;color:#1A1818">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F0EC;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#1A1818;color:#E8E4E0;padding:22px 28px;font-size:13px;letter-spacing:2px;text-transform:uppercase">New project enquiry · grade ${esc(grade)}</td></tr>
<tr><td style="padding:28px">
<p style="margin:0 0 6px;font-size:24px;font-weight:bold">${esc(e.name)}</p>
<p style="margin:0 0 22px;font-size:15px;color:#6B4F4F">${esc(e.service)} · ${esc(e.budget)} · ${esc(e.timeline)}</p>
<p style="margin:0 0 24px;padding:16px 18px;background:#F3F0EC;border-radius:10px;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(e.project)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
${rows.map(([k, v]) => `<tr><td style="padding:6px 0;color:#8A7F7A;width:130px;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`).join("")}
</table>
<p style="margin:26px 0 0"><a href="mailto:${esc(e.email)}?subject=${encodeURIComponent("Re: your " + e.service + " enquiry")}" style="display:inline-block;background:#1A1818;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:bold">Reply to ${esc(e.name)}</a></p>
</td></tr></table>
<p style="font-size:12px;color:#8A7F7A;margin:16px 0 0">From the contact form on guru1315-portfolio.vercel.app · saved in Supabase → enquiries</p>
</td></tr></table></body></html>`;
  return { subject, text, html };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json(405, { error: "POST only" });
  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return json(400, { error: "Body must be JSON" });
  }
  if (typeof id !== "string" || !UUID.test(id)) return json(400, { error: "Missing or invalid id" });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

  // claim the enquiry: only a row that hasn't been notified yet gets an email
  const { data: row, error } = await db
    .from("enquiries")
    .update({ notified_at: new Date().toISOString() })
    .eq("id", id)
    .is("notified_at", null)
    .select("id, created_at, service, budget, currency, timeline, client_type, name, email, phone, website, project, fit")
    .maybeSingle<Enquiry>();
  if (error) return json(500, { error: "Database error" });
  if (!row) return json(200, { skipped: "Unknown enquiry or already notified" });

  const release = () => db.from("enquiries").update({ notified_at: null }).eq("id", row.id);
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) {
    await release();
    return json(500, { error: "RESEND_API_KEY is not set" });
  }

  const { subject, text, html } = compose(row);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: row.email, subject, text, html }),
  });
  if (!res.ok) {
    await release();
    return json(502, { error: "Email provider error", status: res.status, detail: (await res.text()).slice(0, 300) });
  }
  return json(200, { sent: true });
});
