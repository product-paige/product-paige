"use client";

import { useState } from "react";

/** How-it-works steps. `title` stays short for the stepper; `detail`
 *  is the expanded line shown under the active step. */
const youGet: Array<{ title: string; detail: string }> = [
  {
    title: "Async prep",
    detail: "An async look at everything you send ahead of the call.",
  },
  {
    title: "Live session",
    detail: "A live session, focused on what matters most.",
  },
  {
    title: "A short list",
    detail: "What to shape now, what can wait.",
  },
  {
    title: "Follow-up",
    detail: "Optional follow-up notes or a Loom if it helps.",
  },
];

/** How-it-works stepper — click a step to swap the detail line. */
export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* === SECTION: how-it-works === matches Capabilities UX. Left col
          carries h2 + lead floated to the bottom; right col carries the
          interactive numbered list + dynamic paragraph with a vertical
          divider between the columns. */}
      <section
        id="how-it-works"
        data-section="how-it-works"
        className="flex flex-col section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          <div className="flex flex-col gap-4 p-6 md:p-10 md:justify-end">
            <h2 className="text-section font-display text-ink max-w-[18ch]">
              How it works
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[480px]">
              Async prep, a live conversation, a prioritized list of what
              to shape next. That&rsquo;s the whole shape of it.
            </p>
          </div>
          <div className="divider-indent-left flex flex-col gap-8 p-6 md:p-10 md:min-h-full">
            <ul>
              {youGet.map((item, i) => (
                <li
                  key={item.title}
                  className="border-b border-[#1a1a1a]/25"
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`w-full text-left py-5 flex items-baseline gap-4 transition-opacity ${
                      activeStep === i
                        ? "opacity-100"
                        : "opacity-30 hover:opacity-60"
                    }`}
                  >
                    <span className="font-display text-2xl md:text-3xl leading-none tracking-[-1px] text-ink/40 shrink-0 w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-ink">
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p
              key={activeStep}
              className="text-lg leading-[1.4] opacity-80 max-w-[520px] min-h-[3em]"
            >
              {youGet[activeStep].detail}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
