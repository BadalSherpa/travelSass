'use client'

import { useRouter } from 'next/navigation'
import PackageForm from '@/components/admin/PackageForm'

export default function CreatePackagePage() {
  const router = useRouter()

  return (
    <section className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Package</h1>
        <p className="mt-2 text-slate-600">
          Add a new travel package to your website.
        </p>
      </div>

      <PackageForm
        isCreateMode
        initialValues={{
          title: '',
          slug: '',
          description: '',
          price: '',
          duration: '',
          location: '',
          gallery: [],
          itineraries: [],
          videos: []
        }}
        submitLabel="Create Package"
        onSubmit={async (values) => {
          try {
            const response = await fetch('/api/packages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok) {
              return {
                success: false,
                error: data.error || 'Failed to create package',
              }
            }

            router.push('/admin/packages')
            router.refresh()

            return { success: true }
          } catch {
            return {
              success: false,
              error: 'Something went wrong while creating the package.',
            }
          }
        }}
      />
    </section>
  )
}