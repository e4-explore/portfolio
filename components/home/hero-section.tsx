import Link from "next/link";
import { ClientLogos } from "./client-logos";
import { RoleDropdown } from "./role-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-0 pb-16 md:pb-24">
      <div className="container-default">
        <div className="mx-auto">
          {/* Greeting */}
          <div className="flex items-center gap-4 mb-5 md:mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              👋 Hi, I'm Ethan
            </h1>
          </div>

          {/* Title & Description */}
          <div className="mb-12">
            <div className="flex flex-col gap-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-4 text-muted-foreground">
                <RoleDropdown />
                <span className="text-muted-foreground text-2xl md:text-4xl">by</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-3 mt-4 mb-10 md:mt-6 md:mb-16">
                <MapPin className="w-7 h-7 md:w-8 md:h-8 text-foreground" aria-hidden="true" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Based in Indiana
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed px-0">
                I'm a versatile designer who clears ambiguity and helps teams ship products.
                Currently, I am helping{" "}
                <Link
                  href="https://www.hudl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium link-underline"
                >
                  Hudl
                </Link>{" "}
                <span className="line-through">
                  enhance its core functionality to unify several coach and athlete tools
                </span>{" "}
                develop
                strategy and deliver features to enhance the competitive sports experience for
                parents and fans.
              </p>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed px-0">
                In the past, I have teamed up with many amazing individuals to create engaging
                digital solutions that not only solve problems but also delight users.
              </p>
            </div>
          </div>

          {/* Client Logos */}
          <ClientLogos className="mt-16 mb-20 md:mt-20 md:mb-20" />

          {/* Industries */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            I have worked in a variety of industries, ranging from marketing to HR to sports
            and fitness, where I have helped solve user problems related to scheduling,
            payments, reporting, monitoring, video analysis, and more.
          </p>

          <p className="text-base md:text-lg text-muted-foreground mt-4">
            If there is something specific that you would like to see, but it is not listed
            below, please do not hesitate to{" "}
            <Link href="#contact" className="text-foreground font-medium link-underline">
              reach out to me
            </Link>
            !
          </p>
        </div>
      </div>
    </section>
  );
}
