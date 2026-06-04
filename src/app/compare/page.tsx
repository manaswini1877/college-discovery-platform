"use client"

import Navbar from "@/components/Navbar"
import CompareSelector from "@/components/compare/CompareSelector"
import CompareTable from "@/components/compare/CompareTable"
import { useCompare } from "@/hooks/useCompare"
import { LayoutDashboard, AlertCircle, HelpCircle, ArrowRight } from "lucide-react"

export default function ComparePage() {
  const {
    colleges,
    isLoading,
    addCollege,
    removeCollege,
    clearCompare,
    selectedIds,
    isMounted,
  } = useCompare()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Header section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#eff6ff] to-[#dbeafe] py-10 border-b border-[#e5e7eb]">
        <div className="relative mx-auto max-w-4xl px-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-1.5 text-xs font-bold text-[#1a73e8]">
            <LayoutDashboard className="h-4 w-4 text-[#1a73e8]" />
            Comparison Center
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-4xl">
            Compare Engineering Colleges
          </h1>
          <p className="mt-2 text-sm text-[#6b7280] max-w-lg">
            Add up to 3 colleges to compare courses, pricing packages, average placements, and student reviews.
          </p>
        </div>
      </header>

      {/* Main content body */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Render selection input only when client-side has mounted to avoid hydration differences */}
        {isMounted ? (
          <div className="space-y-8">
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">Select Colleges</h3>
                {selectedIds.length > 0 && (
                  <button
                    onClick={clearCompare}
                    className="text-xs font-bold text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
                  >
                    Clear All Selection
                  </button>
                )}
              </div>
              <CompareSelector
                selectedColleges={colleges}
                onAdd={addCollege}
                onRemove={removeCollege}
                maxSelections={3}
              />
            </div>

            {/* Comparison results */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1a73e8] border-t-transparent" />
                <p className="text-sm text-[#6b7280]">Loading comparison details...</p>
              </div>
            ) : selectedIds.length < 2 ? (
              /* Empty state: Less than 2 colleges selected */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e5e7eb] bg-white py-16 px-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#1a73e8]">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-[#1a1a1a] text-lg">Compare Colleges Side-by-Side</h3>
                <p className="mt-2 text-sm text-[#6b7280] max-w-md">
                  Please select at least <span className="text-[#1a1a1a] font-bold">2 colleges</span> using the dropdown search above to activate comparison table.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 text-xs text-[#6b7280] font-medium">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a73e8]" />
                    Fees comparison
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a73e8]" />
                    Placement rates
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a73e8]" />
                    Highest salaries
                  </span>
                </div>
              </div>
            ) : (
              /* Side-by-side Table */
              <CompareTable colleges={colleges} onRemove={removeCollege} />
            )}
          </div>
        ) : (
          /* Loading fallback during initial hydration */
          <div className="h-40 rounded-2xl border border-slate-850 bg-slate-900/15 animate-pulse" />
        )}

      </main>
    </div>
  )
}
