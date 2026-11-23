import { site } from "@/content";

/**
 * The contact form's endpoint: checks the fields, then emails them to you through Resend
 * (https://resend.com), with Reply-To set to the visitor so you can answer straight from your inbox.
 *
 * Set in the environment (Vercel project settings, or .env.local while developing; see .env.example):
 *   RESEND_API_KEY  required, from resend.com/api-keys
 *   CONTACT_FROM    the sender, on a domain verified in Resend, e.g. "Product Paige <hello@productpaige.com>".
 *                   Until a domain is verified, Resend's test sender works, but only delivers to the
 *                   email address on your Resend account.
 *   CONTACT_TO      where enquiries go (CONTACT_TO_EMAIL also works; defaults to the site's email)
 */

const limits = { name: 200, email: 320, website: 500, deadline: 100, interest: 100, message: 5000 } as const;
type Field = keyof typeof limits;

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // A hidden field people never see; bots fill it in. Pretend it worked and send nothing.
  if (String(data.get("company") ?? "").trim()) return Response.json({ ok: true });

  const get = (k: Field) => String(data.get(k) ?? "").trim().slice(0, limits[k]);
  const f = { name: get("name"), email: get("email"), website: get("website"), deadline: get("deadline"), interest: get("interest"), message: get("message") };
  if (!f.name || !f.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    return Response.json({ error: "Please fill in your name, a valid email and a message." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Contact form: RESEND_API_KEY isn't set, so the message wasn't sent.");
    return Response.json({ error: "Email isn't set up yet" }, { status: 503 });
  }

  // The email: the message first, then the details, then a note on replying. The subject leads with
  // what they're after, so the inbox reads "Ask Paige enquiry from Sam (samstore.com)".
  const host = f.website.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  const urgent = /urgent/i.test(f.deadline);
  // "A scoped project" → "Scoped project"
  const topic = f.interest && f.interest !== "Not sure yet" ? f.interest.replace(/^an? /i, "").replace(/^./, (c) => c.toUpperCase()) : "";
  const subject = `${urgent ? "Urgent: " : ""}${topic ? `${topic} enquiry` : "New enquiry"} from ${f.name}${host ? ` (${host})` : ""}`;

  const rows: [string, string, string?][] = [
    ["Name", f.name],
    ["Email", f.email, `mailto:${f.email}`],
    ["Website", host, f.website && (/^https?:\/\//.test(f.website) ? f.website : `https://${f.website}`)],
    ["Interested in", f.interest],
    ["Deadline", f.deadline],
  ];
  const filled = rows.filter(([, v]) => v);
  const footer = `Reply to this email to answer ${f.name} directly. Sent from the contact form on ${site.url.replace(/^https:\/\//, "")}.`;
  const text = [f.message, "", ...filled.map(([k, v]) => `${k}: ${v}`), "", footer].join("\n");

  const muted = "#646461", line = "#e5e4e0", accent = "#2450e0";
  const cell = (v: string, href?: string) => (href ? `<a href="${escape(href)}" style="color:${accent};text-decoration:none">${escape(v)}</a>` : escape(v));
  const html = `<div style="font:15px/1.6 -apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#1d1d1b;max-width:560px">
<p style="margin:0 0 6px;font:12px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.06em;text-transform:uppercase;color:${accent}">${urgent ? "Urgent enquiry" : "New enquiry"}</p>
<p style="margin:0 0 20px;white-space:pre-wrap;font-size:16px">${escape(f.message)}</p>
<table cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid ${line};font-size:14px">${filled
    .map(([k, v, href]) => `<tr><td style="padding:8px 16px 8px 0;border-bottom:1px solid ${line};color:${muted};width:110px;vertical-align:top">${k}</td><td style="padding:8px 0;border-bottom:1px solid ${line}">${cell(v, href)}</td></tr>`)
    .join("")}</table>
<p style="margin:20px 0 0;font-size:13px;color:${muted}">${escape(footer)}</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Product Paige <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: f.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend refused the message", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "Couldn't send" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
