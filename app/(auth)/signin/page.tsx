import SigninForm from "@/components/auth/signin/SigninForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in · HireLoop",
  description: "Sign in to HireLoop to see your job matches and applications.",
}

export default function SigninPage() {
  return <SigninForm />
}
