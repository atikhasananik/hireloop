"use client"

import { useRouter } from "next/navigation"
import { MapPin, Search } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Separator } from "../../ui/separator"

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
        const params = new URLSearchParams({ q: keyword, location })
        router.push(`/jobs?${params.toString()}`)
      }}
      className="mx-auto flex w-full max-w-2xl flex-col gap-2 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/10 sm:bg-white/[0.04] sm:p-2 sm:backdrop-blur-sm sm:transition-colors sm:focus-within:border-white/20 sm:focus-within:bg-white/[0.07]"
    >
      {/* Keyword */}
      <div className="relative flex h-12 items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors focus-within:border-white/25 sm:h-9 sm:flex-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:focus-within:border-transparent">
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
      <div className="relative flex h-12 items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors focus-within:border-white/25 sm:h-9 sm:flex-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:focus-within:border-transparent">
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
        className="h-12! w-full! shrink-0 justify-center gap-2 rounded-xl! bg-violet-600! text-white! hover:bg-violet-700! sm:h-9! sm:w-9!"
      >
        <Search />
        <span className="sm:hidden">Search</span>
      </Button>
    </form>
  )
}

export default HeroSearchForm
