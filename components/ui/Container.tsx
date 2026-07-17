import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "default" | "wide" | "narrow";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[88rem]",
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
}
