'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

type BookingFormState = {
  name: string
  email: string
  phone: string
  travelDate: string
  persons: string
  notes: string
  packageId: string
}

type BookingFormProps = {
  packageId: string
  packageTitle: string
}

const createInitialState = (packageId: string): BookingFormState => ({
  name: '',
  email: '',
  phone: '',
  travelDate: '',
  persons: '1',
  notes: '',
  packageId,
})

export default function BookingForm({
  packageId,
  packageTitle,
}: BookingFormProps) {
  const [form, setForm] = useState<BookingFormState>(
    createInitialState(packageId)
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
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to submit booking')
        setIsSubmitting(false)
        return
      }

      setSuccessMessage(`Booking request submitted for ${packageTitle}.`)
      setForm(createInitialState(packageId))
    } catch (error) {
      console.error(error)
      setErrorMessage('Something went wrong while submitting your booking.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Book This Package</h2>
      <p className="mt-2 text-slate-600">
        Submit your booking request and we’ll contact you to confirm details.
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Travel Date
            </label>
            <input
              type="date"
              name="travelDate"
              value={form.travelDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Number of Persons
            </label>
            <input
              type="number"
              name="persons"
              min="1"
              value={form.persons}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Any special preferences or questions"
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
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  )
}