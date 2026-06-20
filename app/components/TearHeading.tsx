import type { CSSProperties } from "react";

type Props = {
  children: string;
  /** className applied to the heading element */
  className?: string;
  /** which element to render — defaults to h1 */
  as?: "h1" | "h2" | "h3";
};

/**
 * Editorial "torn from the page" hover effect.
 * Each character lifts, rotates slightly, gains a soft drop shadow, and
 * shifts to the red accent — like type peeling up off paper.
 *
 * Pass `\n` in the string to break onto a new line; the stagger index
 * continues across the break so the wave reads as one motion.
 *
 * Accessible: the full word is exposed via aria-label / sr-only;
 * the per-character spans are aria-hidden.
 */
export function TearHeading({ children, className = "", as: Tag = "h1" }: Props) {
  const lines = children.split("\n");
  const readable = children.replace(/\n/g, " ");
  let charIndex = 0;
  return (
    <Tag className={`tear ${className}`} aria-label={readable}>
      <span className="sr-only">{readable}</span>
      <span className="tear__layer" aria-hidden="true">
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} className="tear__line">
            {line.split("").map((c, i) => {
              const idx = charIndex++;
              // Deterministic small rotation per char so SSR matches client.
              const r = (((idx * 37) % 9) - 4).toString();
              const style = {
                ["--i" as string]: idx,
                ["--r" as string]: `${r}deg`,
              } as CSSProperties;
              return (
                <span key={i} className="tear__char" style={style}>
                  {c === " " ? " " : c}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}
