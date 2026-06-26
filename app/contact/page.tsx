"use client";

import { useState, type FormEvent } from "react";
import { BtnIcons } from "../components/BtnIcons";

const channels = [
  {
    label: "Email",
    value: "hello@productpaige.com",
    href: "mailto:hello@productpaige.com",
    note: "Best for project inquiries, intros, and anything with a link attached.",
  },
  {
    label: "Ask Paige session",
    value: "$250 · one session",
    href: "/ask-paige",
    note: "60 minutes of focused product feedback. Async review + live call.",
  },
  {
    label: "Newsletter",
    value: "Subscribe",
    href: "/subscribe",
    note: "Prompts, templates, and short notes on product clarity and AI workflows.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Open a pre-filled mailto so the message lands in the user's email client.
  // A real backend can swap this for fetch('/api/contact', ...) without
  // changing the rendered markup.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      name ? `Hello from ${name}` : "Hello"
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "Friend"}${email ? ` (${email})` : ""}`
    );
    window.location.href = `mailto:hello@productpaige.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === HERO === matches homepage hero layout; right side is the form */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          {/* Left: eyebrow + h1 + leading + email shortcut */}
          <div className="flex flex-col gap-10 justify-end p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Contact</span>
              <div className="flex flex-col gap-3">
                <h1 className="type-display-h1 max-w-[20ch]">
                  Send the part you can&rsquo;t see clearly yet.
                </h1>
                <p className="type-leading opacity-80 max-w-[640px]">
                  A link, a screenshot, the half-finished idea — whatever&rsquo;s
                  on your mind. You&rsquo;ll hear back fast, without the
                  consulting theatre.
                </p>
              </div>
            </div>
            <p className="type-body-sm opacity-60">
              Most replies within 48 hours · Canada · Remote · Booking Q3 2026
            </p>
          </div>

          {/* Right: bg image + form card overlay */}
          <aside
            className="relative min-w-0 p-6 md:p-10 flex items-end justify-end divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <form
              onSubmit={handleSubmit}
              className="card card-cream flex flex-col gap-4 !min-h-0 w-full md:max-w-[420px]"
            >
              <h2 className="type-card-title">Send a note</h2>
              <label className="flex flex-col gap-1.5">
                <span className="type-body-sm opacity-70">Your name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 type-body focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="type-body-sm opacity-70">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 type-body focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="type-body-sm opacity-70">What&rsquo;s on your mind</span>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 type-body resize-none focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
                />
              </label>
              <button type="submit" className="inline-flex btn self-start mt-1">
                <span className="btn-text bg-[#0E6BFF] text-white">
                  Send it
                </span>
                <span className="btn-tab bg-[#0E6BFF] text-white">
                  <BtnIcons />
                </span>
              </button>
              <p className="type-body-sm opacity-60">
                Opens your email client with everything pre-filled. No tracking
                pixels, no auto-responder.
              </p>
            </form>
          </aside>
        </div>
      </section>

      {/* === CHANNELS === single section eyebrow */}
      <section data-section="channels" className="p-10 section-border-b">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Channels</span>
            <div className="flex flex-col gap-3">
              <h2 className="type-display-h2 max-w-[24ch]">
                Three ways to reach me
              </h2>
              <p className="type-leading opacity-80 max-w-[560px]">
                Pick the one that fits — they all land in the same inbox.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="card card-blue-light flex flex-col gap-4 aspect-[16/11] !min-h-0 group"
              >
                <div className="flex flex-col gap-2">
                  <span className="type-body-sm opacity-60">{c.label}</span>
                  <h3 className="type-card-title group-hover:opacity-70 transition-opacity">
                    {c.value}
                  </h3>
                </div>
                <p className="type-body-sm opacity-80 mt-auto">{c.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === FIT === single section eyebrow */}
      <section data-section="fit" className="p-10 section-border-b">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Fit check</span>
            <h2 className="type-display-h2 max-w-[20ch]">
              Saving us both a week.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <div className="flex flex-col gap-3">
              <h3 className="type-card-title">Good fit</h3>
              <p className="type-body opacity-80 max-w-[420px]">
                Founders, solo builders, small product teams, teams moving
                fast and needing clarity. Shopify and ecommerce work is the
                sweet spot.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="type-card-title">Probably not</h3>
              <p className="type-body opacity-80 max-w-[420px]">
                Enterprise procurement, long strategy engagements, pixel-perfect
                visual reviews, or &ldquo;tell us everything wrong with our
                business.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === CLOSING CTA === single section eyebrow */}
      <section
        data-section="closing-cta"
        className="bg-[#1A191E] text-white p-16 m-6 section-chamfer relative grain-vintage flex flex-col gap-10 items-start"
      >
        <div className="flex flex-col gap-6 max-w-[800px]">
          <span className="type-eyebrow">Get in touch</span>
          <div className="flex flex-col gap-3">
            <h2 className="type-display-h1 !text-white max-w-[14ch]">
              Bring the messy version.
            </h2>
            <p className="type-leading !text-white opacity-80 max-w-[560px]">
              The confusing onboarding, the homepage that almost works, the
              AI workflow held together with prompts and hope. That&rsquo;s
              usually where the interesting work starts.
            </p>
          </div>
        </div>
        <a
          href="mailto:hello@productpaige.com?subject=Hello"
          className="inline-flex btn"
        >
          <span className="btn-text bg-[#0E6BFF] text-white">
            Say hello
          </span>
          <span className="btn-tab bg-[#0E6BFF] text-white">
            <BtnIcons />
          </span>
        </a>
      </section>
    </div>
  );
}
