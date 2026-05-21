import { prisma } from '@/lib/prisma'
import EditPackageForm from '@/components/admin/EditPackageForm'
import GalleryManager from '@/components/admin/GalleryManager'
import ItineraryManager from '@/components/admin/ItineraryManager'
import VideoManager from '@/components/admin/VideoManager'
import TestimonialManager from '@/components/admin/TestimonialManager'

type EditPackagePageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditPackagePage({
  params,
}: EditPackagePageProps) {
  const { id } = await params

  const packageData = await prisma.package.findUnique({
    where: {
      id,
    },
    include: {
  gallery: true,
  itineraries: {
    orderBy: {
      order: 'asc',
    },
  },
  videos: true,
  testimonials: true,
},
  })

  if (!packageData) {
    return <div className="text-red-600">Package not found.</div>
  }

  return (
    <section className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Edit Package</h1>
        <p className="mt-2 text-slate-600">
          Update your package details and manage gallery content.
        </p>
      </div>

      <EditPackageForm packageData={packageData} />

      <div className="mt-10">
        <GalleryManager
          packageId={packageData.id}
          initialGallery={packageData.gallery}
        />
        <div className="mt-10">
  <ItineraryManager
    packageId={packageData.id}
    initialItineraries={packageData.itineraries}
  />
</div>
<div className="mt-10">
  <VideoManager
    packageId={packageData.id}
    initialVideos={packageData.videos}
  />
</div>
<div className="mt-10">
  <TestimonialManager
    packageId={packageData.id}
    initialTestimonials={packageData.testimonials}
  />
</div>
      </div>
    </section>
  )
}