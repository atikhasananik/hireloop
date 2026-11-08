import Link from "next/link"
import { Button } from "../../ui/button"
import DiscoveryCard, { type DiscoveryJob } from "./DiscoveryCard"

const jobs: DiscoveryJob[] = [
  {
    title: "Frontend Developer",
    description:
      "Craft fast, accessible interfaces with React and Next.js that users genuinely enjoy.",
    location: "New York, USA",
    workType: "Remote",
    pay: "$40–$60/hour",
    category: "frontend-developer",
  },
  {
    title: "Product Designer",
    description:
      "Turn messy workflows into clear, beautiful product experiences, from discovery to launch.",
    location: "Berlin, Germany",
    workType: "Hybrid",
    pay: "€30–€45/hour",
    category: "product-designer",
  },
  {
    title: "Backend Engineer",
    description:
      "Design resilient APIs and services that scale to millions of requests without breaking a sweat.",
    location: "Remote",
    workType: "Remote",
    pay: "$45–$65/hour",
    category: "backend-engineer",
  },
  {
    title: "AI Engineer",
    description:
      "Build and productionize LLM-powered features for real-world hiring workflows.",
    location: "Amsterdam, Netherlands",
    workType: "Hybrid",
    pay: "€40–€60/hour",
    category: "ai-engineering",
  },
  {
    title: "Mobile Developer",
    description:
      "Ship smooth cross-platform apps with React Native and keep quality high on both stores.",
    location: "London, United Kingdom",
    workType: "Onsite",
    pay: "£35–£50/hour",
    category: "mobile-developer",
  },
  {
    title: "DevOps Engineer",
    description:
      "Automate infrastructure and keep releases continuous, fast and pleasantly boring.",
    location: "Remote",
    workType: "Remote",
    pay: "$45–$65/hour",
    category: "dev-ops-engineer",
  },
]

// job discovery: clicking any card deep-links into /jobs filtered by its category
const DiscoverySection = () => {
  return (
    <section className="relative px-4 pb-24 text-center sm:pb-32 sm:px-6">
      {/* kicker */}
      <div className="flex items-center justify-center gap-3">
        <span aria-hidden className="size-1.5 rounded-[2px] bg-indigo-400" />
        <span className="font-mono text-xs font-medium tracking-[0.25em] text-white/60">
          SMART JOB DISCOVERY
        </span>
        <span aria-hidden className="size-1.5 rounded-[2px] bg-indigo-400" />
      </div>

      {/* heading */}
      <h2 className="mx-auto mt-4 max-w-xl text-balance text-3xl font-semibold tracking-tight text-white sm:mt-5 sm:text-5xl sm:leading-tight">
        The roles you&apos;d never find by searching
      </h2>

      {/* job cards */}
      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-4 text-left sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <DiscoveryCard key={job.category} job={job} />
        ))}
      </div>

      <Button
      nativeButton={false}
        render={<Link href="/jobs" />}
        size="lg"
        className="mt-12 h-10! rounded-lg! bg-white! px-5! font-medium text-[#0d0e14]! hover:bg-white/90!"
      >
        View all job openings
      </Button>
    </section>
  )
}

export default DiscoverySection
