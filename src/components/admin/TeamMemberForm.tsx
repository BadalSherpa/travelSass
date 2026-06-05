'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TeamMemberForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    designation: '',
    imageUrl: '',
    bio: '',
    motto: '',
    order: '',
    isActive: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to add team member')
        return
      }

      setForm({
        name: '',
        designation: '',
        imageUrl: '',
        bio: '',
        motto: '',
        order: '',
        isActive: true,
      })

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="premium-card p-8"
    >
     <div className="mb-8">
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
    Team Management
  </p>

  <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
    Add Team Member
  </h2>

  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
    Create premium public profiles for founders, guides, and travel experts.
  </p>
</div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Name"
          className="premium-input"
          required
        />

        <input
          value={form.designation}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, designation: e.target.value }))
          }
          placeholder="Designation"
          className="premium-input"
          required
        />

        <input
          type="url"
          value={form.imageUrl}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
          placeholder="Image URL"
          className="premium-input"
        />

        <input
          type="number"
          value={form.order}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, order: e.target.value }))
          }
          placeholder="Order"
          className="premium-input"
        />
      </div>

      <textarea
        value={form.bio}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, bio: e.target.value }))
        }
        placeholder="Short bio"
        rows={4}
        className="mt-4 w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
        required
      />

      <textarea
        value={form.motto}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, motto: e.target.value }))
        }
        placeholder="Motto"
        rows={3}
        className="mt-4 w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
      />

      <label className="mt-4 flex items-center gap-3 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, isActive: e.target.checked }))
          }
        />
        Show on website
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="premium-button mt-6"
      >
        {isSubmitting ? 'Adding...' : 'Add Member'}
      </button>
    </form>
  )
}