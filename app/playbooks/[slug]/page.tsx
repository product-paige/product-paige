"use client";

import {
  useEffect,
  useRef,
  useState,
  use,
  type ReactNode,
} from "react";
import { notFound } from "next/navigation";
import { SectionDivider } from "../../components/SectionDivider";
import { playbooks, playbookList } from "../data";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = setTimeout(() => setShown(true), delay);
            obs.disconnect();
            return () => clearTimeout(t);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
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

  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === SECTION: hero === */}
      <div data-section="post-hero-frame" className="mx-3 md:mx-6">
        <section
          id="hero"
          data-section="post-hero"
          className="p-12 md:p-16 m-6 section-chamfer relative overflow-hidden flex flex-col gap-10"
          style={{ backgroundColor: playbook.heroBg, color: heroFg }}
        >
          <h1 className="font-display leading-[0.9] tracking-tightest text-5xl md:text-7xl lg:text-8xl max-w-[14ch]">
            {playbook.title}
          </h1>
          <p className="font-display text-2xl md:text-3xl leading-[1.2] max-w-[640px] opacity-90">
            {playbook.kicker}
          </p>
          <p className="text-sm opacity-70">
            Paige Harris · {playbook.readingTime} read
          </p>
        </section>
      </div>

      <SectionDivider />

      {/* === SECTION: lede === */}
      <section
        id="lede"
        data-section="post-lede"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-6 max-w-[820px]"
      >
        <Reveal>
          <p className="drop-cap font-display text-2xl md:text-3xl leading-[1.3]">
            You don&rsquo;t need a heavier operating system. You need a
            lighter one that survives contact with the week.
          </p>
        </Reveal>
      </section>

      <SectionDivider />

      {/* === SECTION: chapters + sticky TOC === */}
      <section
        id="contents"
        data-section="post-chapters"
        className="p-12 mx-3 md:mx-6"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          {/* Left rail — sticky table of contents */}
          <aside className="md:col-span-3 md:sticky md:top-24 self-start flex flex-col gap-4">
            <ol className="border-t border-[#1a1a1a]/25">
              {playbook.chapters.map((c, i) => (
                <li
                  key={c}
                  className="border-b border-[#1a1a1a]/25"
                >
                  <a
                    href={`#ch-${i + 1}`}
                    className="py-3 flex items-baseline gap-3 hover:opacity-60 transition-opacity"
                  >
                    <span className="font-display text-base opacity-50 w-8 shrink-0">
                      .{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base leading-[1.3]">
                      {c}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Right column — chapter content streams */}
          <div className="md:col-span-9 flex flex-col gap-16">
            {playbook.chapters.map((c, i) => (
              <article
                key={c}
                id={`ch-${i + 1}`}
                data-chapter={i + 1}
                className={
                  i > 0
                    ? "pt-16 border-t border-[#1a1a1a]/25 flex flex-col gap-6"
                    : "flex flex-col gap-6"
                }
              >
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tightest">
                  {c}
                </h2>
                <Reveal>
                  <div className="flex flex-col gap-6 max-w-[680px]">
                    {(chapterBodies[c] || ["Body copy goes here."]).map((p, idx) => (
                      <p key={idx} className="text-lg leading-[1.65]">
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* === SECTION: key-takeaways === */}
      <div data-section="post-takeaways-frame" className="mx-3 md:mx-6">
        <section
          data-section="post-takeaways"
          className="bg-[#1a1a1a] text-white p-12 m-6 section-chamfer relative flex flex-col gap-12"
        >
          <span className="eyebrow opacity-80">Key takeaways</span>
          <Reveal>
            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {takeaways.map((t, i) => (
                <li
                  key={t}
                  className="flex items-baseline gap-4 border-b border-white/20 pb-4"
                >
                  <span className="font-display text-xl opacity-50 w-10 shrink-0">
                    .{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg leading-[1.4]">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>

      <SectionDivider />

      {/* === SECTION: related === */}
      <section
        id="related"
        data-section="post-related"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-12"
      >
        <span className="eyebrow">Keep reading</span>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 100} className="h-full">
              <a
                href={`/playbooks/${r.slug}`}
                className={`card ${r.homeTone} flex flex-col gap-4 h-[420px] !min-h-0`}
              >
                <header className="flex items-start justify-between">
                  <span className="text-sm opacity-80">No. {r.no}</span>
                  <span className="stamp opacity-90 border-current">
                    {r.status === "live" ? "Read now" : "Coming soon"}
                  </span>
                </header>
                <h4 className="font-display text-3xl leading-[1.05]">
                  {r.title}
                </h4>
                <p className="font-display text-lg leading-[1.3] opacity-90">
                  {r.kicker}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* === SECTION: newsletter (matches homepage exactly) === */}
      <div data-section="newsletter-frame" className="mx-3 md:mx-6">
        <section
          id="newsletter"
          data-section="newsletter"
          className="bg-[#1a1a1a] text-white p-12 m-6 section-chamfer relative grain-vintage flex flex-col gap-12"
        >
          <span className="eyebrow">Newsletter</span>
          <Reveal>
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
          </Reveal>
        </section>
      </div>
    </div>
  );
}
