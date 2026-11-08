"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

// password field with a visibility toggle; the input itself stays uncontrolled
// (pure UI) so FormData-based retrieval works without any value state
const PasswordInput = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative flex items-center justify-between">
      <Input
        type={visible ? "text" : "password"}
        name="password"
        id="password"
        required
        autoComplete="new-password"
        minLength={8}
        placeholder="At least 8 characters"
        className="h-11! w-full rounded-xl! border-white/10! bg-white/[0.04]! px-4! pr-11! text-sm! text-white! shadow-none! placeholder:text-white/40! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/30! dark:bg-input/30!"
      />
      <Button
        type="button"
        variant="ghost"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-1.5 w-8! rounded-lg! text-white/50! hover:bg-transparent! hover:text-white! active:translate-y-0! active:scale-100!"
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    </div>
  )
}

export default PasswordInput
