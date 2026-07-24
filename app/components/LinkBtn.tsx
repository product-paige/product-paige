import type { ComponentProps } from "react";
import { BtnIcons } from "./BtnIcons";

/**
 * Rounded-square icon chip + text link. Secondary CTA companion to the
 * two-piece .btn pill. Uses BtnIcons so the arrow swaps up-right → right
 * on hover exactly like the primary button.
 */
export function LinkBtn({
  children,
  className = "",
  ...rest
}: ComponentProps<"a">) {
  return (
    <a className={`link-btn ${className}`.trim()} {...rest}>
      <span className="link-btn-icon" aria-hidden="true">
        <BtnIcons />
      </span>
      <span>{children}</span>
    </a>
  );
}
