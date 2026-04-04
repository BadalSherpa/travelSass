import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  packageId: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = inquirySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid data' },
        { status: 400 }
      )
    }

    const { name, email, phone, message, packageId } = result.data

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

    const inquiry = await prisma.inquiry.create({
      data: {
        customerId: customer.id,
        packageId: packageId || null,
        message,
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error('POST /api/inquiries error:', error)

    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}