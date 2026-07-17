"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icon";

type ShareButtonsProps = {
  title?: string;
  tone?: "light" | "dark";
  className?: string;
};

const networks: { name: string; icon: IconName; label: string; build: (u: string, t: string) => string }[] = [
  { name: "facebook", icon: "facebook", label: "Share on Facebook", build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { name: "twitter", icon: "twitter", label: "Share on X", build: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { name: "linkedin", icon: "linkedin", label: "Share on LinkedIn", build: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { name: "whatsapp", icon: "whatsapp", label: "Share on WhatsApp", build: (u, t) => `https://wa.me/?text=${t}%20${u}` },
];

export function ShareButtons({ title = "", tone = "dark", className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const openShare = (build: (u: string, t: string) => string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(build(url, text), "_blank", "noopener,noreferrer,width=600,height=520");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const base =
    tone === "light"
      ? "border-white/25 text-white/80 hover:border-white hover:bg-white hover:text-brand-800"
      : "border-ink-200 text-ink-600 hover:border-brand-700 hover:bg-brand-700 hover:text-white";

  const label = tone === "light" ? "text-white/60" : "text-ink-400";

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <span className={`mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${label}`}>
        <Icon name="share" size={14} /> Share
      </span>
      {networks.map((n) => (
        <button
          key={n.name}
          type="button"
          onClick={() => openShare(n.build)}
          aria-label={n.label}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${base}`}
        >
          <Icon name={n.icon} size={17} />
        </button>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition ${base}`}
      >
        <Icon name={copied ? "check" : "link"} size={16} />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
