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
    href: "/resume.pdf",
    icon: FileText,
  },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="container-default section-padding">
        <div className="flex flex-col items-center gap-8">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy;{new Date().getFullYear()} Ethan Philip Grove
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
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-accent rounded-full transition-all duration-200"
    >
      <Icon className="w-4 h-4" />
      <span>{name}</span>
    </Link>
  );
}
