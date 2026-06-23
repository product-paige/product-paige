"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { playbooks, playbookList } from "../data";

/** Small filled square — used as a marker glyph in TOC + key takeaways. */
function SquareMarker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block w-2 h-2 bg-current shrink-0 ${className}`}
    />
  );
}

function ArrowUpRight({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
  );
}

function ArrowRight({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  );
}

function BtnIcons() {
  return (
    <>
      <ArrowUpRight className="icon-default" />
      <ArrowRight className="icon-hover" />
    </>
  );
}

export default function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const playbook = playbooks[slug];
  if (!playbook) notFound();
  const chapterBodies = playbook.chapterBodies;
  const takeaways = playbook.takeaways;
  // Related: pull two playbooks that aren't this one
  const related = playbookList
    .filter((p) => p.slug !== slug)
    .slice(0, 2);
  // Hero text contrast — dark hero bgs (ink) get white text, light hero bgs get ink text
  const lightHero =
    playbook.heroBg === "#f3eb88" ||
    playbook.heroBg === "#a8d4ee" ||
    playbook.heroBg === "#cdb8e3" ||
    playbook.heroBg === "#f7c8d4";
  const heroFg = lightHero ? "#1a1a1a" : "#ffffff";

  // Scroll spy — track which chapter is currently in view.
  const [activeChapter, setActiveChapter] = useState(0);
  useEffect(() => {
    const sections = playbook.chapters
      .map((_, i) => document.getElementById(`ch-${i + 1}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the section whose top is closest to (but at or above) the viewport top band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (visible[0]) {
          const idx = sections.indexOf(visible[0].target as HTMLElement);
          if (idx !== -1) setActiveChapter(idx);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [playbook.chapters]);

  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === SECTION: hero === */}
      <div data-section="post-hero-frame" className="mx-3 md:mx-6">
        <section
          id="hero"
          data-section="post-hero"
          className="p-8 md:p-10 m-6 section-chamfer relative overflow-hidden flex flex-col gap-6"
          style={{ backgroundColor: playbook.heroBg, color: heroFg }}
        >
          <h1 className="font-display leading-[1] tracking-tightest text-4xl md:text-5xl lg:text-6xl max-w-[18ch]">
            {playbook.title}
          </h1>
          <p className="text-base md:text-lg leading-[1.5] max-w-[640px] opacity-90">
            {playbook.kicker}
          </p>
          <p className="text-sm opacity-70">
            Paige Harris · {playbook.readingTime} read
          </p>
        </section>
      </div>

      {/* === SECTION: chapters + sticky TOC === */}
      <section
        id="contents"
        data-section="post-chapters"
        className="p-8 mx-3 md:mx-6"
      >
        <div className="grid md:grid-cols-12 gap-12 md:gap-24">
          {/* Left rail — sticky table of contents */}
          <aside className="md:col-span-3 md:sticky md:top-24 self-start flex flex-col gap-4">
            <ol className="border-t border-[#1a1a1a]/25">
              {playbook.chapters.map((c, i) => {
                const isActive = activeChapter === i;
                return (
                  <li key={c} className="border-b border-[#1a1a1a]/25">
                    <a
                      href={`#ch-${i + 1}`}
                      className={`py-3 flex items-center gap-3 transition-all duration-500 ease-out will-change-transform ${
                        isActive
                          ? "opacity-100 translate-x-2"
                          : "opacity-60 hover:opacity-90"
                      }`}
                    >
                      <SquareMarker />
                      <span className="text-base leading-[1.15]">{c}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* Right column — chapter content streams */}
          <div className="md:col-span-9 flex flex-col gap-16">
            {playbook.chapters.map((c, i) => (
              <article
                key={c}
                id={`ch-${i + 1}`}
                data-chapter={i + 1}
                className="flex flex-col gap-6"
              >
                <h2 className="font-display text-2xl md:text-3xl leading-[1.15] tracking-tightest">
                  {c}
                </h2>
                <div className="flex flex-col gap-6 max-w-[680px]">
                  {(chapterBodies[c] || ["Body copy goes here."]).map((p, idx) => (
                    <p key={idx} className="text-base leading-[1.7] font-normal">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION: key-takeaways === */}
      <div data-section="post-takeaways-frame" className="mx-3 md:mx-6">
        <section
          data-section="post-takeaways"
          className="bg-[#1a1a1a] text-white p-10 m-6 section-chamfer relative flex flex-col gap-10"
        >
          <span className="eyebrow opacity-80">Key takeaways</span>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {takeaways.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 border-b border-white/20 pb-4"
              >
                <SquareMarker className="mt-[10px]" />
                <span className="text-base leading-[1.5]">{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* === SECTION: related === */}
      <section
        id="related"
        data-section="post-related"
        className="p-8 mx-3 md:mx-6 flex flex-col gap-10"
      >
        <span className="eyebrow">Keep reading</span>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {related.map((r) => (
            <a
              key={r.slug}
              href={`/playbooks/${r.slug}`}
              className={`card ${r.homeTone} flex flex-col aspect-[6/4] !min-h-0`}
            >
              <header className="flex items-start justify-between">
                <span className="text-sm opacity-80">{r.date}</span>
                <span className="stamp opacity-90 border-current">
                  {r.status === "live" ? "Read now" : "Coming soon"}
                </span>
              </header>
              <div className="mt-auto flex flex-col gap-4">
                <h4 className="font-display text-3xl leading-[1.05]">
                  {r.title}
                </h4>
                <p className="text-base leading-[1.55] opacity-80">
                  {r.body}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {r.chips.map((c) => (
                    <li key={c} className="pill pill-cased">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* === SECTION: newsletter (matches homepage exactly) === */}
      <div data-section="newsletter-frame" className="mx-3 md:mx-6">
        <section
          id="newsletter"
          data-section="newsletter"
          className="bg-[#1a1a1a] text-white p-10 m-6 section-chamfer relative grain-vintage flex flex-col gap-10"
        >
          <span className="eyebrow">Newsletter</span>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end">
              <div className="md:col-span-8 flex flex-col gap-6">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  Prompt with Paige, a newsletter
                </h2>
                <p className="text-lg leading-[1.5] max-w-[600px] opacity-90">
                  Prompts, templates, and short notes on product clarity, AI
                  workflows, and what actually moves work forward.
                </p>
              </div>
              <form
                className="md:col-span-4 flex flex-col gap-3 items-stretch"
                action="https://buttondown.com/api/emails/embed-subscribe/productpaige"
                method="post"
                target="_blank"
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="bg-white/15 text-white placeholder:text-white/60 px-4 py-3 focus:outline-none focus:bg-white/25 border border-white/30"
                />
                <button type="submit" className="btn self-start">
                  <span className="btn-text bg-[#e8252d] text-white">
                    Subscribe
                  </span>
                  <span className="btn-tab bg-[#e8252d] text-white">
                    <BtnIcons />
                  </span>
                </button>
                <p className="text-xs opacity-70">
                  One email. No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>
        </section>
      </div>
    </div>
  );
}
