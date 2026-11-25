"use client";

import { contact, site } from "@/content";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContactForm } from "./ContactForm";
import { Asterisk } from "./EditorialHero";

/**
 * The contact form in a paper drawer that slides in from the right over a dimmed page.
 * Any link to #contact opens it (every "Let’s talk" button), and so does arriving on
 * /#contact. A link with data-interest (an offer's button) opens it with that offer picked.
 * Closes on the cross, a click on the dimmed page or Escape, and hands focus back.
 */
export function ContactDrawer() {
  const [open, setOpen] = useState(false);
  // The offer a button asked for (its data-interest), to start the form on; changing it starts a fresh form
  const [preset, setPreset] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (location.hash === "#contact") history.replaceState(null, "", location.pathname + location.search);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    // Open from any #contact link, wherever it points (/#contact or #contact).
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]");
      if (!a) return;
      const url = new URL((a as HTMLAnchorElement).href, location.href);
      if (url.hash !== "#contact") return;
      e.preventDefault();
      opener.current = a as HTMLElement;
      const wanted = (a as HTMLElement).dataset.interest;
      if (wanted) setPreset(wanted);
      setOpen(true);
    };
    if (location.hash === "#contact") setOpen(true);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    // Keep the page from scrolling behind the drawer.
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      {/* The dimmed page */}
      <div onClick={close} className={`absolute inset-0 bg-dark/60 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-heading"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[760px] flex-col overflow-y-auto border-l border-grid bg-paper shadow-[-20px_0_60px_rgb(0_0_0/0.2)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="px-6 pt-6 pb-10 sm:px-10 sm:pt-8 lg:px-14">
          <div className="flex items-center justify-between gap-4">
            <p className="mono flex items-center gap-3">
              <Asterisk className="live-star size-4 text-accent" />
              Say hello
            </p>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="-my-4 -mr-2 grid size-12 cursor-pointer place-items-center transition-colors hover:text-accent">
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" className="size-8">
                <path d="M5 5l14 14M19 5L5 19" vectorEffect="non-scaling-stroke" />
              </svg>
            </button>
          </div>
          <h2 id="contact-heading" className="serif mt-6 text-[clamp(31px,3.7vw,44px)] leading-[1.05] tracking-[-0.04em] text-balance">{contact.heading}</h2>
          <p className="mt-4 max-w-md">{contact.body}</p>
          <div className="mt-6">
            <ContactForm key={preset} endpoint={site.formEndpoint} email={site.email} presetInterest={preset} />
          </div>
        </div>
      </aside>
    </div>
  );
}
