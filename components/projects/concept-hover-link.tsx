"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { concepts, type ConceptKey } from "@/data/concepts";
import { textLinkClassName } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

type ConceptHoverLinkProps = {
  concept: ConceptKey;
  children?: React.ReactNode;
  className?: string;
};

export function ConceptHoverLink({ concept, children, className }: ConceptHoverLinkProps) {
  const meta = concepts[concept];
  const [open, setOpen] = useState(false);
  const [isTouchLike, setIsTouchLike] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouchLike(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <HoverCard.Root open={open} onOpenChange={setOpen} openDelay={120} closeDelay={120}>
      <HoverCard.Trigger asChild>
        <button
          type="button"
          onClick={(e) => {
            // On touch devices there's no hover — tap toggles the card.
            if (isTouchLike) {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
          data-open={open ? "true" : "false"}
          aria-label={`${meta.label} — how I worked`}
          className={cn("inline cursor-pointer", textLinkClassName, className)}
        >
          {children ?? meta.label}
        </button>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align="start"
          sideOffset={8}
          collisionPadding={16}
          className={cn(
            "z-50 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background p-4 shadow-xl",
            "animate-in fade-in slide-in-from-top-2 duration-200"
          )}
        >
          {meta.eyebrow && (
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {meta.eyebrow}
            </p>
          )}
          <p className="text-base font-bold text-foreground">{meta.label}</p>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">{meta.summary}</p>

          {meta.points?.length ? (
            <ul className="mt-3 space-y-2">
              {meta.points.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground/60" />
                  <span className="leading-snug text-muted-foreground">{pt}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href={`/approach/${meta.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--link-underline)]"
          >
            <span className="link-underline">Learn more</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <HoverCard.Arrow className="fill-border" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
