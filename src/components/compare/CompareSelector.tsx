"use client"

import { useState, useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, X, Plus, Landmark, MapPin, Check } from "lucide-react"
import { College } from "@/types"

interface CompareSelectorProps {
  selectedColleges: College[]
  onAdd: (id: string, name: string) => void
  onRemove: (id: string, name: string) => void
  maxSelections?: number
}

export default function CompareSelector({
  selectedColleges,
  onAdd,
  onRemove,
  maxSelections = 3,
}: CompareSelectorProps) {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch search matches
  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ["compare-search-dropdown", search],
    queryFn: async () => {
      const res = await fetch(`/api/colleges?search=${encodeURIComponent(search)}&page=1`)
      const json = await res.json()
      if (json.success) {
        return json.data.colleges as College[]
      }
      return []
    },
    staleTime: 1000 * 30, // 30 seconds stale time for search dropdown
  })

  const isSelected = (id: string) => {
    return selectedColleges.some((c) => c.id === id)
  }

  const handleSelect = (college: College) => {
    if (isSelected(college.id)) {
      onRemove(college.id, college.name)
    } else {
      if (selectedColleges.length >= maxSelections) {
        return // Enforce limit (parent handles toast notification)
      }
      onAdd(college.id, college.name)
    }
    setSearch("")
    setIsOpen(false)
  }

  return (
    <div className="w-full space-y-4" ref={dropdownRef}>
      {/* Selected Colleges Tags */}
      {selectedColleges.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {selectedColleges.map((college) => (
            <div
              key={college.id}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-1.5 px-3 text-xs font-bold text-indigo-300 animate-in zoom-in-95 duration-205"
            >
              <span>{college.name}</span>
              <button
                onClick={() => onRemove(college.id, college.name)}
                className="text-indigo-400 hover:text-indigo-200 transition-colors cursor-pointer"
                aria-label={`Remove ${college.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selector input wrapper */}
      <div className="relative">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              selectedColleges.length >= maxSelections
                ? `Max limit of ${maxSelections} colleges selected`
                : "Type to select colleges for comparison..."
            }
            disabled={selectedColleges.length >= maxSelections}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/30 py-4.5 pr-12 pl-12 text-sm text-slate-100 placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-4 flex items-center text-slate-550 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Dropdown Options */}
        {isOpen && selectedColleges.length < maxSelections && (
          <div className="absolute left-0 mt-2 z-30 w-full max-h-60 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-md p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-slate-850">
            {isLoading ? (
              <div className="flex items-center justify-center p-4 text-sm text-slate-400">
                <div className="h-4 w-4 animate-spin rounded-full border border-indigo-500 border-t-transparent mr-2" />
                Loading colleges...
              </div>
            ) : colleges.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-400">No colleges match your query</div>
            ) : (
              colleges.map((college) => {
                const checked = isSelected(college.id)
                return (
                  <button
                    key={college.id}
                    type="button"
                    onClick={() => handleSelect(college)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-slate-900/80 transition-colors cursor-pointer group"
                  >
                    <div className="space-y-0.5 pr-4">
                      <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {college.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-550">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-indigo-500" />
                          {college.city}, {college.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Landmark className="h-3 w-3 text-slate-500" />
                          {college.type}
                        </span>
                      </div>
                    </div>
                    <div>
                      {checked ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 text-slate-600 group-hover:border-slate-500 group-hover:text-slate-400">
                          <Plus className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
