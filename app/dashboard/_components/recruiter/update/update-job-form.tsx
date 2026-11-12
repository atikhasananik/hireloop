"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { BasicInfoSection } from "./sections/basic-info-section"
import { LocationSection } from "./sections/location-section"
import { RequirementsSection } from "./sections/requirements-section"
import {

  type JobFormState,
  type SetJobFormField,
} from "./update-job-form.data"
import { IJobPayload } from "@/lib/type/type"

const UpdateJobForm = ({initialJobFormData}:{initialJobFormData:IJobPayload}) => {
  const [formData, setFormData] = useState<IJobPayload>(initialJobFormData)

  const setField: SetJobFormField = (key, value) => {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Only retrieve the submitted values; wiring the update API comes later.
    const formValues = new FormData(event.currentTarget)
    const values = Object.fromEntries(formValues.entries())

    console.log("Update job form data:", values)
  }

  return (
    <div className="min-h-svh w-full bg-[#090a0f] text-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-8 sm:gap-10"
        >
          <header className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium tracking-wide text-white/45"
                >
                  <span>Manage Jobs</span>
                  <ChevronRight className="size-3 text-white/25" aria-hidden />
                  <span>Job Listings &amp; Postings</span>
                  <ChevronRight className="size-3 text-white/25" aria-hidden />
                  <span className="text-white/70">Update Job Post</span>
                </nav>

                <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
                  Update Job Post
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
                  Modify position specifications, compensation range, and
                  candidate requirements for this listing.
                </p>
              </div>
            </div>

            <Separator className="bg-white/[0.07]!" />
          </header>

          <BasicInfoSection formData={initialJobFormData} setField={setField} />
          <LocationSection formData={initialJobFormData} setField={setField} />
          <RequirementsSection formData={initialJobFormData} setField={setField} />

          <section>
            <Button
              type="submit"
              className="h-10! w-full shrink-0 gap-2 rounded-lg! bg-violet-600! px-4! text-sm! font-medium! text-white! shadow-[0_0_0_1px_rgba(139,92,246,0.35)]! hover:bg-violet-500! sm:w-auto!"
            >
              Update Job
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </section>
        </form>
      </div>
    </div>
  )
}

export default UpdateJobForm
