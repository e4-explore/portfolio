"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { companies, type CompanyKey } from "@/data/companies";
import { CompanyHoverCard } from "./company-hover-card";

interface ClientLogosProps {
  className?: string;
}

export function ClientLogos({ className }: ClientLogosProps) {
  const logoCompanies: CompanyKey[] = [
    "Demandwell",
    "Pillar",
    "Upperhand",
    "Apex",
    "Colaboratory",
    "High Alpha",
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-12",
        className
      )}
    >
      {logoCompanies.map((key) => {
        const company = companies[key];
        const logo = company.logo;
        if (!logo) return null;

        return (
          <CompanyHoverCard
            key={company.name}
            company={key}
            touchBehavior="toggle"
            trigger={
              <button
                type="button"
                className={cn(
                  "group relative flex items-center rounded-lg outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[var(--role-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  logo.heightClassName
                )}
                aria-label={`Open ${company.name} summary`}
              >
                <Image
                  src={logo.lightSrc || "/placeholder.svg"}
                  alt={company.name}
                  width={240}
                  height={logo.height}
                  className={cn(
                    logo.heightClassName,
                    "w-auto object-contain transition-all duration-200",
                    "grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
                    "group-data-[open=true]:grayscale-0 group-data-[open=true]:opacity-100",
                    "dark:hidden"
                  )}
                />
                <Image
                  src={logo.darkSrc || "/placeholder.svg"}
                  alt={company.name}
                  width={240}
                  height={logo.height}
                  className={cn(
                    logo.heightClassName,
                    "w-auto object-contain transition-all duration-200",
                    "grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
                    "group-data-[open=true]:grayscale-0 group-data-[open=true]:opacity-100",
                    "hidden dark:block"
                  )}
                />
              </button>
            }
          />
        );
      })}
    </div>
  );
}
