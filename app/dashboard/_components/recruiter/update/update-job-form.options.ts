export const labelClass = "gap-1 text-[13px] font-medium text-white/75"
export const requiredClass = "text-violet-400"
export const hintClass = "text-[11px] font-normal text-white/35"
export const fieldClass =
  "h-11! w-full rounded-lg! border-white/10! bg-white/[0.035]! px-3.5! text-white! shadow-none! placeholder:text-white/30! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20!"
export const selectTriggerClass =
  "h-11! w-full! rounded-lg! border-white/10! bg-white/[0.035]! px-3.5! text-sm! text-white! shadow-none! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20! data-placeholder:text-white/30! [&_svg]:text-white/40!"
export const popoverClass =
  "dark min-w-(--anchor-width) rounded-lg! border border-white/10 bg-[#14161d]! text-white! shadow-2xl ring-0!"
export const selectItemClass =
  "rounded-md! py-2! pr-8! pl-2.5! text-sm! text-white/75! focus:bg-violet-500/10! focus:text-white!"
export const textareaClass =
  "resize-none! rounded-lg! border-white/10! bg-white/[0.035]! px-3.5! py-3! leading-relaxed! text-white! shadow-none! placeholder:text-white/30! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20!"

export const jobTypes = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
] as const

export const jobCategories = [
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

export const frequencies = [
  { label: "per hour", value: "hour" },
  { label: "per month", value: "month" },
  { label: "per year", value: "year" },
] as const
