"use client";

import { useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { FeaturedBlogCard } from "../components/FeaturedBlogCard";
import { blogList } from "./data";

const ALL = "All";

export default function BlogIndexPage() {
  const [feature, ...rest] = blogList;
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = [
    ALL,
    ...Array.from(new Set(blogList.map((p) => p.category))),
  ];

  const filteredRest =
    activeCategory === ALL
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  return (
    <div className="theme contents">

      {/* === HERO === generous 64px vertical rhythm on desktop. */}
      <section
        id="blog-hero"
        data-section="blog-hero"
        className="p-6 md:px-10 md:py-16 section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <h1 className="text-display font-display text-ink max-w-[30ch]">
            Notes on shipping clearly
          </h1>
          <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
            Short reads on positioning, ecommerce UX, and AI content design.
            For founders and product teams shipping fast.
          </p>
        </div>
      </section>

      {/* === FEATURED POST === image left, text right (FeaturedBlogCard). */}
      {feature ? (
        <section
          data-section="blog-feature"
          className="p-6 md:p-10"
        >
          <FeaturedBlogCard post={feature} />
        </section>
      ) : null}

      {/* === POST LIST === clickable category chip filter above the
          grid. "All" is the default; click a category to filter the
          remaining posts. */}
      {rest.length > 0 ? (
        <section
          data-section="blog-list"
          className="p-6 md:p-10 section-border-b"
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <ul className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const isActive = c === activeCategory;
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(c)}
                        aria-pressed={isActive}
                        className="svc-label"
                      >
                        <span
                          className="svc-label-text"
                          style={{
                            backgroundColor: isActive ? "#1A191E" : "#FBFAF6",
                            borderColor: "#1A191E",
                            color: isActive ? "#FBFAF6" : "#1A191E",
                            cursor: "pointer",
                          }}
                        >
                          {c}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {filteredRest.length > 0 ? (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
                {filteredRest.map((p) => (
                  <li key={p.slug}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base opacity-60">
                No posts in this category yet.
              </p>
            )}
          </div>
        </section>
      ) : null}

    </div>
  );
}
