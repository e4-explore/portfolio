import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookOpen, Dribbble, FileText, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

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

const CONTACT_EMAIL = "ethanphilipgrove@gmail.com";

const helpfulLinks = [
  { label: "Resume", href: "/Grove_Resume_2023.pdf", icon: FileText },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ethangrove/", icon: Linkedin },
  { label: "Twitter", href: "https://x.com/e4_explore", icon: XIcon },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: "Dribbble", href: "https://dribbble.com/ethangrove", icon: Dribbble },
  { label: "Medium", href: "https://medium.com/@ethanphilipgrove", icon: BookOpen },
];

export function AboutSection() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading className="mb-12">
          Here is some info about my background...
        </SectionHeading>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <Reveal delayMs={90}>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/me.jpg"
              alt="Ethan Grove"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Content */}
        <div className="space-y-6">
          <Reveal delayMs={180}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In 2016 after completing a double major in Graphic Design/Illustration, with a minor in Marketing, I moved to Indianapolis to pursue a career in design. Since then, I have navigated through various avenues of design to get to where I am today.
            </p>
          </Reveal>

          <Reveal delayMs={270}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently, I live about 20 minutes south of Indy with my wife, Hanna, and our dog, Leo.
              Besides faith, family and friends the most important thing to me is learning and growing every day.
            </p>
          </Reveal>

          <Reveal delayMs={360}>
            {/* Helpful Links */}
            <div className="mt-16">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Helpful links
              </h3>
              <ul className="flex flex-wrap gap-3">
                {helpfulLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={
                        link.href.startsWith("http") || link.href.toLowerCase().endsWith(".pdf")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        link.href.startsWith("http") || link.href.toLowerCase().endsWith(".pdf")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-accent rounded-full transition-all duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
