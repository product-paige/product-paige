/**
 * Splits text into per-character spans wired for the `.tear` editorial hover.
 * Each `.tear__char` gets a staggered `--i` index and a randomized `--r`
 * rotation, so the whole heading "lifts" character by character on hover.
 */
export function TearText({ children }: { children: string }) {
  const chars = Array.from(children);
  let i = 0;
  return (
    <span className="tear">
      {chars.map((ch, idx) => {
        if (ch === "\n") {
          return <br key={idx} />;
        }
        if (ch === " ") {
          return <span key={idx}>&nbsp;</span>;
        }
        const rot = ((i * 37) % 11) - 5;
        const style = {
          "--i": i,
          "--r": `${rot}deg`,
        } as React.CSSProperties;
        i++;
        return (
          <span key={idx} className="tear__char" style={style}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}
