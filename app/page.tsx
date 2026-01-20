import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { WorkSection } from "@/components/home/work-section";
import { AboutSection } from "@/components/home/about-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WorkSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
