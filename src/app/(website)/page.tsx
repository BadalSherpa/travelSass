import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  
const [featuredPackages, topTestimonials, latestVideos] = await Promise.all([
  prisma.package.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: {
      gallery: {
        take: 1,
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  }),

  prisma.packageTestimonial.findMany({
    orderBy: [
      { rating: 'desc' },
      { createdAt: 'desc' },
    ],
    take: 3,
    include: {
      package: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  }),

  prisma.packageVideo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
    include: {
      package: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  }),
])

  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.25),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.18),_transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
              Premium Travel Experiences
            </p>

            <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
              Discover stays, journeys, and mountain escapes crafted for you.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Explore curated tour packages, peaceful homestays, local experiences,
              and personalized travel support from one modern platform.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/packages"
                className="rounded-full bg-white px-8 py-4 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Explore Packages
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Plan Custom Trip
              </Link>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              ['Curated Trips', 'Handpicked travel experiences for families, couples, and groups.'],
              ['Local Support', 'Connect with trusted local operators and homestay owners.'],
              ['Easy Booking', 'Send inquiry or booking request directly from the package page.'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
                Featured Packages
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Trips worth remembering
              </h2>
            </div>

            <Link
              href="/packages"
              className="font-semibold text-sky-700 hover:underline"
            >
              View all packages
            </Link>
          </div>

         {featuredPackages.length === 0 ? (
  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
    Featured packages will appear here once added from admin.
  </div>
) : (
  <div className="grid gap-8 lg:grid-cols-3">
    {featuredPackages.map((pkg) => {
      const imageUrl = pkg.gallery[0]?.imageUrl

      return (
        <Link
          key={pkg.id}
          href={`/packages/${pkg.slug}`}
          className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-[0_20px_80px_rgba(15,23,42,0.18)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(15,23,42,0.28)]"
        >
          <div className="relative h-[420px] overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={pkg.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-700 to-sky-900" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

            <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
              {pkg.location || 'Travel'}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-sm font-medium text-slate-300">
                {pkg.duration || 'Flexible Duration'}
              </p>

              <h3 className="mt-3 text-3xl font-black leading-tight text-white">
                {pkg.title}
              </h3>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-300">
                {pkg.description}
              </p>

              <div className="mt-7 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Starting From
                  </p>
                  <p className="mt-1 text-3xl font-black text-white">
                    ₹{pkg.price}
                  </p>
                </div>

                <span className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition group-hover:bg-slate-200">
                  Explore
                </span>
              </div>
            </div>
          </div>
        </Link>
      )
    })}
  </div>
)}
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Travel Stories
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
              Watch experiences before you book them.
            </h2>
          </div>

          {latestVideos.length === 0 ? (
  <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center text-slate-400">
    Travel videos will appear here once added from admin.
  </div>
) : (
  <div className="mt-10 grid gap-7 md:grid-cols-3">
    {latestVideos.map((video) => (
      <div
        key={video.id}
        className="group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]"
      >
        <div className="aspect-video overflow-hidden rounded-[2rem] bg-black">
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="h-full w-full"
            allowFullScreen
          />
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            Travel Story
          </p>

          <h3 className="mt-3 text-xl font-black text-white">
            {video.title}
          </h3>

          <a
            href={`/packages/${video.package.slug}`}
            className="mt-4 inline-flex text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            {video.package.title} →
          </a>
        </div>
      </div>
    ))}
  </div>
)}
        </div>
      </section>

      <section className="bg-white px-4 py-24 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
              Testimonials
            </p>
            <h2 className="mt-3 text-4xl font-black">
              Loved by travelers
            </h2>
          </div>

          {topTestimonials.length === 0 ? (
  <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
    Testimonials will appear here once added from admin.
  </div>
) : (
  <div className="mt-12 grid gap-6 md:grid-cols-3">
    {topTestimonials.map((testimonial) => (
     <div
  key={testimonial.id}
  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white to-slate-50 p-8 shadow-[0_10px_60px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
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
          Travel Package
        </p>

        <a
          href={`/packages/${testimonial.package.slug}`}
          className="mt-2 inline-flex text-sm font-bold text-sky-700 transition hover:text-sky-900"
        >
          {testimonial.package.title}
        </a>
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

      <section className="px-4 py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
          <h2 className="text-4xl font-black text-white">
            Ready to plan your next escape?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Send us your travel preference and we’ll help you find the right package.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-slate-950 hover:bg-slate-200"
          >
            Start Planning
          </Link>
        </div>
      </section>
    </div>
  )
}