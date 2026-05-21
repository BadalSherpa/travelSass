import { prisma } from '@/lib/prisma'
import InquiryForm from '@/components/website/InquiryForm'
import BookingForm from '@/components/website/BookingForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

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
    where: { slug },
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

  if (!travelPackage) {
    notFound()
  }

  return (
    <div className="bg-[#030712] text-white">
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
                {travelPackage.location || 'Curated Travel'}
              </p>

              <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
                {travelPackage.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {travelPackage.description}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Duration
                  </p>
                  <p className="mt-2 font-bold">
                    {travelPackage.duration || 'Flexible'}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Location
                  </p>
                  <p className="mt-2 font-bold">
                    {travelPackage.location || '-'}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Price
                  </p>
                  <p className="mt-2 font-black">₹{travelPackage.price}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-800 via-slate-950 to-black shadow-2xl">
                {travelPackage.gallery[0]?.imageUrl ? (
                  <img
                    src={travelPackage.gallery[0].imageUrl}
                    alt={travelPackage.gallery[0].title || travelPackage.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-end bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_35%)] p-8">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                        Featured Escape
                      </p>
                      <h2 className="mt-3 text-3xl font-black">
                        Scenic journey crafted for slow travel.
                      </h2>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl md:block">
                <p className="text-sm text-slate-300">Starting from</p>
                <p className="text-3xl font-black">₹{travelPackage.price}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
              Detailed Trip Plan
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              A smooth itinerary designed for comfort and discovery.
            </h2>
          </div>

          {travelPackage.itineraries.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-slate-400">
              Trip plan will be added soon.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {travelPackage.itineraries.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20"
                >
                  <p className="text-sm font-bold text-sky-400">{plan.day}</p>
                  <h3 className="mt-4 text-2xl font-black">{plan.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {plan.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Trip Gallery
            </p>
            <h2 className="mt-4 text-4xl font-black">
              Visual moments from this experience.
            </h2>
          </div>

          {travelPackage.gallery.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-500">
              Gallery images will be added soon.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {travelPackage.gallery.map((image) => (
                <div
                  key={image.id}
                  className="h-72 overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl"
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title || travelPackage.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Travel Videos
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Feel the journey before you book.
            </h2>
            <p className="mt-5 text-slate-400">
              Watch destination highlights, homestay walkthroughs, local food,
              sunrise views, and guest experiences.
            </p>
          </div>

          {travelPackage.videos.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-slate-400">
              Travel videos will be added soon.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {travelPackage.videos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="aspect-video overflow-hidden rounded-[1.5rem] bg-black">
                    <iframe
                      src={video.videoUrl}
                      title={video.title}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Guest Stories
            </p>
            <h2 className="mt-4 text-4xl font-black">
              What travelers say about this trip.
            </h2>
          </div>

          {travelPackage.testimonials.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
              Testimonials will be added soon.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {travelPackage.testimonials.map((testimonial) => (
              <div
  key={testimonial.id}
  className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-[0_10px_60px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
>
  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-100/40 blur-3xl transition duration-500 group-hover:scale-125" />

  <div className="relative">
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-[1.5rem] ring-4 ring-white shadow-lg">
        {testimonial.imageUrl ? (
          <img
            src={testimonial.imageUrl}
            alt={testimonial.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xl font-black text-slate-600">
            {testimonial.name.charAt(0)}
          </div>
        )}
      </div>

      <div>
        <p className="text-lg font-black tracking-tight text-slate-900">
          {testimonial.name}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <p className="text-amber-500">
            {'★'.repeat(testimonial.rating)}
          </p>

          <span className="text-sm font-medium text-slate-500">
            {testimonial.rating}/5 Experience
          </span>
        </div>
      </div>
    </div>

    <div className="mt-8">
      <div className="mb-5 text-6xl font-black leading-none text-slate-200">
        “
      </div>

      <p className="relative -mt-10 text-lg leading-9 text-slate-700">
        {testimonial.message}
      </p>
    </div>

    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          Verified Traveler
        </p>

        <p className="mt-2 text-sm font-bold text-slate-900">
          Guest Experience
        </p>
      </div>

      <div className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
        Verified
      </div>
    </div>
  </div>
</div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
              Ready To Travel?
            </p>
            <h2 className="mt-4 text-4xl font-black">
              Book now or send an inquiry for this package.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <BookingForm
              packageId={travelPackage.id}
              packageTitle={travelPackage.title}
            />

            <InquiryForm
              packageId={travelPackage.id}
              heading="Ask About This Package"
              defaultMessage={`Hi, I am interested in the package "${travelPackage.title}". Please share more details.`}
            />
          </div>
        </div>
      </section>
    </div>
  )
}