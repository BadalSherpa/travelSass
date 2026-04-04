import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  packageId: z.string().min(1, 'Package is required'),
  travelDate: z.string().min(1, 'Travel date is required'),
  persons: z.coerce.number().min(1, 'At least 1 person is required'),
  notes: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = bookingSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid booking data' },
        { status: 400 }
      )
    }

    const { name, email, phone, packageId, travelDate, persons, notes } =
      result.data

    let customer = await prisma.customer.findFirst({
      where: { email },
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name,
          email,
          phone: phone || null,
        },
      })
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        packageId,
        travelDate: new Date(travelDate),
        persons,
        notes: notes || null,
        status: 'PENDING',
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('POST /api/bookings error:', error)

    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}