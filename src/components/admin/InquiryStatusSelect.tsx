'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type InquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED'

type InquiryStatusSelectProps = {
  inquiryId: string
  currentStatus: InquiryStatus
}

const statusOptions: InquiryStatus[] = [
  'NEW',
  'CONTACTED',
  'CLOSED',
]

export default function InquiryStatusSelect({
  inquiryId,
  currentStatus,
}: InquiryStatusSelectProps) {
  const router = useRouter()
  const [status, setStatus] = useState<InquiryStatus>(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nextStatus = e.target.value as InquiryStatus
    setStatus(nextStatus)
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
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
      alert('Failed to update inquiry status.')
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