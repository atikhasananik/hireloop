"use client"

import { useState, type FormEvent, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Separator } from "../../ui/separator"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import PasswordInput from "../signup/PasswordInput"
import GoogleIcon from "../GoogleIcon"
import { toast } from "@/components/ui/toast"
import { TriangleAlert, CircleCheck } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export type SigninFormData = {
  email: string
  password: string
  rememberMe: boolean
}

const fieldClasses =
  "h-11! w-full rounded-xl! border-white/10! bg-white/[0.04]! px-4! text-sm! text-white! shadow-none! hover:bg-white/[0.05]! focus-visible:border-violet-500/60! focus-visible:ring-violet-500/30! dark:bg-input/30! placeholder:text-white/40!"

// sign-in UI, mirroring the signup card. Inputs are uncontrolled; the only
// interactive state component is the Remember-me checkbox.
const SigninForm = () => {
  const router = useRouter()
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // clears any scheduled redirect if the component unmounted first
  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current)
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as SigninFormData
    const updatedData = { ...data, rememberMe }

    setPending(true)
    setError(null)

    const { data: resData, error: signInError } = await signIn.email({
      email: updatedData.email,
      password: updatedData.password,
      rememberMe: updatedData.rememberMe,
      callbackURL: "/",
    })

    if (signInError) {
      const message =
        signInError.message ?? "Something went wrong. Please try again."

      toast.add({
        type: "error",
        title: "Sign in failed",
        description: message,
      })
      setError(message)
      setPending(false)
      return
    }

    if (resData?.user) {
      setSuccess(true)

      toast.add({
        type: "success",
        title: "Signed in",
        description: "Welcome back — you're all set.",
      })

      // let the user actually see the success line + toast before leaving
      redirectTimer.current = setTimeout(() => router.push("/"), 1400)
      // `pending` stays true through the navigation to avoid a flash of the form
      return
    }

    setPending(false)
  }

  return (
    <Card className="mx-auto my-30 w-full max-w-md rounded-2xl! bg-[#0d0e14]! py-7! ring-white/10! sm:py-8!">
      <CardContent className="flex flex-col gap-7 px-6! sm:px-8!">
        {/* heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-white/55">
            Sign in to see your new matches.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs! font-medium text-white/75!">
                Password
              </Label>
              <PasswordInput />
            </div>
          </div>

          {/* remember me */}
          <label className="mt-1 flex items-center gap-2.5 text-sm text-white/65">
            <Checkbox
              onCheckedChange={() => {
                setRememberMe((val) => !val)
              }}
              name="rememberMe"
              className="size-4! border-white/25! bg-transparent! data-checked:border-violet-500! data-checked:bg-violet-600!"
            />
            Remember me
          </label>

          {/* submit */}
          <Button
            type="submit"
            disabled={pending || success}
            className="h-11! w-full rounded-xl! bg-violet-600! text-sm! font-medium text-white! hover:bg-violet-700! disabled:cursor-not-allowed! disabled:opacity-40!"
          >
            {pending ? "Signing in…" : success ? "Signed in" : "Sign in"}
          </Button>
        </form>

        {/* API feedback: toast on top, mirrors the outcome here in the form */}
        {error && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
          >
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span>{error}</span>
          </p>
        )}
        {success && (
          <p
            role="status"
            className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300"
          >
            <CircleCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span>Signed in successfully — redirecting…</span>
          </p>
        )}

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

        {/* switch to sign up */}
        <p className="text-center text-sm text-white/55">
          New to HireLoop?{" "}
          <Link href="/signup" className="font-medium text-violet-400 hover:text-violet-300">
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SigninForm