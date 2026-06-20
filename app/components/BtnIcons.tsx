/**
 * Two-state arrow icons for the .btn pill. Default = up-right (↗), hover = right (→).
 * The .btn-tab swaps them via opacity. Matches the on-page Phosphor-style icons.
 */
export function BtnIcons() {
  return (
    <>
      <svg
        className="icon-default"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="16"
        height="16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
      </svg>
      <svg
        className="icon-hover"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="16"
        height="16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
      </svg>
    </>
  );
}
