import Link from "next/link";
import { Icon } from "./Icon";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const text = tone === "light" ? "text-white/70" : "text-ink-500";
  const current = tone === "light" ? "text-white" : "text-ink-900";
  const sep = tone === "light" ? "text-white/30" : "text-ink-300";

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${text}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="transition hover:text-current hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? `font-medium ${current}` : ""} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <Icon name="chevronDown" size={14} className={`-rotate-90 ${sep}`} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
