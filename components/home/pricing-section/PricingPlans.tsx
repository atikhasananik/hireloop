"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import PlanCard, { type Plan, type Billing } from "./PlanCard"

// the only interactive part of the pricing section: the billing toggle and
// the re-priced plan grid live inside this single client boundary.
const PricingPlans = ({ plans }: { plans: Plan[] }) => {
  const [billing, setBilling] = useState<Billing>("monthly")

  return (
    <>
      {/* billing toggle */}
      <div className="mt-10 flex justify-center sm:mt-12">
        <Tabs
          value={billing}
          onValueChange={(value) => setBilling(value as Billing)}
          className="inline-block"
        >
          <TabsList className="h-11 w-auto rounded-full! border border-white/10 bg-[#131316]! p-1 text-xs sm:text-sm">
            <TabsTrigger
              value="monthly"
              className="h-9! rounded-full! px-5! text-white/70! data-active:bg-white! data-active:text-black! data-active:shadow-none!"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="h-9! rounded-full! px-5! text-white/70! data-active:bg-white! data-active:text-black! data-active:shadow-none!"
            >
              Yearly
              <span className="rounded-full bg-fuchsia-500 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-white">
                25%
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* plan cards grid */}
      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} billing={billing} />
        ))}
      </div>
    </>
  )
}

export default PricingPlans
