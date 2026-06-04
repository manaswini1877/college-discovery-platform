import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ApiResponse } from "@/types"

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await props.params
    const { id } = params

    if (!id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Missing college ID" },
        { status: 400 }
      )
    }

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        reviews: {
          orderBy: { createdAt: "desc" },
        },
        cutoffs: {
          orderBy: { year: "desc" },
        },
      },
    })

    if (!college) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "College not found" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: college,
      error: null,
    })
  } catch (error: any) {
    console.error("Get college detail error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error while fetching college details",
      },
      { status: 500 }
    )
  }
}
