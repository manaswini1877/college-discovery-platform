"use client"

import { useState } from "react"
import { College, Course, Review } from "@/types"
import { Info, BookOpen, TrendingUp, MessageSquare, Star, Calendar, Landmark, MapPin, Coins, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CollegeDetailTabsProps {
  college: College
}

type TabType = "overview" | "courses" | "placements" | "reviews"

export default function CollegeDetailTabs({ college }: CollegeDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  const formatLakhs = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`
  }

  const formatRupees = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const tabsList: { id: TabType; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "placements", label: "Placements", icon: TrendingUp },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Tabs Switcher */}
      <div className="flex border-b border-[#e5e7eb] bg-white p-1 rounded-xl">
        {tabsList.map((tab) => {
          const Icon = tab.icon
          const isSelected = activeTab === tab.id
            return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 py-3 px-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? "bg-white text-[#1a73e8] border border-[#e5e7eb] shadow"
                  : "text-[#6b7280] hover:text-[#1a1a1a]"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Contents */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 min-h-[300px] animate-in fade-in duration-300 card">
        
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-[#1a73e8]" />
                About {college.name}
              </h3>
              <p className="text-[#6b7280] leading-relaxed text-sm whitespace-pre-line">
                {college.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4 border-t border-slate-850">
              <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white">
                <p className="text-[10px] uppercase font-bold text-[#6b7280] tracking-wider">Location</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[#1a1a1a] text-sm font-medium">
                  <MapPin className="h-4 w-4 text-[#1a73e8]" />
                  <span>{college.city}, {college.state}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white">
                <p className="text-[10px] uppercase font-bold text-[#6b7280] tracking-wider">College Type</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[#1a1a1a] text-sm font-medium">
                  <Landmark className="h-4 w-4 text-[#1a73e8]" />
                  <span>{college.type}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white">
                <p className="text-[10px] uppercase font-bold text-[#6b7280] tracking-wider">Established</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[#1a1a1a] text-sm font-medium">
                  <Calendar className="h-4 w-4 text-[#1a73e8]" />
                  <span>{college.established || "N/A"}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#e5e7eb] bg-white">
                <p className="text-[10px] uppercase font-bold text-[#6b7280] tracking-wider">Rating</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-amber-600 text-sm font-bold">
                  <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                  <span>{college.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              Offered Courses & Fees
            </h3>
            
            {!college.courses || college.courses.length === 0 ? (
              <p className="text-slate-400 text-sm">No courses data available.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
                <table className="min-w-full divide-y divide-slate-850 text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-6 py-4">Course Name</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4 text-right">Annual Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {college.courses.map((course: Course) => (
                      <tr key={course.id} className="hover:bg-slate-900/30">
                        <td className="px-6 py-4 font-semibold text-slate-200">{course.name}</td>
                        <td className="px-6 py-4">{course.duration}</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-200">{formatRupees(course.fees)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Placements Tab */}
        {activeTab === "placements" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              Placement Reports & Statistics
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Placement Percentage Card */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/30 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Placement Rate</span>
                    <h4 className="text-3xl font-extrabold text-slate-100 mt-2">{college.placement}%</h4>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${college.placement}%` }} />
                </div>
                <span className="text-[11px] text-slate-450 mt-3">Graduating batch placement success rate</span>
              </div>

              {/* Highest Package Card */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/30 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Highest Package</span>
                    <h4 className="text-3xl font-extrabold text-emerald-400 mt-2">{formatLakhs(college.highestPackage)}</h4>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Coins className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-850 pt-3 text-[11px] text-slate-450">
                  Record package offered in recent placements
                </div>
              </div>

              {/* Average Package Card */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/30 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Average Package</span>
                    <h4 className="text-3xl font-extrabold text-indigo-300 mt-2">{formatLakhs(college.averagePackage)}</h4>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-850 pt-3 text-[11px] text-slate-450">
                  Median average salary package across branches
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-400" />
                Student Reviews & Experiences
              </h3>
              <Badge className="bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/15 py-1 px-3">
                Avg. Rating: {college.rating.toFixed(1)} ★
              </Badge>
            </div>

            {!college.reviews || college.reviews.length === 0 ? (
              <p className="text-slate-400 text-sm">No reviews yet. Be the first to share your experience!</p>
            ) : (
              <div className="space-y-4">
                {college.reviews.map((review: Review) => (
                  <div key={review.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-200 text-sm">{review.studentName}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                          Posted on {new Date(review.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-400 border border-amber-500/20">
                        <span>{review.rating.toFixed(1)}</span>
                        <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                      </div>
                    </div>
                    <p className="text-slate-350 text-sm leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
