import {
  Banknote,
  Briefcase,
  Building2,
  CalendarDays,
  Cloud,
  Code2,
  Landmark,
  Laptop,
  MapPin,
  Megaphone,
  PenTool,
  Settings2,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { IJobData } from "@/lib/type/type"
import {
  formatCompensation,
  formatDeadline,
  formatJobType,
} from "@/lib/jobs/filters"
import JobSaveButton from "./JobSaveButton"

type CategoryMeta = {
  icon: LucideIcon
  tile: string
}

const categoryMeta: Record<string, CategoryMeta> = {
  "Engineering & Tech": {
    icon: Code2,
    tile: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },
  Design: {
    icon: PenTool,
    tile: "border-orange-500/20 bg-orange-500/10 text-orange-400",
  },
  Product: {
    icon: Cloud,
    tile: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  },
  Marketing: {
    icon: Megaphone,
    tile: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400",
  },
  Sales: {
    icon: TrendingUp,
    tile: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  Operations: {
    icon: Building2,
    tile: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  },
  Finance: {
    icon: Landmark,
    tile: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
  "Human Resources": {
    icon: UsersRound,
    tile: "border-pink-500/20 bg-pink-500/10 text-pink-400",
  },
  Other: {
    icon: Settings2,
    tile: "border-teal-500/20 bg-teal-500/10 text-teal-400",
  },
}

const defaultCategoryMeta: CategoryMeta = {
  icon: Briefcase,
  tile: "border-white/10 bg-white/[0.04] text-white/50",
}

const pillClass =
  "h-7! gap-1.5! rounded-md! border-white/10! bg-white/[0.04]! px-2.5! text-xs! font-normal! text-white/70!"

const pillIconClass = "size-3.5! text-violet-400"

const JobCard = ({ job }: { job: IJobData }) => {
  const meta = categoryMeta[job.category] ?? defaultCategoryMeta
  const Icon = meta.icon

  return (
    <article className="relative rounded-xl border border-white/[0.08] bg-[#0d0e14] p-4 transition-colors duration-200 hover:border-white/[0.18] sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-lg border",
            meta.tile
          )}
          aria-hidden
        >
          <Icon className="size-5" />
        </span>

        <div className="min-w-0 flex-1 pr-8 sm:pr-10">
          <h2 className="truncate text-base font-semibold tracking-tight text-white sm:text-lg">
            {job.title}
          </h2>

          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-white/45">
            <span className="font-medium text-white/70">{job.companyName}</span>
            <span aria-hidden>•</span>
            <span className="inline-flex min-w-0 items-center gap-1">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {job.location}
              {job.isRemote ? " (Remote)" : ""}
            </span>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={pillClass}>
              <Banknote className={pillIconClass} aria-hidden />
              {formatCompensation(job)}
            </Badge>

            <Badge variant="outline" className={pillClass}>
              <Briefcase className={pillIconClass} aria-hidden />
              {formatJobType(job.jobType)}
            </Badge>

            {job.isRemote && (
              <Badge variant="outline" className={pillClass}>
                <Laptop className={pillIconClass} aria-hidden />
                Remote
              </Badge>
            )}

            <Badge
              variant="outline"
              className="h-7! gap-1.5! rounded-md! border-white/10! bg-white/[0.04]! px-2.5! text-xs! font-normal! text-white/50!"
            >
              <CalendarDays className="size-3.5! text-white/35" aria-hidden />
              Apply by {formatDeadline(job.deadline)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <JobSaveButton />
      </div>
    </article>
  )
}

export default JobCard
