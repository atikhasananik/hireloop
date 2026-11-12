"use client"

import { useState } from "react"
import { format, isValid, parseISO } from "date-fns"
import { CalendarDays, Laptop2, MapPin } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import {
  fieldClass,
  frequencies,
  hintClass,
  labelClass,
  popoverClass,
  selectItemClass,
  selectTriggerClass,
} from "../update-job-form.options"
import type { JobFormState, SetJobFormField } from "../update-job-form.data"
import { JobFormSection } from "./job-form-section"
import { IJobPayload } from "@/lib/type/type"

type LocationSectionProps = {
  formData: IJobPayload
  setField: SetJobFormField
}

const LocationSection = ({ formData, setField }: LocationSectionProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false)

  const deadlineDate = parseISO(formData.deadline)
  const hasValidDeadline = isValid(deadlineDate)

  return (
    <JobFormSection step={2} title="Location, Compensation & Timeline">
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
          checked={formData.isRemote}
          onCheckedChange={(checked) => setField("isRemote", checked)}
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
              value={formData.location}
              onChange={(event) => setField("location", event.target.value)}
              placeholder="City, country"
              className={cn(fieldClass, "pl-10!")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="deadline" className={labelClass}>
              Application Deadline <span className={hintClass}>(deadline)</span>
            </Label>
            <span className="text-[11px] text-white/30">Required</span>
          </div>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <input type="hidden" name="deadline" value={formData.deadline} />
            <PopoverTrigger
              id="deadline"
              type="button"
              className={cn(
                "flex h-11 w-full items-center justify-start gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3.5 text-left text-sm text-white transition-colors outline-none hover:bg-white/[0.05] focus-visible:border-violet-500/60 focus-visible:ring-3 focus-visible:ring-violet-500/20",
                !hasValidDeadline && "text-white/30"
              )}
            >
              <CalendarDays
                className="size-4 shrink-0 text-white/35"
                aria-hidden
              />
              {hasValidDeadline
                ? format(deadlineDate, "MM/dd/yyyy")
                : "Select a date"}
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="dark w-auto rounded-lg! border border-white/10 bg-[#14161d]! p-0 text-white! shadow-2xl ring-0!"
            >
              <Calendar
                mode="single"
                selected={hasValidDeadline ? deadlineDate : undefined}
                defaultMonth={hasValidDeadline ? deadlineDate : undefined}
                onSelect={(date) => {
                  setField("deadline", date ? format(date, "yyyy-MM-dd") : "")
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
              value={formData.minSalary}
              onChange={(event) => setField("minSalary", event.target.value)}
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
              value={formData.maxSalary}
              onChange={(event) => setField("maxSalary", event.target.value)}
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
          <Select
            name="frequency"
            value={formData.frequency}
            onValueChange={(value) => setField("frequency", value ?? "")}
          >
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
    </JobFormSection>
  )
}

export { LocationSection }
