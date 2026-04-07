'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type UserStatusToggleButtonProps = {
  userId: string
  isActive: boolean
}

export default function UserStatusToggleButton({
  userId,
  isActive,
}: UserStatusToggleButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    const confirmed = window.confirm(
      isActive
        ? 'Deactivate this user? They will not be able to log in.'
        : 'Reactivate this user? They will be able to log in again.'
    )

    if (!confirmed) return

    setLoading(true)

    try {
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user status')
      }

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Failed to update user status.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className="text-sm font-medium text-amber-600 hover:underline disabled:opacity-60"
    >
      {loading
        ? 'Updating...'
        : isActive
        ? 'Deactivate'
        : 'Reactivate'}
    </button>
  )
}