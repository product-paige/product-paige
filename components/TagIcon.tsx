/** Thin line icons for the hero pills, in the same stroke as the arrows. */
const paths = {
  bag: "M6 8h12l-1 12H7L6 8zM9 8V6.5a3 3 0 0 1 6 0V8",
  apps: "M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z",
  window: "M3.5 5.5h17v13h-17zM3.5 9.5h17M6.5 7.5h.01M8.5 7.5h.01",
  heart: "M12 19.5s-7-4.3-7-9.6a3.9 3.9 0 0 1 7-2.4 3.9 3.9 0 0 1 7 2.4c0 5.3-7 9.6-7 9.6z",
  sparkle: "M12 3.5l1.9 6.6 6.6 1.9-6.6 1.9-1.9 6.6-1.9-6.6-6.6-1.9 6.6-1.9z",
  shirt: "M9 4.5L4 7l1.8 3.8 2.7-1.1V19.5h7V9.7l2.7 1.1L20 7l-5-2.5c-.4 1.3-1.6 2.2-3 2.2s-2.6-.9-3-2.2z",
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
