import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import logo from "@/app/images/logo.png"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/jobs" },
      { label: "Companies", href: "/company" },
      { label: "Salary data", href: "/jobs" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/company" },
      { label: "Career library", href: "/jobs" },
      { label: "Contact", href: "/company" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/company" },
      { label: "Newsroom", href: "/company" },
    ],
  },
]

// lucide 1.x removed all brand icons, so Facebook/LinkedIn/Pinterest are small
// inline SVGs (Pinterest is the branded/violet tile like the reference)
const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-4"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-4"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.359 9.312-.088-.791-.168-2.005.035-2.868.182-.78 1.174-4.969 1.174-4.969s-.299-.599-.299-1.484c0-1.39.805-2.428 1.808-2.428.852 0 1.264.64 1.264 1.408 0 .858-.547 2.14-.829 3.328-.236.998.5 1.811 1.485 1.811 1.782 0 3.153-1.88 3.153-4.601 0-2.404-1.728-4.083-4.196-4.083-2.857 0-4.536 2.143-4.536 4.362 0 .864.333 1.763.748 2.258a.3.3 0 0 1 .07.29c-.077.321-.247.99-.281 1.128-.044.185-.245.251-.42.152-1.275-.594-2.071-2.46-2.071-3.962 0-3.222 2.34-6.183 6.752-6.183 3.546 0 6.304 2.527 6.304 5.902 0 3.522-2.22 6.362-5.306 6.362-1.037 0-2.01-.54-2.344-1.176l-.637 2.427c-.23.888-.852 2.001-1.269 2.681.957.296 1.973.459 3.03.459 5.523 0 10-4.477 10-10S17.523 2 12 2Z" />
  </svg>
)

// server component: fully static footer markup, good for SEO
const Footer = () => {
  return (
    <footer className="bg-[#050506] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {/* top: brand + link columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div>
            <Link href="/" className="inline-block">
              <Image src={logo} width={130} height={37} alt="HireLoop logo" />
            </Link>
            <p className="mt-5 max-w-[280px] text-sm leading-relaxed text-white/60">
              The AI-native career platform. Built for people who take their work
              seriously.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid w-full max-w-xl grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-20"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-medium text-indigo-300/80">{column.title}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* bottom bar */}
        <Separator className="mt-14 bg-white/[0.06]" />
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button
              render={<Link href="/" />}
              aria-label="Facebook"
              size="icon"
              className="size-9! rounded-lg! border-white/10! bg-white/[0.04]! text-white/80! hover:bg-white/[0.08]! hover:text-white!"
            >
              <FacebookIcon />
            </Button>
            <Button
              render={<Link href="/" />}
              aria-label="Pinterest"
              size="icon"
              className="size-9! rounded-lg! bg-violet-600! text-white! hover:bg-violet-700!"
            >
              <PinterestIcon />
            </Button>
            <Button
              render={<Link href="/" />}
              aria-label="LinkedIn"
              size="icon"
              className="size-9! rounded-lg! border-white/10! bg-white/[0.04]! text-white/80! hover:bg-white/[0.08]! hover:text-white!"
            >
              <LinkedinIcon />
            </Button>
          </div>

          <div className="flex flex-col gap-2 text-sm text-white/50 sm:flex-row sm:items-center sm:gap-4">
            <p>Copyright 2024 —Programming Hero</p>
            <div className="flex gap-4">
              <Link href="/company" className="transition-colors hover:text-white">
                Terms &amp; Policy
              </Link>
              <span aria-hidden>-</span>
              <Link href="/company" className="transition-colors hover:text-white">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
