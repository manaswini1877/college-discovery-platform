"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { College } from "@/types"

interface UseCollegesParams {
  page?: number
  search?: string
  state?: string
  minFee?: number
  maxFee?: number
  rating?: number
  type?: string
}

export function useColleges(params: UseCollegesParams) {
  return useQuery({
    queryKey: ["colleges", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      if (params.page) searchParams.append("page", params.page.toString())
      if (params.search) searchParams.append("search", params.search)
      if (params.state) searchParams.append("state", params.state)
      if (params.minFee !== undefined) {
        searchParams.append("minFee", params.minFee.toString())
      }
      if (params.maxFee !== undefined) {
        searchParams.append("maxFee", params.maxFee.toString())
      }
      if (params.rating !== undefined) {
        searchParams.append("rating", params.rating.toString())
      }
      if (params.type) searchParams.append("type", params.type)

      const res = await fetch(`/api/colleges?${searchParams.toString()}`)
      if (!res.ok) {
        throw new Error("Failed to fetch colleges")
      }
      const json = await res.json()
      if (!json.success) {
        throw new Error(json.error || "Failed to fetch colleges")
      }
      return json.data as {
        colleges: College[]
        total: number
        page: number
        totalPages: number
      }
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
