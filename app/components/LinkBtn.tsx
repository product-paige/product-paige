import type { ComponentProps } from "react";

/**
 * Underlined text link. Secondary CTA — pairs with the two-piece .btn
 * pill (primary) as the plain-text counterpart. Underline sits a few
 * px below the baseline so the letters and the rule read as separate
 * lines instead of one thick stroke.
 */
export function LinkBtn({
  children,
  className = "",
  ...rest
}: ComponentProps<"a">) {
  return (
    <a className={`link-btn ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}
