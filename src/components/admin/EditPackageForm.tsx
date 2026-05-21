'use client'

import { useRouter } from 'next/navigation'
import PackageForm from '@/components/admin/PackageForm'

type PackageData = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  duration: string | null
  location: string | null
}

type EditPackageFormProps = {
  packageData: PackageData
}

export default function EditPackageForm({
  packageData,
}: EditPackageFormProps) {
  const router = useRouter()

  return (
    <PackageForm
     isCreateMode={false}
      initialValues={{
        title: packageData.title,
        slug: packageData.slug,
        description: packageData.description,
        price: String(packageData.price),
        duration: packageData.duration || '',
        location: packageData.location || '',
      }}
      submitLabel="Update Package"
      onSubmit={async (values) => {
        try {
          const response = await fetch(`/api/packages/${packageData.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })

          const data = await response.json()

          if (!response.ok) {
            return {
              success: false,
              error: data.error || 'Failed to update package',
            }
          }

          router.push('/admin/packages')
          router.refresh()

          return { success: true }
        } catch {
          return {
            success: false,
            error: 'Something went wrong while updating the package.',
          }
        }
      }}
    />
  )
}