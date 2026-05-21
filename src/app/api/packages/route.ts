import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { packageSchema } from '@/lib/validations/package'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(packages)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = packageSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid data' },
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

    const newPackage = await prisma.package.create({
  data: {
    title: body.title,
    slug: body.slug,
    description: body.description,
    price: Number(body.price),
    duration: body.duration || null,
    location: body.location || null,
    isActive: true,

    gallery: body.gallery?.length
      ? {
          create: body.gallery.map((image: { imageUrl: string; title?: string }) => ({
            imageUrl: image.imageUrl,
            title: image.title || null,
          })),
        }
      : undefined,
      itineraries: body.itineraries?.length
  ? {
      create: body.itineraries.map(
        (item: {
          day: string
          title: string
          description: string
          order?: string
        }) => ({
          day: item.day,
          title: item.title,
          description: item.description,
          order: Number(item.order || 0),
        })
      ),
    }
  : undefined,
  videos: body.videos?.length
  ? {
      create: body.videos.map(
        (video: { title: string; videoUrl: string }) => ({
          title: video.title,
          videoUrl: getEmbedUrl(video.videoUrl),
        })
      ),
    }
  : undefined,
  },
})

    revalidatePath('/packages')

    return NextResponse.json(newPackage, { status: 201 })
  } catch (error: any) {
    console.error(error)

    // Handle duplicate slug
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different title.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}