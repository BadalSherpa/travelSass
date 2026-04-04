'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

type InquiryFormState = {
  name: string
  email: string
  phone: string
  message: string
  packageId?: string
}

type InquiryFormProps = {
  packageId?: string
  defaultMessage?: string
  heading?: string
}

const createInitialState = (packageId?: string, defaultMessage?: string): InquiryFormState => ({
  name: '',
  email: '',
  phone: '',
  message: defaultMessage || '',
  packageId,
})

export default function InquiryForm({
  packageId,
  defaultMessage = '',
  heading = 'Send Inquiry',
}: InquiryFormProps) {
  const [form, setForm] = useState<InquiryFormState>(
    createInitialState(packageId, defaultMessage)
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to submit inquiry')
        setIsSubmitting(false)
        return
      }

      setSuccessMessage('Inquiry submitted successfully.')
      setForm(createInitialState(packageId, defaultMessage))
    } catch (error) {
      console.error(error)
      setErrorMessage('Something went wrong while submitting your inquiry.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">{heading}</h2>
      <p className="mt-2 text-slate-600">
        Share your travel requirements and we’ll get back to you.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Tell us what you are looking for"
            required
          />
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
          {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  )
}