import { ClientLogos } from "./client-logos";
import { RoleDropdown } from "./role-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { MapPin } from "lucide-react";
import { CompanyHoverLink } from "./company-hover-link";
import { Reveal } from "@/components/ui/reveal";
import { TextLink, textLinkClassName } from "@/components/ui/text-link";

export function HeroSection() {
  return (
    <section className="relative pt-0 pb-16 md:pb-24" data-reveal="off">
      <div className="container-default">
        <div className="mx-auto">
          {/* Greeting */}
          <Reveal immediate delayMs={0}>
            <div className="flex items-center gap-4 mb-5 md:mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                👋 Hi, I'm Ethan
              </h1>
            </div>
          </Reveal>

          {/* Title & Description */}
          <div className="mb-12">
            <div className="flex flex-col gap-0">
              <Reveal immediate delayMs={80} className="relative z-[200]">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-4 text-muted-foreground">
                  <RoleDropdown />
                  <span className="text-muted-foreground text-2xl md:text-4xl">by</span>
                  <ThemeToggle />
                </div>
              </Reveal>

              <Reveal immediate delayMs={160}>
                <div className="flex items-center gap-3 mt-4 mb-10 md:mt-6 md:mb-16 ml-1">
                  <MapPin className="w-6 h-6 md:w-9 md:h-9 text-foreground" aria-hidden="true" />
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                    Based in Indiana
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="space-y-6">
              <Reveal immediate delayMs={240}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed px-0">
                  I'm a versatile designer who clears ambiguity and helps teams ship. Currently
                  I'm helping{" "}
                  <CompanyHoverLink company="Hudl" className={textLinkClassName}>
                    Hudl
                  </CompanyHoverLink>{" "}
                  shape strategy and deliver features for parents and fans of competitive sports.
                </p>
              </Reveal>

              <Reveal immediate delayMs={320}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed px-0">
                  Before that, I teamed up with great people to build products that solve problems
                  and delight users.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Client Logos */}
          <Reveal immediate delayMs={400}>
            <ClientLogos className="mt-16 mb-20 md:mt-20 md:mb-20" />
          </Reveal>

          {/* Industries */}
          <Reveal immediate delayMs={480}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I've worked across marketing, HR, and sports and fitness, solving problems around
              scheduling, payments, reporting, monitoring, video analysis, and more.
            </p>
          </Reveal>

          <Reveal immediate delayMs={560}>
            <p className="text-base md:text-lg text-muted-foreground mt-4">
              Looking for something not listed below?{" "}
              <TextLink href="#contact">Reach out</TextLink>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
