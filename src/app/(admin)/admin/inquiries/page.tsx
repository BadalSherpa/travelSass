import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import InquiryStatusSelect from '@/components/admin/InquiryStatusSelect'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
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
        <h1 className="text-3xl font-bold text-slate-900">Inquiries</h1>
        <p className="mt-2 text-slate-600">
          Manage customer inquiries from your website.
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No inquiries found
          </h2>
          <p className="mt-2 text-slate-500">
            Website inquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {inquiry.customer.name}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {inquiry.customer.email}
                  </p>
                  {inquiry.customer.phone ? (
                    <p className="text-sm text-slate-500">
                      {inquiry.customer.phone}
                    </p>
                  ) : null}
                </div>

                <InquiryStatusSelect
  inquiryId={inquiry.id}
  currentStatus={inquiry.status}
/>
              </div>

              {inquiry.package ? (
                <p className="mt-3 text-sm text-sky-600">
                  Package: {inquiry.package.title}
                </p>
              ) : null}

              <p className="mt-3 text-slate-700">{inquiry.message}</p>
              <div className="mt-4">
  <Link
    href={`/admin/inquiries/${inquiry.id}`}
    className="text-sm font-medium text-blue-600 hover:underline"
  >
    View Details
  </Link>
</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}