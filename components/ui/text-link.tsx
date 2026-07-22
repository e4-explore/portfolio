import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared inline text-link styling used across the site: foreground text with an
 * underline that adopts the current role accent (`--link-underline`, driven by
 * the RoleDropdown on the homepage and the default role accent elsewhere).
 */
export const textLinkClassName = "font-medium link-underline";

type TextLinkProps = ComponentProps<typeof Link> & {
  className?: string;
};

export function TextLink({ className, ...props }: TextLinkProps) {
  return <Link className={cn(textLinkClassName, className)} {...props} />;
}
