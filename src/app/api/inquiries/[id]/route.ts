import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const inquiryStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
})

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = inquiryStatusSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid status' },
        { status: 400 }
      )
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status: result.data.status,
      },
    })

    return NextResponse.json(updatedInquiry)
  } catch (error) {
    console.error('PATCH /api/inquiries/[id] error:', error)

    return NextResponse.json(
      { error: 'Failed to update inquiry status' },
      { status: 500 }
    )
  }
}