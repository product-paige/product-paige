"use client";

import { useState, type FormEvent } from "react";
import { BtnIcons } from "../components/BtnIcons";

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
    <div className="theme contents">

      {/* === HERO === hero + navbar together fill the viewport */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-84px)] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          {/* Left: eyebrow + h1 + leading + email shortcut */}
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Contact</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-ink max-w-[20ch]">
                  Send the part you can&rsquo;t see clearly yet.
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  A link, a screenshot, the half-finished idea — whatever&rsquo;s
                  on your mind. You&rsquo;ll hear back fast, without the
                  consulting theatre.
                </p>
              </div>
            </div>
            <p className="text-sm leading-[1.4] opacity-60">
              Most replies within 48 hours · Canada · Remote · Booking Q3 2026
            </p>
          </div>

          {/* Right: bg image behind, form card overlaid, 40px padding all around */}
          <aside
            className="relative min-w-0 p-16 flex divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <form
              onSubmit={handleSubmit}
              className="card card-sm card-cream is-static flex flex-col gap-4 !min-h-0 w-full flex-1 !p-10"
            >
              <h2 className="text-xl font-display leading-[1.1] text-ink">Send a note</h2>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm leading-[1.4] opacity-70">Your name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 text-base leading-[1.4] focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm leading-[1.4] opacity-70">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 text-base leading-[1.4] focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm leading-[1.4] opacity-70">What&rsquo;s on your mind</span>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 text-base leading-[1.4] resize-none focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
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
            </form>
          </aside>
        </div>
      </section>

    </div>
  );
}
