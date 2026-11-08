import Link from "next/link"
import { useRouter } from "next/navigation"

"use client"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <main className="relative isolate bg-[#08080c] text-white">
      <h1 className="mx-auto text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-white/60 sm:text-base sm:leading-relaxed">
        Welcome back. Here's your workspace.
      </p>
    </main>
  )
}
