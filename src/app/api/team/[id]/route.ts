import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const updateTeamMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  designation: z.string().min(2, 'Designation is required'),
  imageUrl: z.string().url('Enter a valid image URL').optional().or(z.literal('')),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  motto: z.string().optional(),
  order: z.coerce.number().optional(),
  isActive: z.boolean(),
})

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = updateTeamMemberSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid data' },
        { status: 400 }
      )
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: result.data.name,
        designation: result.data.designation,
        imageUrl: result.data.imageUrl || null,
        bio: result.data.bio,
        motto: result.data.motto || null,
        order: result.data.order || 0,
        isActive: result.data.isActive,
      },
    })

    revalidatePath('/team')

    return NextResponse.json(member)
  } catch (error) {
    console.error('PUT /api/team/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.teamMember.delete({
      where: { id },
    })

    revalidatePath('/team')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/team/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}