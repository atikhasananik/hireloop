import type { Metadata } from "next"
import { FileText } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Applications · HireLoop",
  description: "Follow every application you submit and track its progress.",
}

const ApplicationsPage = () => (
  <DashboardPagePlaceholder
    title="Applications"
    description="Follow every application you submit and keep an eye on its progress."
    icon={FileText}
    emptyTitle="No applications yet"
    emptyDescription="Your submitted applications and their statuses will appear here."
  />
)

export default ApplicationsPage
