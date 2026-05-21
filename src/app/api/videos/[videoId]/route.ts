import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params

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

    const video = await prisma.packageVideo.findUnique({
      where: { id: videoId },
      include: {
        package: {
          select: { slug: true },
        },
      },
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    await prisma.packageVideo.delete({
      where: { id: videoId },
    })

    revalidatePath('/packages')
    revalidatePath(`/packages/${video.package.slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE video error:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}