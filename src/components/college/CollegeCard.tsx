"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Heart, Star, MapPin, Award, Calendar, IndianRupee } from "lucide-react"
import { useState } from "react"
import { College } from "@/types"
import { useFavorites, useToggleFavorite } from "@/hooks/useFavorites"
import { useToast } from "@/context/ToastContext"
import { Badge } from "@/components/ui/badge"

interface CollegeCardProps {
  college: College
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const [imgError, setImgError] = useState(false)
  const router = useRouter()
  const { status } = useSession()
  const { toast } = useToast()
  const { data: favorites } = useFavorites()
  const toggleFavorite = useToggleFavorite()

  const favoriteEntry = favorites?.find((f) => f.collegeId === college.id)
  const isFavorite = !!favoriteEntry

  const formatLakhs = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)} L`
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (status !== "authenticated") {
      toast("Please log in to save favorites", "info")
      router.push("/login")
      return
    }

    toggleFavorite.mutate({
      collegeId: college.id,
      isFavorite,
      favoriteId: favoriteEntry?.id,
    })
  }

  return (
    <Link
      href={`/colleges/${college.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl card transition-all duration-300 hover:-translate-y-1"
    >
      {/* College Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
        {!imgError ? (
          <img
            src={college.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(college.name)}/800/400`}
            alt={college.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a73e8] text-white font-bold text-xl">
              {college.name.split(" ").map((s) => s[0]).slice(0,2).join("")}
            </div>
          </div>
        )}
        {/* Rating overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-200">
          <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
          <span>{college.rating.toFixed(1)}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={toggleFavorite.isPending}
          className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer ${
            isFavorite
              ? "bg-rose-100 border-rose-200 text-rose-600 scale-105"
              : "bg-white border-[#e5e7eb] text-[#6b7280] hover:text-[#1a1a1a] hover:scale-105"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart className={`h-4.5 w-4.5 ${isFavorite ? "fill-rose-500" : ""}`} />
        </button>

        {/* College Type Tag */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-[#1a73e8] text-white font-medium border-0 px-2.5 py-0.5 text-[11px] rounded-md">
            {college.type}
          </Badge>
        </div>
      </div>

      {/* College Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="line-clamp-1 font-bold text-lg text-[#1a1a1a] transition-colors group-hover:text-[#1a73e8]">
            {college.name}
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6b7280]">
            <MapPin className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{college.city}, {college.state}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#e5e7eb] py-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Average Fee</p>
              <p className="mt-0.5 flex items-center font-bold text-[#1a1a1a] text-sm">
                <IndianRupee className="h-3.5 w-3.5 text-slate-400" />
                {formatLakhs(college.fees)} / yr
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Placement Rate</p>
              <p className="mt-0.5 flex items-center gap-1 font-bold text-emerald-600 text-sm">
                <Award className="h-3.5 w-3.5" />
                {college.placement}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-[#6b7280]">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-indigo-500" />
            <span>Est: {college.established || "N/A"}</span>
          </div>
          <div className="font-semibold text-[#1a1a1a]">
            Avg Package: <span className="text-[#1a73e8] font-bold">{formatLakhs(college.averagePackage)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function CollegeCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-850 bg-slate-900/30 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full bg-slate-800" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded bg-slate-800" />
          <div className="h-3.5 w-1/2 rounded bg-slate-800" />
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-850">
          <div className="space-y-1">
            <div className="h-2.5 w-12 rounded bg-slate-800" />
            <div className="h-4.5 w-20 rounded bg-slate-800" />
          </div>
          <div className="space-y-1">
            <div className="h-2.5 w-16 rounded bg-slate-800" />
            <div className="h-4.5 w-16 rounded bg-slate-800" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-3.5 w-16 rounded bg-slate-800" />
          <div className="h-3.5 w-28 rounded bg-slate-800" />
        </div>
      </div>
    </div>
  )
}
