import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  role: z.enum(['ADMIN', 'STAFF']),
})

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = updateUserSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid user data' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: result.data.email,
        NOT: {
          id,
        },
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Another user with this email already exists' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: result.data.name,
        email: result.data.email,
        role: result.data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('PUT /api/users/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/users/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}