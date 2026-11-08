"use client"

import { useRouter } from "next/navigation"
import { MapPin, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

type HeroSearchFormProps = {
  keyword: string
  location: string
  onKeywordChange: (value: string) => void
  onLocationChange: (value: string) => void
}

const HeroSearchForm = ({
  keyword,
  location,
  onKeywordChange,
  onLocationChange,
}: HeroSearchFormProps) => {
  const router = useRouter()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const params = new URLSearchParams({ quary: keyword, location })
        router.push(`/jobs?${params.toString()}`)
      }}
      className="mx-auto flex items-center justify-between w-full max-w-2xl flex-col gap-2 rounded-full border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm transition-colors focus-within:border-white/20 focus-within:bg-white/[0.07] sm:flex-row sm:items-center"
    >
      {/* Keyword */}
      <div className="relative h-10 sm:h-9  sm:flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/50" />
        <Input
          type="text"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="Job title, skill or company"
          className="h-full! border-transparent! bg-transparent! pl-10! text-white placeholder:text-white/40 focus-visible:border-transparent! focus-visible:ring-0!"
        />
      </div>

      <Separator orientation="vertical" className="hidden h-6 bg-white/15! sm:block" />

      {/* Location */}
      <div className="relative h-10 sm:h-9 sm:flex-1">
        <MapPin className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/50" />
        <Input
          type="text"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="Location or Remote"
          className="h-full! border-transparent! bg-transparent! pl-10! text-white placeholder:text-white/40 focus-visible:border-transparent! focus-visible:ring-0!"
        />
      </div>

      <Button
        type="submit"
        aria-label="Search jobs"
        size="icon-sm"
        className="size-10! shrink-0 rounded-xl! bg-violet-600! text-white! hover:bg-violet-700! sm:size-9!"
      >
        <Search />
      </Button>
    </form>
  )
}

export default HeroSearchForm
