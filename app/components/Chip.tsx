import { PixelIcon, type PixelIconName } from "./PixelIcon";

/** Shared chip colours. Every chip on the site uses this pair. */
export const CHIP_BG = "#3D3A45";
export const CHIP_FG = "#FBFAF6";

type ChipProps = {
  /** Chip label. */
  children: React.ReactNode;
  /** Optional trailing pixel icon, rendered in its own tab. */
  icon?: PixelIconName;
  /** Larger variant used for the About practice-area row. */
  size?: "sm" | "lg";
  className?: string;
};

/**
 * The grey label chip used across project tabs, blog categories,
 * capability groups, and the About practice-area + tools rows.
 * Previously this markup was duplicated inline in six files.
 */
export function Chip({ children, icon, size = "sm", className = "" }: ChipProps) {
  const swatch = { backgroundColor: CHIP_BG, borderColor: CHIP_FG };

  return (
    <span
      className={`svc-label ${size === "lg" ? "svc-label-lg" : ""} ${className}`.trim()}
      style={{ color: CHIP_FG }}
    >
      <span className="svc-label-text" style={swatch}>
        {children}
      </span>
      {icon ? (
        <span className="svc-label-tab" style={swatch}>
          <PixelIcon name={icon} color={CHIP_FG} size={18} />
        </span>
      ) : null}
    </span>
  );
}
