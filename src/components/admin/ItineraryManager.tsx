'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

type Itinerary = {
  id: string
  day: string
  title: string
  description: string
  order: number
}

type ItineraryManagerProps = {
  packageId: string
  initialItineraries: Itinerary[]
}

export default function ItineraryManager({
  packageId,
  initialItineraries,
}: ItineraryManagerProps) {
  const router = useRouter()

  const [form, setForm] = useState({
    day: '',
    title: '',
    description: '',
    order: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/packages/${packageId}/itineraries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to add itinerary')
        return
      }

      setForm({
        day: '',
        title: '',
        description: '',
        order: '',
      })

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (itineraryId: string) => {
    const confirmed = window.confirm('Delete this itinerary item?')
    if (!confirmed) return

    try {
      const response = await fetch(`/api/itineraries/${itineraryId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to delete itinerary')
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
          Itinerary Manager
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Add detailed day-wise trip plan for this package.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[160px_1fr_120px]">
          <input
            value={form.day}
            onChange={(e) => setForm((prev) => ({ ...prev, day: e.target.value }))}
            placeholder="Day 1"
            className="rounded-2xl border border-slate-300 px-5 py-3 outline-none"
            required
          />

          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Arrival & Local Welcome"
            className="rounded-2xl border border-slate-300 px-5 py-3 outline-none"
            required
          />

          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm((prev) => ({ ...prev, order: e.target.value }))}
            placeholder="Order"
            className="rounded-2xl border border-slate-300 px-5 py-3 outline-none"
          />
        </div>

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe the day plan..."
          rows={4}
          className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
        >
          {isSubmitting ? 'Adding...' : 'Add Itinerary'}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {initialItineraries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No itinerary added yet.
          </div>
        ) : (
          initialItineraries.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-sky-700">
                    {item.day} • Order {item.order}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
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