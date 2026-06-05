import { prisma } from '@/lib/prisma'
import InquiryStatusSelect from '@/components/admin/InquiryStatusSelect'

type InquiryDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function InquiryDetailPage({
  params,
}: InquiryDetailPageProps) {
  const { id } = await params

  const inquiry = await prisma.inquiry.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      package: true,
    },
  })

  if (!inquiry) {
    return <div className="text-red-600">Inquiry not found.</div>
  }

  return (
    <section className="space-y-8">
      <div className="admin-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Inquiry Details
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Submitted on {inquiry.createdAt.toLocaleDateString()}
            </p>
          </div>

          <InquiryStatusSelect
  inquiryId={inquiry.id}
  currentStatus={inquiry.status}
/>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-slate-900">
            Customer Information
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Name
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {inquiry.customer.name}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Email
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {inquiry.customer.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Phone
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {inquiry.customer.phone || '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-xl font-semibold text-slate-900">
            Package Information
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Related Package
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {inquiry.package ? inquiry.package.title : 'General Inquiry'}
              </p>
            </div>

            {inquiry.package ? (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {inquiry.package.location || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Price
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    ₹{inquiry.package.price}
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="text-xl font-semibold text-slate-900">Inquiry Message</h2>
        <p className="mt-4 whitespace-pre-line text-slate-700">
          {inquiry.message}
        </p>
      </div>
    </section>
  )
}