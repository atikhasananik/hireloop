import type { Metadata } from "next"
import { Bookmark } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Saved Jobs · HireLoop",
  description: "Keep track of the roles you want to revisit and apply to later.",
}

const SavedJobsPage = () => (
  <DashboardPagePlaceholder
    title="Saved Jobs"
    description="Keep track of the roles you want to revisit and apply to later."
    icon={Bookmark}
    emptyTitle="No saved jobs yet"
    emptyDescription="Bookmark a job from the job listings and it will appear here."
  />
)

export default SavedJobsPage
