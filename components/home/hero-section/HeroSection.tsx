"use client"

import { useState } from "react"
import { Badge } from "../../ui/badge"
import HeroSearchForm from "./HeroSearchForm"
import { cn } from "@/lib/utils"

const trendingKeywords = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const activePillClasses = "border-white/20 bg-white/10 text-white"
const inactivePillClasses =
  "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/10 hover:text-white"

const HeroSection = () => {
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section className="relative px-4 py-24 text-white">
    

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
          <HeroSearchForm
            keyword={keyword}
            location={location}
            onKeywordChange={setKeyword}
            onLocationChange={setLocation}
          />
        </div>

        {/* Trending keywords */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-white/50">Trending Position</span>
          {trendingKeywords.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setKeyword(label)}
              className={cn(
                "h-8 rounded-full border px-4 text-xs transition-colors",
                keyword ? keyword === label : index === 0 ? activePillClasses : inactivePillClasses
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
