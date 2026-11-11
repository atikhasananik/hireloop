import type { Metadata } from "next"
import { BarChart2 } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Reports · HireLoop",
  description: "Monitor platform activity, hiring trends, and reports.",
}

const ReportsPage = () => (
  <DashboardPagePlaceholder
    title="Reports"
    description="Monitor platform activity, hiring trends, and moderation reports."
    icon={BarChart2}
    emptyTitle="No reports yet"
    emptyDescription="Platform reports and activity summaries will appear here."
  />
)

export default ReportsPage
