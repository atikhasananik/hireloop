import type { Metadata } from "next"
import { SlidersHorizontal } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Settings · HireLoop",
  description: "Manage recruiter preferences for your hiring workflow.",
}

const SettingsPage = () => (
  <DashboardPagePlaceholder
    title="Settings"
    description="Manage recruiter preferences for your company and hiring workflow."
    icon={SlidersHorizontal}
    emptyTitle="Settings are coming soon"
    emptyDescription="Recruiter and company preferences will be available here."
  />
)

export default SettingsPage
