import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { packageSchema } from '@/lib/validations/package'
import { revalidatePath } from 'next/cache'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = packageSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid data' },
        { status: 400 }
      )
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        price: Number(body.price),
        duration: body.duration || null,
        location: body.location || null,
      },
    })

    revalidatePath('/packages')
    revalidatePath(`/packages/${updatedPackage.slug}`)

    return NextResponse.json(updatedPackage)
  } catch (error: any) {
    console.error(error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug already exists. Please change title.' },
        { status: 400 }
      )
    }

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

    revalidatePath('/packages')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/packages/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}