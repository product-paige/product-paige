import { use } from "react";
import { BtnIcons } from "../../components/BtnIcons";
import { ChapterNav } from "../../components/playbooks/ChapterNav";
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
    playbook.heroBg === "#DBE6EB" ||
    playbook.heroBg === "#f7c8d4";
  const heroFg = lightHero ? "#1a1a1a" : "#ffffff";

  // Scroll spy — track which chapter is currently in view.
  return (
    <div className="theme contents">

      {/* === SECTION: hero === */}
      <div data-section="post-hero-frame" className="mx-3 md:mx-6">
        <section
          id="hero"
          data-section="post-hero"
          className="p-8 md:p-10 m-6 section-chamfer relative overflow-hidden flex flex-col gap-6"
          style={{ backgroundColor: playbook.heroBg, color: heroFg }}
        >
          <h1 className="font-display leading-[1] tracking-tightest text-5xl md:text-6xl lg:text-7xl max-w-[18ch]">
            {playbook.title}
          </h1>
          <p className="text-base md:text-lg leading-[1.5] max-w-[640px] opacity-90">
            {playbook.kicker}
          </p>
          <p className="text-sm opacity-70">
            Paige Eaton · {playbook.readingTime} read
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
            <ChapterNav chapters={playbook.chapters} />
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
          className="bg-[#1a1a1a] text-white p-6 md:p-10 m-4 md:m-6 section-chamfer relative flex flex-col gap-10"
        >
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
                <h4 className="font-display text-5xl leading-[1.05]">
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
          className="bg-[#1a1a1a] text-white p-6 md:p-10 m-4 md:m-6 section-chamfer relative grain-vintage flex flex-col gap-10"
        >
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end">
              <div className="md:col-span-8 flex flex-col gap-6">
                <h2 className="font-display text-5xl leading-[1.05]">
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
                  <span className="btn-text bg-[#0E6BFF] text-white">
                    Subscribe
                  </span>
                  <span className="btn-tab bg-[#0E6BFF] text-white">
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
