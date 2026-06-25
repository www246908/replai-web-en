import Hero from "@/components/sections/Hero";
import MarqueeBanner from "@/components/shared/MarqueeBanner";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import CtaSection from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CtaSection />
    </main>
  );
}