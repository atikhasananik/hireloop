import { Badge } from "@/components/ui/badge"

type JobsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const paramToString = (value: string | string[] | undefined) =>
  typeof value === "string" && value.trim() !== "" ? value : undefined

const prettyLabel = (category: string) =>
  category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams
  const q = paramToString(params.q)
  const location = paramToString(params.location)
  const categoryParam = paramToString(params.category)

  const activeFilters = [
    q ? `Keyword: ${q}` : null,
    location ? `Location: ${location}` : null,
    categoryParam ? `Category: ${prettyLabel(categoryParam)}` : null,
  ].filter((filter) => filter !== null)

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Browse jobs
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {categoryParam
            ? `Explore ${prettyLabel(categoryParam)} roles`
            : "Find your next role"}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Discover curated opportunities from high-growth teams and innovative employers.
        </p>

        {activeFilters.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-muted-foreground">Filtering by</span>
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="h-6 gap-1 px-2">
                {filter}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
