import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ itineraryId: string }> }
) {
  try {
    const { itineraryId } = await params

    const itinerary = await prisma.packageItinerary.findUnique({
      where: { id: itineraryId },
      include: {
        package: {
          select: { slug: true },
        },
      },
    })

    if (!itinerary) {
      return NextResponse.json(
        { error: 'Itinerary not found' },
        { status: 404 }
      )
    }

    await prisma.packageItinerary.delete({
      where: { id: itineraryId },
    })

    revalidatePath('/packages')
    revalidatePath(`/packages/${itinerary.package.slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE itinerary error:', error)
    return NextResponse.json(
      { error: 'Failed to delete itinerary' },
      { status: 500 }
    )
  }
}