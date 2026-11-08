import type { Metadata } from "next"
import SignupForm from "@/components/auth/signup/SignupForm"

export const metadata: Metadata = {
  title: "Create your account · HireLoop",
  description:
    "Sign up for HireLoop — match with jobs, verified salary data, and 1-click apply.",
}

export default function SignupPage() {
  return <SignupForm />
}
