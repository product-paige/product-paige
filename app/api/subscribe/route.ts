/**
 * The newsletter sign-up's endpoint: adds the email to the Product Prompt publication in beehiiv
 * (https://developers.beehiiv.com), which sends the welcome email.
 *
 * Set in the environment (Vercel project settings, or .env.local while developing; see .env.example):
 *   BEEHIIV_API_KEY         required, from beehiiv: Settings > API
 *   BEEHIIV_PUBLICATION_ID  the publication's ID (pub_…), on the same page
 *
 * Until both are set it answers 503 with { fallback: "email" }, and the form falls back to opening
 * the visitor's email app with a sign-up request, as before.
 */
export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // A hidden field people never see; bots fill it in. Pretend it worked and add no one.
  if (String(data.get("company") ?? "").trim()) return Response.json({ ok: true });

  const email = String(data.get("email") ?? "").trim().slice(0, 320);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 422 });
  }

  const key = process.env.BEEHIIV_API_KEY;
  const publication = process.env.BEEHIIV_PUBLICATION_ID;
  if (!key || !publication) {
    console.error("Newsletter: BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID isn't set, so no one was added.");
    return Response.json({ error: "Newsletter isn't set up yet", fallback: "email" }, { status: 503 });
  }

  const res = await fetch(`https://api.beehiiv.com/v2/publications/${encodeURIComponent(publication)}/subscriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: "productpaige.com",
      utm_medium: "website",
      referring_site: "https://www.productpaige.com",
    }),
  });

  if (!res.ok) {
    console.error("Newsletter: beehiiv refused the sign-up", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "Couldn't sign up" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
