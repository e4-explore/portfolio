"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ConceptPrototype } from "@/data/concepts";
import { cn } from "@/lib/utils";

export function PrototypeEmbed({ prototype }: { prototype: ConceptPrototype }) {
  const [active, setActive] = useState(prototype.iterations.length - 1);
  const iteration = prototype.iterations[active];
  const isMobile = prototype.viewport === "mobile";

  return (
    <figure className="rounded-2xl border border-border bg-card p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Prototype iterations" className="flex flex-wrap gap-1 rounded-full bg-muted p-1">
          {prototype.iterations.map((it, i) => (
            <button
              key={it.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                i === active
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {it.label}
            </button>
          ))}
        </div>
        {iteration.url && (
          <a
            href={iteration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Open in new tab
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      {iteration.note && (
        <p className="mb-4 max-w-3xl text-[0.95rem] text-muted-foreground leading-relaxed">{iteration.note}</p>
      )}

      <div
        className={cn(
          "relative mx-auto overflow-hidden border border-border bg-background",
          isMobile
            ? "w-full max-w-[390px] h-[min(780px,80vh)] rounded-[2rem]"
            : "w-full h-[min(720px,75vh)] rounded-xl"
        )}
      >
        {iteration.url ? (
          <iframe
            key={iteration.url}
            src={iteration.url}
            title={`${prototype.title ?? "Prototype"} — ${iteration.label}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
            {iteration.label} — prototype link coming soon
          </div>
        )}
      </div>
    </figure>
  );
}
