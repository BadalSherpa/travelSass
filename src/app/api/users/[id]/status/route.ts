import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
})

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = updateUserStatusSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid status data' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        isActive: result.data.isActive,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('PATCH /api/users/[id]/status error:', error)

    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    )
  }
}