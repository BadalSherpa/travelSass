import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const createTestimonialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  imageUrl: z.string().url('Enter a valid image URL').optional().or(z.literal('')),
  rating: z.coerce.number().min(1).max(5),
})

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = createTestimonialSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid testimonial data' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.packageTestimonial.create({
      data: {
        packageId: id,
        name: result.data.name,
        message: result.data.message,
        imageUrl: result.data.imageUrl || null,
        rating: result.data.rating,
      },
    })

    const packageData = await prisma.package.findUnique({
      where: { id },
      select: { slug: true },
    })

    revalidatePath('/packages')

    if (packageData?.slug) {
      revalidatePath(`/packages/${packageData.slug}`)
    }

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('POST testimonial error:', error)

    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}