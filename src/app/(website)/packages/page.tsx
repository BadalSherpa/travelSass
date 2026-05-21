import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
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
            {packages.map((pkg, index) => (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-950 to-black" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.25),_transparent_35%)]" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xl">
                    {pkg.location || 'Travel'}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-sm text-slate-300">{pkg.duration}</p>
                    <h2 className="mt-2 text-2xl font-black text-white">
                      {pkg.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="line-clamp-3 text-sm leading-6 text-slate-400">
                    {pkg.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                        Starting From
                      </p>
                      <p className="mt-1 text-2xl font-black text-white">
                        ₹{pkg.price}
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition group-hover:bg-slate-200">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}