import { Metadata } from "next";
import PasswordResetHandler from "@/components/auth/PasswordResetHandler";

export const metadata: Metadata = {
  title: "Reset Password | BrewKoffee",
  description: "Securely update your password to continue connecting your kitchen, bar, and customers.",
};

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1.5">
          Set a new password
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          You&apos;re one step away from regaining full control of your account.
        </p>
      </div>

      <PasswordResetHandler />
    </>
  )
}