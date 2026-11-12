import type { Metadata } from "next"
import {
  differenceInCalendarDays,
  format,
  isBefore,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns"
import {
  Briefcase,
  ChevronRight,
  Cloud,
  Code2,
  MapPin,
  Megaphone,
  MoreVertical,
  Pencil,
  PenTool,
  Plus,
  Settings2,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonLink } from "@/components/ui/button-link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getRecruiterJoBData } from "@/lib/curd/get.data"
import { IJobData } from "@/lib/type/type"
import JobAction from "../../_components/recruiter/JobAction"

export const metadata: Metadata = {
  title: "Manage Job Posts · HireLoop",
  description:
    "Review live listings, monitor applicants, and update job details across your organization.",
}

type JobStatus = "Active" | "Expired"



type CategoryMeta = {
  icon: LucideIcon
  tile: string
  department: string
}

const categoryMeta: Record<string, CategoryMeta> = {
  "Engineering & Tech": {
    icon: Code2,
    tile: "border-violet-500/20 bg-violet-500/10 text-violet-400",
    department: "text-violet-400",
  },
  Design: {
    icon: PenTool,
    tile: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    department: "text-orange-400",
  },
  Operations: {
    icon: Cloud,
    tile: "border-sky-500/20 bg-sky-500/10 text-sky-400",
    department: "text-sky-400",
  },
  Marketing: {
    icon: Megaphone,
    tile: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400",
    department: "text-fuchsia-400",
  },
  Other: {
    icon: Settings2,
    tile: "border-teal-500/20 bg-teal-500/10 text-teal-400",
    department: "text-teal-400",
  },
}

const defaultCategoryMeta: CategoryMeta = {
  icon: Briefcase,
  tile: "border-white/10 bg-white/[0.04] text-white/50",
  department: "text-white/45",
}

const getCategoryMeta = (category: string): CategoryMeta =>
  categoryMeta[category] ?? defaultCategoryMeta

const jobTypeLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
}

const formatJobType = (jobType: string) => jobTypeLabels[jobType] ?? jobType

const frequencyUnit: Record<string, string> = {
  hour: "hr",
  month: "mo",
  year: "yr",
}

const statusStyles: Record<JobStatus, { badge: string; dot: string }> = {
  Active: {
    badge: "border-emerald-500/15! bg-emerald-500/10! text-emerald-400!",
    dot: "bg-emerald-400",
  },
  Expired: {
    badge: "border-white/10! bg-white/[0.04]! text-white/45!",
    dot: "bg-white/30",
  },
}

// Build a valid Mongo ObjectId string with a timestamp `daysAgo` days back.
// Mongo ObjectIds start with a 4-byte timestamp, so the first 8 hex characters
// are enough to derive the posted date without adding a field to the document.
const objectIdDaysAgo = (daysAgo: number) => {
  const seconds = Math.floor(Date.now() / 1000) - daysAgo * 24 * 60 * 60
  return `${seconds.toString(16).padStart(8, "0")}${"0".repeat(16)}`
}

const getPostedLabel = (_id: string) => {
  const seconds = Number.parseInt(_id.slice(0, 8), 16)

  if (!Number.isFinite(seconds)) {
    return ""
  }

  const days = differenceInCalendarDays(new Date(), new Date(seconds * 1000))

  if (days <= 0) return "Posted today"
  if (days === 1) return "Posted 1d ago"
  if (days < 7) return `Posted ${days}d ago`

  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `Posted ${weeks}w ago`

  return `Posted ${Math.floor(days / 30)}mo ago`
}

const getStatus = (deadline: string): JobStatus => {
  const date = parseISO(deadline)

  if (!isValid(date)) {
    return "Expired"
  }

  return isBefore(date, startOfToday()) ? "Expired" : "Active"
}

const formatSalary = (value: number) =>
  value >= 1000 ? `€${Math.round(value / 1000)}k` : `€${value}`

const formatCompensation = (job: IJobData) =>
  `${formatSalary(job.minSalary)} – ${formatSalary(job.maxSalary)} / ${
    frequencyUnit[job.frequency] ?? job.frequency
  }`

const formatLocation = (job: IJobData) =>
  job.isRemote ? `Remote (${job.location})` : job.location

const formatDeadline = (deadline: string) => {
  const date = parseISO(deadline)
  return isValid(date) ? format(date, "MMM d, yyyy") : "—"
}

// const jobs: JobRecord[] = [
//   {
//     _id: objectIdDaysAgo(4),
//     title: "Frontend Developer",
//     companyName: "HirePulse Network",
//     category: "Engineering & Tech",
//     jobType: "full-time",
//     isRemote: true,
//     location: "New York, USA",
//     deadline: "2026-12-30",
//     minSalary: 25,
//     maxSalary: 40,
//     frequency: "hour",
//     responsibilities:
//       "Build accessible, responsive interfaces and collaborate with product and backend teams.",
//     qualifications:
//       "3+ years with React, TypeScript, and modern state architectures.",
//     jobPostBy: "recruiter@hirepulse.com",
//     jobPosterRole: "recruiter",
//   },
//   {
//     _id: objectIdDaysAgo(7),
//     title: "Senior Product Designer",
//     companyName: "HirePulse Labs",
//     category: "Design",
//     jobType: "full-time",
//     isRemote: false,
//     location: "London, UK (Hybrid)",
//     deadline: "2027-01-14",
//     minSalary: 90000,
//     maxSalary: 115000,
//     frequency: "year",
//     responsibilities:
//       "Own end-to-end product design and partner closely with engineering and product.",
//     qualifications:
//       "5+ years of product design experience with a strong portfolio.",
//     jobPostBy: "labs@hirepulse.com",
//     jobPosterRole: "recruiter",
//   },
//   {
//     _id: objectIdDaysAgo(14),
//     title: "DevOps Specialist",
//     companyName: "HirePulse Platform",
//     category: "Operations",
//     jobType: "full-time",
//     isRemote: false,
//     location: "Berlin, Germany",
//     deadline: "2026-12-31",
//     minSalary: 95000,
//     maxSalary: 120000,
//     frequency: "year",
//     responsibilities:
//       "Maintain CI/CD pipelines, cloud infrastructure, and production reliability.",
//     qualifications:
//       "Strong experience with cloud platforms, containers, and infrastructure as code.",
//     jobPostBy: "platform@hirepulse.com",
//     jobPosterRole: "recruiter",
//   },
//   {
//     _id: objectIdDaysAgo(5),
//     title: "Product Marketing Lead",
//     companyName: "HirePulse Network",
//     category: "Marketing",
//     jobType: "full-time",
//     isRemote: true,
//     location: "EU/US",
//     deadline: "2027-02-15",
//     minSalary: 80000,
//     maxSalary: 105000,
//     frequency: "year",
//     responsibilities:
//       "Lead go-to-market strategy and positioning for new product releases.",
//     qualifications:
//       "Experience in B2B product marketing and cross-functional launches.",
//     jobPostBy: "marketing@hirepulse.com",
//     jobPosterRole: "recruiter",
//   },
//   {
//     _id: objectIdDaysAgo(40),
//     title: "QA Automation Engineer",
//     companyName: "HirePulse Platform",
//     category: "Other",
//     jobType: "part-time",
//     isRemote: false,
//     location: "Dublin, Ireland (Hybrid)",
//     deadline: "2026-09-01",
//     minSalary: 35,
//     maxSalary: 50,
//     frequency: "hour",
//     responsibilities:
//       "Build automated test suites and maintain quality across web releases.",
//     qualifications:
//       "Experience with end-to-end testing tools and CI-based test pipelines.",
//     jobPostBy: "quality@hirepulse.com",
//     jobPosterRole: "recruiter",
//   },
// ]

const JobIcon = ({ job }: { job: IJobData }) => {
  const meta = getCategoryMeta(job.category)
  const Icon = meta.icon

  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg border",
        meta.tile
      )}
    >
      <Icon className="size-4" aria-hidden />
    </span>
  )
}

const StatusBadge = ({ status }: { status: JobStatus }) => {
  const styles = statusStyles[status]

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-6! gap-1.5! rounded-md! px-2! text-[11px]! font-medium!",
        styles.badge
      )}
    >
      <span className={cn("size-1.5 rounded-full", styles.dot)} aria-hidden />
      {status}
    </Badge>
  )
}

const JobTypeBadge = ({ jobType }: { jobType: string }) => (
  <Badge
    variant="outline"
    className="h-6! rounded-md! border-white/10! bg-white/[0.04]! px-2! text-[11px]! font-medium! text-white/60!"
  >
    {formatJobType(jobType)}
  </Badge>
)



const CardField = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="min-w-0">
    <p className="text-[10px] font-medium tracking-[0.08em] text-white/30 uppercase">
      {label}
    </p>
    <div className="mt-1 text-[12px] text-white/75">{children}</div>
  </div>
)

const ManageJobs = async () => {
  const data = await auth.api.getSession({ headers: await headers() })
  const email = data?.user.email as string

  let jobs: IJobData[] = []

  try {
    const result = await getRecruiterJoBData(email)
    jobs = Array.isArray(result) ? (result as IJobData[]) : []
  } catch (error) {
    console.error("Failed to load recruiter jobs:", error)
  }

  return (
    <div className="min-h-svh w-full bg-[#090a0f] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-white/45"
            >
              <span>Manage Jobs</span>
              <ChevronRight className="size-3 text-white/25" aria-hidden />
              <span className="text-white/70">Job Listings &amp; Postings</span>
            </nav>

            <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
              Manage Job Posts
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>

          <ButtonLink
            href="/dashboard/recruiter/new"
            className="h-10! w-full shrink-0 gap-1.5! rounded-lg! bg-violet-600! px-4! text-sm! font-medium! text-white! shadow-[0_0_0_1px_rgba(139,92,246,0.35)]! hover:bg-violet-500! sm:w-auto!"
          >
            <Plus className="size-4" aria-hidden />
            New Job Post
          </ButtonLink>
        </header>

        {/* Desktop table */}
        <div className="mt-6 hidden overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d12] xl:block">
          <Table className="min-w-[1080px]" aria-label="Job posts">
            <TableHeader className="border-white/[0.07] bg-white/[0.015]">
              <TableRow className="border-white/[0.07] hover:bg-transparent">
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Job Title &amp; Dept
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Company &amp; Location
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Type
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Compensation
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Applicants
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Status
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Deadline
                </TableHead>
                <TableHead
                  scope="col"
                  className="h-11 px-4 text-right text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase"
                >
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => {
                const status = getStatus(job.deadline)

                return (
                  <TableRow
                    key={job._id}
                    className="border-white/[0.06] hover:bg-white/[0.025]"
                  >
                    <TableCell className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <JobIcon job={job} />
                        <div>
                          <p className="text-[13px] font-medium text-white/90">
                            {job.title}
                          </p>
                          <p
                            className={cn(
                              "mt-0.5 text-[11px]",
                              getCategoryMeta(job.category).department
                            )}
                          >
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3.5">
                      <p className="text-[13px] text-white/85">
                        {job.companyName}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
                        <MapPin className="size-3 shrink-0" aria-hidden />
                        {formatLocation(job)}
                      </p>
                    </TableCell>

                    <TableCell className="px-4 py-3.5">
                      <JobTypeBadge jobType={job.jobType} />
                    </TableCell>

                    <TableCell className="px-4 py-3.5 text-[13px] text-white/75 tabular-nums">
                      {formatCompensation(job)}
                    </TableCell>

                    <TableCell className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-[12px]">
                        <Users
                          className="size-3.5 shrink-0 text-white/35"
                          aria-hidden
                        />
                        <span className="text-white/85">{job.candidates} </span>
                        <span className="text-white/40">Candidates</span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3.5">
                      <StatusBadge status={status} />
                    </TableCell>

                    <TableCell className="px-4 py-3.5">
                      <p className="text-[13px] text-white/80">
                        {formatDeadline(job.deadline)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/35">
                        {status === "Expired"
                          ? "Closed"
                          : getPostedLabel(job._id)}
                      </p>
                    </TableCell>

                    <TableCell className="px-4 py-3.5">
                      <JobAction job={job} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Responsive cards */}
        <div className="mt-6 grid gap-3 xl:hidden">
          {jobs.map((job) => {
            const status = getStatus(job.deadline)

            return (
              <article
                key={job._id}
                className="rounded-xl border border-white/[0.08] bg-[#0b0d12] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <JobIcon job={job} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white/90">
                        {job.title}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-[11px]",
                          getCategoryMeta(job.category).department
                        )}
                      >
                        {job.category}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  <CardField label="Company">{job.companyName}</CardField>
                  <CardField label="Location">
                    <span className="inline-flex items-start gap-1">
                      <MapPin className="mt-0.5 size-3 shrink-0" aria-hidden />
                      {formatLocation(job)}
                    </span>
                  </CardField>
                  <CardField label="Type">
                    <JobTypeBadge jobType={job.jobType} />
                  </CardField>
                  <CardField label="Compensation">
                    <span className="tabular-nums">
                      {formatCompensation(job)}
                    </span>
                  </CardField>
                  <CardField label="Applicants">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-3.5 text-white/35" aria-hidden />
                      <span className="text-white/85">{job.candidates}</span>
                      <span className="text-white/40">Candidates</span>
                    </span>
                  </CardField>
                  <CardField label="Deadline">
                    <span className="text-white/80">
                      {formatDeadline(job.deadline)}
                    </span>
                    <span className="ml-1.5 text-[11px] text-white/35">
                      {status === "Expired"
                        ? "Closed"
                        : getPostedLabel(job._id)}
                    </span>
                  </CardField>
                </div>

                <div className="mt-4 border-t border-white/[0.06] pt-3">
                  <JobAction job={job} />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ManageJobs
