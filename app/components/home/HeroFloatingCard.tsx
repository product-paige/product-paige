"use client";

import { useState } from "react";

import type { HeroCard } from "./heroCards";

export function HeroFloatingCard({
  card,
  position,
  rotate,
  widthClass,
}: {
  card: HeroCard;
  position: React.CSSProperties;
  rotate: string;
  widthClass: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`absolute ${widthClass} ${card.variant === "shopify" ? "rounded-md overflow-hidden" : ""} bg-white transition-transform duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_10px_24px_rgba(0,0,0,0.18)]`}
      style={{
        ...position,
        transform: hovered
          ? `rotate(${rotate}) scale(0.92)`
          : `rotate(${rotate})`,
        pointerEvents: "auto",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      {card.variant === "email" ? (
        <div className="relative bg-white flex flex-col">
          {/* Header strip — sender + timestamp */}
          <div className="flex items-center justify-between gap-2 border-b border-[#1A191E]/10 px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                aria-hidden="true"
                className="w-5 h-5 rounded-full bg-[#DBE6EB] flex items-center justify-center text-[10px] font-medium text-ink shrink-0"
              >
                {(card.from ?? "•").charAt(0)}
              </span>
              <span className="text-[10px] leading-none text-ink truncate">
                {card.from ?? "Client"}
              </span>
            </div>
            <span className="text-[9px] leading-none opacity-50 shrink-0">
              {card.timestamp ?? ""}
            </span>
          </div>
          {/* Body — subject + preview */}
          <div className="flex flex-col gap-1 px-3 py-2.5">
            <p className="text-[11px] leading-[1.2] font-medium text-ink">
              {card.title}
            </p>
            {card.testimonial ? (
              <p className="text-[9px] leading-[1.4] opacity-70 line-clamp-3">
                {card.testimonial}
              </p>
            ) : null}
          </div>
        </div>
      ) : card.variant === "polaroid" ? (
        <div className="relative bg-white pt-2.5 px-2.5 pb-10">
          {/* Masking tape overhanging the top */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tape.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 -rotate-[4deg] w-24 z-20"
          />
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.image}
              alt=""
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="w-full aspect-square bg-[#DBE6EB]" />
          )}
          <div className="absolute left-2.5 right-2.5 bottom-0 h-10 flex items-center">
            <p className="font-display italic text-sm text-ink leading-none">
              {card.title}
            </p>
          </div>
        </div>
      ) : card.variant === "shopify" ? (
        <>
          <div className="w-full aspect-square bg-[#DBE6EB]" />
          <div className="p-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-0.5 text-[10px] leading-none text-[#1A191E]">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              <span className="ml-1 opacity-60 text-[10px]">(128)</span>
            </div>
            <p className="text-sm text-ink line-clamp-1 font-medium">
              {card.title}
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-ink">{card.price}</span>
              <button
                type="button"
                className="text-[10px] leading-none uppercase tracking-widest bg-[#1A191E] text-white px-2.5 py-1.5 rounded"
                tabIndex={-1}
              >
                Add
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.image}
              alt=""
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className="w-full aspect-video bg-[#DBE6EB]" />
          )}
          <div className="p-3">
            <p className="text-sm text-ink line-clamp-1">{card.title}</p>
          </div>
        </>
      )}
    </div>
  );
}
