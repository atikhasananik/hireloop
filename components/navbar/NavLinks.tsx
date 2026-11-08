"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navLinks = [
  {label: "Home",href:"/"},
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

// client island only because of usePathname (active-link highlighting).
// Renders both the desktop inline list and the mobile sheet column.
const NavLinks = ({ column = false }: { column?: boolean }) => {
  const pathname = usePathname()

  return (
    <ul className={cn("text-sm border-r pr-3 mr-3 border-gray-400", column ? "flex flex-col" : "flex items-center gap-7") }>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(
              column ? "block rounded-md px-3 py-2 transition-colors" : "transition-colors hover:text-white",
              pathname === link.href
                ? "font-medium text-white"
                : column
                  ? "text-white/70 hover:bg-white/5 hover:text-white"
                  : "text-white/70"
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks
