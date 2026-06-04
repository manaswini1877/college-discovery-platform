import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { favoriteSchema } from "@/lib/validations"
import { ApiResponse } from "@/types"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        college: {
          include: {
            courses: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: favorites,
      error: null,
    })
  } catch (error: any) {
    console.error("Get favorites error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error while fetching favorites",
      },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validation = favoriteSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: validation.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      )
    }

    const { collegeId } = validation.data

    // Check if college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    })

    if (!college) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "College not found" },
        { status: 444 }
      )
    }

    // Check if already in favorites to prevent unique constraint violation
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    })

    if (existingFavorite) {
      return NextResponse.json<ApiResponse>({
        success: true,
        data: existingFavorite,
        error: null,
      })
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        collegeId,
      },
      include: {
        college: true,
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: favorite,
      error: null,
    })
  } catch (error: any) {
    console.error("Create favorite error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error while saving favorite",
      },
      { status: 500 }
    )
  }
}
