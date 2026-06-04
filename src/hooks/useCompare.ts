"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { College } from "@/types"
import { useToast } from "@/context/ToastContext"

export function useCompare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()

  // Load from localStorage on client-side mount
  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("compare_college_ids")
    if (saved) {
      try {
        setSelectedIds(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse compare IDs", e)
      }
    }
  }, [])

  const saveIds = (ids: string[]) => {
    setSelectedIds(ids)
    localStorage.setItem("compare_college_ids", JSON.stringify(ids))
  }

  const addCollege = (id: string, name: string) => {
    if (selectedIds.includes(id)) {
      toast(`${name} is already added for comparison`, "info")
      return
    }
    if (selectedIds.length >= 3) {
      toast("You can compare a maximum of 3 colleges", "error")
      return
    }
    const newIds = [...selectedIds, id]
    saveIds(newIds)
    toast(`Added ${name} to comparison!`, "success")
  }

  const removeCollege = (id: string, name: string) => {
    const newIds = selectedIds.filter((item) => item !== id)
    saveIds(newIds)
    toast(`Removed ${name} from comparison`, "info")
  }

  const clearCompare = () => {
    saveIds([])
    toast("Comparison list cleared", "info")
  }

  const compareQuery = useQuery({
    queryKey: ["compare-details", selectedIds],
    queryFn: async () => {
      if (selectedIds.length < 2) {
        return []
      }
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collegeIds: selectedIds }),
      })
      if (!res.ok) {
        throw new Error("Failed to load comparison data")
      }
      const json = await res.json()
      if (!json.success) {
        throw new Error(json.error || "Failed to load comparison data")
      }
      return json.data as College[]
    },
    enabled: isMounted && selectedIds.length >= 2,
    staleTime: 5 * 60 * 1000,
  })

  return {
    selectedIds,
    addCollege,
    removeCollege,
    clearCompare,
    colleges: compareQuery.data || [],
    isLoading: compareQuery.isLoading,
    error: compareQuery.error,
    isMounted,
  }
}
