"use client";

import React, { useEffect, useMemo, useState, type ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import * as HoverCard from "@radix-ui/react-hover-card";
import { ExternalLink } from "lucide-react";
import { companies, type CompanyKey } from "@/data/companies";
import { cn } from "@/lib/utils";

type TouchBehavior = "toggle" | "open-then-follow";

type TriggerElement = ReactElement<{
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: unknown;
}>;

type CompanyHoverCardProps = {
  company: CompanyKey;
  trigger: TriggerElement;
  touchBehavior?: TouchBehavior;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  contentClassName?: string;
};

export function CompanyHoverCard({
  company,
  trigger,
  touchBehavior = "toggle",
  side = "top",
  align = "center",
  sideOffset = 12,
  contentClassName,
}: CompanyHoverCardProps) {
  const meta = companies[company];
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

  const triggerWithHandlers = useMemo(() => {
    const existingOnClick = trigger.props?.onClick as ((e: React.MouseEvent) => void) | undefined;
    const mergedOnClick = (e: React.MouseEvent) => {
      if (existingOnClick) existingOnClick(e);
      if (!isTouchLike) return;

      if (touchBehavior === "toggle") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }

      // open-then-follow: first tap opens the card; second tap follows default
      if (!open) {
        e.preventDefault();
        setOpen(true);
      }
    };

    return React.cloneElement(trigger, {
      ...trigger.props,
      onClick: mergedOnClick,
      "data-open": open ? "true" : "false",
    } as TriggerElement["props"]);
  }, [trigger, isTouchLike, open, touchBehavior]);

  return (
    <HoverCard.Root open={open} onOpenChange={setOpen} openDelay={150} closeDelay={100}>
      <HoverCard.Trigger asChild>{triggerWithHandlers}</HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "w-80 rounded-2xl border border-border bg-background shadow-xl overflow-hidden",
            "animate-in fade-in slide-in-from-top-2 duration-200",
            contentClassName
          )}
        >
          <CompanyCardContent company={company} />
          <HoverCard.Arrow className="fill-border" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

function CompanyCardContent({ company }: { company: CompanyKey }) {
  const meta = companies[company];

  return (
    <div>
      <div className="h-20 bg-muted relative">
        {meta.bannerImage ? (
          <Image
            src={meta.bannerImage}
            alt=""
            fill
            sizes="320px"
            className="object-cover"
            priority={false}
          />
        ) : null}
      </div>

      <div className="p-4 pt-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-foreground truncate">{meta.name}</p>
              {meta.website ? (
                <Link
                  href={meta.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Open ${meta.name} website`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground leading-snug">{meta.tagline}</p>
          </div>
        </div>

        {meta.focus?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {meta.focus.slice(0, 3).map((item) => (
              <span
                key={item}
                className="px-2 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {meta.highlights?.length ? (
          <div className="mt-4">
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {meta.highlights.map((h) => (
                <li key={h.label} className="flex gap-2">
                  <span className="text-muted-foreground">{h.label}:</span>
                  <span className="font-semibold">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {meta.caseStudies?.length ? (
          <div className="mt-4">
            <div className="mt-2 flex flex-col gap-2">
              {meta.caseStudies.map((cs) => (
                <Link
                  key={cs.href}
                  href={cs.href}
                  className="inline-flex items-center justify-between rounded-xl border border-border bg-background hover:bg-muted px-3 py-2 text-sm font-semibold text-foreground transition-colors"
                >
                  <span className="truncate">{cs.label}</span>
                  <span className="text-muted-foreground">→</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

