import React from "react"
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "sm" | "md" | "lg" | "xl";
}

export function SectionHeading({
  children,
  className,
  as: Component = "h2",
  size = "lg",
}: SectionHeadingProps) {
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-5xl lg:text-6xl",
  };

  return (
    <Component
      className={cn(
        "font-bold text-foreground leading-tight text-balance",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
