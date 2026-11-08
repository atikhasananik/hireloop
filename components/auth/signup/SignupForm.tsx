"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Briefcase, ShieldCheck, UserSearch, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "../../ui/separator"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import PasswordInput from "./PasswordInput"

export type SignupFormData = {
  name: string
  email: string
  password: string
  agreeTerms: boolean
  /** which side of the marketplace is signing up — defaults to "seeker" */
  role: "seeker" | "recruiter" | "admin"
}



// lucide 1.x has no brand icons — inline Google "G" paths
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4">
    <path
      fill="#EA4335"
      d="M12 5.04c1.75 0 3.32.6 4.56 1.8l3.4-3.4C17.8 1.4 15.15.36 12 .36 7.32.36 3.3 3.03 1.38 6.9l3.96 3.07C6.3 7.13 8.93 5.04 12 5.04Z"
    />
    <path
      fill="#4285F4"
      d="M23.64 12.26c0-.79-.07-1.55-.2-2.26H12v4.51h6.5a5.55 5.55 0 0 1-2.4 3.64l3.85 2.98c2.25-2.08 3.69-5.15 3.69-8.87Z"
    />
    <path
      fill="#FBBC05"
      d="M5.34 14.03a6.63 6.63 0 0 1 0-4.06L1.38 6.9a11.26 11.26 0 0 0 0 10.2l3.96-3.07Z"
    />
    <path
      fill="#34A853"
      d="M12 23.64c3.15 0 5.8-1.04 7.74-2.83l-3.85-2.98c-1.07.72-2.44 1.14-3.89 1.14-3.07 0-5.7-2.09-6.62-4.92l-3.96 3.07c1.92 3.87 5.94 6.52 10.58 6.52Z"
    />
  </svg>
)

const fieldClasses =
  "h-11! w-full rounded-xl! border-white/10! bg-white/[0.04]! px-4! text-sm! text-white! shadow-none! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/30! dark:bg-input/30! placeholder:text-white/40!"

const roleOptions: {
  id: SignupFormData["role"]
  label: string
  icon: LucideIcon
}[] = [
  { id: "seeker", label: "Seeker", icon: UserSearch },
  { id: "recruiter", label: "Recruiter", icon: Briefcase },
  { id: "admin", label: "Admin", icon: ShieldCheck },
]

// signup UI. Inputs are uncontrolled; the only interactive state is the
// checkbox (gates the CTA) — see PasswordInput for the eye toggle.
const SignupForm = () => {
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [role, setRole] = useState<SignupFormData["role"]>("seeker")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fromData = new FormData(event.currentTarget)
    const data = Object.fromEntries(fromData.entries()) as unknown as SignupFormData
    console.log(data)
  }

  return (
    <Card className="w-full max-w-md rounded-2xl! my-10 mx-auto bg-[#0d0e14]! py-7! ring-white/10! sm:py-8!">
      <CardContent className="flex flex-col gap-7 px-6! sm:px-8!">
        {/* heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-white/55">
            Your matches are 3 minutes away — no card needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* role picker — the hidden input makes the selection readable from
              FormData by getFormData */}
          <div>
            <Label className="text-xs! font-medium text-white/75!">I am a</Label>
            <div
              role="radiogroup"
              aria-label="Account role"
              className="mt-2 grid grid-cols-3 gap-2"
            >
              <input type="hidden" name="role" value={role} />
              {roleOptions.map(({ id, label, icon: RoleIcon }) => {
                const selected = role === id

                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setRole(id)}
                    className={cn(
                      "flex h-16! flex-col items-center justify-center gap-1.5 rounded-xl! text-xs! font-medium transition-colors border active:translate-y-0!",
                      selected
                        ? "border-violet-500/80! bg-violet-600/15! text-white!"
                        : "border-white/10! bg-white/[0.03]! text-white/60! hover:bg-white/[0.07]! hover:text-white/85!"
                    )}
                  >
                    <RoleIcon
                      className={cn("size-5", selected ? "text-violet-400" : "text-white/50")}
                    />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Full name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-xs! font-medium text-white/75!">
              Full name
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              required
              autoComplete="name"
              placeholder="e.g. Atik Rahman"
              className={fieldClasses}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-xs! font-medium text-white/75!">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClasses}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-xs! font-medium text-white/75!">
              Password
            </Label>
            <PasswordInput />
          </div>

          {/* terms */}
          <label className="mt-1 flex items-start gap-2.5 text-sm text-white/65">
            <Checkbox
              name="agreeTerms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
              className="mt-0.5 size-4! border-white/25! bg-transparent! data-checked:border-violet-500! data-checked:bg-violet-600!"
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="font-medium text-violet-400 hover:text-violet-300">
                Terms
              </Link>{" "}
              &amp;{" "}
              <Link href="#" className="font-medium text-violet-400 hover:text-violet-300">
                Policy
              </Link>
            </span>
          </label>

          {/* submit */}
          <Button
            type="submit"
            disabled={!agreeTerms}
            className="h-11! w-full rounded-xl! bg-violet-600! text-sm! font-medium text-white! hover:bg-violet-700! disabled:cursor-not-allowed! disabled:opacity-40!"
          >
            Create account
          </Button>
        </form>

        {/* divider */}
        <div className="flex items-center gap-4">
          <Separator className="bg-white/10!" />
          <span className="text-xs text-white/40">or</span>
          <Separator className="bg-white/10!" />
        </div>

        {/* google */}
        <Button
          type="button"
          variant="outline"
          className="h-11! w-full gap-2 rounded-xl! border-white/10! bg-white/[0.06]! text-sm! font-medium text-white! hover:bg-white/[0.1]!"
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        {/* switch to sign in */}
        <p className="text-center text-sm text-white/55">
          Already have an account?{" "}
          <Link href="/" className="font-medium text-violet-400 hover:text-violet-300">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignupForm
