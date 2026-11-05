import { about, art, site } from "@/content";
import type { ReactNode } from "react";
import { Illo, SelectionHandles } from "./ui";

// Where each tool's file sits on the page.
const toolSpots = ["top-[8%] left-0 sm:left-[4%]", "top-[34%] right-0 sm:right-[3%]", "top-[30%] left-0 sm:left-[4%]"];

/** An item on the page with a file name under it, like an icon on a desktop. */
function File({ name, className = "", light = false, children }: { name: string; className?: string; light?: boolean; children: ReactNode }) {
  return (
    <span className={`absolute flex flex-col items-center gap-1.5 ${className}`}>
      {children}
      <span className={`text-[11px] leading-tight lg:text-[13px] ${light ? "text-white" : ""}`}>{name}</span>
    </span>
  );
}

/**
 * The About board laid out like a desktop, straight on the page: the photo and the tools as
 * files with their names under them, a folder that opens the projects, the parcel sticker
 * selected (tilted), and a cursor. Fills its square parent. `onMat` (laid on the blue cutting
 * mat) turns the file names white so they read on it.
 */
export function AboutNotebook({ onMat = false }: { onMat?: boolean }) {
  return (
    // The negative bottom margin takes back the empty strip under the photo, so the section ends
    // close to it rather than at the bottom of the square.
    <div className="relative -mb-[14%] aspect-square">
      {/* The photo, as an image file */}
      <File name={about.photoFile} light={onMat} className="top-[5%] left-[21%] w-[58%]">
        <span className="block w-full bg-white p-1.5 shadow-[0_1px_0_rgb(0_0_0/0.08),0_6px_16px_rgb(26_26_26/0.1)]">
          <span className="photo-grain block aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.photo} alt={site.photoAlt} width={540} height={675} loading="lazy" decoding="async" className="size-full object-cover" />
          </span>
        </span>
      </File>

      {/* A folder that goes to the projects */}
      <a href="#projects" className="group absolute top-[3%] right-0 flex w-[15%] flex-col items-center gap-1.5">
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
            <img src={t.logo} alt={t.name} width={32} height={32} loading="lazy" className="size-6 lg:size-8" />
          </span>
        </File>
      ))}

      {/* The parcel sticker, selected and tilted, low on the left */}
      <span className="absolute bottom-[20%] left-0 block w-[30%] -rotate-[9deg]">
        <SelectionHandles color={onMat ? "#ffffff" : undefined} />
        <Illo art={art.parcel} className="w-full" />
      </span>

      {/* The cursor, just off the photo's corner */}
      <svg aria-hidden viewBox="0 0 24 24" className="absolute top-[66%] left-[78%] w-[5%] min-w-5 drop-shadow-[0_2px_2px_rgb(0_0_0/0.2)]">
        <path d="M4 2l15 10.5-6.6 1.2 3.8 7.3-2.9 1.5-3.8-7.3L4 20z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
