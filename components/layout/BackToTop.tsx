"use client";

import { Icon } from "@/components/ui/Icon";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-teal-300 hover:text-teal-300"
    >
      <Icon name="arrowUp" size={18} />
    </button>
  );
}
