import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const bookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
})

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = bookingStatusSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid status' },
        { status: 400 }
      )
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: result.data.status,
      },
    })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('PATCH /api/bookings/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to update booking status' },
      { status: 500 }
    )
  }
}