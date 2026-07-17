export function SiteBottomBar() {
  return (
    <div
      data-section="bottom-bar"
      className="bg-[#1a1a1a] text-white px-6 md:px-10 h-8 flex items-center"
    >
      <div className="w-full flex items-center justify-between gap-6 text-sm leading-none">
        <span>© Product Paige</span>
        <span className="hidden md:flex items-center gap-6 opacity-70">
          <a href="/privacy" className="text-sm hover:opacity-100">Privacy</a>
          <a href="/terms" className="text-sm hover:opacity-100">Terms</a>
        </span>
      </div>
    </div>
  );
}
