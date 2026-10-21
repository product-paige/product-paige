/** Thin line icons for the hero pills, in the same stroke as the arrows. */
const paths = {
  bag: "M6 8h12l-1 12H7L6 8zM9 8V6.5a3 3 0 0 1 6 0V8",
  apps: "M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z",
  window: "M3.5 5.5h17v13h-17zM3.5 9.5h17M6.5 7.5h.01M8.5 7.5h.01",
  sparkle: "M12 3.5l1.9 6.6 6.6 1.9-6.6 1.9-1.9 6.6-1.9-6.6-6.6-1.9 6.6-1.9z",
} as const;

export type TagIconName = keyof typeof paths;

export function TagIcon({ name }: { name: TagIconName }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <path d={paths[name]} />
    </svg>
  );
}
