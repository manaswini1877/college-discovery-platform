import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import RegisterForm from "@/components/auth/RegisterForm"

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)

  // Server-side redirect if already authenticated
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#eff6ff] blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl border border-[#e5e7eb] bg-white p-8 sm:p-10 shadow relative z-10">
        <div className="flex justify-center mb-6">
          <LinkToHomeLogo />
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

function LinkToHomeLogo() {
  return (
    <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#1a1a1a] group">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-white shadow-md">
        🎓
      </span>
      <span className="text-[#1a1a1a]">
        UniDiscover
      </span>
    </a>
  )
}
