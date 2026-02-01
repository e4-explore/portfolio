"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isProjectPage = pathname.startsWith("/work/");

  useEffect(() => {
    if (isHome) return;

    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={
        isHome
          ? "relative z-50"
          : isProjectPage
            ? `fixed top-0 left-0 right-0 z-50 transition-colors ${
                isScrolled
                  ? "bg-background/70 supports-[backdrop-filter]:bg-background/60 backdrop-blur-md border-b border-border/40"
                  : "bg-transparent"
              }`
            : "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
      }
    >
      <div className="container-default">
        <nav
          className={
            isHome
              ? "flex items-center justify-end h-16 md:h-20 pt-4"
              : "flex items-center justify-between h-16 md:h-20 pt-4"
          }
        >
          {/* Logo (hidden on home) */}
          {!isHome && (
            <>
              {isProjectPage ? (
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex h-10 items-center gap-2 px-4 rounded-full border border-border bg-background hover:bg-muted text-foreground font-semibold transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">Back</span>
                </button>
              ) : (
                <Link href="/" className="flex items-center gap-2 group">
                  <span className="text-lg font-semibold text-foreground hidden sm:block">
                    👋 Hi, I'm Ethan<br />
                  </span>
                </Link>
              )}
            </>
          )}

          {/* Navigation */}
          {isProjectPage ? (
            <ThemeToggle variant="nav" />
          ) : isHome ? (
            <div className="flex items-center gap-4">
              {/* Home: show section links on desktop */}
              <div className="hidden md:flex items-center gap-8">
                <NavLink href="/#work">WORK</NavLink>
                <NavLink href="/#about">ME</NavLink>
              </div>
              {/* Keep theme toggle accessible after scrolling */}
              <ThemeToggle variant="nav" />
            </div>
          ) : (
            // Other pages: desktop nav + mobile menu button
            <>
              <div className="hidden md:flex items-center gap-8">
                <NavLink href="/#work">WORK</NavLink>
                <NavLink href="/#about">ME</NavLink>
              </div>

              <button
                type="button"
                className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </nav>

        {/* Mobile Navigation (not on home; not on project pages) */}
        {!isHome && !isProjectPage && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <MobileNavLink href="/#work" onClick={() => setMobileMenuOpen(false)}>
                WORK
              </MobileNavLink>
              <MobileNavLink href="/#about" onClick={() => setMobileMenuOpen(false)}>
                ME
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
    >
      <span className="relative z-10">{children}</span>
      {/* Accent “underline” above text that thickens up to the top of the screen */}
      <span
        className="
          pointer-events-none absolute left-0 right-0 bottom-full
          w-0 h-[3px]
          bg-[var(--role-accent)]
          transition-[width,height,opacity] duration-500 ease-out
          opacity-90
          group-hover:w-full group-hover:h-[100vh]
        "
      />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick: () => void;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-lg font-medium text-foreground hover:text-muted-foreground transition-colors py-2"
    >
      {children}
    </Link>
  );
}
