"use client"

import Link from "next/link"
import type { LinkProps } from "next/link"
import { cn } from "cn"
import { Button } from "./button"

type ButtonLinkProps = Omit<React.ComponentProps<typeof Button>, "render" | "nativeButton"> &
  Pick<LinkProps, "href" | "replace" | "scroll" | "prefetch">

/**
 * A Button-styled action that renders next/link instead of a native <button>.
 * Base UI's Button must be told `nativeButton={false}` whenever its render
 * target is not a native <button> — without it every instance logs the
 * "expected a native <button>" console error. Centralized here so link CTAs
 * stay consistent.
 */
const ButtonLink = ({ href, replace, scroll, prefetch, className, ...props }: ButtonLinkProps) => {
  return (
    <Button
      nativeButton={false}
      render={<Link href={href} replace={replace} scroll={scroll} prefetch={prefetch} />}
      className={cn(className)}
      {...props}
    />
  )
}

export { ButtonLink }
