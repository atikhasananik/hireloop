import type { Metadata } from "next"
import { Briefcase } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Jobs · HireLoop",
  description: "Review every job post published across the platform.",
}

const JobsPage = () => (
  <DashboardPagePlaceholder
    title="Jobs"
    description="Review every job post published across the platform."
    icon={Briefcase}
    emptyTitle="No jobs published"
    emptyDescription="Job posts from all recruiters will appear here."
  />
)

export default JobsPage
