import HeroSection from "@/components/home/hero-section/HeroSection"
import GlobeSection from "@/components/home/globe-section/GlobeSection"
import DiscoverySection from "@/components/home/discovery-section/DiscoverySection"
import FeaturesSection from "@/components/home/features-section/FeaturesSection"
import PricingSection from "@/components/home/pricing-section/PricingSection"
import CtaSection from "@/components/home/cta-section/CtaSection"
import GlobeBackground from "@/components/home/globe-section/GlobeBackground"

export default function Page() {
  return (
    <main className="relative isolate overflow-x-clip bg-[#08080c] text-white">
      {/* globe background behind the whole page (first screen) */}
      <GlobeBackground />

      <div className="relative z-10">
        <HeroSection />
        <GlobeSection />
        <DiscoverySection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection createAccountHref="/jobs" />
      </div>
    </main>
  )
}
