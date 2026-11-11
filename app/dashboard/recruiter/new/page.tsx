"use client"

import { useState, type FormEvent } from "react"
import { format } from "date-fns"
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronRight,
  Laptop2,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { newJobPost } from "@/lib/curd/post.data"
import { useSession } from "@/lib/auth-client"
import { IJobPayload } from "@/lib/type/type"



const labelClass = "gap-1 text-[13px] font-medium text-white/75"
const requiredClass = "text-violet-400"
const hintClass = "text-[11px] font-normal text-white/35"
const fieldClass =
  "h-11! w-full rounded-lg! border-white/10! bg-white/[0.035]! px-3.5! text-white! shadow-none! placeholder:text-white/30! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20!"
const selectTriggerClass =
  "h-11! w-full! rounded-lg! border-white/10! bg-white/[0.035]! px-3.5! text-sm! text-white! shadow-none! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20! data-placeholder:text-white/30! [&_svg]:text-white/40!"
const popoverClass =
  "dark min-w-(--anchor-width) rounded-lg! border border-white/10 bg-[#14161d]! text-white! shadow-2xl ring-0!"
const selectItemClass =
  "rounded-md! py-2! pr-8! pl-2.5! text-sm! text-white/75! focus:bg-violet-500/10! focus:text-white!"

const jobTypes = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
] as const

const jobCategories = [
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

const frequencies = [
  { label: "per hour", value: "hour" },
  { label: "per month", value: "month" },
  { label: "per year", value: "year" },
] as const

const SectionHeading = ({
  step,
  children,
}: {
  step: number
  children: React.ReactNode
}) => (
  <h2 className="flex items-center gap-2 text-[15px] font-medium text-white">
    <span
      className="size-1.5 shrink-0 rounded-full bg-violet-400"
      aria-hidden
    />
    <span>
      {step}. {children}
    </span>
  </h2>
)

const AddJob = () => {
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const { data: session } = useSession()
  const email = session?.user.email as string
  const role = session?.user.role as string

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Collect every field as form entries, then normalise the values.
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as Record<
      string,
      FormDataEntryValue
    >
    const text = (key: string) => String(values[key] ?? "")

    if (!deadline) {
      toast.add({
        type: "error",
        title: "Deadline required",
        description: "Select an application deadline before publishing.",
      })
      return
    }

    const payload: IJobPayload = {

      title: text("title"),
      companyName: text("companyName"),
      category: text("category"),
      jobType: text("jobType"),
      isRemote: values.isRemote === "on",
      location: text("location"),
      deadline: text("deadline"),
      minSalary: Number(values.minSalary ?? 0),
      maxSalary: Number(values.maxSalary ?? 0),
      frequency: text("frequency"),
      responsibilities: text("responsibilities"),
      qualifications: text("qualifications"),
      jobPostBy: email,
      jobPosterRole: role,
      candidates:0,
      
    }

    // data send to the backend

    try {
      const result = await newJobPost(payload)

      console.log(result)

      if (!result?.acknowledged) {
        toast.add({
          type: "error",
          title: "Job not published",
          description:
            result?.message ?? "The server did not confirm the job post.",
        })
        return
      }

      // The submission succeeded, so start over with an empty form.
      setDeadline(undefined)
      setCalendarOpen(false)
      setFormKey((key) => key + 1)

      toast.add({
        type: "success",
        title: "Job published",
        description: "The listing has been submitted successfully.",
      })
    } catch (error) {
      console.error("Failed to publish job:", error)

      toast.add({
        type: "error",
        title: "Failed to publish job",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <div className="min-h-svh w-full bg-[#090a0f] text-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <form
          key={formKey}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 sm:gap-10"
        >
          {/* Page header */}
          <header className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-white/45"
                >
                  <span>Manage Jobs</span>
                  <ChevronRight className="size-3 text-white/25" aria-hidden />
                  <span className="text-white/70">Create New Listing</span>
                </nav>

                <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
                  Post a New Job
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
                  Fill in the position specifications to attract qualified
                  talent across our network.
                </p>
              </div>
            </div>

            <Separator className="bg-white/[0.07]!" />
          </header>

          {/* 1. Basic Information */}
          <section className="flex flex-col gap-5">
            <SectionHeading step={1}>Basic Information</SectionHeading>

            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className={labelClass}>
                Job Title <span className={requiredClass}>*</span>
              </Label>
              <Input
                id="title"
                name="title"
                required
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
                    placeholder="Your company"
                    className={cn(fieldClass, "pl-10!")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="category" className={labelClass}>
                  Job Category <span className={requiredClass}>*</span>
                </Label>
                <Select name="category" required>
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
          </section>

          {/* 2. Location, Compensation & Timeline */}
          <section className="flex flex-col gap-5">
            <SectionHeading step={2}>
              Location, Compensation &amp; Timeline
            </SectionHeading>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-3 sm:px-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Laptop2 className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Remote Work Allowed{" "}
                  <span className={cn("text-xs", hintClass)}>(isRemote)</span>
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/40">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
              <Switch
                name="isRemote"
                aria-label="Remote work allowed"
                className="data-checked:bg-violet-500! data-unchecked:bg-white/15! [&_[data-slot=switch-thumb]]:bg-white!"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="location" className={labelClass}>
                  Job Location <span className={hintClass}>(location)</span>
                </Label>
                <div className="relative">
                  <MapPin
                    className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                    aria-hidden
                  />
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, country"
                    className={cn(fieldClass, "pl-10!")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="deadline" className={labelClass}>
                    Application Deadline{" "}
                    <span className={hintClass}>(deadline)</span>
                  </Label>
                  <span className="text-[11px] text-white/30">Required</span>
                </div>

                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <input
                    type="hidden"
                    name="deadline"
                    value={deadline ? format(deadline, "yyyy-MM-dd") : ""}
                  />
                  <PopoverTrigger
                    id="deadline"
                    type="button"
                    className={cn(
                      "flex h-11 w-full items-center justify-start gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3.5 text-left text-sm text-white transition-colors outline-none hover:bg-white/[0.05] focus-visible:border-violet-500/60 focus-visible:ring-3 focus-visible:ring-violet-500/20",
                      !deadline && "text-white/30"
                    )}
                  >
                    <CalendarDays
                      className="size-4 shrink-0 text-white/35"
                      aria-hidden
                    />
                    {deadline
                      ? format(deadline, "MM/dd/yyyy")
                      : "Select a date"}
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="dark w-auto rounded-lg! border border-white/10 bg-[#14161d]! p-0 text-white! shadow-2xl ring-0!"
                  >
                    <Calendar
                      mode="single"
                      selected={deadline}
                      defaultMonth={deadline}
                      onSelect={(date) => {
                        setDeadline(date)
                        setCalendarOpen(false)
                      }}
                      className="bg-transparent! text-white!"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="minSalary" className={labelClass}>
                  Min Salary / Rate
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-white/35">
                    €
                  </span>
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min={0}
                    placeholder="25"
                    className={cn(
                      fieldClass,
                      "[appearance:textfield]! pl-8! [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="maxSalary" className={labelClass}>
                  Max Salary / Rate
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-white/35">
                    €
                  </span>
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min={0}
                    placeholder="40"
                    className={cn(
                      fieldClass,
                      "[appearance:textfield]! pl-8! [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="frequency" className={labelClass}>
                  Frequency
                </Label>
                <Select name="frequency">
                  <SelectTrigger id="frequency" className={selectTriggerClass}>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className={popoverClass}>
                    {frequencies.map((frequency) => (
                      <SelectItem
                        key={frequency.value}
                        value={frequency.value}
                        className={selectItemClass}
                      >
                        {frequency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* 3. Responsibilities & Requirements */}
          <section className="flex flex-col gap-5">
            <SectionHeading step={3}>
              Responsibilities &amp; Requirements
            </SectionHeading>

            <div className="flex flex-col gap-2">
              <Label htmlFor="responsibilities" className={labelClass}>
                Key Responsibilities <span className={requiredClass}>*</span>
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                required
                rows={3}

                placeholder="Describe the day-to-day responsibilities for this role…"
                className="min-h-24! resize-none! rounded-lg! border-white/10! bg-white/[0.035]! px-3.5! py-3! leading-relaxed! text-white! shadow-none! placeholder:text-white/30! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20!"
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

                placeholder="List the skills, experience, and qualifications required…"
                className="min-h-28! resize-none! rounded-lg! border-white/10! bg-white/[0.035]! px-3.5! py-3! leading-relaxed! text-white! shadow-none! placeholder:text-white/30! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/20!"
              />
            </div>
          </section>
          <section>
            <Button
              type="submit"
              className="h-10! w-full shrink-0 gap-2 rounded-lg! bg-violet-600! px-4! text-sm! font-medium! text-white! shadow-[0_0_0_1px_rgba(139,92,246,0.35)]! hover:bg-violet-500! sm:w-auto!"
            >
              Publish Job
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </section>
        </form>
      </div>
    </div>
  )
}

export default AddJob
