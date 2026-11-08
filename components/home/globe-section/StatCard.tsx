import type { LucideIcon } from "lucide-react"
import { BarChart3, Briefcase, Search, Star } from "lucide-react"
import { Card, CardContent } from "../../ui/card"

export type Stat = {
  icon: LucideIcon
  value: string
  label: string
}

// dark, left-aligned stat card matching the reference design
const StatCard = ({ icon: Icon, value, label }: Stat) => (
  <Card className="bg-[#0d0e14]! py-0! ring-white/10!">
    <CardContent className="flex h-32 flex-col justify-between p-4 sm:h-36 sm:p-5">
      <Icon className="size-4 text-white/75" />
      <div>
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{value}</p>
        <p className="mt-1 text-xs text-white/60">{label}</p>
      </div>
    </CardContent>
  </Card>
)

export default StatCard
