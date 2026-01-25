"use client";

import Link from "next/link";
import type React from "react";
import { companies, type CompanyKey } from "@/data/companies";
import { CompanyHoverCard } from "./company-hover-card";

type CompanyHoverLinkProps = {
  company: CompanyKey;
  className?: string;
  children?: React.ReactNode;
};

export function CompanyHoverLink({ company, className, children }: CompanyHoverLinkProps) {
  const meta = companies[company];
  const href = meta.website ?? "#";

  return (
    <CompanyHoverCard
      company={company}
      touchBehavior="open-then-follow"
      align="start"
      side="top"
      sideOffset={10}
      trigger={
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={className}
          aria-label={`${company} summary`}
        >
          {children ?? company}
        </Link>
      }
    />
  );
}

