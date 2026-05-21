import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const createTeamMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  designation: z.string().min(2, 'Designation is required'),
  imageUrl: z.string().url('Enter a valid image URL').optional().or(z.literal('')),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  motto: z.string().optional(),
  order: z.coerce.number().optional(),
  isActive: z.boolean().optional(),
})

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(members)
  } catch (error) {
    console.error('GET /api/team error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = createTeamMemberSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid team member data' },
        { status: 400 }
      )
    }

    const member = await prisma.teamMember.create({
      data: {
        name: result.data.name,
        designation: result.data.designation,
        imageUrl: result.data.imageUrl || null,
        bio: result.data.bio,
        motto: result.data.motto || null,
        order: result.data.order || 0,
        isActive: result.data.isActive ?? true,
      },
    })

    revalidatePath('/team')

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('POST /api/team error:', error)

    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}