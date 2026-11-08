"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

type PasswordInputProps = {
  autoComplete?: "new-password" | "current-password"
  placeholder?: string
  /** omit (undefined) for no minimum — e.g. sign-in must not lock people out */
  minLength?: number
}

// password field with a visibility toggle; the input itself stays uncontrolled
// (pure UI) so FormData-based retrieval works without any value state.
// All props are passed explicitly by each form:
// - signup: autoComplete="new-password" + minLength={8}
// - signin: autoComplete="current-password", no minLength (don't lock out users)
const PasswordInput = ({
  autoComplete = "current-password",
  placeholder = "Your password",
  minLength,
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        name="password"
        id="password"
        required
        autoComplete={autoComplete}
        minLength={minLength}
        placeholder={placeholder}
        className="h-11! w-full rounded-xl! pr-11! border-white/10! bg-white/[0.04]! px-4! text-sm! text-white! shadow-none! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/30! dark:bg-input/30! placeholder:text-white/40!"
      />
      <Button
        type="button"
        variant="ghost"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute top-0 bottom-0 right-1.5 w-8! rounded-lg! text-white/50! hover:bg-transparent! hover:text-white! active:translate-y-0! active:scale-100!"
      >
        {visible ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </Button>
    </div>
  )
}

export default PasswordInput
