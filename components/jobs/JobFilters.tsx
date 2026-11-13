import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CATEGORY_OPTIONS, JOB_TYPE_OPTIONS } from "@/lib/jobs/filters"

type RadioOption = {
  value: string
  label: string
}

const sectionTitleClass =
  "text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase"


const categoryOptions: RadioOption[] = [
  { value: "all", label: "All categories" },
  ...CATEGORY_OPTIONS.map((category) => ({
    value: category,
    label: category,
  })),
]

const jobTypeOptions: RadioOption[] = [
  { value: "all", label: "All job types" },
  ...JOB_TYPE_OPTIONS,
]

const workModeOptions: RadioOption[] = [
  { value: "all", label: "All work modes" },
  { value: "true", label: "Remote" },
  { value: "false", label: "On-site" },
]

const RadioOptionRow = ({ option }: { option: RadioOption }) => {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]">
      <span className="flex items-center gap-2.5">
        <RadioGroupItem
          value={option.value}
          className="border-white/25! data-checked:border-violet-500! data-checked:bg-violet-500!"
        />
        <span className="text-sm text-white/70">{option.label}</span>
      </span>
    </label>
  )
}

const JobFilters = () => {
  return (
    <aside aria-label="Job filters" className="lg:sticky lg:top-24">
      <div className="rounded-xl border border-white/[0.08] bg-[#0d0e14] p-5 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Filters
          </h2>
          <p className="mt-0.5 text-xs text-white/35">Refine your results</p>
        </div>

        <div className="mt-5 border-t border-white/[0.06] pt-5">
          <h3 className={sectionTitleClass}>Category</h3>
          <RadioGroup
            name="category"
            defaultValue="all"
            className="mt-3 gap-0.5"
          >
            {categoryOptions.map((option) => (
              <RadioOptionRow key={option.value} option={option} />
            ))}
          </RadioGroup>
        </div>

        <div className="mt-5 border-t border-white/[0.06] pt-5">
          <h3 className={sectionTitleClass}>Job Type</h3>
          <RadioGroup
            name="jobType"
            defaultValue="all"
            className="mt-3 gap-0.5"
          >
            {jobTypeOptions.map((option) => (
              <RadioOptionRow key={option.value} option={option} />
            ))}
          </RadioGroup>
        </div>

        <div className="mt-5 border-t border-white/[0.06] pt-5">
          <h3 className={sectionTitleClass}>Work Mode</h3>
          <RadioGroup
            name="isRemote"
            defaultValue="all"
            className="mt-3 gap-0.5"
          >
            {workModeOptions.map((option) => (
              <RadioOptionRow key={option.value} option={option} />
            ))}
          </RadioGroup>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            type="submit"
            className="h-10! w-full rounded-lg! bg-violet-600! text-sm! font-medium! text-white! hover:bg-violet-500!"
          >
            Apply Filters
          </Button>

          <Button
            type="reset"
            variant="ghost"
            className="h-9! w-full gap-1.5! text-white/45! hover:bg-white/5! hover:text-white!"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Reset
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default JobFilters
