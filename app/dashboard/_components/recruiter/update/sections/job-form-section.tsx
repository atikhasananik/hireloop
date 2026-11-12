const JobFormSection = ({
  step,
  title,
  children,
}: {
  step: number
  title: React.ReactNode
  children: React.ReactNode
}) => (
  <section className="flex flex-col gap-5">
    <h2 className="flex items-center gap-2 text-[15px] font-medium text-white">
      <span
        className="size-1.5 shrink-0 rounded-full bg-violet-400"
        aria-hidden
      />
      <span>
        {step}. {title}
      </span>
    </h2>
    {children}
  </section>
)

export { JobFormSection }
