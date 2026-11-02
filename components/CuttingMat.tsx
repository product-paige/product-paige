/**
 * A blue cutting mat to lay things on: ruler ticks and numbers in the margin around a framed
 * grid. Fills its (relative, overflow-hidden) parent; anything placed after it sits on top.
 */
export function CuttingMat() {
  const marks = Array.from({ length: 12 }, (_, i) => i * 5);
  return (
    <div aria-hidden className="cutting-mat absolute inset-0 font-sans text-[10px] font-medium text-[rgb(170_220_255/0.8)]">
      {/* Ticks: top and bottom point in from the edge, left and right too */}
      <div className="mat-ticks-x absolute inset-x-[var(--m)] top-0 h-[var(--m)] [background-position:0_100%]" />
      <div className="mat-ticks-x absolute inset-x-[var(--m)] bottom-0 h-[var(--m)] [background-position:0_0]" />
      <div className="mat-ticks-y absolute inset-y-[var(--m)] left-0 w-[var(--m)] [background-position:100%_0]" />
      <div className="mat-ticks-y absolute inset-y-[var(--m)] right-0 w-[var(--m)] [background-position:0_0]" />
      {/* Numbers every five cells, along the top and bottom */}
      {["top-[3px]", "bottom-[3px]"].map((edge) => (
        <div key={edge} className={`absolute inset-x-[var(--m)] ${edge} overflow-hidden`}>
          <div className="flex">
            {marks.map((n) => <span key={n} className="w-[calc(var(--c)*5)] shrink-0 pl-1 leading-none">{n}</span>)}
          </div>
        </div>
      ))}
      <div className="mat-grid absolute" />
    </div>
  );
}
