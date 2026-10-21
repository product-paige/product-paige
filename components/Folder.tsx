import type { Project } from "@/content";
import type { CSSProperties } from "react";
import { ArrowUpRight, Chip, sansTitle } from "./ui";

// Dark pills (role tags), like the hero pills.
const dark = { "--color-chip": "var(--color-ink)" } as CSSProperties;

/** The cover, or a plain sheet with the client's name while there's no image yet. */
export function Cover({ p, className = "" }: { p: Project; className?: string }) {
  return p.image ? (
    <span className={`photo-grain block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
    </span>
  ) : (
    <div className={`grid place-items-center bg-white/55 ${className}`}>
      <span className="serif text-[28px] text-muted">{p.client}</span>
    </div>
  );
}

/** A folder: a tab on the left, then the body, in the blog cards' grey paper. */
export function Folder({ p, i }: { p: Project; i: number }) {
  return (
    <a href={`/projects/${p.slug}`} className="folder group flex flex-col">
      <span className="folder-tab self-start text-[14px] font-medium">
        Project {String(i + 1).padStart(2, "0")}
      </span>
      <div className="folder-body grid gap-5 p-5 lg:p-6">
        {/* Cover first, with the role pill over its top-right corner. */}
        <div className="relative">
          <Cover p={p} className="aspect-[4/3] w-full lg:aspect-[16/9]" />
          <Chip className="absolute top-3 right-3 text-white" style={dark}>{p.role}</Chip>
        </div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className={sansTitle}>{p.client}</h3>
            {/* The buttons' arrow tab; it turns when the folder is hovered. */}
            <span className="btn shrink-0" aria-hidden>
              <span className="btn-tab size-8"><ArrowUpRight turn className="size-5" /></span>
            </span>
          </div>
          <p className="mt-2 truncate text-muted" title={p.excerpt}>{p.excerpt}</p>
        </div>
      </div>
    </a>
  );
}
