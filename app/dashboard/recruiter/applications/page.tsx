import type { Metadata } from "next"
import { FileText } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Applications · HireLoop",
  description: "Review candidates who applied to your job posts.",
}

const ApplicationsPage = () => (
  <DashboardPagePlaceholder
    title="Applications"
    description="Review candidates who applied to your job posts and manage their progress."
    icon={FileText}
    emptyTitle="No applications yet"
    emptyDescription="Candidate applications for your job posts will appear here."
  />
)

export default ApplicationsPage
