import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import NavLinks from "./NavLinks"
import { ButtonLink } from "../ui/button-link"
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

// server component: interactive pieces (routes sheet, pathname links) are
// client islands imported from ./NavLinks and ../ui/sheet.
const Navbar = () => {
  return (
    <header className="border-b border-white/10 bg-slate-950 text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} width={130} height={37} alt="HireLoop logo" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center md:flex">
          <NavLinks />
          <Separator orientation="vertical" className="mx-5 h-5 bg-white/15" />
          <div className="flex items-center gap-2">
            <ButtonLink
              href="/signin"
              variant="ghost"
              className="text-violet-400 hover:bg-white/5 hover:text-violet-300"
            >
              Sign In
            </ButtonLink>
            <ButtonLink
              href="/signup"
              size="lg"
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              Get Started
            </ButtonLink>
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
              <NavLinks column />
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              <SheetClose
                render={<ButtonLink href="/signin" variant="ghost" className="w-full text-violet-400 hover:bg-white/5 hover:text-violet-300" />}
              >
                Sign In
              </SheetClose>
              <SheetClose
                render={<ButtonLink href="/signup" size="lg" className="w-full bg-violet-600 text-white hover:bg-violet-700" />}
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
