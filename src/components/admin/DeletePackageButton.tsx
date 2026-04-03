'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type DeletePackageButtonProps = {
  id: string
}

export default function DeletePackageButton({
  id,
}: DeletePackageButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this package?'
    )

    if (!confirmed) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete package')
      }

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong while deleting the package.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}