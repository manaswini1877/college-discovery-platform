"use client"

import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { Landmark, ArrowRight, Star, RefreshCw, HelpCircle, MapPin, Award } from "lucide-react"
import { useToast } from "@/context/ToastContext"
import { College, Cutoff } from "@/types"
import CollegeCard from "../college/CollegeCard"

const EXAM_CATEGORIES: Record<string, string[]> = {
  "JEE Advanced": ["General", "OBC", "SC", "ST", "EWS"],
  "JEE Main": ["General", "OBC", "SC", "ST"],
  "AP EAPCET": ["General", "BC-A", "BC-B", "SC", "ST"],
  "TS EAPCET": ["General", "BC-A", "SC", "ST"],
  "MHT CET": ["General", "OBC", "SC"],
  "KCET": ["GM", "OBC", "SC"],
}

const EXAMS = Object.keys(EXAM_CATEGORIES)

const STATES = [
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

interface PredictorResult {
  college: College
  chance: "High" | "Medium" | "Low"
  cutoff: Cutoff
}

export default function PredictorForm() {
  const { toast } = useToast()
  const [exam, setExam] = useState("JEE Main")
  const [category, setCategory] = useState("General")
  const [rank, setRank] = useState("")
  const [state, setState] = useState("")

  // Auto-update category when exam changes to avoid invalid submissions
  useEffect(() => {
    const validCategories = EXAM_CATEGORIES[exam] || []
    if (validCategories.length > 0) {
      setCategory(validCategories[0] as string)
    }
  }, [exam])

  const predictorMutation = useMutation({
    mutationFn: async (payload: { exam: string; rank: number; category: string; state?: string }) => {
      const res = await fetch("/api/predictor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Prediction failed")
      }
      const json = await res.json()
      if (!json.success) {
        throw new Error(json.error || "Prediction failed")
      }
      return json.data as PredictorResult[]
    },
    onSuccess: (data) => {
      toast(`Found ${data.length} potential college matches!`, "success")
    },
    onError: (err) => {
      toast(err instanceof Error ? err.message : "Failed to run prediction", "error")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsedRank = parseInt(rank, 10)
    if (isNaN(parsedRank) || parsedRank <= 0) {
      toast("Please enter a valid positive rank number", "error")
      return
    }

    predictorMutation.mutate({
      exam,
      rank: parsedRank,
      category,
      state: state || undefined,
    })
  }

  return (
    <div className="space-y-10">
      {/* Predictor Inputs Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8 space-y-6 card"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Exam Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-indigo-400" />
              Entrance Exam
            </label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5 text-sm text-[#1a1a1a] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#c7d2fe] cursor-pointer"
            >
              {EXAMS.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5 text-indigo-400" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5 text-sm text-[#1a1a1a] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#c7d2fe] cursor-pointer"
            >
              {(EXAM_CATEGORIES[exam] || []).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Rank Entry */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-indigo-400" />
              Enter Rank
            </label>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="e.g. 2500"
              required
              min="1"
              className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#6b7280] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#c7d2fe]"
            />
          </div>

          {/* State Quota (Optional) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-indigo-400" />
              Preferred State (Optional)
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5 text-sm text-[#1a1a1a] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#c7d2fe] cursor-pointer"
            >
              <option value="">All States / Open Quota</option>
              {STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={predictorMutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-[#1a73e8] hover:bg-[#1667d1] text-white font-bold py-3.5 px-6 shadow transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {predictorMutation.isPending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analyzing cutoff databases...
              </>
            ) : (
              <>
                Predict Admission Chance
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results View */}
      {predictorMutation.isSuccess && (
          <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-[#e5e7eb] pb-4">
            <h3 className="text-xl font-extrabold text-[#1a1a1a]">
              Admission Results for Rank <span className="text-[#1a73e8]">#{rank}</span> in{" "}
              <span className="text-[#1a73e8]">{exam}</span> ({category})
            </h3>
            <p className="text-sm text-[#6b7280] mt-1">
              Calculated matching colleges based on 2023 &amp; 2024 final closing ranks.
            </p>
          </div>

          {predictorMutation.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e5e7eb] bg-white py-16 text-center card">
              <div className="h-12 w-12 rounded-full bg-gray-100 border border-[#e5e7eb] flex items-center justify-center text-[#6b7280]">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h4 className="mt-4 font-bold text-[#1a1a1a]">No matching colleges found</h4>
              <p className="mt-1.5 text-sm text-[#6b7280] max-w-sm">
                Your rank may exceed the closing cutoff parameters for this exam/category combinations.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {predictorMutation.data.map((item) => (
                <div
                  key={`${item.college.id}-${item.cutoff.id}`}
                  className="flex flex-col rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden shadow transition-transform hover:-translate-y-0.5"
                >
                  {/* Custom Header displaying Predicted chance and cutoff range */}
                  <div className="px-5 py-3.5 border-b border-[#e5e7eb] flex items-center justify-between bg-white">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${
                        item.chance === "High"
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                          : item.chance === "Medium"
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                          : "bg-rose-500/15 border-rose-500/30 text-rose-400"
                      }`}
                    >
                      {item.chance} Chance
                    </span>
                    <span className="text-[11px] text-[#6b7280] font-bold">
                      {item.cutoff.year} Cutoff: {item.cutoff.openRank} - {item.cutoff.closeRank}
                    </span>
                  </div>

                  {/* Standard CollegeCard */}
                  <div className="flex-1 flex flex-col bg-white">
                    <CollegeCard college={item.college} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
