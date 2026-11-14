"use client"

import { Suspense, useEffect, useState, type FormEvent } from "react"

import JobCard from "@/components/jobs/JobCard"
import JobFilters from "@/components/jobs/JobFilters"
import JobSearch from "@/components/jobs/JobSearch"
import JobSort from "@/components/jobs/JobSort"
import { useSearchParams } from "next/navigation"
import { getFilterJobsData } from "@/lib/curd/get.data"
import { IJobPayload } from "@/lib/type/type"

type JobFilterValues = {
  search: string
  category: string
  jobType: string
  isRemote: boolean
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-svh bg-[#08080c] p-8 text-sm text-white/45">
          Loading jobs…
        </main>
      }
    >
      <JobsContent />
    </Suspense>
  )
}

const JobsContent = () => {
  const [filterJob, setFilterJob] = useState<IJobPayload[]>()
  const searchParams = useSearchParams()

  const queryString = new URLSearchParams(searchParams).toString()

  useEffect(() => {
    const filterJob = async () => {
      const data = await getFilterJobsData(queryString)
      setFilterJob(data)
    }

    filterJob()
  }, [queryString])

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const search = String(formData.get("search") ?? "").trim()
    const category = String(formData.get("category") ?? "")
    const jobType = String(formData.get("jobType") ?? "")
    const workMode = String(formData.get("isRemote") ?? "")

    const filterValues: JobFilterValues = {
      search,
      category: category === "all" ? "" : category,
      jobType: jobType === "all" ? "" : jobType,
      isRemote: workMode === "true",
    }

    console.log(filterValues)
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

        <form onSubmit={handleFormSubmit} className="mt-6">
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
                    {filterJob?.length.toLocaleString() ?? "0"}
                  </span>{" "}
                  Professional Jobs
                </h2>

                <JobSort />
              </div>

              <div className="mt-4 grid gap-3">
                {filterJob?.map((job) => (
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
