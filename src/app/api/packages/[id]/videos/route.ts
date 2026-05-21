import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const createVideoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  videoUrl: z.string().url('Enter a valid video embed URL'),
})

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const result = createVideoSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid video data' },
        { status: 400 }
      )
    }

 const getEmbedUrl = (url: string) => {
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0]

    return `https://www.youtube.com/embed/${videoId}`
  }

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]

    return `https://www.youtube.com/embed/${videoId}`
  }

  return url
}

    const video = await prisma.packageVideo.create({
      data: {
        packageId: id,
        title: result.data.title,
        videoUrl: getEmbedUrl(result.data.videoUrl),
      },
    })

    const packageData = await prisma.package.findUnique({
      where: { id },
      select: { slug: true },
    })

    revalidatePath('/packages')
    if (packageData?.slug) revalidatePath(`/packages/${packageData.slug}`)

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('POST video error:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}