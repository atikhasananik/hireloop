import type { Metadata } from "next"
import { SlidersHorizontal } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Admin Settings · HireLoop",
  description: "Manage platform-wide configuration and moderation settings.",
}

const SettingsPage = () => (
  <DashboardPagePlaceholder
    title="Admin Settings"
    description="Manage platform-wide configuration and moderation settings."
    icon={SlidersHorizontal}
    emptyTitle="Settings are coming soon"
    emptyDescription="Platform and moderation controls will be available here."
  />
)

export default SettingsPage
