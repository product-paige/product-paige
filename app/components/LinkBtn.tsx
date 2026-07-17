import type { ComponentProps, ReactNode } from "react";

/**
 * Circle-icon + text button. Secondary CTA style — pairs with the two-piece
 * .btn pill (BtnIcons) used for primary CTAs. Renders as an <a> by default;
 * pass any anchor props through. Icon defaults to the up-right arrow used
 * throughout the site.
 */
export function LinkBtn({
  children,
  icon,
  ...rest
}: ComponentProps<"a"> & { icon?: ReactNode }) {
  return (
    <a className="link-btn" {...rest}>
      <span className="link-btn-icon" aria-hidden="true">
        {icon ?? <ArrowUpRight />}
      </span>
      <span>{children}</span>
    </a>
  );
}

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="16"
      height="16"
      fill="currentColor"
    >
      <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
  );
}
