'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { packageSchema } from '@/lib/validations/package'

type PackageFormState = {
  title: string
  slug: string
  description: string
  price: string
  duration: string
  location: string
}

const initialFormState: PackageFormState = {
  title: '',
  slug: '',
  description: '',
  price: '',
  duration: '',
  location: '',
}

export default function CreatePackagePage() {
  const router = useRouter()

  const [form, setForm] = useState<PackageFormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

 const handleChange = (e: any) => {
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
    const response = await fetch('/api/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!response.ok) {
      throw new Error('Failed to create package')
    }

    router.push('/admin/packages')
    router.refresh()
  } catch (error) {
    console.error(error)
    setErrorMessage('Something went wrong while creating the package.')
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <section className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Package</h1>
        <p className="mt-2 text-slate-600">
          Add a new travel package to your website.
        </p>
      </div>

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
            placeholder="Darjeeling Weekend Escape"
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
  className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-gray-100"
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
            placeholder="Write a short description for the travel package"
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
              placeholder="4999"
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
              placeholder="2 Nights / 3 Days"
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
              placeholder="Darjeeling"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            />
          </div>
        </div>

        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-slate-900 px-5 py-3 text-white disabled:opacity-60"
          >
            {isSubmitting ? 'Creating...' : 'Create Package'}
          </button>
        </div>
      </form>
    </section>
  )
}