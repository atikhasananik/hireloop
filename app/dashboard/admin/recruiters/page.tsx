import type { Metadata } from "next"
import { UserCheck } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Recruiters · HireLoop",
  description: "Browse recruiter accounts and manage company access.",
}

const RecruitersPage = () => (
  <DashboardPagePlaceholder
    title="Recruiters"
    description="Browse recruiter accounts and manage company access."
    icon={UserCheck}
    emptyTitle="No recruiters yet"
    emptyDescription="Recruiter accounts and company details will appear here."
  />
)

export default RecruitersPage
