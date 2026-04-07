import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = resetPasswordSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid password' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PATCH /api/users/[id]/password error:', error)

    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}