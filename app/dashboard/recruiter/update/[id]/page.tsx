import type { Metadata } from "next"
import { notFound } from "next/navigation"

import UpdateJobForm from "@/app/dashboard/_components/recruiter/update/update-job-form"
import { getSingleJob } from "@/lib/curd/get.data"
import type { IJobData, IJobPayload } from "@/lib/type/type"

export const metadata: Metadata = {
  title: "Update Job Post · HireLoop",
  description:
    "Modify position specifications, compensation range, and candidate requirements for this listing.",
}

const UpdateJobPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  let job: IJobPayload | null = null

  try {
    job = (await getSingleJob(id)) as IJobPayload | null
  } catch (error) {
    console.error(`Failed to load job ${id}:`, error)
  }

  // A missing job and a failed request both end up here, so render the
  // 404 page instead of crashing the route.
  if (!job) {
    notFound()
  }

  return <UpdateJobForm initialJobFormData={job} />
}

export default UpdateJobPage
