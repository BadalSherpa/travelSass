'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

type GalleryImage = {
  id: string
  imageUrl: string
  title: string | null
}

type GalleryManagerProps = {
  packageId: string
  initialGallery: GalleryImage[]
}

export default function GalleryManager({
  packageId,
  initialGallery,
}: GalleryManagerProps) {
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `/api/packages/${packageId}/gallery`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl,
            title,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to add image')
        setIsSubmitting(false)
        return
      }

      setImageUrl('')
      setTitle('')

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

 const handleDelete = async (galleryId: string) => {
  const confirmed = window.confirm(
    'Delete this gallery image?'
  )

  if (!confirmed) return

  try {
    const response = await fetch(
      `/api/gallery/${galleryId}`,
      {
        method: 'DELETE',
      }
    )

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || 'Failed to delete image')
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
          Gallery Manager
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Add and manage package gallery images.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-[1fr_220px_auto]"
      >
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="premium-input"
          required
        />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Image title"
          className="premium-input"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>

      {initialGallery.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No gallery images added yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {initialGallery.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-[2rem] border border-slate-200"
            >
              <div className="h-56 overflow-hidden bg-slate-100">
                <img
                  src={image.imageUrl}
                  alt={image.title || 'Gallery'}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between p-4">
                <p className="line-clamp-1 text-sm font-medium text-slate-700">
                  {image.title || 'Untitled'}
                </p>

                <button
                  type="button"
                  onClick={() => handleDelete(image.id)}
                  className="text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}