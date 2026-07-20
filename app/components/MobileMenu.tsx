"use client";

import { useEffect, useState } from "react";

const LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#work", label: "Projects" },
  { href: "/blog", label: "Notes" },
  { href: "/#about", label: "About" },
  { href: "/ask-paige", label: "Ask Paige" },
  { href: "/contact", label: "Contact" },
];

/**
 * Mobile hamburger menu. Full-screen overlay on <768px. On md+ the button
 * is hidden entirely and the desktop nav in SiteHeader takes over.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the overlay is open so the page underneath
  // doesn't scroll behind it on iOS.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape so keyboard users have an out.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex items-center justify-center w-11 h-11 divider-indent-left cursor-pointer"
      >
        <span aria-hidden="true" className="relative w-5 h-4 block">
          <span
            className="absolute left-0 right-0 h-[2px] bg-ink transition-transform duration-200"
            style={{
              top: open ? "7px" : "0",
              transform: open ? "rotate(45deg)" : "none",
            }}
          />
          <span
            className="absolute left-0 right-0 h-[2px] bg-ink top-[7px] transition-opacity duration-150"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="absolute left-0 right-0 h-[2px] bg-ink transition-transform duration-200"
            style={{
              top: open ? "7px" : "14px",
              transform: open ? "rotate(-45deg)" : "none",
            }}
          />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[100] bg-[#fbfaf6] md:hidden flex flex-col p-6"
        >
          <div className="flex items-center justify-between h-[60px] -mx-6 px-6">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="text-xl font-display leading-[1.1] text-ink"
            >
              Product Paige
            </a>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-11 h-11 cursor-pointer"
            >
              <span aria-hidden="true" className="relative w-5 h-5 block">
                <span className="absolute left-0 right-0 top-[9px] h-[2px] bg-ink rotate-45" />
                <span className="absolute left-0 right-0 top-[9px] h-[2px] bg-ink -rotate-45" />
              </span>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-6">
            <ul className="flex flex-col gap-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-4xl font-display leading-none tracking-[-1px] text-ink hover:opacity-60 transition-opacity"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm leading-[1.4] opacity-60">
            hello@productpaige.com
          </p>
        </div>
      ) : null}
    </>
  );
}
