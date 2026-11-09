import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"

import {
  Plus,
  LayoutDashboard,
  Search,
  Bookmark,
  FileText,
  DollarSign,
  SlidersHorizontal,
  Briefcase,
  Users,
  UserCheck,
  BarChart2,
  LucideIcon,
  Building,
  BriefcaseBusiness,
} from "lucide-react"

export type Role = "seeker" | "recruiter" | "admin"

export type SidebarItem = {
  name: string
  url: string
  icon: LucideIcon
}

export async function AppSidebar() {
  const data = await auth.api.getSession({ headers: await headers() })
  const role = (data?.user.role || "seeker") as Role

  const dynamicUser = {
    seeker: [
      { name: "Dashboard", url: `/dashboard/${role}`, icon: LayoutDashboard },
      { name: "Find Jobs", url: "/seeker/jobs?q=seeker", icon: Search },
      { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
      {
        name: "Applications",
        url: "/dashboard/seeker/applications",
        icon: FileText,
      },
      { name: "Billing", url: "/dashboard/seeker/billing", icon: DollarSign },
      {
        name: "Settings",
        url: "/dashboard/seeker/settings",
        icon: SlidersHorizontal,
      },
    ],
    recruiter: [
      { name: "Dashboard", url: `/dashboard/${role}`, icon: LayoutDashboard },
      {
        name: "My Company",
        url: "/dashboard/recruiter/company",
        icon: Building,
      },
      { name: "Post a Job", url: "/dashboard/recruiter/new", icon: Plus },
      {
        name: "Manage Jobs",
        url: "/dashboard/recruiter/jobs",
        icon: BriefcaseBusiness,
      },
      {
        name: "Applications",
        url: "/dashboard/recruiter/applications",
        icon: FileText,
      },
      {
        name: "Settings",
        url: "/dashboard/recruiter/settings",
        icon: SlidersHorizontal,
      },
    ],
    admin: [
      { name: "Dashboard", url: `/dashboard/${role}`, icon: LayoutDashboard },
      { name: "Users", url: "/dashboard/admin/users", icon: Users },
      {
        name: "Recruiters",
        url: "/dashboard/admin/recruiters",
        icon: UserCheck,
      },
      { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
      { name: "Reports", url: "/dashboard/admin/reports", icon: BarChart2 },
      {
        name: "Settings",
        url: "/dashboard/admin/settings",
        icon: SlidersHorizontal,
      },
    ],
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {dynamicUser[role].map((item: SidebarItem) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
