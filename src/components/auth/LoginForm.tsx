"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, LogIn, RefreshCw, AlertCircle } from "lucide-react"
import { useToast } from "@/context/ToastContext"
import { loginSchema } from "@/lib/validations"

export default function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Form Zod Validation
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid input fields")
      setIsLoading(false)
      return
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError(res.error)
        toast(res.error, "error")
      } else {
        toast("Welcome back!", "success")
        router.push("/")
        router.refresh()
      }
    } catch (err: any) {
      console.error(err)
      setError("An unexpected error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white">Welcome Back</h2>
        <p className="mt-1.5 text-sm text-slate-400">Sign in to sync your favorites and predictions</p>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200 animate-in fade-in zoom-in-95 duration-200">
          <AlertCircle className="h-5 w-5 text-rose-455 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Mail className="h-4.5 w-4.5 text-slate-500" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 pl-11 text-sm text-slate-200 placeholder-slate-650 outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Lock className="h-4.5 w-4.5 text-slate-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 pr-11 pl-11 text-sm text-slate-200 placeholder-slate-650 outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              className="absolute inset-y-0 right-4 flex items-center text-slate-550 hover:text-slate-200 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-650 hover:bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4.5 w-4.5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4.5 w-4.5" />
              Sign In
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-slate-400 border-t border-slate-850 pt-4">
        Don't have an account?{" "}
        <Link href="/register" className="font-bold text-indigo-400 hover:text-indigo-350 transition-colors">
          Create account
        </Link>
      </div>
    </div>
  )
}
