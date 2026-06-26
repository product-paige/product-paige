export function SiteBottomBar() {
  return (
    <div
      data-section="bottom-bar"
      className="bg-[#1a1a1a] text-white px-6 md:px-10 h-7 flex items-center"
    >
      <div className="w-full flex items-center justify-between gap-6 text-xs leading-none">
        <span>© MMXXVI · Product Paige</span>
        <span className="hidden md:inline opacity-70">
          Vol. 01 · Issue no. 1 · Folio 001
        </span>
        <span>Page 001 / 001</span>
      </div>
    </div>
  );
}
