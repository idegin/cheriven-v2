"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function Newsletter() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setDone(true);
      }}
      className="mt-5"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      {done ? (
        <p className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3.5 text-sm text-teal-200">
          <Icon name="check" size={18} /> Thank you — we&apos;ll be in touch.
        </p>
      ) : (
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-teal-300/60">
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Subscribe to newsletter"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white transition hover:bg-accent-700"
          >
            <Icon name="arrowRight" size={18} />
          </button>
        </div>
      )}
    </form>
  );
}
