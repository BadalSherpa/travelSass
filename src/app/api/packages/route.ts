import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const newPackage = await prisma.package.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        price: Number(body.price),
        duration: body.duration,
        location: body.location,
        isActive: true,
      },
    })

    return NextResponse.json(newPackage)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}