import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SORT_OPTIONS } from "@/lib/jobs/filters"

const JobSort = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs whitespace-nowrap text-white/40 sm:inline">
        Sort by:
      </span>

      <Select defaultValue="recent">
        <SelectTrigger
          size="sm"
          aria-label="Sort jobs"
          className="h-8! min-w-[140px]! rounded-lg! border-white/10! bg-[#0d0e14]! px-2.5! text-xs! text-white! shadow-none! hover:bg-white/5! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20! [&_svg]:text-white/40!"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent align="end">
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default JobSort
