"use client";

import { workingStyle } from "@/content";
import { useEffect, useState } from "react";
import { Asterisk } from "./EditorialHero";
import { Container, Eyebrow, Reveal, section, sectionHeading } from "./ui";

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
  return <div className="w-[52%] overflow-hidden rounded-[14px] shadow-[0_24px_60px_rgb(26_26_26/0.28)]">{img}</div>;
}

/**
 * Working style: the clouds photo with a picture for each principle on the left, and the eyebrow,
 * heading, intro and principles on the right. The picture shows the active principle: they take
 * turns every few seconds, and hovering or focusing one shows its picture (and pauses the turns).
 */
export function WorkingStyle() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = workingStyle.items.length;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), 4000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <section id="working-style" className={section}>
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-square overflow-hidden bg-sky">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={workingStyle.background} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
          {/* Every picture stacked; the active one fades in over the others */}
          {workingStyle.items.map((it, i) => (
            <div key={it.title} aria-hidden={i !== active} className={`absolute inset-0 grid place-items-center transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${i === active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
              <Mockup image={it.image} />
            </div>
          ))}
        </Reveal>
        <div className="flex flex-col">
          <Reveal>
            <Eyebrow>{workingStyle.eyebrow}</Eyebrow>
            <h2 className={sectionHeading}>{workingStyle.heading}</h2>
            <p className="lede mt-5 max-w-xl">{workingStyle.body}</p>
          </Reveal>
          <ul className="mt-10 divide-y divide-line border-y border-line lg:mt-auto" onMouseLeave={() => setPaused(false)}>
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
                    {/* The active principle's square is the solid blue; the others are a soft tint */}
                    <span aria-hidden className={`grid size-14 shrink-0 place-items-center rounded-ui transition-colors duration-300 ${on ? "bg-accent text-white" : "bg-accent/10 text-accent"}`}>
                      <Asterisk className="size-8" weight={2} />
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
      </Container>
    </section>
  );
}
