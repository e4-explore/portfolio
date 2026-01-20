import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExternalLink } from "lucide-react";

const helpfulLinks = [
  { label: "Resume", href: "/resume.pdf" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ethangrove/" },
  { label: "Twitter", href: "https://x.com/e4_explore" },
  { label: "Email", href: "mailto:ethanphilipgrove@gmail.com" },
  { label: "Dribbble", href: "https://dribbble.com/ethangrove" },
  { label: "Medium", href: "https://medium.com/@ethanphilipgrove" },
];

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading className="mb-12">
        Here is some info about my background...
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
          <Image
            src="/images/ethan-about.jpg"
            alt="Ethan Grove"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          

          <p className="text-lg text-muted-foreground leading-relaxed">
            After completing a double major in Graphic Design and Illustration, with a minor in Marketing, in 2016 I moved to Indianapolis to pursue a career in design. Since then, I have navigated through various avenues of design to get to where I am today.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Currently, I live in{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Greenwood,_Indiana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium link-underline"
            >
              Greenwood
            </Link>
            , which is about 20 minutes south of Indy, with my wife, Hanna, and our dog, Leo.
            Besides faith and family, the most important thing to me is learning and growing every day as a designer and as a person.
          </p>

          {/* Helpful Links */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Helpful links
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {helpfulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors group"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="link-underline">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
