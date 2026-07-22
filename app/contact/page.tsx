"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { BtnIcons } from "../components/BtnIcons";

const TOPICS = [
  { value: "general", label: "General inquiry" },
  { value: "ask-paige", label: "Ask Paige session ($250)" },
  { value: "project", label: "Project inquiry" },
  { value: "hi", label: "Just saying hi" },
] as const;
type TopicValue = (typeof TOPICS)[number]["value"];

function ContactForm() {
  const searchParams = useSearchParams();
  const initialTopic = TOPICS.some((t) => t.value === searchParams.get("topic"))
    ? (searchParams.get("topic") as TopicValue)
    : "general";

  const [topic, setTopic] = useState<TopicValue>(initialTopic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  // If the ?topic= URL param changes after mount (client-side nav), sync it.
  useEffect(() => {
    const t = searchParams.get("topic");
    if (t && TOPICS.some((x) => x.value === t)) setTopic(t as TopicValue);
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card card-sm card-cream is-static flex flex-col gap-4 !min-h-0 w-full flex-1 !p-6 md:!p-10 [--chamfer:36px]"
    >
      <h2 className="text-xl font-display leading-[1.1] text-ink">
        Send a note
      </h2>

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
        <span className="text-sm leading-[1.4] opacity-70">Topic</span>
        <select
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as TopicValue)}
          className="appearance-none bg-white border border-[#1A191E]/40 px-3 py-2.5 pr-10 text-base font-medium leading-[1.4] tracking-[-0.01em] text-ink cursor-pointer bg-no-repeat bg-[position:right_12px_center] bg-[length:14px_9px] focus:outline-none focus:border-[#1A191E] transition-colors"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 9' fill='none' stroke='%231A191E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M1 1.5L7 7L13 1.5'/></svg>\")",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.06)",
          }}
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm leading-[1.4] opacity-70">
          What&rsquo;s on your mind
        </span>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 text-base leading-[1.4] resize-none focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex btn self-start mt-1 disabled:opacity-60"
      >
        <span className="btn-text bg-[#E63946] text-white">
          {status === "sending"
            ? "Sending…"
            : status === "sent"
              ? "Sent — thanks."
              : "Send it"}
        </span>
        <span className="btn-tab bg-[#E63946] text-white">
          <BtnIcons />
        </span>
      </button>

      {status === "error" ? (
        <p className="text-sm leading-[1.4] text-[#a11] mt-1" role="alert">
          {errorMsg}
        </p>
      ) : null}
      {status === "sent" ? (
        <p className="text-sm leading-[1.4] opacity-70 mt-1">
          You&rsquo;ll hear back within 48 hours.
        </p>
      ) : null}
    </form>
  );
}

export default function ContactPage() {

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
                <h1 className="text-display font-display text-ink max-w-[20ch]">
                  Send the part you can&rsquo;t see clearly yet
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  A link, a screenshot, the half-finished idea — whatever&rsquo;s
                  on your mind. You&rsquo;ll hear back fast, without the
                  consulting theatre.
                </p>
              </div>
            </div>
            <p className="text-sm leading-[1.4] opacity-60">
              Most replies within 48 hours
            </p>
          </div>

          {/* Right: bg image behind, form card overlaid, 40px padding all around */}
          <aside
            className="relative min-w-0 p-6 md:p-16 flex divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </aside>
        </div>
      </section>

    </div>
  );
}
