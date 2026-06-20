import type { ReactNode } from "react";

export function SectionRail({ children }: { children: ReactNode }) {
  return (
    <div className="section-rail" aria-hidden="true">
      <span className="section-rail-text">{children}</span>
    </div>
  );
}
