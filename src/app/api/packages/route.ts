import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { packageSchema } from '@/lib/validations/package'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(packages)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = packageSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid data' },
        { status: 400 }
      )
    }

    const newPackage = await prisma.package.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        price: Number(body.price),
        duration: body.duration || null,
        location: body.location || null,
        isActive: true,
      },
    })

    revalidatePath('/packages')

    return NextResponse.json(newPackage, { status: 201 })
  } catch (error: any) {
    console.error(error)

    // Handle duplicate slug
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different title.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}