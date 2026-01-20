"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={
        isHome
          ? "relative z-50"
          : "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
      }
    >
      <div className="container-default">
        <nav className={isHome ? "flex items-center justify-end h-16 md:h-20" : "flex items-center justify-between h-16 md:h-20"}>
          {/* Logo (hidden on home) */}
          {!isHome && (
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-semibold text-foreground hidden sm:block">
                👋 Hi, I'm Ethan<br />
              </span>
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/#work">WORK</NavLink>
            <NavLink href="https://windows-ep.vercel.app/">NOT WORK</NavLink>
            <NavLink href="/#about">ME</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <MobileNavLink href="/#work" onClick={() => setMobileMenuOpen(false)}>
                WORK
              </MobileNavLink>
              <MobileNavLink
                href="https://windows-ep.vercel.app/"
                onClick={() => setMobileMenuOpen(false)}
              >
                NOT WORK
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
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
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
