import type { LucideIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type DashboardPagePlaceholderProps = {
  title: string
  description: string
  icon: LucideIcon
  emptyTitle: string
  emptyDescription: string
}

const DashboardPagePlaceholder = ({
  title,
  description,
  icon: Icon,
  emptyTitle,
  emptyDescription,
}: DashboardPagePlaceholderProps) => {
  return (
    <div className="min-h-svh w-full bg-[#090a0f] text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header>
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
            {description}
          </p>
        </header>

        <Empty className="mt-8 min-h-[320px] border border-white/[0.08] bg-[#0b0d12]">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="size-11 rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400"
            >
              <Icon className="size-5" aria-hidden />
            </EmptyMedia>
            <EmptyTitle className="text-base text-white/90">
              {emptyTitle}
            </EmptyTitle>
            <EmptyDescription className="text-white/40">
              {emptyDescription}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  )
}

export { DashboardPagePlaceholder }
