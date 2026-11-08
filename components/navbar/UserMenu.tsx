"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, LogOut } from "lucide-react"
import { signOut, useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { ButtonLink } from "../ui/button-link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Skeleton } from "../ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

// initials like "Atik Rahman" → "AR" for the avatar fallback when the user has
// no profile image
const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("")

const avatarClasses = "size-9! bg-[#1d1a29]! ring-1 ring-white/15!"

/**
 * The navbar's auth corner, session-aware:
 * - pending    → skeleton placeholder (no button/avatar flicker)
 * - signed out → Sign In / Get Started links (moved here from Navbar)
 * - signed in  → welcome text + avatar; hover shows the name (tooltip),
 *                click opens the account dropdown (info, dashboard, sign out)
 */
const UserMenu = () => {
  const router = useRouter()
  const [isSigningOut, startTransition] = useTransition()
  const { data: session, isPending } = useSession()

  const user = session?.user

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut()
      router.refresh()
      router.push("/")
    })
  }

  if (isPending) {
    return <Skeleton className="size-9 rounded-full bg-white/10!" />
  }

  if (!user) {
    return (
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
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-white/60 lg:inline">
        Welcome back
      </span>

      <DropdownMenu>
        <TooltipProvider delay={200}>
          <Tooltip>
            {/* one native <button> element acts as BOTH the tooltip trigger
                (hover) and the dropdown trigger (click) via chained render
                merges: menu → tooltip trigger → button */}
            <DropdownMenuTrigger
              render={
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Open account menu"
                      className="rounded-full outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-violet-500/60 hover:opacity-90"
                    />
                  }
                />
              }
            >
              <Avatar className={avatarClasses}>
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="text-xs! font-semibold text-violet-300!">
                  {initialsOf(user.name ?? "User")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <TooltipContent
              side="bottom"
              sideOffset={10}
              className="bg-[#1a1a1f]! text-white! ring-white/10! px-3! py-1.5!"
            >
              <span className="text-xs">{user.name}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* account dropdown */}
        <DropdownMenuContent
          align="end"
          alignOffset={-8}
          className={cn(
            "bg-[#131316]! text-white! ring-white/10! min-w-[220px]! rounded-xl! p-1.5!"
          )}
        >
          {/* identity header */}
          <div className="flex items-center gap-3 px-2.5 py-2">
            <Avatar className={avatarClasses}>
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback className="text-xs! font-semibold text-violet-300!">
                {initialsOf(user.name ?? "User")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user.name}
              </p>
              <p className="truncate text-xs text-white/55">{user.email}</p>
            </div>
          </div>

          <DropdownMenuSeparator className="bg-white/10!" />

          <DropdownMenuItem
            onClick={() => router.push("/dashboard")}
            className="rounded-lg! px-2.5! py-1.5! text-sm! text-white/80! focus:bg-white/[0.07]! focus:text-white!"
          >
            <LayoutDashboard className="text-violet-400" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            disabled={isSigningOut}
            onClick={handleSignOut}
            className="rounded-lg! px-2.5! py-1.5! text-sm!"
          >
            <LogOut />
            {isSigningOut ? "Signing out…" : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
