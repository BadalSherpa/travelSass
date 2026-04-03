import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const updatedPackage = await prisma.package.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        price: Number(body.price),
        duration: body.duration || null,
        location: body.location || null,
      },
    })

    return NextResponse.json(updatedPackage)
  } catch (error) {
    console.error('PUT /api/packages/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to update package' },
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

    await prisma.package.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/packages/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}