import React from "react"
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "filled";
}

export function Tag({ children, className, variant = "default" }: TagProps) {
  const variantClasses = {
    default: "bg-[var(--tag-bg)] text-[var(--tag-text)]",
    outline: "border border-border bg-transparent text-muted-foreground",
    filled: "bg-foreground text-background",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface TagListProps {
  tags: string[];
  className?: string;
  variant?: "default" | "outline" | "filled";
}

export function TagList({ tags, className, variant = "default" }: TagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Tag key={tag} variant={variant}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}
