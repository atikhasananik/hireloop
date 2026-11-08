"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Separator } from "../../ui/separator"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import PasswordInput from "../signup/PasswordInput"
import GoogleIcon from "../GoogleIcon"

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
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(
      data.entries()
    ) as unknown as SigninFormData
    const updatedData = {...formData,rememberMe}
    console.log(updatedData)
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

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-xs! font-medium text-white/75!"
            >
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
            <div className=" space-y-2">
              <Label
                htmlFor="password"
                className="text-xs! font-medium text-white/75!"
              >
                Password
              </Label>
              <PasswordInput />
            </div>
            <Link
              href="#"
              className="text-xs font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* remember me */}
          <label className="mt-1 flex items-center gap-2.5 text-sm text-white/65">
            <Checkbox
            onCheckedChange={() => {
              setRememberMe((val ) => !val
              )
            }
            }
              name="rememberMe"
              className="size-4! border-white/25! bg-transparent! data-checked:border-violet-500! data-checked:bg-violet-600!"
            />
            Remember me
          </label>

          {/* submit */}
          <Button
            type="submit"
            className="h-11! w-full rounded-xl! bg-violet-600! text-sm! font-medium text-white! hover:bg-violet-700!"
          >
            Sign in
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

        {/* switch to sign up */}
        <p className="text-center text-sm text-white/55">
          New to HireLoop?{" "}
          <Link
            href="/signup"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SigninForm
