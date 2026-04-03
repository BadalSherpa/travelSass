import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import DeletePackageButton from '@/components/admin/DeletePackageButton'

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Packages</h1>
          <p className="mt-2 text-slate-600">
            Manage all travel packages from the admin panel.
          </p>
        </div>

        <Link
          href="/admin/packages/create"
          className="rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          + Add Package
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No packages found
          </h2>
          <p className="mt-2 text-slate-500">
            Create your first package to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm"
            >
              <div>
                <p className="text-sm text-sky-600">{pkg.location}</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  {pkg.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {pkg.duration} • ₹{pkg.price}
                </p>
                <div className="flex items-center gap-4">
  <Link
    href={`/admin/packages/${pkg.id}`}
    className="text-sm font-medium text-blue-600 hover:underline"
  >
    Edit
  </Link>

  <DeletePackageButton id={pkg.id} />
</div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    pkg.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {pkg.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}