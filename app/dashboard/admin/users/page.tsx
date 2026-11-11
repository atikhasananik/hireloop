import type { Metadata } from "next"
import { Users } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Users · HireLoop",
  description: "Review and manage every user account across the platform.",
}

const UsersPage = () => (
  <DashboardPagePlaceholder
    title="Users"
    description="Review and manage every user account across the platform."
    icon={Users}
    emptyTitle="No users to show"
    emptyDescription="Registered seeker accounts will appear here."
  />
)

export default UsersPage
