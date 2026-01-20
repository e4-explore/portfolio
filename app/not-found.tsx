import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center">
        <Section className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! This page doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-muted-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Section>
      </main>
      <Footer />
    </>
  );
}
