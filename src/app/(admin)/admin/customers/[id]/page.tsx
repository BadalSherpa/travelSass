import { prisma } from '@/lib/prisma'

type CustomerDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params

  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      inquiries: {
        include: {
          package: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      bookings: {
        include: {
          package: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!customer) {
    return <div className="text-red-600">Customer not found.</div>
  }

  return (
    <section className="space-y-8">
      <div className="admin-card">
        <h1 className="text-3xl font-bold text-slate-900">
          {customer.name}
        </h1>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Email
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {customer.email}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Phone
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {customer.phone || '-'}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total Inquiries
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {customer.inquiries.length}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total Bookings
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {customer.bookings.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-slate-900">
            Inquiries
          </h2>

          {customer.inquiries.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No inquiries found for this customer.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {customer.inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-slate-900">
                      {inquiry.package
                        ? inquiry.package.title
                        : 'General Inquiry'}
                    </p>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {inquiry.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">
                    {inquiry.message}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    {inquiry.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card">
          <h2 className="text-xl font-semibold text-slate-900">
            Bookings
          </h2>

          {customer.bookings.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No bookings found for this customer.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {customer.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-slate-900">
                      {booking.package.title}
                    </p>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Travel Date
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {booking.travelDate
                          ? booking.travelDate.toLocaleDateString()
                          : '-'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Persons
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {booking.persons}
                      </p>
                    </div>
                  </div>

                  {booking.notes ? (
                    <p className="mt-3 text-sm text-slate-600">
                      {booking.notes}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}