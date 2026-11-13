import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const JobSearch = () => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-[#0d0e14] p-2 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
          aria-hidden
        />
        <Input
          type="search"
          name="search"
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs by title or keyword"
          className="h-12! w-full rounded-lg! border-white/10! bg-[#101218]! pr-3! pl-10! text-sm! text-white! shadow-none! placeholder:text-white/30! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20!"
        />
      </div>

      <Button
        type="submit"
        className="h-12! shrink-0 rounded-lg! bg-white! px-6! text-sm! font-semibold! text-[#0b0d12]! hover:bg-white/90! focus-visible:ring-white/30! sm:w-auto!"
      >
        Search Jobs
      </Button>
    </div>
  )
}

export default JobSearch
