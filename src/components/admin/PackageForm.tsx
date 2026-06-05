'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { packageSchema } from '@/lib/validations/package'

type GalleryInput = {
  imageUrl: string
  title: string
}

type PackageFormValues = {
  title: string
  slug: string
  description: string
  price: string
  duration: string
  location: string
  gallery?: GalleryInput[]
  itineraries?: ItineraryInput[]
  videos?: VideoInput[]
}

type ItineraryInput = {
  day: string
  title: string
  description: string
  order: string
}

type VideoInput = {
  title: string
  videoUrl: string
}


type PackageFormProps = {
  initialValues: PackageFormValues
  isCreateMode?: boolean
  itineraries?: ItineraryInput[]
  submitLabel: string
  onSubmit: (values: PackageFormValues) => Promise<{ success: boolean; error?: string }>
}

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

export default function PackageForm({
  initialValues,
  isCreateMode = true,
  submitLabel,
  onSubmit,
}: PackageFormProps) {
  const [form, setForm] = useState<PackageFormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [galleryImageUrl, setGalleryImageUrl] = useState('')
const [galleryTitle, setGalleryTitle] = useState('')
const [itineraryForm, setItineraryForm] = useState({
  day: '',
  title: '',
  description: '',
  order: '',
})
const [videoForm, setVideoForm] = useState({
  title: '',
  videoUrl: '',
})


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => {
      const updated = { ...prev, [name]: value }

      if (name === 'title') {
        updated.slug = generateSlug(value)
      }

      return updated
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    const result = packageSchema.safeParse(form)

    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message || 'Invalid form data')
      setIsSubmitting(false)
      return
    }

    const response = await onSubmit(form)

    if (!response.success) {
      setErrorMessage(response.error || 'Something went wrong')
      setIsSubmitting(false)
      return
    }

    setSuccessMessage('Saved successfully')
    setIsSubmitting(false)
  }

  const addGalleryImage = () => {
  if (!galleryImageUrl.trim()) return

  setForm((prev) => ({
    ...prev,
    gallery: [
      ...(prev.gallery || []),
      {
        imageUrl: galleryImageUrl.trim(),
        title: galleryTitle.trim(),
      },
    ],
  }))

  setGalleryImageUrl('')
  setGalleryTitle('')
}

const removeGalleryImage = (index: number) => {
  setForm((prev) => ({
    ...prev,
    gallery: prev.gallery?.filter((_, itemIndex) => itemIndex !== index) || [],
  }))
}

const addItinerary = () => {
  if (
    !itineraryForm.day.trim() ||
    !itineraryForm.title.trim() ||
    !itineraryForm.description.trim()
  ) {
    return
  }

  setForm((prev) => ({
    ...prev,
    itineraries: [
      ...(prev.itineraries || []),
      {
        ...itineraryForm,
      },
    ],
  }))

  setItineraryForm({
    day: '',
    title: '',
    description: '',
    order: '',
  })
}

const removeItinerary = (index: number) => {
  setForm((prev) => ({
    ...prev,
    itineraries:
      prev.itineraries?.filter(
        (_, itemIndex) => itemIndex !== index
      ) || [],
  }))
}

const addVideo = () => {
  if (!videoForm.title.trim() || !videoForm.videoUrl.trim()) return

  setForm((prev) => ({
    ...prev,
    videos: [...(prev.videos || []), { ...videoForm }],
  }))

  setVideoForm({
    title: '',
    videoUrl: '',
  })
}

const removeVideo = (index: number) => {
  setForm((prev) => ({
    ...prev,
    videos: prev.videos?.filter((_, itemIndex) => itemIndex !== index) || [],
  }))
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 admin-card"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full admin-input"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          readOnly
          className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full admin-input"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full admin-input"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full admin-input"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full admin-input"
          />
        </div>
      </div>

    {isCreateMode && <div>
           <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <div className="mb-4">
    <h3 className="text-lg font-bold text-slate-900">Gallery Images</h3>
    <p className="mt-1 text-sm text-slate-500">
      Add image URLs while creating the package.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
    <input
      type="url"
      value={galleryImageUrl}
      onChange={(e) => setGalleryImageUrl(e.target.value)}
      placeholder="Image URL"
      className="premium-input"
    />

    <input
      type="text"
      value={galleryTitle}
      onChange={(e) => setGalleryTitle(e.target.value)}
      placeholder="Image title"
      className="premium-input"
    />

    <button
      type="button"
      onClick={addGalleryImage}
      className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
    >
      Add Image
    </button>
  </div>

  {form.gallery?.length ? (
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {form.gallery.map((image, index) => (
        <div
          key={`${image.imageUrl}-${index}`}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="h-40 overflow-hidden bg-slate-100">
            <img
              src={image.imageUrl}
              alt={image.title || 'Gallery image'}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between p-3">
            <p className="line-clamp-1 text-sm font-medium text-slate-700">
              {image.title || 'Untitled'}
            </p>

            <button
              type="button"
              onClick={() => removeGalleryImage(index)}
              className="text-sm font-semibold text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : null}
</div>
<div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <div className="mb-4">
    <h3 className="text-lg font-bold text-slate-900">
      Initial Itinerary
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      Add initial day-wise trip plan.
    </p>
  </div>

  <div className="space-y-4">
    <div className="grid gap-4 md:grid-cols-[160px_1fr_120px]">
      <input
        value={itineraryForm.day}
        onChange={(e) =>
          setItineraryForm((prev) => ({
            ...prev,
            day: e.target.value,
          }))
        }
        placeholder="Day 1"
        className="premium-input"
      />

      <input
        value={itineraryForm.title}
        onChange={(e) =>
          setItineraryForm((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        placeholder="Arrival & Welcome"
        className="premium-input"
      />

      <input
        type="number"
        value={itineraryForm.order}
        onChange={(e) =>
          setItineraryForm((prev) => ({
            ...prev,
            order: e.target.value,
          }))
        }
        placeholder="Order"
        className="premium-input"
      />
    </div>

    <textarea
      rows={4}
      value={itineraryForm.description}
      onChange={(e) =>
        setItineraryForm((prev) => ({
          ...prev,
          description: e.target.value,
        }))
      }
      placeholder="Describe this day..."
      className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
    />

    <button
      type="button"
      onClick={addItinerary}
      className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
    >
      Add Itinerary
    </button>
  </div>

  {form.itineraries?.length ? (
    <div className="mt-6 space-y-4">
      {form.itineraries.map((item, index) => (
        <div
          key={`${item.day}-${index}`}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-sky-700">
                {item.day}
              </p>

              <h4 className="mt-2 text-lg font-black text-slate-900">
                {item.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeItinerary(index)}
              className="text-sm font-semibold text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : null}
</div>
<div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <div className="mb-4">
    <h3 className="text-lg font-bold text-slate-900">Initial Videos</h3>
    <p className="mt-1 text-sm text-slate-500">
      Add YouTube links or embed URLs while creating the package.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
    <input
      value={videoForm.title}
      onChange={(e) =>
        setVideoForm((prev) => ({ ...prev, title: e.target.value }))
      }
      placeholder="Video title"
      className="premium-input"
    />

    <input
      type="url"
      value={videoForm.videoUrl}
      onChange={(e) =>
        setVideoForm((prev) => ({ ...prev, videoUrl: e.target.value }))
      }
      placeholder="YouTube URL"
      className="premium-input"
    />

    <button
      type="button"
      onClick={addVideo}
      className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
    >
      Add Video
    </button>
  </div>

  {form.videos?.length ? (
    <div className="mt-6 space-y-4">
      {form.videos.map((video, index) => (
        <div
          key={`${video.videoUrl}-${index}`}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-black text-slate-900">
                {video.title}
              </p>
              <p className="mt-2 break-all text-sm text-slate-500">
                {video.videoUrl}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeVideo(index)}
              className="text-sm font-semibold text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : null}
</div>
</div>}



      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className="text-sm text-green-600">{successMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="admin-button disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}