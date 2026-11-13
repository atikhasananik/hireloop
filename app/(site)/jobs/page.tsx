"use client"

import type { FormEvent } from "react"

import JobCard from "@/components/jobs/JobCard"
import JobFilters from "@/components/jobs/JobFilters"
import JobSearch from "@/components/jobs/JobSearch"
import JobSort from "@/components/jobs/JobSort"
import { mockJobs } from "@/lib/jobs/mock-jobs"

type JobFilterValues = {
  search: string
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
}

const JobsPage = () => {
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const handleFormSubmit = (values: JobFilterValues) => {
      // UI only for now. Connect this to the real jobs endpoint later.
      console.log("Job filter values:", values)
    }

    const formData = new FormData(event.currentTarget)
    const getValue = (key: string) => String(formData.get(key) ?? "").trim()

    const category = getValue("category")
    const jobType = getValue("jobType")
    const workMode = getValue("isRemote")

    handleFormSubmit({
      search: getValue("search"),
      title: getValue("title"),
      companyName: getValue("companyName"),
      category: category === "all" ? "" : category,
      jobType: jobType === "all" ? "" : jobType,
      isRemote: workMode === "true",
      location: getValue("location"),
    })
  }

  return (
    <main className="min-h-svh bg-[#08080c] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-violet-400/80 uppercase">
            Browse jobs
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Find your next role
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/45">
            Discover curated opportunities from high-growth teams and innovative
            employers.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6">
          <JobSearch />

          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <JobFilters />

            <section aria-labelledby="job-results-heading" className="min-w-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2
                  id="job-results-heading"
                  className="text-sm font-normal text-white/45"
                >
                  Found{" "}
                  <span className="font-semibold text-white">
                    {mockJobs.length.toLocaleString()}
                  </span>{" "}
                  Professional Jobs
                </h2>

                <JobSort />
              </div>

              <div className="mt-4 grid gap-3">
                {mockJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            </section>
          </div>
        </form>
      </div>
    </main>
  )
}

export default JobsPage
