import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validations"
import { ApiResponse } from "@/types"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: validation.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      )
    }

    const { name, email, password } = validation.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Email is already registered",
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      error: null,
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error during registration",
      },
      { status: 500 }
    )
  }
}
