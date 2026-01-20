import Link from "next/link";
import { ClientLogos } from "./client-logos";
import { RoleDropdown } from "./role-dropdown";

export function HeroSection() {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="container-default">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              👋 Hi, I'm Ethan
            </h1>
          </div>

          {/* Title & Description */}
          <div className="space-y-6 mb-12">
            <div className="flex flex-col gap-2">
              <div className="text-xl md:text-2xl text-muted-foreground">
                <RoleDropdown />
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground">
                based in Indianapolis, IN.
              </p>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl px-0">
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
              enhance its core functionality to unify several coach and athlete tools—developing
              strategy and delivering features to enhance the competitive sports experience for
              parents and fans.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl px-0">
              In the past, I have teamed up with many amazing individuals to create engaging
              digital solutions that not only solve problems but also delight users.
            </p>
          </div>

          {/* Client Logos */}
          <ClientLogos className="mb-12" />

          {/* Industries */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
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
