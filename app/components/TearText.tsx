/**
 * Splits text into per-character spans wired for the `.tear` editorial hover.
 * Each `.tear__char` gets a staggered `--i` index and a randomized `--r`
 * rotation, so the whole heading "lifts" character by character on hover.
 */
export function TearText({ children }: { children: string }) {
  // Group per-char spans into per-word wrappers so browsers only wrap
  // at real word boundaries — otherwise inline-block chars can break
  // mid-word at large display sizes.
  const lines = children.split("\n");
  let i = 0;
  return (
    <span className="tear">
      {lines.map((line, lineIdx) => {
        const words = line.split(" ");
        return (
          <span key={lineIdx}>
            {words.map((word, wordIdx) => (
              <span
                key={wordIdx}
                style={{ display: "inline-block", whiteSpace: "nowrap" }}
              >
                {Array.from(word).map((ch, chIdx) => {
                  const rot = ((i * 37) % 11) - 5;
                  const style = {
                    "--i": i,
                    "--r": `${rot}deg`,
                  } as React.CSSProperties;
                  i++;
                  return (
                    <span key={chIdx} className="tear__char" style={style}>
                      {ch}
                    </span>
                  );
                })}
                {wordIdx < words.length - 1 ? " " : null}
              </span>
            ))}
            {lineIdx < lines.length - 1 ? <br /> : null}
          </span>
        );
      })}
    </span>
  );
}
