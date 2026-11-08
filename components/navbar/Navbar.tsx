"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import logo from "@/app/images/logo.png"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <header className="border-b border-white/10 bg-slate-950 text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            width={130}
            height={37}
            alt="HireLoop logo"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center md:flex">
          <ul className="flex items-center gap-7 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-white",
                    pathname === link.href
                      ? "font-medium text-white"
                      : "text-white/70"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Separator orientation="vertical" className="mx-5 h-5 bg-white/15" />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-violet-400 hover:bg-white/5 hover:text-violet-300"
            >
              Sign In
            </Button>
            <Button
              size="lg"
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open menu"
                className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/5 hover:text-white md:hidden"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-slate-950 text-white sm:max-w-xs"
          >
            <SheetHeader>
              <Image src={logo} width={117} height={33} alt="HireLoop logo" />
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-3 px-4 text-sm">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                    nativeButton={false}
                      render={
                        <Link
                          href={link.href}
                          className="block rounded-md px-3 py-2 transition-colors"
                        />
                      }
                      className={cn(
                        "outline-none",
                        pathname === link.href
                          ? "font-medium text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white focus-visible:bg-white/5 focus-visible:text-white"
                      )}
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    className="text-violet-400 hover:bg-white/5 hover:text-violet-300"
                  />
                }
              >
                Sign In
              </SheetClose>
              <SheetClose
                render={
                  <Button
                    size="lg"
                    className="bg-violet-600 text-white hover:bg-violet-700"
                  />
                }
              >
                Get Started
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Navbar
