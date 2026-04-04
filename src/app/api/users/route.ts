import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'STAFF']),
})

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('GET /api/users error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = createUserSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid user data' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
        role: result.data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('POST /api/users error:', error)

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}