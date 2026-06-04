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
      <header className="relative overflow-hidden bg-gradient-to-b from-[#eff6ff] via-white to-[#dbeafe] py-16 text-center border-b border-[#e5e7eb] shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,115,232,0.12),_transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl px-4 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="mx-auto max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-1.5 text-xs font-bold text-[#1a1a1a] shadow-sm">
              <GraduationCap className="h-4 w-4 text-[#1a73e8]" />
              Discover Colleges across India
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-6xl">
              A professional college discovery platform for smart decisions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#6b7280] max-w-2xl">
              Compare fees, placements, reviews, and admission probability in one clean interface built for serious students.
            </p>
            <div className="mt-8 w-full max-w-2xl">
              <CollegeSearch initialSearch={search} onSearchChange={handleSearchChange} />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#e5e7eb] bg-white shadow-lg shadow-slate-200/50">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1100&q=80"
              alt="Campus entrance"
              className="h-full w-full object-cover"
            />
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
            <span className="text-sm font-semibold text-[#6b7280]">
              Showing {totalResults} {totalResults === 1 ? "college" : "colleges"}
            </span>
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] shadow-sm hover:bg-[#f3f4f6] transition"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#1a73e8]" />
              Toggle Filters
            </button>
          </div>

          {/* Mobile Filters Drawer (Overlay) */}
          {isMobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white/95 p-4 overflow-y-auto">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-full border border-[#e5e7eb] bg-white p-2 text-[#6b7280] hover:text-[#1a1a1a]"
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
            <div className="hidden lg:flex items-center justify-between border-b border-[#e5e7eb] pb-3">
              <h2 className="text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#1a73e8]" />
                All Listings
                <span className="text-xs font-medium text-[#6b7280] bg-[#f8fafc] px-2 py-0.5 rounded-full border border-[#e5e7eb]">
                  {totalResults} matches
                </span>
              </h2>
              <span className="text-xs text-[#6b7280] font-semibold">
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f3f4f6] text-[#6b7280] hover:text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-semibold text-[#6b7280]">
                  Page <span className="text-[#1a1a1a] font-bold">{page}</span> of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f3f4f6] text-[#6b7280] hover:text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
