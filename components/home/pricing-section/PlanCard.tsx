import { ArrowRight, Crown, Plus, TrendingUp, Zap, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ButtonLink } from "../../ui/button-link"
import { Card, CardContent } from "../../ui/card"

export type PlanIcon = "crown" | "growth" | "premium"
export type Billing = "monthly" | "yearly"

export type Plan = {
  name: string
  icon: PlanIcon
  monthly: number
  recommended?: boolean
  features: string[]
}

const planIcons: Record<Plan["icon"], LucideIcon> = {
  crown: Crown,
  growth: TrendingUp,
  premium: Zap,
}

// presentational plan card; fully driven by props (no state) so it can be
// server-rendered. The middle (recommended) plan is emphasized with a lighter
// surface and the only solid CTA.
const PlanCard = ({ plan, billing }: { plan: Plan; billing: Billing }) => {
  const price = billing === "yearly" ? Math.round(plan.monthly * 0.75) : plan.monthly
  const hasDiscount = billing === "yearly" && plan.monthly > 0
  const Icon = planIcons[plan.icon]

  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-2xl! py-6! text-left transition-colors sm:py-7!",
        plan.recommended ? "bg-[#151518]! ring-white/20!" : "bg-[#0e0e11]! ring-white/10!"
      )}
    >
      <CardContent className="flex h-full flex-col gap-5 px-6! sm:px-7!">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#191622]">
              <Icon className="size-4.5 text-violet-300" />
            </div>
            <p className="text-lg font-medium text-white">{plan.name}</p>
          </div>
          <div className="whitespace-nowrap text-right">
            <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl xl:text-[2.75rem]">
              ${price}
            </span>
            <span className="text-xs text-white/50">/month</span>
            {hasDiscount && (
              <span className="ml-1 text-sm text-white/40 line-through">${plan.monthly}</span>
            )}
            {hasDiscount && <p className="mt-0.5 text-[11px] text-white/40">billed yearly</p>}
          </div>
        </div>

        {/* features */}
        <div>
          <p className="text-sm font-semibold text-white">Start building your insights hub:</p>
          <ul className="mt-4 flex flex-col gap-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-white/75">
                <span className="flex size-4.5 shrink-0 items-center justify-center rounded-[6px] border border-white/15 bg-white/[0.06]">
                  <Plus className="size-3 text-white" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <ButtonLink
          href="/jobs"
          className={cn(
            "mt-auto h-11 w-full! justify-between rounded-lg! px-4! text-sm font-medium",
            plan.recommended
              ? "bg-white! text-[#0d0e14]! hover:bg-white/90!"
              : "border-white/10! bg-white/[0.07]! text-white! hover:bg-white/[0.11]!"
          )}
        >
          Choose This Plan
          <ArrowRight
            className={cn("size-4", plan.recommended ? "text-[#0d0e14]" : "text-white/70")}
          />
        </ButtonLink>
      </CardContent>
    </Card>
  )
}

export default PlanCard
