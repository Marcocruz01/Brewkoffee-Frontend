import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | BrewKoffee",
  description: "Enter your email address to recover your account credentials.",
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1.5">
          Forgot your password?
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter your email and we&apos;ll send you instructions to reset it.
        </p>
      </div>

      <ForgotPasswordForm />
    </>
  )
}