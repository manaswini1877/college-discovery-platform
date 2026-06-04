"use client"

import { College } from "@/types"
import { Sparkles, Trophy, Trash2 } from "lucide-react"

interface CompareTableProps {
  colleges: College[]
  onRemove: (id: string, name: string) => void
}

export default function CompareTable({ colleges, onRemove }: CompareTableProps) {
  if (colleges.length === 0) return null

  // Calculate best values for highlighting
  const feesList = colleges.map((c) => c.fees)
  const minFees = Math.min(...feesList)

  const ratingsList = colleges.map((c) => c.rating)
  const maxRating = Math.max(...ratingsList)

  const placementsList = colleges.map((c) => c.placement)
  const maxPlacement = Math.max(...placementsList)

  const highestPackagesList = colleges.map((c) => c.highestPackage)
  const maxHighestPackage = Math.max(...highestPackagesList)

  const formatLakhs = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)} L`
  }

  const formatLpa = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)} LPA`
  }

  const isBest = (type: "fees" | "rating" | "placement" | "highestPackage", value: number) => {
    if (colleges.length < 2) return false
    switch (type) {
      case "fees":
        return value === minFees
      case "rating":
        return value === maxRating
      case "placement":
        return value === maxPlacement
      case "highestPackage":
        return value === maxHighestPackage
      default:
        return false
    }
  }

  const highlightClass = "bg-emerald-50 border-emerald-200 text-emerald-700"
  const normalClass = "bg-white border-[#e5e7eb] text-[#1a1a1a]"

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white card">
      <table className="min-w-full table-fixed border-collapse text-left text-sm">
        <thead>
          <tr className="bg-white divide-x divide-[#e5e7eb]">
            {/* Attribute Column header */}
            <th className="w-48 px-6 py-5 font-bold uppercase tracking-wider text-[#6b7280] text-xs">
              Features
            </th>
            {/* Colleges Headers */}
            {colleges.map((college) => (
              <th key={college.id} className="px-6 py-5 text-[#1a1a1a]">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-base text-[#1a1a1a]">{college.name}</h4>
                    <p className="text-xs text-[#6b7280]">
                      {college.city}, {college.state}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(college.id, college.name)}
                    className="rounded-lg p-1.5 text-[#6b7280] hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    aria-label={`Remove ${college.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e5e7eb] divide-x divide-[#e5e7eb]">
          
          {/* Row: Location */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-4.5 font-bold text-[#6b7280]">Location</td>
            {colleges.map((college) => (
              <td key={college.id} className="px-6 py-4.5 text-[#1a1a1a]">
                {college.city}, {college.state}
              </td>
            ))}
          </tr>

          {/* Row: Type */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-4.5 font-bold text-[#6b7280]">College Type</td>
            {colleges.map((college) => (
              <td key={college.id} className="px-6 py-4.5 text-[#1a1a1a]">
                {college.type}
              </td>
            ))}
          </tr>

          {/* Row: Fees */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-4.5 font-bold text-[#6b7280]">Annual Fees</td>
            {colleges.map((college) => {
              const best = isBest("fees", college.fees)
              return (
                <td
                  key={college.id}
                  className={`px-6 py-4.5 font-bold border-l border-r transition-all ${
                    best ? highlightClass : normalClass
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{formatLakhs(college.fees)}</span>
                    {best && <Sparkles className="h-3.5 w-3.5 text-emerald-450 shrink-0" />}
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Row: Rating */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-4.5 font-bold text-[#6b7280]">Student Rating</td>
            {colleges.map((college) => {
              const best = isBest("rating", college.rating)
              return (
                <td
                  key={college.id}
                  className={`px-6 py-4.5 font-bold border-l border-r transition-all ${
                    best ? highlightClass : normalClass
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{college.rating.toFixed(1)} ★</span>
                    {best && <Trophy className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Row: Placement % */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-4.5 font-bold text-[#6b7280]">Placement %</td>
            {colleges.map((college) => {
              const best = isBest("placement", college.placement)
              return (
                <td
                  key={college.id}
                  className={`px-6 py-4.5 font-bold border-l border-r transition-all ${
                    best ? highlightClass : normalClass
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{college.placement}%</span>
                    {best && <Sparkles className="h-3.5 w-3.5 text-emerald-450 shrink-0" />}
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Row: Highest Package */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-4.5 font-bold text-[#6b7280]">Highest Package</td>
            {colleges.map((college) => {
              const best = isBest("highestPackage", college.highestPackage)
              return (
                <td
                  key={college.id}
                  className={`px-6 py-4.5 font-bold border-l border-r transition-all ${
                    best ? highlightClass : normalClass
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{formatLpa(college.highestPackage)}</span>
                    {best && <Trophy className="h-3.5 w-3.5 text-emerald-450 shrink-0" />}
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Row: Average Package */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-4.5 font-bold text-[#6b7280]">Average Package</td>
            {colleges.map((college) => (
              <td key={college.id} className="px-6 py-4.5 text-[#1a1a1a] font-semibold">
                {formatLpa(college.averagePackage)}
              </td>
            ))}
          </tr>

          {/* Row: Courses */}
          <tr className="hover:bg-gray-50 divide-x divide-[#e5e7eb]">
            <td className="px-6 py-5 font-bold text-[#6b7280]">Offered Courses</td>
            {colleges.map((college) => (
              <td key={college.id} className="px-6 py-5 text-xs text-[#6b7280]">
                <div className="flex flex-wrap gap-1.5">
                  {college.courses?.map((course) => (
                    <span
                      key={course.id}
                      className="rounded bg-gray-100 border border-[#e5e7eb] px-2 py-0.5 text-[#1a1a1a]"
                    >
                      {course.name}
                    </span>
                  ))}
                  {(!college.courses || college.courses.length === 0) && (
                    <span className="text-[#6b7280]">N/A</span>
                  )}
                </div>
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  )
}
