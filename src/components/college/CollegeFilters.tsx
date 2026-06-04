"use client"

import { useState } from "react"
import { SlidersHorizontal, MapPin, Landmark, Coins, Star, RotateCcw } from "lucide-react"

export interface FilterState {
  state: string
  type: string
  maxFee: number
  rating: number
}

interface CollegeFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClear: () => void
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Telangana",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "Uttar Pradesh",
  "West Bengal",
  "Uttarakhand",
  "Kerala",
  "Rajasthan",
  "Odisha",
  "Haryana",
  "Madhya Pradesh",
  "Punjab"
].sort()

const COLLEGE_TYPES = ["Government", "Private", "Deemed"]

export default function CollegeFilters({ filters, onFilterChange, onClear }: CollegeFiltersProps) {
  const handleStateChange = (state: string) => {
    onFilterChange({ ...filters, state })
  }

  const handleTypeChange = (type: string) => {
    onFilterChange({ ...filters, type })
  }

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxFee: parseInt(e.target.value, 10) })
  }

  const handleRatingChange = (rating: number) => {
    // Toggle: if click active rating, reset to 0
    const newRating = filters.rating === rating ? 0 : rating
    onFilterChange({ ...filters, rating: newRating })
  }

  const formatLakhs = (amount: number) => {
    return `${(amount / 100000).toFixed(2)} Lakhs`
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#e5e7eb] bg-white p-6 card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-4">
        <div className="flex items-center gap-2 font-bold text-[#1a1a1a] text-lg">
          <SlidersHorizontal className="h-5 w-5 text-[#1a73e8]" />
          <span>Filters</span>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] hover:text-[#1667d1] transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* State Filter */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <MapPin className="h-3.5 w-3.5 text-slate-500" />
          State
        </label>
        <select
          value={filters.state}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#c7d2fe] transition-all cursor-pointer"
        >
          <option value="All">All States</option>
          {INDIAN_STATES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Landmark className="h-3.5 w-3.5 text-slate-500" />
          College Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#c7d2fe] transition-all cursor-pointer"
        >
          <option value="All">All Types</option>
          {COLLEGE_TYPES.map((ty) => (
            <option key={ty} value={ty}>
              {ty}
            </option>
          ))}
        </select>
      </div>

      {/* Max Annual Fee Range */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6b7280]">
            <Coins className="h-3.5 w-3.5 text-[#6b7280]" />
            Max Annual Fees
          </label>
          <span className="text-xs font-bold text-[#1a73e8] bg-[#eff6ff] px-2.5 py-0.5 rounded-full border border-[#e5e7eb]">
            {formatLakhs(filters.maxFee)}
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="500000"
          step="5000"
          value={filters.maxFee}
          onChange={handleFeeChange}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#e5e7eb] accent-[#1a73e8] transition-colors"
        />
        <div className="flex justify-between text-[10px] text-[#6b7280] font-semibold">
          <span>₹5k</span>
          <span>₹5.00 L</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Star className="h-3.5 w-3.5 text-slate-500" />
          Minimum Rating
        </label>
        <div className="flex gap-2.5 mt-1">
          {[1, 2, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => handleRatingChange(stars)}
              className={`flex h-10 flex-1 items-center justify-center rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                filters.rating >= stars
                  ? "bg-amber-100 border-amber-200 text-amber-600"
                  : "border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#c7d2fe] hover:text-[#1a1a1a]"
              }`}
            >
              {stars}★
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
