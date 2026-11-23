"use client";

import { closing, site } from "@/content";
import { useCallback, useEffect, useRef, useState } from "react";
import { NewsletterForm } from "./NewsletterForm";

/**
 * The newsletter sign-up as a small paper card that pops up in the bottom-right corner. Any
 * link to #subscribe opens it (the footer's Subscribe link). Closes on the cross or Escape and
 * hands focus back; the page stays usable behind it.
 */
export function SubscribePopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]");
      if (!a || new URL((a as HTMLAnchorElement).href, location.href).hash !== "#subscribe") return;
      e.preventDefault();
      opener.current = a as HTMLElement;
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    // The wrapper holds the corner position; the card inside has the folded corner (which sets
    // its own position, so it can't be the fixed element).
    <aside
      role="dialog"
      aria-labelledby="subscribe-heading"
      aria-hidden={!open}
      inert={!open}
      className={`fixed right-4 bottom-4 z-40 w-[calc(100%-32px)] max-w-[380px] shadow-[0_18px_50px_rgb(0_0_0/0.22)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-6 sm:bottom-6 ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <div className="folded border border-grid bg-paper p-6 pb-8">
      <div className="flex items-start justify-between gap-4">
        <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{closing.newsletter.label}</p>
        <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="-mt-3 -mr-3 grid size-10 cursor-pointer place-items-center transition-colors hover:text-accent">
          <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" className="size-6">
            <path d="M5 5l14 14M19 5L5 19" vectorEffect="non-scaling-stroke" />
          </svg>
        </button>
      </div>
      <h2 id="subscribe-heading" className="serif mt-6 text-[26px] leading-[1.1] tracking-[-0.03em]">{closing.newsletter.heading}</h2>
      <p className="mt-2 mb-5 text-[15px]">{closing.newsletter.body}</p>
      <NewsletterForm endpoint={site.newsletterEndpoint} email={site.email} label={closing.newsletter.label} success={closing.newsletter.success} />
      </div>
    </aside>
  );
}
