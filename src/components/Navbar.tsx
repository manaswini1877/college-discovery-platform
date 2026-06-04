"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { Menu, X, Landmark, Heart, LayoutDashboard, Compass, LogIn, UserPlus, LogOut } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const links = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/compare", label: "Compare", icon: LayoutDashboard },
    { href: "/predictor", label: "Predictor", icon: Landmark },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white border-[#e5e7eb] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#1a1a1a] group">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                🎓
              </span>
              <span className="bg-gradient-to-r from-indigo-200 via-slate-100 to-purple-200 bg-clip-text text-transparent">
                UniDiscover
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[#1a73e8]"
                      : "text-[#1a1a1a] hover:text-[#1a73e8]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
            
            {status === "authenticated" && (
              <Link
                href="/favorites"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive("/favorites")
                    ? "text-indigo-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Heart className="w-4 h-4" />
                Favorites
              </Link>
            )}
          </div>

          {/* User Auth Buttons / Info */}
          <div className="hidden md:flex items-center gap-4">
            {status === "loading" ? (
              <div className="h-8 w-24 animate-pulse rounded bg-gray-100" />
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#6b7280]">
                  Hi, <span className="text-[#1a1a1a] font-semibold">{session.user?.name}</span>
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f3f4f6] px-3 py-1.5 text-sm font-medium text-[#1a1a1a] transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-sm font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1667d1] px-3.5 py-1.5 text-sm font-medium text-white shadow transition-all hover:scale-[1.02]"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-[#6b7280] hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#e5e7eb] bg-white px-2 pt-2 pb-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-base font-medium ${
                  isActive(link.href)
                    ? "bg-gray-100 text-[#1a73e8]"
                    : "text-[#1a1a1a] hover:bg-gray-50 hover:text-[#1a73e8]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
          
          {status === "authenticated" && (
            <Link
              href="/favorites"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-base font-medium ${
                isActive("/favorites")
                  ? "bg-slate-900 text-indigo-400"
                  : "text-slate-300 hover:bg-slate-900/60 hover:text-white"
              }`}
            >
              <Heart className="w-5 h-5" />
              Favorites
            </Link>
          )}

          <div className="border-t border-slate-800 mt-4 pt-4 px-3">
            {status === "authenticated" ? (
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-300">
                  Signed in as <span className="text-white font-semibold">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    signOut({ callbackUrl: "/" })
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 py-2 text-sm font-medium text-rose-400 hover:bg-slate-900/80 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 py-2 text-sm font-medium text-slate-300 hover:text-white"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-md bg-indigo-600 py-2 text-sm font-medium text-white shadow-md hover:bg-indigo-500"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
