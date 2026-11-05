"use client";

import { workingStyle } from "@/content";
import { useEffect, useState } from "react";
import { Asterisk } from "./EditorialHero";
import { Eyebrow, Reveal, sectionHeading } from "./ui";

type Shot = (typeof workingStyle.items)[number]["image"];

/** One principle's picture: a storefront screen in a browser window, or as a floating card. */
function Mockup({ image }: { image: Shot }) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" className="block w-full" />;
  if (image.frame === "browser") {
    return (
      <div className="w-[80%] overflow-hidden rounded-[10px] bg-white shadow-[0_24px_60px_rgb(26_26_26/0.28)]">
        {/* The window's top bar: three dots and the address */}
        <div className="flex items-center gap-3 border-b border-line bg-sheet px-3 py-2">
          <span className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="size-2.5 rounded-full" style={{ background: c }} />)}</span>
          <span className="mx-auto w-1/2 truncate rounded-full bg-white px-3 py-0.5 text-center text-[11px] text-muted">{image.url}</span>
          <span className="w-[42px]" />
        </div>
        {img}
      </div>
    );
  }
  if (image.frame === "claude") {
    return (
      <div className="relative h-full w-full">
        {/* The product card, to the left */}
        <div className="absolute top-1/2 left-[9%] w-[44%] -translate-y-1/2 overflow-hidden rounded-[14px] shadow-[0_24px_60px_rgb(26_26_26/0.28)]">{img}</div>
        <ClaudeWindow />
      </div>
    );
  }
  return <div className="w-[52%] overflow-hidden rounded-[14px] shadow-[0_24px_60px_rgb(26_26_26/0.28)]">{img}</div>;
}

/**
 * A small Claude chat window overlapping the card on the right: a request, Claude's reply and
 * the Shopify step it took, then the reply box. Drawn in HTML, sized in cqw of the picture.
 */
function ClaudeWindow() {
  return (
    <div className="absolute top-1/2 right-[6%] flex w-[52%] -translate-y-[38%] flex-col gap-[2.2cqw] rounded-[2.2cqw] border border-[#e6e2d6] bg-[#faf9f5] p-[2.6cqw] font-sans text-[#1d1d1b] shadow-[0_24px_60px_rgb(26_26_26/0.3)]">
      {/* Title bar */}
      <div className="flex items-center gap-[1.4cqw] border-b border-[#ebe7dc] pb-[2cqw]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/claude.svg" alt="" className="size-[3.2cqw]" />
        <span className="text-[2.5cqw] font-medium">Claude</span>
      </div>
      {/* The request */}
      <p className="ml-auto max-w-[85%] rounded-[1.6cqw] bg-[#f0eee6] px-[2.2cqw] py-[1.6cqw] text-[2.2cqw] leading-[1.35]">
        Add The Daily SPF 50 to the Sun collection and write its description
      </p>
      {/* The reply, with the Shopify step it took */}
      <div className="flex gap-[1.6cqw]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/claude.svg" alt="" className="mt-[0.3cqw] size-[2.8cqw] shrink-0" />
        <div className="flex flex-col gap-[1.4cqw]">
          <span className="flex w-max items-center gap-[1cqw] rounded-full border border-[#e6e2d6] bg-white px-[1.6cqw] py-[0.6cqw] font-mono text-[1.7cqw] uppercase tracking-[0.04em]">
            <i className="size-[1.2cqw] rounded-full bg-[#28c840]" />Shopify · product updated
          </span>
          <p className="text-[2.2cqw] leading-[1.4]">Done. It’s in Sun, with a 3-line description and an SEO title. Want me to draft the launch email next?</p>
        </div>
      </div>
      {/* The reply box */}
      <div className="rounded-[1.6cqw] border border-[#e6e2d6] bg-white px-[2.2cqw] py-[1.8cqw] text-[2.1cqw] text-[#9a968c]">Reply to Claude…</div>
    </div>
  );
}

/**
 * Working style: the clouds photo with a picture for each principle filling the left half, and the eyebrow,
 * heading, intro and principles on the right. The picture shows the active principle: they take
 * turns every few seconds, and hovering or focusing one shows its picture (and pauses the turns).
 */
export function WorkingStyle() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = workingStyle.items.length;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    // The picture fills the left half between the inner rails, split from the text by a
    // full-height divider. The section's top rule still runs the full width.
    <section id="working-style" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-2">
        <Reveal className="@container relative z-1 aspect-square overflow-hidden border-grid bg-sky md:border-x lg:aspect-auto lg:min-h-[36rem] lg:border-l lg:border-r">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={workingStyle.background} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
          {/* Every picture stacked; the active one fades in over the others */}
          {workingStyle.items.map((it, i) => (
            <div key={it.title} aria-hidden={i !== active} className={`absolute inset-0 grid place-items-center transition-[opacity,scale] duration-[1200ms] ease-in-out ${i === active ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`}>
              <Mockup image={it.image} />
            </div>
          ))}
        </Reveal>
        <div className="flex flex-col border-t border-grid px-4 py-12 sm:px-6 lg:border-t-0 lg:py-16 lg:pr-10 lg:pl-16">
          {/* At least 48px under the intro before the list, which sits at the foot of the column */}
          <Reveal className="lg:mb-12">
            <Eyebrow>{workingStyle.eyebrow}</Eyebrow>
            <h2 className={sectionHeading}>{workingStyle.heading}</h2>
            <p className="lede mt-5 max-w-xl">{workingStyle.body}</p>
          </Reveal>
          <ul className="mt-10 divide-y divide-line lg:mt-auto" onMouseLeave={() => setPaused(false)}>
            {workingStyle.items.map((it, i) => {
              const on = i === active;
              return (
                <Reveal as="li" key={it.title} delay={i * 80}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => { setActive(i); setPaused(true); }}
                    onFocus={() => { setActive(i); setPaused(true); }}
                    onBlur={() => setPaused(false)}
                    onClick={() => setActive(i)}
                    className="flex w-full cursor-pointer items-start gap-5 py-5 text-left"
                  >
                    {/* The active principle's square is the solid blue; the others a quiet grey */}
                    <span aria-hidden className={`grid size-14 shrink-0 place-items-center rounded-ui transition-colors duration-700 ease-in-out ${on ? "bg-accent text-white" : "bg-ink/[0.06] text-ink/40"}`}>
                      <Asterisk className="size-6" weight={2} />
                    </span>
                    <span>
                      <span className="serif block text-[24px] leading-[1.15] tracking-[-0.02em]">{it.title}</span>
                      <span className="mt-1 block max-w-md text-[15px] leading-[1.5] text-muted">{it.body}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
