'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type DeleteUserButtonProps = {
  userId: string
}

export default function DeleteUserButton({
  userId,
}: DeleteUserButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Delete this user permanently? This action cannot be undone.'
    )

    if (!confirmed) return

    setLoading(true)

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user')
      }

      router.push('/admin/users')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Failed to delete user.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60"
    >
      {loading ? 'Deleting...' : 'Delete User'}
    </button>
  )
}