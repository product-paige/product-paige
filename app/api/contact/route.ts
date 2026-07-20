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
};

function isNonEmptyString(v: unknown, max = 5000): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
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

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
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
