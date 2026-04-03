import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Tour Packages</h1>
        <p className="mt-3 text-slate-600">
          Explore curated travel and stay packages.
        </p>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No packages found
          </h2>
          <p className="mt-2 text-slate-500">
            Add some packages in Prisma Studio to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.slug}`}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm text-sky-600">{pkg.location}</p>

              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                {pkg.title}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {pkg.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">{pkg.duration}</span>
                <span className="text-lg font-bold text-slate-900">
                  ₹{pkg.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}