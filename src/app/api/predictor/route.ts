import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { predictorSchema } from "@/lib/validations"
import { ApiResponse } from "@/types"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = predictorSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: validation.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      )
    }

    const { exam, rank, category, state } = validation.data

    // Build the query filter for cutoffs
    const where: any = {
      exam,
      category,
      openRank: { lte: rank },
      closeRank: { gte: rank },
    }

    if (state && state !== "All" && state !== "all") {
      where.college = {
        state: {
          equals: state,
          mode: "insensitive",
        },
      }
    }

    const cutoffs = await prisma.cutoff.findMany({
      where,
      include: {
        college: {
          include: {
            courses: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        year: "desc",
      },
    })

    // Group and format cutoffs to avoid duplicate colleges
    const collegeMap = new Map<string, any>()

    for (const cutoff of cutoffs) {
      const range = cutoff.closeRank - cutoff.openRank
      let chance: "High" | "Medium" | "Low" = "Low"

      if (range > 0) {
        const highThreshold = cutoff.openRank + 0.2 * range
        const mediumThreshold = cutoff.openRank + 0.6 * range

        if (rank <= highThreshold) {
          chance = "High"
        } else if (rank <= mediumThreshold) {
          chance = "Medium"
        } else {
          chance = "Low"
        }
      } else {
        // Fallback for single data point
        chance = rank <= cutoff.openRank ? "High" : "Low"
      }

      const existing = collegeMap.get(cutoff.collegeId)
      // Prefer latest year's cutoff for prediction
      if (!existing || cutoff.year > existing.cutoff.year) {
        collegeMap.set(cutoff.collegeId, {
          college: cutoff.college,
          chance,
          cutoff: {
            id: cutoff.id,
            exam: cutoff.exam,
            category: cutoff.category,
            year: cutoff.year,
            openRank: cutoff.openRank,
            closeRank: cutoff.closeRank,
          },
        })
      }
    }

    const results = Array.from(collegeMap.values())

    return NextResponse.json<ApiResponse>({
      success: true,
      data: results,
      error: null,
    })
  } catch (error: any) {
    console.error("Predictor API error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error while running predictor",
      },
      { status: 500 }
    )
  }
}
