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
 *   CONTACT_TO      where enquiries go (defaults to the site's email)
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

  const rows: [string, string][] = [
    ["Name", f.name],
    ["Email", f.email],
    ["Website", f.website],
    ["Deadline", f.deadline],
    ["Interested in", f.interest],
  ];
  const filled = rows.filter(([, v]) => v);
  const text = [...filled.map(([k, v]) => `${k}: ${v}`), "", f.message].join("\n");
  const html = `<table cellpadding="4" style="font:14px/1.5 sans-serif">${filled.map(([k, v]) => `<tr><td style="color:#646461">${k}</td><td>${escape(v)}</td></tr>`).join("")}</table><p style="font:15px/1.6 sans-serif;white-space:pre-wrap">${escape(f.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Product Paige <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: f.email,
      subject: `New enquiry from ${f.name}${f.interest ? `: ${f.interest}` : ""}`,
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
