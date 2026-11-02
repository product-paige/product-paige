"use client";

import { useEffect, useState } from "react";

// Temporary: a floating control for trying the colour palettes (see the end of globals.css)
// in light and dark. Remembers the choice in this browser. Remove once one is picked.
const palettes = [
  { id: "", label: "Current", swatch: "#2c5ce0" },
  { id: "teal", label: "Teal", swatch: "#306170" },
  { id: "oxblood", label: "Oxblood", swatch: "#650814" },
  { id: "coral", label: "Coral", swatch: "#e0746c" },
  { id: "navy", label: "Navy", swatch: "#1a303c" },
  { id: "tomato", label: "Tomato", swatch: "#c4102c" },
  { id: "ultramarine", label: "Ultramarine", swatch: "#2b30d6" },
  { id: "midnight", label: "Midnight", swatch: "#0f1b45" },
  { id: "petrol", label: "Petrol", swatch: "#0a5c63" },
  { id: "emerald", label: "Emerald", swatch: "#0b6b49" },
  { id: "aubergine", label: "Aubergine", swatch: "#4a1a6b" },
];

function read(key: string) {
  try { return localStorage.getItem(key) ?? ""; } catch { return ""; }
}
function save(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch {}
}

export function PaletteSwitcher() {
  const [palette, setPalette] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setPalette(read("palette"));
    setDark(read("mode") === "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (palette) root.dataset.palette = palette; else delete root.dataset.palette;
    // Dark mode needs a palette; "Current" has no dark version.
    if (dark && palette) root.dataset.mode = "dark"; else delete root.dataset.mode;
    save("palette", palette);
    save("mode", dark ? "dark" : "");
  }, [palette, dark]);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto rounded-full bg-[#1a1a1a] p-1 text-[13px] font-medium text-white shadow-lg">
      {palettes.map((p) => (
        <button
          key={p.label}
          type="button"
          onClick={() => setPalette(p.id)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 ${palette === p.id ? "bg-white text-[#1a1a1a]" : "hover:bg-white/10"}`}
        >
          <i className="size-2.5 rounded-full ring-1 ring-white/40" style={{ background: p.swatch }} />
          {p.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setDark((d) => !d)}
        disabled={!palette}
        className="ml-1 shrink-0 rounded-full border border-white/25 px-3 py-1.5 disabled:opacity-40"
      >
        {dark && palette ? "Dark" : "Light"}
      </button>
    </div>
  );
}
