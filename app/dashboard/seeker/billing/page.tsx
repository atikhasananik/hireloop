import type { Metadata } from "next"
import { DollarSign } from "lucide-react"

import { DashboardPagePlaceholder } from "@/app/dashboard/_components/dashboard-page-placeholder"

export const metadata: Metadata = {
  title: "Billing · HireLoop",
  description: "Manage your plan, invoices, and payment details in one place.",
}

const BillingPage = () => (
  <DashboardPagePlaceholder
    title="Billing"
    description="Manage your plan, invoices, and payment details in one place."
    icon={DollarSign}
    emptyTitle="Billing is not set up yet"
    emptyDescription="Your plan, invoices, and payment history will appear here."
  />
)

export default BillingPage
