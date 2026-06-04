import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ApiResponse } from "@/types"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = 12
    const skip = (page - 1) * limit

    const search = searchParams.get("search") || ""
    const state = searchParams.get("state") || ""
    const minFee = parseInt(searchParams.get("minFee") || "0", 10)
    const maxFee = parseInt(searchParams.get("maxFee") || "5000000", 10)
    const rating = parseFloat(searchParams.get("rating") || "0")
    const type = searchParams.get("type") || ""

    const where: any = {
      fees: {
        gte: minFee,
        lte: maxFee,
      },
      rating: {
        gte: rating,
      },
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { state: { contains: search, mode: "insensitive" } },
      ]
    }

    if (state && state !== "All" && state !== "all") {
      where.state = { equals: state, mode: "insensitive" }
    }

    if (type && type !== "All" && type !== "all") {
      where.type = { equals: type, mode: "insensitive" }
    }

    // Run parallel database queries for pagination and count
    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rating: "desc" },
        include: {
          courses: true,
          reviews: true,
        },
      }),
      prisma.college.count({ where }),
    ])

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        colleges,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      error: null,
    })
  } catch (error: any) {
    console.error("Fetch colleges error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error while fetching colleges",
      },
      { status: 500 }
    )
  }
}
