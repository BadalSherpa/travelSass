import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  
  const [featuredPackages, topTestimonials] = await Promise.all([
  prisma.package.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
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

          <div className="grid gap-6 md:grid-cols-3">
            {featuredPackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 h-48 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-700" />

                <p className="text-sm font-medium text-sky-700">
                  {pkg.location}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {pkg.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {pkg.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-slate-500">{pkg.duration}</span>
                  <span className="text-xl font-black">₹{pkg.price}</span>
                </div>
              </Link>
            ))}
          </div>
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

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-900">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950">
                    ▶
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">
                  Mountain Journey #{item}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  A short travel video placeholder for destination highlights.
                </p>
              </div>
            ))}
          </div>
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