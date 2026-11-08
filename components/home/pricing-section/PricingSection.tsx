import PricingPlans from "./PricingPlans"
import type { Plan } from "./PlanCard"

const plans: Plan[] = [
  {
    name: "Starter",
    icon: "crown",
    monthly: 0,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply (3 / month)",
    ],
  },
  {
    name: "Growth",
    icon: "growth",
    monthly: 17,
    recommended: true,
    features: [
      "Everything in Starter",
      "Unlimited 1-click apply",
      "Priority application ranking",
      "Recruiter match insights",
    ],
  },
  {
    name: "Premium",
    icon: "premium",
    monthly: 99,
    features: [
      "Everything in Growth",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
]

// pricing section: SEO text is server-rendered; only the billing toggle and
// the price-linked cards hydrate (see PricingPlans).
const PricingSection = () => {
  return (
    <section className="relative px-4 pb-24 text-center sm:pb-32 sm:px-6">
      {/* kicker */}
      <div className="flex items-center justify-center gap-3">
        <span aria-hidden className="size-1.5 rounded-[2px] bg-indigo-400" />
        <span className="font-mono text-xs font-medium tracking-[0.25em] text-white/60">
          PRICING
        </span>
        <span aria-hidden className="size-1.5 rounded-[2px] bg-indigo-400" />
      </div>

      {/* heading */}
      <h2 className="mx-auto mt-4 max-w-xl text-balance text-3xl font-semibold tracking-tight text-white sm:mt-5 sm:text-5xl sm:leading-tight">
        Pay for the leverage, not the listings
      </h2>

      <PricingPlans plans={plans} />
    </section>
  )
}

export default PricingSection
