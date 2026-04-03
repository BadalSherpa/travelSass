'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { packageSchema } from '@/lib/validations/package'

type PackageFormValues = {
  title: string
  slug: string
  description: string
  price: string
  duration: string
  location: string
}

type PackageFormProps = {
  initialValues: PackageFormValues
  submitLabel: string
  onSubmit: (values: PackageFormValues) => Promise<{ success: boolean; error?: string }>
}

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

export default function PackageForm({
  initialValues,
  submitLabel,
  onSubmit,
}: PackageFormProps) {
  const [form, setForm] = useState<PackageFormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
    setSuccessMessage('')

    const result = packageSchema.safeParse(form)

    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message || 'Invalid form data')
      setIsSubmitting(false)
      return
    }

    const response = await onSubmit(form)

    if (!response.success) {
      setErrorMessage(response.error || 'Something went wrong')
      setIsSubmitting(false)
      return
    }

    setSuccessMessage('Saved successfully')
    setIsSubmitting(false)
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

      {successMessage ? (
        <p className="text-sm text-green-600">{successMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-slate-900 px-5 py-3 text-white disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}