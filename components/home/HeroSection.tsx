"use client"

import { useState } from "react"
import { Badge } from "../ui/badge"
import HeroSearchForm from "./HeroSearchForm"
import { cn } from "@/lib/utils"

const trendingKeywords = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const activePillClasses = "border-white/20 bg-white/10 text-white"
const inactivePillClasses =
  "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/10 hover:text-white"

const HeroSection = () => {
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  console.log("keyword",keyword,"location",location)

  return (
    <section className="relative overflow-hidden bg-[#08080c] px-4 py-24 text-white">
      {/* Decorative stars */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 20%, rgba(255,255,255,0.45) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 38% 12%, rgba(255,255,255,0.3) 50%, transparent 51%)," +
            "radial-gradient(1.5px 1.5px at 66% 32%, rgba(255,255,255,0.4) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 86% 62%, rgba(255,255,255,0.3) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 24% 72%, rgba(255,255,255,0.25) 50%, transparent 51%)," +
            "radial-gradient(1.5px 1.5px at 55% 88%, rgba(255,255,255,0.25) 50%, transparent 51%)",
          backgroundSize: "600px 420px",
        }}
      />

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
