import Link from "next/link"
import { Badge } from "../../ui/badge"
import HeroSearchForm from "./HeroSearchForm"

const trendingKeywords = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

// server component: all hero markup is static; the trending pills are plain
// links into /jobs so the section ships zero client JS. The search form is the
// only interactive island (client, see HeroSearchForm).
const HeroSection = () => {
  return (
    <section className="relative px-4 py-24 text-white">
      {/* Bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[110px]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        {/* Announcement pill */}
        <Badge className="h-9! gap-2.5! rounded-4xl border-white/10! bg-white/[0.06]! px-4! text-white!">
          <span aria-hidden className="text-base leading-none">
            🧳
          </span>
          <strong className="text-sm font-semibold">50,000+</strong>
          <span className="font-mono text-xs tracking-[0.2em] text-white/50">
            NEW JOBS THIS MONTH
          </span>
        </Badge>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm text-white/60 sm:text-base sm:leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <div className="mt-6 w-full">
          <HeroSearchForm />
        </div>

        {/* Trending keywords */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-white/50">Trending Position</span>
          {trendingKeywords.map((label) => (
            <Link
              key={label}
              href={`/jobs?q=${encodeURIComponent(label)}`}
              className="h-8 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs leading-8 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
