import { Suspense } from "react";
import { BtnIcons } from "../components/BtnIcons";
import { ContactForm } from "../components/contact/ContactForm";


export default function ContactPage() {

  return (
    <div className="theme contents">

      {/* === HERO === hero + navbar together fill the viewport */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-84px)] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          {/* Left: eyebrow + h1 + leading + email shortcut */}
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Contact</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-display font-display text-ink max-w-[20ch]">
                  Send the part you can&rsquo;t see clearly yet
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  A link, a screenshot, the half-finished idea — whatever&rsquo;s
                  on your mind. You&rsquo;ll hear back fast, without the
                  consulting theatre.
                </p>
              </div>
            </div>
            <p className="text-sm leading-[1.4] opacity-60">
              Most replies within 48 hours
            </p>
          </div>

          {/* Right: bg image behind, form card overlaid, 40px padding all around */}
          <aside
            className="relative min-w-0 p-6 md:p-16 flex divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </aside>
        </div>
      </section>

    </div>
  );
}
