"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import CollegeSearch from "@/components/college/CollegeSearch"
import CollegeFilters, { FilterState } from "@/components/college/CollegeFilters"
import CollegeGrid from "@/components/college/CollegeGrid"
import { useColleges } from "@/hooks/useColleges"
import { ChevronLeft, ChevronRight, SlidersHorizontal, BookOpen, GraduationCap } from "lucide-react"

export default function Home() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    state: "All",
    type: "All",
    maxFee: 500000,
    rating: 0,
  })
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Query Colleges Hook
  const { data, isLoading } = useColleges({
    page,
    search,
    state: filters.state === "All" ? "" : filters.state,
    type: filters.type === "All" ? "" : filters.type,
    minFee: 0,
    maxFee: filters.maxFee,
    rating: filters.rating,
  })

  const colleges = data?.colleges || []
  const totalPages = data?.totalPages || 1
  const totalResults = data?.total || 0

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setPage(1) // Reset to page 1 on new search query
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setPage(1) // Reset to page 1 on new filter selection
  }

  const handleClearFilters = () => {
    setFilters({
      state: "All",
      type: "All",
      maxFee: 500000,
      rating: 0,
    })
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#eff6ff] to-[#dbeafe] py-16 text-center border-b border-[#e5e7eb] shadow-sm">
        {/* Decorative Grid BG */}
        <div className="absolute inset-0 opacity-50" />
        
        <div className="relative mx-auto max-w-4xl px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-1.5 text-xs font-bold text-[#1a1a1a]">
            <GraduationCap className="h-4 w-4" />
            Discover Colleges across India
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-6xl">
            Find Your Dream College
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6b7280] max-w-2xl">
            Compare annual fees, student reviews, placement packages, and predict your admission probability based on exam cutoff ranks.
          </p>
          <div className="mt-8 w-full max-w-2xl">
            <CollegeSearch initialSearch={search} onSearchChange={handleSearchChange} />
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Filters Sidebar (Hidden on mobile) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-20">
              <CollegeFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          {/* Mobile Filter Toggle Buttons */}
          <div className="flex lg:hidden items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">
              Showing {totalResults} {totalResults === 1 ? "college" : "colleges"}
            </span>
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-205 cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 text-indigo-400" />
              Toggle Filters
            </button>
          </div>

          {/* Mobile Filters Drawer (Overlay) */}
          {isMobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-full border border-slate-850 bg-slate-900 p-2 text-slate-400 hover:text-white"
                >
                  ✕ Close
                </button>
              </div>
              <CollegeFilters
                filters={filters}
                onFilterChange={(f) => {
                  handleFilterChange(f)
                  setIsMobileFiltersOpen(false) // Close drawer on selection
                }}
                onClear={() => {
                  handleClearFilters()
                  setIsMobileFiltersOpen(false)
                }}
              />
            </div>
          )}

          {/* College Results Content Grid */}
          <div className="flex-1 space-y-8">
            <div className="hidden lg:flex items-center justify-between border-b border-slate-900 pb-3">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-400" />
                All Listings
                <span className="text-xs font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                  {totalResults} matches
                </span>
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                Page {page} of {totalPages}
              </span>
            </div>

            <CollegeGrid colleges={colleges} isLoading={isLoading} />

            {/* Pagination Controls */}
            {totalPages > 1 && !isLoading && (
              <div className="flex items-center justify-center gap-4 pt-8 border-t border-slate-900">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-900/80 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-semibold text-slate-300">
                  Page <span className="text-white font-bold">{page}</span> of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-900/80 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
