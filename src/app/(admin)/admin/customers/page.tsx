import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      inquiries: true,
      bookings: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
        <p className="mt-2 text-slate-600">
          View and manage customer records collected from inquiries and bookings.
        </p>
      </div>

      {customers.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No customers found
          </h2>
          <p className="mt-2 text-slate-500">
            Customer records will appear here once inquiries are submitted.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Inquiries
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Bookings
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
  Action
</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {customer.phone || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {customer.inquiries.length}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {customer.bookings.length}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {customer.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
  <Link
    href={`/admin/customers/${customer.id}`}
    className="font-medium text-blue-600 hover:underline"
  >
    View
  </Link>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}