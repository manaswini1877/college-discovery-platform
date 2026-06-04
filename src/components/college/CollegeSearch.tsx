"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"

interface CollegeSearchProps {
  initialSearch: string
  onSearchChange: (search: string) => void
}

export default function CollegeSearch({ initialSearch, onSearchChange }: CollegeSearchProps) {
  const [value, setValue] = useState(initialSearch)
  const isFirstMount = useRef(true)

  // Sync with initialSearch changes from parent if any
  useEffect(() => {
    setValue(initialSearch)
  }, [initialSearch])

  // Debounced search logic
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    const timer = setTimeout(() => {
      onSearchChange(value)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, onSearchChange])

  const handleClear = () => {
    setValue("")
    onSearchChange("")
  }

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <Search className="h-5 w-5 text-slate-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search colleges by name, city, or state..."
        className="w-full rounded-2xl border border-slate-800 bg-slate-900/30 py-4.5 pr-12 pl-12 text-base text-slate-100 placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-4 flex items-center text-slate-450 hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Clear search text"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
