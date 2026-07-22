import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { getConceptBySlug, getAllConceptSlugs } from "@/data/concepts";

interface ApproachPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllConceptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ApproachPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    return { title: "Not Found" };
  }

  return {
    title: `${concept.label} - Ethan Grove`,
    description: concept.summary,
  };
}

export default async function ApproachPage({ params }: ApproachPageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  const detail = concept.detail;

  return (
    <>
      <Header />
      <main className="pt-4">
        {/* Hero */}
        <Section className="pt-16 md:pt-24">
          <Reveal delayMs={0}>
            {concept.eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {concept.eyebrow}
              </p>
            )}
            <SectionHeading size="xl" as="h1" className="mb-4">
              {concept.label}
            </SectionHeading>
          </Reveal>

          {detail?.subtitle && (
            <Reveal delayMs={90}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                {detail.subtitle}
              </p>
            </Reveal>
          )}

          {detail?.intro && (
            <Reveal delayMs={160}>
              <div className="space-y-4 mt-8 max-w-3xl">
                {detail.intro.split("\n\n").map((para, i) => (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          )}

          {/* Key points */}
          {concept.points && concept.points.length > 0 && (
            <Reveal delayMs={230}>
              <ul className="space-y-3 mt-8 max-w-3xl">
                {concept.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-lg text-muted-foreground">{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </Section>

        {/* Detail sections */}
        {detail?.sections?.map((s, index) => {
          const variant = index % 2 === 0 ? "alt" : "default";
          return (
            <Section key={s.title} variant={variant}>
              <div className="relative z-10 max-w-3xl">
                <Reveal delayMs={0}>
                  <SectionHeading size="md" className="mb-6">
                    {s.title}
                  </SectionHeading>
                </Reveal>
                <Reveal delayMs={90}>
                  <div className="space-y-4">
                    {s.body.split("\n\n").map((para, i) => (
                      <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
                {s.image && (
                  <Reveal delayMs={180}>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted mt-8">
                      <Image
                        src={s.image}
                        alt={s.imageAlt || s.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                )}
              </div>
            </Section>
          );
        })}

        {/* Back to source */}
        {concept.source && (
          <Section variant="default">
            <Reveal delayMs={0}>
              <Link
                href={concept.source.href}
                className="inline-flex items-center gap-2 font-semibold link-underline"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to {concept.source.label}
              </Link>
            </Reveal>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}
