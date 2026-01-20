import React from "react"
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "alt";
  container?: "default" | "narrow" | "wide" | "full";
}

export function Section({
  children,
  className,
  id,
  variant = "default",
  container = "default",
}: SectionProps) {
  const containerClasses = {
    default: "container-default",
    narrow: "container-narrow",
    wide: "container-wide",
    full: "",
  };

  return (
    <section
      id={id}
      className={cn(
        "section-padding",
        variant === "alt" && "bg-pattern-dots",
        className
      )}
    >
      <div className={cn(containerClasses[container])}>{children}</div>
    </section>
  );
}
