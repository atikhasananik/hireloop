import {
  ArrowUpRight,
  Bookmark,
  Building2,
  FileText,
  MousePointerClick,
  Search,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: ShieldCheck,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: ArrowUpRight,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
]

const FeatureItem = ({ icon: Icon, title, description }: Feature) => (
  <div className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.03]">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#131316] transition-colors group-hover:border-white/20 sm:size-11">
      <Icon className="size-4 text-violet-300" />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-white/60 sm:text-[13px]">
        {description}
      </p>
    </div>
  </div>
)

// feature overview: flat icon + text rows matching the reference design
const FeaturesSection = () => {
  return (
    <section className="relative px-4 pb-24 text-center sm:pb-32 sm:px-6">
      {/* kicker */}
      <div className="flex items-center justify-center gap-3">
        <span aria-hidden className="size-1.5 rounded-[2px] bg-indigo-400" />
        <span className="font-mono text-xs font-medium tracking-[0.25em] text-white/60">
          FEATURES JOB
        </span>
        <span aria-hidden className="size-1.5 rounded-[2px] bg-indigo-400" />
      </div>

      {/* heading */}
      <h2 className="mx-auto mt-4 max-w-lg text-balance text-3xl font-semibold tracking-tight text-white sm:mt-5 sm:text-5xl sm:leading-tight">
        Everything you need to succeed
      </h2>

      {/* features grid */}
      <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-x-6 gap-y-6 text-left sm:mt-16 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
