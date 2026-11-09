import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
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
  User,
  Users,
  UserCheck,
  BarChart2,
  LucideIcon,
} from "lucide-react"

export type Role = "seeker" | "recruiter" | "admin"

export type SidebarItem = {
  name: string
  url: string
  icon: LucideIcon
}

const dynamicUser = {
  seeker: [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Find Jobs", url: "/jobs?q=seeker", icon: Search },
    { name: "Saved Jobs", url: "/dashboard/saved", icon: Bookmark },
    { name: "Applications", url: "/dashboard/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/billing", icon: DollarSign },
    { name: "Settings", url: "/dashboard/settings", icon: SlidersHorizontal },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Post a Job", url: "/dashboard/post-job", icon: Plus },
    { name: "My Jobs", url: "/dashboard/my-jobs", icon: Briefcase },
    { name: "Candidates", url: "/dashboard/candidates", icon: User },
    { name: "Applications", url: "/dashboard/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/settings", icon: SlidersHorizontal },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/users", icon: Users },
    { name: "Recruiters", url: "/dashboard/recruiters", icon: UserCheck },
    { name: "Jobs", url: "/dashboard/jobs", icon: Briefcase },
    { name: "Reports", url: "/dashboard/reports", icon: BarChart2 },
    { name: "Settings", url: "/dashboard/settings", icon: SlidersHorizontal },
  ],
}

export async function AppSidebar() {
  const data = await auth.api.getSession({ headers: await headers() })
  const role = (data?.user.role || "seeker") as Role
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {dynamicUser[role].map((item: SidebarItem) => (
              <SidebarMenuItem  key={item.name}>
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
