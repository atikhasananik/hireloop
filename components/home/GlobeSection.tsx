import StatCard, { type Stat } from "./StatCard"
import { BarChart3, Briefcase, Search, Star } from "lucide-react"

const stats: Stat[] = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: BarChart3, value: "12K", label: "Companies" },
  { icon: Search, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

// caption + stat cards that sit over the page-level globe background
const GlobeSection = () => {
  return (
    <section className="relative px-4 pb-24 text-center sm:pb-32 sm:px-6">
      <h2 className="mx-auto max-w-md text-2xl font-medium leading-snug text-white/85 sm:text-3xl">
        Assisting over <span className="font-bold text-white">15,000 job seekers</span>{" "}
        <span className="text-white/50">find their dream positions.</span>
      </h2>

      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

export default GlobeSection
