import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AcquisitionInfo = {
  acquirerName: string;
  acquirerUrl: string;
  /** Optional wordmark; when set, shown instead of `acquirerName` text. */
  acquirerLogo?: string;
};

/** Matches the “View project” control and the hero acquired badge on project pages. */
export const projectHeroCtaClassName =
  "inline-flex h-10 w-fit max-w-full items-center justify-center gap-2 rounded-full border-2 border-border bg-background px-4 font-semibold text-foreground transition-colors hover:bg-muted";

/** Homepage card: compact text row, no pill border/background. */
const projectCardAcquiredClassName =
  "inline-flex w-fit max-w-full items-center gap-1 text-[11px] font-semibold leading-tight text-muted-foreground transition-colors hover:text-foreground sm:text-xs";

type AcquiredBadgeProps = AcquisitionInfo & {
  /** `card`: span (card is wrapped in a link). `hero`: link to acquirer. */
  variant: "card" | "hero";
  className?: string;
};

export function AcquiredBadge({
  acquirerName,
  acquirerUrl,
  acquirerLogo,
  variant,
  className,
}: AcquiredBadgeProps) {
  const isHero = variant === "hero";
  const iconClass = isHero ? "h-4 w-4" : "h-3 w-3";

  const acquirerMark = acquirerLogo ? (
    <img
      src={acquirerLogo}
      alt={acquirerName}
      className={cn(
        "block h-3 w-auto max-w-[5.25rem] object-contain object-left sm:h-3.5 sm:max-w-[6rem] dark:brightness-110",
        isHero && "h-[1.35rem] max-w-[6.5rem] sm:h-5 sm:max-w-[7.5rem]"
      )}
      decoding="async"
    />
  ) : (
    <span className="text-foreground">{acquirerName}</span>
  );

  const label = (
    <>
      <span className="text-muted-foreground">Acquired by </span>
      {acquirerMark}
      <ArrowUpRight className={cn("shrink-0", iconClass)} aria-hidden="true" />
    </>
  );

  if (isHero) {
    return (
      <Link
        href={acquirerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(projectHeroCtaClassName, className)}
      >
        {label}
        <span className="sr-only">
          Acquired by {acquirerName} (opens in new tab)
        </span>
      </Link>
    );
  }

  return (
    <span
      className={cn(projectCardAcquiredClassName, className)}
      title={`Acquired by ${acquirerName} — open case study for Employ link`}
    >
      {label}
    </span>
  );
}
