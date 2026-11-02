import { about, art, site } from "@/content";
import type { ReactNode } from "react";
import { Illo } from "./ui";

// The selection blue, as on a desktop: the folder, its highlighted name and the selection box.
const select = "#4a8fe7";

// Where each tool's file sits on the page.
const toolSpots = ["top-[26%] left-[12%]", "top-[58%] right-[12%]", "top-[47%] left-[12%]"];

/** An item on the page with a file name under it, like an icon on a desktop. */
function File({ name, className = "", children }: { name: string; className?: string; children: ReactNode }) {
  return (
    <span className={`absolute flex flex-col items-center gap-1.5 ${className}`}>
      {children}
      <span className="text-[11px] leading-tight lg:text-[13px]">{name}</span>
    </span>
  );
}

/** Four handles on a box's corners, as when an image is selected. */
function Handles() {
  return (
    <span aria-hidden className="pointer-events-none absolute -inset-1.5" style={{ border: `1.5px solid ${select}` }}>
      {["-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"].map((c) => (
        <i key={c} className={`absolute size-2.5 rounded-full bg-white ${c}`} style={{ border: `1.5px solid ${select}` }} />
      ))}
    </span>
  );
}

/**
 * The About board laid out like a desktop, straight on the page: a label at the top, the photo
 * and the tools as files with their names under them, a folder that opens the projects, the
 * basket selected, and a cursor. Fills its square parent.
 */
export function AboutNotebook() {
  return (
    <div className="relative aspect-square">
      {/* The label at the top */}
      <p aria-hidden className="absolute top-[8%] left-[22%] flex items-center gap-3 rounded-[6px] bg-sheet px-4 py-1.5 serif text-[clamp(18px,2.2vw,30px)] lg:gap-5 lg:px-6">
        <span style={{ color: select }}>–</span>@productpaige<span style={{ color: select }}>–</span>
      </p>

      {/* The photo, as an image file */}
      <File name={about.photoFile} className="top-[21%] left-[31%] w-[40%]">
        <span className="block w-full bg-white p-1.5 shadow-[0_1px_0_rgb(0_0_0/0.08),0_6px_16px_rgb(26_26_26/0.1)]">
          <span className="photo-grain block aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.photo} alt={site.photoAlt} width={540} height={675} loading="lazy" decoding="async" className="size-full object-cover" />
          </span>
        </span>
      </File>

      {/* A folder that goes to the projects */}
      <a href="#projects" className="group absolute top-[20%] right-[13%] flex w-[17%] flex-col items-center gap-1.5">
        <svg viewBox="0 0 64 50" className="w-full transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden>
          <path d="M3 8a4 4 0 0 1 4-4h16l5 5h29a4 4 0 0 1 4 4v3H3z" fill="#5fa8ec" />
          <rect x="3" y="12" width="58" height="35" rx="4" fill="#8ec8f7" />
        </svg>
        <span className="rounded-[3px] px-1.5 text-[11px] whitespace-nowrap leading-tight lg:text-[13px]" style={{ background: "#cfe1fb" }}>{about.folder}</span>
      </a>

      {/* The tools, as app files */}
      {about.tools.map((t, i) => (
        <File key={t.name} name={t.file} className={toolSpots[i % toolSpots.length]}>
          <span className="grid size-12 place-items-center rounded-[10px] bg-white shadow-[0_1px_0_rgb(0_0_0/0.06),0_6px_14px_rgb(26_26_26/0.1)] lg:size-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.logo} alt={t.name} width={32} height={32} loading="lazy" className="size-6 lg:size-8" />
          </span>
        </File>
      ))}

      {/* The basket, selected */}
      <span className="absolute bottom-[6%] left-[13%] block w-[22%]">
        <Handles />
        <Illo art={art.basket} className="w-full" />
      </span>

      {/* The cursor, just off the photo's corner */}
      <svg aria-hidden viewBox="0 0 24 24" className="absolute top-[60%] left-[69%] w-[5%] min-w-5 drop-shadow-[0_2px_2px_rgb(0_0_0/0.2)]">
        <path d="M4 2l15 10.5-6.6 1.2 3.8 7.3-2.9 1.5-3.8-7.3L4 20z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
