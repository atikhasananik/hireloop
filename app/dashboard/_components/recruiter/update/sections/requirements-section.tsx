"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import {
  labelClass,
  requiredClass,
  textareaClass,
} from "../update-job-form.options"
import type { JobFormState, SetJobFormField } from "../update-job-form.data"
import { JobFormSection } from "./job-form-section"
import { IJobPayload } from "@/lib/type/type"

type RequirementsSectionProps = {
  formData: IJobPayload
  setField: SetJobFormField
}

const RequirementsSection = ({
  formData,
  setField,
}: RequirementsSectionProps) => (
  <JobFormSection step={3} title="Responsibilities & Requirements">
    <div className="flex flex-col gap-2">
      <Label htmlFor="responsibilities" className={labelClass}>
        Key Responsibilities <span className={requiredClass}>*</span>
      </Label>
      <Textarea
        id="responsibilities"
        name="responsibilities"
        required
        rows={3}
        value={formData.responsibilities}
        onChange={(event) => setField("responsibilities", event.target.value)}
        placeholder="Describe the day-to-day responsibilities for this role…"
        className={cn(textareaClass, "min-h-24!")}
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="qualifications" className={labelClass}>
        Qualifications &amp; Requirements{" "}
        <span className={requiredClass}>*</span>
      </Label>
      <Textarea
        id="qualifications"
        name="qualifications"
        required
        rows={4}
        value={formData.qualifications}
        onChange={(event) => setField("qualifications", event.target.value)}
        placeholder="List the skills, experience, and qualifications required…"
        className={cn(textareaClass, "min-h-28!")}
      />
    </div>
  </JobFormSection>
)

export { RequirementsSection }
