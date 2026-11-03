import type { Project } from "@/content";

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
