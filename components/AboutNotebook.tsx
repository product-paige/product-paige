"use client";

import { about, art, site } from "@/content";
import { useEffect, useRef, type ReactNode } from "react";
import { Illo, SelectionHandles } from "./ui";

// Where each tool's file sits on the page.
// Shopify and Claude down the left, Figma on the right, around the photo
const toolSpots = ["top-[12%] left-[2%]", "top-[48%] right-[2%]", "top-[48%] left-[2%]"];

/** An item on the page with a file name under it, like an icon on a desktop. */
function File({ name, className = "", light = false, children }: { name: string; className?: string; light?: boolean; children: ReactNode }) {
  return (
    <span data-drag className={`absolute flex flex-col items-center gap-1.5 ${className}`}>
      {children}
      <span className={`text-[11px] leading-tight lg:text-[13px] ${light ? "text-white" : ""}`}>{name}</span>
    </span>
  );
}

/**
 * The About board laid out like a desktop, straight on the page: the photo and the tools as
 * files with their names under them, a folder that opens the projects, the parcel sticker
 * selected (tilted), and a cursor, each of which can be dragged around. Square on phones; on
 * desktop it fills its parent. `onMat` (laid on the blue cutting
 * mat) turns the file names white so they read on it.
 */
export function AboutNotebook({ onMat = false }: { onMat?: boolean }) {
  const board = useRef<HTMLDivElement>(null);

  // Anything marked data-drag can be picked up and moved around the board, kept inside its
  // edges; the last one picked up sits on top. A drag doesn't count as a click, so the folder
  // still opens the projects when it's only clicked.
  useEffect(() => {
    const root = board.current;
    if (!root) return;
    let z = 10;
    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-drag]");
      if (!el || !root.contains(el) || e.button !== 0) return;
      e.preventDefault();
      const start = { x: e.clientX, y: e.clientY };
      const [tx, ty] = (el.style.translate || "0px 0px").split(" ").map((v) => parseFloat(v) || 0);
      const b = root.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      let moved = false;
      el.style.zIndex = String(++z);
      el.setPointerCapture(e.pointerId);
      const onMove = (m: PointerEvent) => {
        const dx = Math.min(Math.max(m.clientX - start.x, b.left - r.left), b.right - r.right);
        const dy = Math.min(Math.max(m.clientY - start.y, b.top - r.top), b.bottom - r.bottom);
        if (!moved && Math.hypot(dx, dy) > 4) { moved = true; el.dataset.dragging = ""; }
        if (moved) el.style.translate = `${tx + dx}px ${ty + dy}px`;
      };
      const onUp = () => {
        delete el.dataset.dragging;
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        // Swallow the click that follows a drag (so the folder doesn't open)
        if (moved) el.addEventListener("click", (c) => { c.preventDefault(); c.stopPropagation(); }, { capture: true, once: true });
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
    };
    // No ghost image from the browser's own image dragging
    const noNative = (e: DragEvent) => e.preventDefault();
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("dragstart", noNative);
    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("dragstart", noNative);
    };
  }, []);

  return (
    // Square on phones; on desktop it fills the mat's height, whatever shape that is. The photo
    // large in the middle, the files around it.
    <div ref={board} className="relative aspect-square w-full lg:aspect-auto lg:h-full">
      {/* The photo, as an image file */}
      <File name={about.photoFile} light={onMat} className="top-[6%] left-[20%] w-[60%]">
        <span className="block w-full bg-white p-1.5 shadow-[0_1px_0_rgb(0_0_0/0.08),0_6px_16px_rgb(26_26_26/0.1)]">
          <span className="photo-grain block aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.photo} alt={site.photoAlt} draggable={false} width={540} height={675} loading="lazy" decoding="async" className="size-full object-cover" />
          </span>
        </span>
      </File>

      {/* A folder that goes to the projects */}
      <a href="#projects" data-drag draggable={false} className="group absolute top-[8%] right-[1%] flex w-[14%] flex-col items-center gap-1.5">
        <svg viewBox="0 0 64 50" className="w-full transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden>
          <path d="M3 8a4 4 0 0 1 4-4h16l5 5h29a4 4 0 0 1 4 4v3H3z" fill="#5fa8ec" />
          <rect x="3" y="12" width="58" height="35" rx="4" fill="#8ec8f7" />
        </svg>
        <span className="rounded-[3px] px-1.5 text-[11px] whitespace-nowrap leading-tight lg:text-[13px]" style={{ background: "#cfe1fb" }}>{about.folder}</span>
      </a>

      {/* The tools, as app files */}
      {about.tools.map((t, i) => (
        <File key={t.name} name={t.file} light={onMat} className={toolSpots[i % toolSpots.length]}>
          <span className="grid size-12 place-items-center rounded-[10px] bg-white shadow-[0_1px_0_rgb(0_0_0/0.06),0_6px_14px_rgb(26_26_26/0.1)] lg:size-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.logo} alt={t.name} draggable={false} width={32} height={32} loading="lazy" className="size-6 lg:size-8" />
          </span>
        </File>
      ))}

      {/* The parcel sticker, selected and tilted, low on the left */}
      <span data-drag className="absolute bottom-[2%] left-[2%] block w-[26%] -rotate-[9deg]">
        <SelectionHandles color={onMat ? "#ffffff" : undefined} />
        <Illo art={art.parcel} className="w-full" />
      </span>

      {/* For recruiters: a yellow sticky note, low on the right, tilted a little */}
      <span data-drag className="absolute right-[3%] bottom-[12%] block w-[46%] max-w-56 rotate-[4deg] bg-[#ffe36e] p-3 sm:w-[34%] text-ink shadow-[0_1px_0_rgb(0_0_0/0.08),0_10px_20px_rgb(26_26_26/0.22)] lg:p-4">
        <span className="mono block text-[11px] lg:text-[12px]">{about.hiring.label}</span>
        <span className="mt-1.5 block text-[12px] leading-snug lg:text-[14px]">{about.hiring.text} <a href={`mailto:${site.email}`} draggable={false} className="break-all underline decoration-ink/40 underline-offset-2 hover:decoration-ink">{site.email}</a></span>
      </span>

      {/* The cursor, pointing at the sticky note */}
      <svg aria-hidden viewBox="0 0 24 24" className="absolute top-[86%] left-[59%] w-[4.5%] min-w-5 drop-shadow-[0_2px_2px_rgb(0_0_0/0.2)]">
        <path d="M4 2l15 10.5-6.6 1.2 3.8 7.3-2.9 1.5-3.8-7.3L4 20z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
