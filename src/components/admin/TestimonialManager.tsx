'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

type Testimonial = {
  id: string
  name: string
  message: string
  imageUrl: string | null
  rating: number
}

type TestimonialManagerProps = {
  packageId: string
  initialTestimonials: Testimonial[]
}

export default function TestimonialManager({
  packageId,
  initialTestimonials,
}: TestimonialManagerProps) {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    message: '',
    imageUrl: '',
    rating: '5',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/packages/${packageId}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to add testimonial')
        return
      }

      setForm({
        name: '',
        message: '',
        imageUrl: '',
        rating: '5',
      })

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (testimonialId: string) => {
    const confirmed = window.confirm('Delete this testimonial?')
    if (!confirmed) return

    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to delete testimonial')
        return
      }

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900">
          Testimonial Manager
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Add guest reviews for this specific package.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[1fr_140px]">
          <input
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Guest name"
            className="premium-input"
            required
          />

          <select
            value={form.rating}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, rating: e.target.value }))
            }
            className="premium-input"
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <input
          type="url"
          value={form.imageUrl}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
          placeholder="Guest image URL"
          className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
        />

        <textarea
          value={form.message}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Write testimonial message..."
          rows={4}
          className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
        >
          {isSubmitting ? 'Adding...' : 'Add Testimonial'}
        </button>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {initialTestimonials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 md:col-span-2">
            No testimonials added yet.
          </div>
        ) : (
          initialTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-200">
                    {testimonial.imageUrl ? (
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-500">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-black text-slate-900">
                      {testimonial.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {'★'.repeat(testimonial.rating)}{' '}
                      <span className="text-slate-400">
                        {testimonial.rating}/5
                      </span>
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      “{testimonial.message}”
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}