import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type RouteParams = {
  params: Promise<{
    galleryId: string
  }>
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  try {
    const { galleryId } = await params

    const gallery = await prisma.packageGallery.findUnique({
      where: {
        id: galleryId,
      },
      include: {
        package: {
          select: {
            slug: true,
          },
        },
      },
    })

    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      )
    }

    await prisma.packageGallery.delete({
      where: {
        id: galleryId,
      },
    })

    revalidatePath('/packages')

    if (gallery.package?.slug) {
      revalidatePath(`/packages/${gallery.package.slug}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/gallery/[galleryId] error:', error)

    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    )
  }
}