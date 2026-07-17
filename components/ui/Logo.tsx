import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { asset } from "@/lib/asset";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

export function Logo({ tone = "dark", className = "", compact = false }: LogoProps) {
  const primary = tone === "light" ? "text-white" : "text-brand-800";
  const secondary = tone === "light" ? "text-white/60" : "text-ink-500";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-[0_4px_14px_-4px_rgba(28,27,41,0.25)] ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12">
        <Image
          src={asset("/brand/logo-mark.jpeg")}
          alt=""
          width={52}
          height={52}
          priority
          className="h-full w-full rounded-full object-cover"
        />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-lg font-semibold tracking-tight ${primary} sm:text-xl`}
          >
            Cheriven
          </span>
          <span
            className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${secondary}`}
          >
            Empowerment Foundation
          </span>
        </span>
      )}
    </Link>
  );
}
