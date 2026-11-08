import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import NavLinks from "./NavLinks"
import UserMenu from "./UserMenu"
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
          <NavLinks />
          <UserMenu />
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
              <SheetClose render={<Link href="/" className="inline-flex" />}>
                <Image src={logo} width={117} height={33} alt="HireLoop logo — go to home" />
              </SheetClose>
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            </SheetHeader>
            <SheetClose
            nativeButton={false}
              render={<nav className="flex flex-col gap-3 px-4 text-sm" />}
            >
              <NavLinks column />
            </SheetClose>
            <div className="flex items-start justify-end flex-col gap-2 mx-2">
              <div className="w-full">
                <UserMenu />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Navbar
