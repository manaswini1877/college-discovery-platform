"use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import CollegeGrid from "@/components/college/CollegeGrid"
import { useFavorites } from "@/hooks/useFavorites"
import { Heart, Search, ArrowRight } from "lucide-react"

export default function FavoritesPage() {
  const { data: favorites = [], isLoading } = useFavorites()

  // Map favorite records to get the underlying colleges
  const colleges = favorites
    .map((fav) => fav.college)
    .filter(Boolean) as any[]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Header section */}
      <header className="relative overflow-hidden bg-white py-10 border-b border-[#e5e7eb]">
        <div className="relative mx-auto max-w-4xl px-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-1.5 text-xs font-bold text-rose-600">
            <Heart className="h-4 w-4 text-rose-600" />
            My Favorites
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-4xl">
            Your Bookmarked Colleges
          </h1>
          <p className="mt-2 text-sm text-[#6b7280] max-w-lg">
            Keep track of colleges you are interested in. Add them from the home catalog or prediction panels.
          </p>
        </div>
      </header>

      {/* Grid listing */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
          {!isLoading && colleges.length === 0 ? (
          /* Custom Empty State with CTA button to browse */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e5e7eb] bg-white py-20 px-4 text-center animate-in fade-in duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-rose-600">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-bold text-[#1a1a1a] text-lg">No favorites saved yet</h3>
            <p className="mt-2 text-sm text-[#6b7280] max-w-sm">
              Start searching colleges and hit the heart icon to save them to your account.
            </p>
            <Link
              href="/"
              className="mt-8 flex items-center gap-2 rounded-xl bg-[#1a73e8] hover:bg-[#1666d6] px-5 py-3 text-sm font-bold text-white shadow transition-all hover:scale-[1.01]"
            >
              <Search className="h-4 w-4" />
              Browse College Directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <CollegeGrid colleges={colleges} isLoading={isLoading} />
        )}
      </main>
    </div>
  )
}
