'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'

type BookingStatusSelectProps = {
  bookingId: string
  currentStatus: BookingStatus
}

const statusOptions: BookingStatus[] = [
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
]

export default function BookingStatusSelect({
  bookingId,
  currentStatus,
}: BookingStatusSelectProps) {
  const router = useRouter()
  const [status, setStatus] = useState<BookingStatus>(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nextStatus = e.target.value as BookingStatus
    setStatus(nextStatus)
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: nextStatus }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status')
      }

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Failed to update booking status.')
      setStatus(currentStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isUpdating}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none disabled:opacity-60"
    >
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}