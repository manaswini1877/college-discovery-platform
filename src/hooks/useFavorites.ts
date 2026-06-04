"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Favorite } from "@/types"
import { useToast } from "@/context/ToastContext"
import { useSession } from "next-auth/react"

export function useFavorites() {
  const { data: session } = useSession()

  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites")
      if (!res.ok) {
        throw new Error("Failed to fetch favorites")
      }
      const json = await res.json()
      if (!json.success) {
        throw new Error(json.error || "Failed to fetch favorites")
      }
      return json.data as Favorite[]
    },
    enabled: !!session?.user,
  })
}

interface ToggleFavoriteParams {
  collegeId: string
  isFavorite: boolean
  favoriteId?: string
}

export function useToggleFavorite() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ collegeId, isFavorite, favoriteId }: ToggleFavoriteParams) => {
      if (isFavorite) {
        // If already favorite, delete it
        const idToDelete = favoriteId || collegeId
        const res = await fetch(`/api/favorites/${idToDelete}`, {
          method: "DELETE",
        })
        if (!res.ok) {
          throw new Error("Failed to remove favorite")
        }
        const json = await res.json()
        if (!json.success) {
          throw new Error(json.error || "Failed to remove favorite")
        }
        return { action: "remove" as const, collegeId }
      } else {
        // If not favorite, save it
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ collegeId }),
        })
        if (!res.ok) {
          throw new Error("Failed to add favorite")
        }
        const json = await res.json()
        if (!json.success) {
          throw new Error(json.error || "Failed to add favorite")
        }
        return { action: "add" as const, favorite: json.data as Favorite }
      }
    },
    onMutate: async ({ collegeId, isFavorite }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["favorites"] })

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData<Favorite[]>(["favorites"])

      // Optimistically update the list
      if (isFavorite) {
        queryClient.setQueryData<Favorite[]>(["favorites"], (prev) =>
          prev ? prev.filter((f) => f.collegeId !== collegeId) : []
        )
      } else {
        const tempFavorite: Favorite = {
          id: `temp-${Date.now()}`,
          userId: "session-user",
          collegeId,
        }
        queryClient.setQueryData<Favorite[]>(["favorites"], (prev) =>
          prev ? [tempFavorite, ...prev] : [tempFavorite]
        )
      }

      // Return context with snapshot values
      return { previousFavorites }
    },
    onError: (err, variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites)
      }
      toast(err instanceof Error ? err.message : "Failed to toggle favorite", "error")
    },
    onSuccess: (data) => {
      if (data.action === "add") {
        toast("Saved to favorites!", "success")
      } else {
        toast("Removed from favorites!", "info")
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    },
  })
}
