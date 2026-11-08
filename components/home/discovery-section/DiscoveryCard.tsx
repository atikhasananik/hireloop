import Link from "next/link"
import { ArrowRight, Building2, Laptop, MapPin, type LucideIcon } from "lucide-react"
import { Badge } from "../../ui/badge"
import { Card, CardContent } from "../../ui/card"

export type WorkType = "Remote" | "Hybrid" | "Onsite"

export type DiscoveryJob = {
  title: string
  description: string
  location: string
  workType: WorkType
  pay: string
  /** slug used for the `?category=` param on /jobs */
  category: string
}

const workTypeIcons: Record<WorkType, LucideIcon> = {
  Remote: Laptop,
  Hybrid: Building2,
  Onsite: Building2,
}

const pillClasses =
  "h-7! gap-1.5! rounded-md! border-white/10! bg-white/[0.05]! px-2.5! text-xs! font-normal! text-white/80!"
const pillIconClasses = "size-3.5! text-violet-400"

const DiscoveryCard = ({ job }: { job: DiscoveryJob }) => {
  const WorkIcon = workTypeIcons[job.workType]

  return (
    <Link href={`/jobs?category=${job.category}`} className="block outline-none">
      <Card className="h-full bg-[#0d0e14]! py-0! ring-white/10! transition-all duration-200 hover:-translate-y-1 hover:ring-white/25!">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <h3 className="text-lg font-semibold text-white sm:text-xl">{job.title}</h3>

          <p className="text-[13px] leading-relaxed text-white/55">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            <Badge className={pillClasses}>
              <MapPin className={pillIconClasses} />
              {job.location}
            </Badge>
            <Badge className={pillClasses}>
              <WorkIcon className={pillIconClasses} />
              {job.workType}
            </Badge>
            <Badge className={pillClasses}>
              <span aria-hidden className="text-sm leading-none text-violet-400">
                {job.pay.charAt(0)}
              </span>
              {job.pay.slice(1)}
            </Badge>
          </div>

          <div className="mt-auto  hover:scale-105 transition-all duration-150 flex items-center gap-1.5 pt-1 text-sm font-medium text-white">
            Apply Now
            <ArrowRight className="size-4 text-violet-400" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default DiscoveryCard
