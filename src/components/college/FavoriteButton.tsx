"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { useFavorites, useToggleFavorite } from "@/hooks/useFavorites"
import { useToast } from "@/context/ToastContext"

export default function FavoriteButton({ collegeId }: { collegeId: string }) {
  const { status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { data: favorites } = useFavorites()
  const toggleFavorite = useToggleFavorite()

  const favoriteEntry = favorites?.find((f) => f.collegeId === collegeId)
  const isFavorite = !!favoriteEntry

  const handleToggle = () => {
    if (status !== "authenticated") {
      toast("Please log in to save favorites", "info")
      router.push("/login")
      return
    }
    toggleFavorite.mutate({
      collegeId,
      isFavorite,
      favoriteId: favoriteEntry?.id,
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={toggleFavorite.isPending}
      className={`flex items-center gap-2 rounded-xl border py-3 px-5 text-sm font-bold shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] ${
        isFavorite
          ? "bg-rose-100 border-rose-200 text-rose-600 hover:bg-rose-200"
          : "bg-white border-[#e5e7eb] text-[#6b7280] hover:border-[#1a73e8] hover:text-[#1a1a1a]"
      }`}
    >
      <Heart className={`h-4.5 w-4.5 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
      <span>{isFavorite ? "Saved in Favorites" : "Save to Favorites"}</span>
    </button>
  )
}
