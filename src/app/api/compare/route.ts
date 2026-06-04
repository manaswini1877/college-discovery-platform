import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compareSchema } from "@/lib/validations"
import { ApiResponse } from "@/types"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = compareSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: validation.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      )
    }

    const { collegeIds } = validation.data

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: collegeIds },
      },
      include: {
        courses: true,
      },
    })

    // Order colleges in the same order as requested in collegeIds
    const orderedColleges = collegeIds
      .map((id) => colleges.find((c) => c.id === id))
      .filter(Boolean)

    return NextResponse.json<ApiResponse>({
      success: true,
      data: orderedColleges,
      error: null,
    })
  } catch (error: any) {
    console.error("Compare colleges API error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error while comparing colleges",
      },
      { status: 500 }
    )
  }
}
