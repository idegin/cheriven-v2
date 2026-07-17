import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { asset } from "@/lib/asset";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  crumbs: Crumb[];
  align?: "left" | "center";
  children?: ReactNode;
};

/** Reusable image-led hero for interior pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs,
  align = "left",
  children,
}: PageHeroProps) {
  const centered = align === "center";
  return (
    <section className="relative flex min-h-[64vh] items-end overflow-hidden pb-14 pt-36 lg:min-h-[70vh] lg:pb-20 lg:pt-44">
      <Image
        src={asset(image)}
        alt=""
        fill
        priority
        sizes="100vw"
        className="animate-kenburns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-950/70 to-brand-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-brand-950/40" />
      <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay" />

      <Container className="relative">
        <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
          <div className={centered ? "flex justify-center" : ""}>
            <Breadcrumb items={crumbs} tone="light" />
          </div>
          {eyebrow && (
            <span
              className={`eyebrow mt-6 text-teal-300 ${centered ? "justify-center" : ""}`}
            >
              <span className="h-px w-8 bg-current opacity-50" aria-hidden />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-[clamp(2.4rem,5.5vw,4.25rem)] font-semibold leading-[1.02] text-white">
            {title}
          </h1>
          {description && (
            <p className={`mt-5 text-lg leading-relaxed text-white/80 ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
