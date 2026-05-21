import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const createItinerarySchema = z.object({
  day: z.string().min(1, 'Day is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  order: z.coerce.number().optional(),
})

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = createItinerarySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid data' },
        { status: 400 }
      )
    }

    const itinerary = await prisma.packageItinerary.create({
      data: {
        packageId: id,
        day: result.data.day,
        title: result.data.title,
        description: result.data.description,
        order: result.data.order || 0,
      },
    })

    const packageData = await prisma.package.findUnique({
      where: { id },
      select: { slug: true },
    })

    revalidatePath('/packages')
    if (packageData?.slug) revalidatePath(`/packages/${packageData.slug}`)

    return NextResponse.json(itinerary, { status: 201 })
  } catch (error) {
    console.error('POST itinerary error:', error)
    return NextResponse.json(
      { error: 'Failed to create itinerary' },
      { status: 500 }
    )
  }
}