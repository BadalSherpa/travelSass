import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {

  const packages = await prisma.package.findMany({
  where: {
    isActive: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
  include: {
    gallery: {
      take: 1,
      orderBy: {
        createdAt: 'asc',
      },
    },
  },
})

  return (
    <section className="min-h-screen bg-[#030712] px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Curated Escapes
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
            Travel packages crafted for unforgettable journeys.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Discover handpicked stays, mountain retreats, and local experiences
            designed for travelers who want more than just a trip.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <h2 className="text-2xl font-bold">No packages found</h2>
            <p className="mt-3 text-slate-400">
              Packages will appear here once added from admin.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
           {packages.map((pkg) => {
  const imageUrl = pkg.gallery[0]?.imageUrl

  return (
    <Link
      key={pkg.id}
      href={`/packages/${pkg.slug}`}
      className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-[0_20px_80px_rgba(15,23,42,0.18)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(15,23,42,0.28)]"
    >
      <div className="relative h-[460px] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pkg.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-700 to-sky-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
          {pkg.location || 'Travel'}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-7">
          <p className="text-sm font-medium text-slate-300">
            {pkg.duration || 'Flexible Duration'}
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-white">
            {pkg.title}
          </h2>

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

            <div className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition group-hover:bg-slate-200">
              Explore
            </div>
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
  )
}