"use client"

import { Building2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import {
  fieldClass,
  jobCategories,
  jobTypes,
  labelClass,
  popoverClass,
  requiredClass,
  selectItemClass,
  selectTriggerClass,
} from "../update-job-form.options"
import type { JobFormState, SetJobFormField } from "../update-job-form.data"
import { JobFormSection } from "./job-form-section"
import { IJobPayload } from "@/lib/type/type"

type BasicInfoSectionProps = {
  formData: IJobPayload
  setField: SetJobFormField
}

const BasicInfoSection = ({ formData, setField }: BasicInfoSectionProps) => (
  <JobFormSection step={1} title="Basic Information">
    <div className="flex flex-col gap-2">
      <Label htmlFor="title" className={labelClass}>
        Job Title
      </Label>
      <Input
        id="title"
        name="title"
        value={formData.title}
        onChange={(event) => setField("title", event.target.value)}
        placeholder="e.g. Frontend Developer"
        className={fieldClass}
      />
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="companyName" className={labelClass}>
          Company Name <span className={requiredClass}>*</span>
        </Label>
        <div className="relative">
          <Building2
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
            aria-hidden
          />
          <Input
            id="companyName"
            name="companyName"
            required
            value={formData.companyName}
            onChange={(event) => setField("companyName", event.target.value)}
            placeholder="Your company"
            className={cn(fieldClass, "pl-10!")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="category" className={labelClass}>
          Job Category <span className={requiredClass}>*</span>
        </Label>
        <Select
          name="category"
          value={formData.category}
          onValueChange={(value) => setField("category", value ?? "")}
          required
        >
          <SelectTrigger id="category" className={selectTriggerClass}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className={popoverClass}>
            {jobCategories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className={selectItemClass}
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <Label className={labelClass}>
        Job Type <span className={requiredClass}>*</span>
      </Label>
      <div
        role="radiogroup"
        aria-label="Job type"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {jobTypes.map((type) => (
          <label key={type.value} className="relative cursor-pointer">
            <input
              type="radio"
              name="jobType"
              value={type.value}
              checked={formData.jobType === type.value}
              onChange={() => setField("jobType", type.value)}
              required
              className="peer sr-only"
            />
            <span className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-[13px] font-medium text-white/55 transition-colors select-none peer-checked:border-violet-500/60 peer-checked:bg-violet-500/10 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500/40 hover:bg-white/[0.05] peer-checked:hover:bg-violet-500/15">
              {type.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  </JobFormSection>
)

export { BasicInfoSection }
