import type { Metadata } from "next"
import { SlidersHorizontal } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Settings · HireLoop",
  description: "Manage your account preferences and notification settings.",
}

const SettingsPage = () => (
  <DashboardPagePlaceholder
    title="Settings"
    description="Manage your account preferences, visibility, and notification settings."
    icon={SlidersHorizontal}
    emptyTitle="Settings are coming soon"
    emptyDescription="Account and notification controls will be available here."
  />
)

export default SettingsPage
