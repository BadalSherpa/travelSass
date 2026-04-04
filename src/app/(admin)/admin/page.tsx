import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  const [
    totalPackages,
    totalInquiries,
    totalCustomers,
    totalBookings,
    pendingBookings,
    recentBookings,
    recentInquiries,
  ] = await Promise.all([
    prisma.package.count(),
    prisma.inquiry.count(),
    prisma.customer.count(),
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        status: 'PENDING',
      },
    }),
    prisma.booking.findMany({
      include: {
        customer: true,
        package: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    }),
    prisma.inquiry.findMany({
      include: {
        customer: true,
        package: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    }),
  ])

  const stats = [
    { title: 'Total Packages', value: totalPackages },
    { title: 'Total Inquiries', value: totalInquiries },
    { title: 'Total Customers', value: totalCustomers },
    { title: 'Total Bookings', value: totalBookings },
    { title: 'Pending Bookings', value: pendingBookings },
  ]

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Overview of your travel business operations.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.title}</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Bookings
          </h3>

          {recentBookings.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No recent bookings yet.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {booking.customer.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {booking.package.title}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-slate-500">
                    Travel Date:{' '}
                    {booking.travelDate
                      ? booking.travelDate.toLocaleDateString()
                      : '-'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Inquiries
          </h3>

          {recentInquiries.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No recent inquiries yet.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {inquiry.customer.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {inquiry.package
                          ? inquiry.package.title
                          : 'General Inquiry'}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {inquiry.status}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                    {inquiry.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}