'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { packageSchema } from '@/lib/validations/package'

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

type PackageFormState = {
  title: string
  slug: string
  description: string
  price: string
  duration: string
  location: string
}

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

export default function EditPackageForm({
  packageData,
}: EditPackageFormProps) {
  const router = useRouter()

  const [form, setForm] = useState<PackageFormState>({
    title: packageData.title,
    slug: packageData.slug,
    description: packageData.description,
    price: String(packageData.price),
    duration: packageData.duration || '',
    location: packageData.location || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => {
      const updated = { ...prev, [name]: value }

      if (name === 'title') {
        updated.slug = generateSlug(value)
      }

      return updated
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const result = packageSchema.safeParse(form)

    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message || 'Invalid form data')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`/api/packages/${packageData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Failed to update package')
      }

      router.push('/admin/packages')
      router.refresh()
    } catch (error) {
      console.error(error)
      setErrorMessage('Something went wrong while updating the package.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          readOnly
          className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
          />
        </div>
      </div>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-slate-900 px-5 py-3 text-white disabled:opacity-60"
      >
        {isSubmitting ? 'Updating...' : 'Update Package'}
      </button>
    </form>
  )
}