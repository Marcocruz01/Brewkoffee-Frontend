// Importamos las librerias
import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

// Definimos el MetaData
export const metadata: Metadata = {
  title: "Login | BrewKoffee",
  description: "Enter your credentials to access the BrewKoffee management system.",
}

// Definimos la vista
export default function LoginPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1.5">
          Hey, welcome back!
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to access your dashboard.
        </p>
      </div>
      {/* Form del login */}
      <LoginForm />
    </>
  )
}