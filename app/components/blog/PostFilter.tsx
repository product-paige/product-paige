"use client";

import { useState } from "react";
import type { BlogPost } from "../../blog/data";
import { BlogCard } from "../BlogCard";

const ALL = "All";

/**
 * Category chip filter over the post grid. Chips use an inverted active
 * state rather than the shared Chip, so the markup stays local.
 * Posts arrive as a prop from the Server Component page.
 */
export function PostFilter({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = [ALL, ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered =
    activeCategory === ALL
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
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
      {filtered.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {filtered.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base opacity-60">No posts in this category yet.</p>
      )}
    </div>
  );
}
