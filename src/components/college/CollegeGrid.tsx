"use client"

import CollegeCard, { CollegeCardSkeleton } from "./CollegeCard"
import { College } from "@/types"
import { SearchX } from "lucide-react"

interface CollegeGridProps {
  colleges: College[]
  isLoading: boolean
}

export default function CollegeGrid({ colleges, isLoading }: CollegeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CollegeCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e5e7eb] bg-white py-16 px-4 text-center card animate-in fade-in duration-300">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 border border-[#e5e7eb] text-[#1a73e8] shadow-sm">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-bold text-[#1a1a1a] text-lg">No colleges found</h3>
        <p className="mt-2 text-sm text-[#6b7280] max-w-sm">
          We couldn't find any colleges matching your search criteria. Try adjusting your filters or search keywords.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  )
}
