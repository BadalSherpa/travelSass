'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

type Video = {
  id: string
  title: string
  videoUrl: string
}

type VideoManagerProps = {
  packageId: string
  initialVideos: Video[]
}

export default function VideoManager({
  packageId,
  initialVideos,
}: VideoManagerProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/packages/${packageId}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, videoUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to add video')
        return
      }

      setTitle('')
      setVideoUrl('')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (videoId: string) => {
    const confirmed = window.confirm('Delete this video?')
    if (!confirmed) return

    try {
      const response = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to delete video')
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
        <h2 className="text-2xl font-black text-slate-900">Video Manager</h2>
        <p className="mt-2 text-sm text-slate-500">
          Add YouTube or travel video embed URLs for this package.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video title"
          className="premium-input"
          required
        />

        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Embed URL e.g. https://www.youtube.com/embed/VIDEO_ID"
          className="premium-input"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {initialVideos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 md:col-span-2">
            No videos added yet.
          </div>
        ) : (
          initialVideos.map((video) => (
            <div key={video.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="aspect-video overflow-hidden rounded-xl bg-black">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-900">{video.title}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(video.id)}
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