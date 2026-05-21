import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ testimonialId: string }> }
) {
  try {
    const { testimonialId } = await params

    const testimonial = await prisma.packageTestimonial.findUnique({
      where: { id: testimonialId },
      include: {
        package: {
          select: { slug: true },
        },
      },
    })

    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    await prisma.packageTestimonial.delete({
      where: { id: testimonialId },
    })

    revalidatePath('/packages')
    revalidatePath(`/packages/${testimonial.package.slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE testimonial error:', error)

    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}