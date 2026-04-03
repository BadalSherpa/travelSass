import { prisma } from '@/lib/prisma'
import EditPackageForm from '@/components/admin/EditPackageForm'

type EditPackagePageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditPackagePage({
  params,
}: EditPackagePageProps) {
  const { id } = await params

  const packageData = await prisma.package.findUnique({
    where: {
      id,
    },
  })

  if (!packageData) {
    return <div className="text-red-600">Package not found.</div>
  }

  return (
    <section className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Edit Package</h1>
        <p className="mt-2 text-slate-600">
          Update your package details below.
        </p>
      </div>

      <EditPackageForm packageData={packageData} />
    </section>
  )
}