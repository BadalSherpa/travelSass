import { prisma } from '@/lib/prisma'
import InquiryForm from '@/components/website/InquiryForm'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/website/BookingForm'

type PackageDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function PackageDetailPage({
  params,
}: PackageDetailPageProps) {
  const { slug } = await params

  const travelPackage = await prisma.package.findUnique({
    where: {
      slug,
    },
  })

  if (!travelPackage) {
    notFound()
  }

  return (
   <section className="mx-auto max-w-6xl px-4 py-16">
  <div className="grid gap-8 lg:grid-cols-2">
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <p className="text-sm font-medium text-sky-600">
        {travelPackage.location}
      </p>

      <h1 className="mt-3 text-4xl font-bold text-slate-900">
        {travelPackage.title}
      </h1>

      <p className="mt-4 text-lg text-slate-600">
        {travelPackage.description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Duration</p>
          <p className="mt-1 font-semibold text-slate-900">
            {travelPackage.duration || 'Not specified'}
          </p>
        </div>

        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Location</p>
          <p className="mt-1 font-semibold text-slate-900">
            {travelPackage.location || 'Not specified'}
          </p>
        </div>

        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Price</p>
          <p className="mt-1 font-semibold text-slate-900">
            ₹{travelPackage.price}
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-8">
      <BookingForm
        packageId={travelPackage.id}
        packageTitle={travelPackage.title}
      />

      <InquiryForm
        packageId={travelPackage.id}
        heading="Inquire About This Package"
        defaultMessage={`Hi, I am interested in the package "${travelPackage.title}". Please share more details.`}
      />
    </div>
  </div>
</section>
  )
}