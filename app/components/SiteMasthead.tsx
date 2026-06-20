export function SiteMasthead() {
  return (
    <div
      data-section="masthead"
      className="bg-[#1a1a1a] text-white px-6 md:px-10 h-7 flex items-center mx-3 md:mx-6"
    >
      <div className="w-full flex items-center justify-between gap-6 text-xs leading-none">
        <span>Vol. 01 · Issue no. 1</span>
        <span className="hidden md:inline opacity-80">
          Product strategy · For founders · In the age of AI
        </span>
        <span>MMXXVI · Folio 001</span>
      </div>
    </div>
  );
}
