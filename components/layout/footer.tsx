import React from "react";
import Link from "next/link";
import { Linkedin, Mail, Dribbble, FileText, BookOpen } from "lucide-react";

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/groveep/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://x.com/e4_explore",
    icon: XIcon,
  },
  {
    name: "Email",
    href: "mailto:ethanphilipgrove@gmail.com",
    icon: Mail,
  },
  {
    name: "Medium",
    href: "https://medium.com/@ethanphilipgrove",
    icon: BookOpen,
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/groveep",
    icon: Dribbble,
  },
  {
    name: "Resume",
    href: "/Grove_Resume_2023.pdf",
    icon: FileText,
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-background border-0 border-none before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-[repeating-linear-gradient(90deg,var(--border)_0_12px,transparent_12px_24px)]"
    >
      <div className="container-default pt-12 pb-20">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          {/* Social Links */}
          <div className="grid grid-cols-3 gap-4 place-items-center md:flex md:flex-wrap md:justify-end">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </div>

          {/* Copyright */}
          <p className="text-5xl font-semibold text-foreground w-full text-center md:w-auto md:text-left md:order-first">
            &copy;{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  name,
  href,
  icon: Icon,
}: {
  name: string;
  href: string;
  icon: React.ElementType;
}) {
  const isExternal = href.startsWith("http");
  const isPdf = href.toLowerCase().endsWith(".pdf");
  return (
    <Link
      href={href}
      target={isExternal || isPdf ? "_blank" : undefined}
      rel={isExternal || isPdf ? "noopener noreferrer" : undefined}
      aria-label={name}
      title={name}
      className="inline-flex items-center justify-center p-3 text-muted-foreground hover:text-foreground rounded-full transition-colors hover:bg-muted"
    >
      <Icon className="w-5 h-5" />
      <span className="sr-only">{name}</span>
    </Link>
  );
}
