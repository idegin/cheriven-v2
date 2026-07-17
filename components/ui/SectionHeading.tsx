import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const eyebrowColor = tone === "light" ? "text-teal-300" : "text-brand-700";
  const titleColor = tone === "light" ? "text-white" : "text-ink-900";
  const descColor = tone === "light" ? "text-white/70" : "text-ink-500";

  return (
    <Reveal
      className={`flex flex-col ${alignment} ${align === "center" ? "max-w-2xl" : "max-w-xl"} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${eyebrowColor} mb-4`}>
          <span className="h-px w-8 bg-current opacity-50" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-[clamp(2rem,4vw,3.25rem)] ${titleColor}`}>{title}</h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${descColor}`}>{description}</p>
      )}
    </Reveal>
  );
}
