import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { ApiResponse } from "@/types"

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await props.params
    const { id } = params

    if (!id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Missing favorite or college ID" },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Find favorite entry by matching favorite ID or college ID for this user
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: session.user.id,
        OR: [
          { id: id },
          { collegeId: id }
        ]
      }
    })

    if (!favorite) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Favorite not found or not owned by you" },
        { status: 404 }
      )
    }

    await prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { id: favorite.id, collegeId: favorite.collegeId },
      error: null,
    })
  } catch (error: any) {
    console.error("Delete favorite error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error while removing favorite",
      },
      { status: 500 }
    )
  }
}
