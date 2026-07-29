import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact
 *
 * Handles contact-form submissions and forwards them to Paige's inbox
 * via Resend. Requires two env vars:
 *
 *   RESEND_API_KEY   — from resend.com dashboard
 *   CONTACT_TO_EMAIL — where messages should land (e.g. hello@productpaige.com)
 *
 * Optional:
 *   CONTACT_FROM_EMAIL — verified sender in Resend. Falls back to
 *                        onboarding@resend.dev (Resend's shared sandbox
 *                        sender) if unset, so the route works before
 *                        the domain is verified.
 */

const TOPIC_LABELS: Record<string, string> = {
  "general": "General inquiry",
  "ask-paige": "Ask Paige session",
  "project": "Project inquiry",
  "hi": "Just saying hi",
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  /** Honeypot — must be empty. Bots fill every field. */
  company_website?: unknown;
  /** ms epoch of when the form was rendered. Rejected if submitted
   *  faster than a human could plausibly fill it in. */
  renderedAt?: unknown;
};

function isNonEmptyString(v: unknown, max = 5000): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

/**
 * Per-IP rate limit — in-memory Map, module-scoped. Warm invocations
 * on the same Vercel function instance share it, which is enough to
 * blunt burst spam. For durable cross-instance limiting, swap for
 * Vercel Runtime Cache or Upstash Redis.
 */
const HOUR_MS = 60 * 60 * 1000;
const MAX_PER_IP_PER_HOUR = 3;
const MAX_GLOBAL_PER_HOUR = 30;
const rateBuckets = new Map<string, number[]>();

function checkRate(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const cutoff = now - HOUR_MS;

  // Prune anything older than an hour, across every bucket, so the map
  // doesn't grow unbounded from one-shot IPs.
  for (const [key, stamps] of rateBuckets) {
    const kept = stamps.filter((t) => t > cutoff);
    if (kept.length === 0) rateBuckets.delete(key);
    else if (kept.length !== stamps.length) rateBuckets.set(key, kept);
  }

  const globalCount = Array.from(rateBuckets.values()).reduce(
    (n, arr) => n + arr.length,
    0,
  );
  if (globalCount >= MAX_GLOBAL_PER_HOUR) {
    return { ok: false, retryAfter: HOUR_MS / 1000 };
  }

  const stamps = rateBuckets.get(ip) ?? [];
  if (stamps.length >= MAX_PER_IP_PER_HOUR) {
    const oldest = stamps[0];
    return { ok: false, retryAfter: Math.ceil((oldest + HOUR_MS - now) / 1000) };
  }

  rateBuckets.set(ip, [...stamps, now]);
  return { ok: true };
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 },
    );
  }

  // Rate limit first — cheap check, prevents payload parsing on abuse.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rate = checkRate(ip);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      {
        status: 429,
        headers: rate.retryAfter
          ? { "Retry-After": String(rate.retryAfter) }
          : undefined,
      },
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot — bots fill every field. Real users leave it empty because
  // the input is off-screen and marked aria-hidden. Silent 200 so the
  // bot thinks it succeeded and doesn't retry with a different shape.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Time-to-fill — reject anything submitted <2s after render. Humans
  // can't fill a four-field form that fast; bots almost always do.
  const renderedAt =
    typeof body.renderedAt === "number" ? body.renderedAt : NaN;
  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < 2000) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, topic, message } = body;

  if (!isNonEmptyString(name, 200)) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!isNonEmptyString(email, 200) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!isNonEmptyString(message)) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const topicKey =
    typeof topic === "string" && topic in TOPIC_LABELS ? topic : "general";
  const topicLabel = TOPIC_LABELS[topicKey];

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Product Paige <onboarding@resend.dev>";

  const subject = `[${topicLabel}] ${name}`;
  const textBody = [
    `Topic: ${topicLabel}`,
    `From: ${name} <${email}>`,
    "",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject,
      text: textBody,
    });
    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Send failed." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Send failed.";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
