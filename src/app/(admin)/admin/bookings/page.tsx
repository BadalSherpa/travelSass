import { prisma } from '@/lib/prisma'
import BookingStatusSelect from '@/components/admin/BookingStatusSelect'

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      customer: true,
      package: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
        <p className="mt-2 text-slate-600">
          Manage customer booking requests from the website.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No bookings found
          </h2>
          <p className="mt-2 text-slate-500">
            Booking requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {booking.customer.name}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {booking.customer.email}
                  </p>
                  {booking.customer.phone ? (
                    <p className="text-sm text-slate-500">
                      {booking.customer.phone}
                    </p>
                  ) : null}
                </div>

                <BookingStatusSelect
  bookingId={booking.id}
  currentStatus={booking.status}
/>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Package
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {booking.package.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Travel Date
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {booking.travelDate
                      ? booking.travelDate.toLocaleDateString()
                      : '-'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Persons
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {booking.persons}
                  </p>
                </div>
              </div>

              {booking.notes ? (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Notes
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {booking.notes}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}