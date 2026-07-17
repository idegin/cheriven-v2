import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  ariaLabel?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-600 text-white shadow-[0_10px_30px_-8px_rgba(215,23,32,0.5)] hover:bg-accent-700 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(215,23,32,0.55)]",
  secondary:
    "bg-brand-700 text-white shadow-[0_10px_30px_-10px_rgba(58,55,146,0.6)] hover:bg-brand-800 hover:-translate-y-0.5",
  outline:
    "border border-brand-700/25 text-brand-800 hover:border-brand-700 hover:bg-brand-700 hover:text-white",
  ghost: "text-brand-800 hover:bg-brand-50",
  light:
    "bg-white/95 text-brand-800 shadow-[0_10px_30px_-12px_rgba(28,27,41,0.5)] hover:bg-white hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrowRight",
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {icon && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
