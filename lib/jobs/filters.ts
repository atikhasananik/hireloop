import { format, isValid, parseISO } from "date-fns"

import type { IJobData, IJobPayload } from "@/lib/type/type"

export const JOB_TYPE_OPTIONS = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
] as const

export const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "salary", label: "Highest Salary" },
  { value: "deadline", label: "Deadline Soonest" },
] as const

export type JobSort = (typeof SORT_OPTIONS)[number]["value"]

export const CATEGORY_OPTIONS = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "Human Resources",
  "Other",
] as const

const frequencyUnit: Record<string, string> = {
  hour: "hr",
  month: "mo",
  year: "yr",
}

export const formatJobType = (jobType: string) =>
  JOB_TYPE_OPTIONS.find((option) => option.value === jobType)?.label ?? jobType

export const formatSalary = (value: number) =>
  value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${value}`

export const formatCompensation = (job: IJobPayload) =>
  `${formatSalary(job.minSalary)} – ${formatSalary(job.maxSalary)} / ${
    frequencyUnit[job.frequency] ?? job.frequency
  }`

export const formatDeadline = (deadline: string) => {
  const date = parseISO(deadline)
  return isValid(date) ? format(date, "MMM d, yyyy") : "—"
}
