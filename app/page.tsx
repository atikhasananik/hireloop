import HeroSection from "@/components/home/HeroSection"
import GlobeSection from "@/components/home/GlobeSection"
import GlobeBackground from "@/components/home/GlobeBackground"

export default function Page() {
  return (
    <main className="relative isolate bg-[#08080c] text-white">
      {/* globe background behind the whole page (first screen) */}
      <GlobeBackground />

      <div className="relative z-10">
        <HeroSection />
        <GlobeSection />
      </div>
    </main>
  )
}
