'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

type EditTeamMemberFormProps = {
  member: {
    id: string
    name: string
    designation: string
    imageUrl: string | null
    bio: string
    motto: string | null
    order: number
    isActive: boolean
  }
}

export default function EditTeamMemberForm({
  member,
}: EditTeamMemberFormProps) {
  const router = useRouter()

  const [form, setForm] = useState({
    name: member.name,
    designation: member.designation,
    imageUrl: member.imageUrl || '',
    bio: member.bio,
    motto: member.motto || '',
    order: String(member.order),
    isActive: member.isActive,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to update member')
        return
      }

      router.push('/admin/team')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Delete this team member permanently?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(`/api/team/${member.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to delete member')
        return
      }

      router.push('/admin/team')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-black text-slate-900">
        Edit Team Member
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          className="rounded-2xl border border-slate-300 px-5 py-3 outline-none"
          required
        />

        <input
          value={form.designation}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              designation: e.target.value,
            }))
          }
          className="rounded-2xl border border-slate-300 px-5 py-3 outline-none"
          required
        />

        <input
          type="url"
          value={form.imageUrl}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
          className="rounded-2xl border border-slate-300 px-5 py-3 outline-none"
          placeholder="Image URL"
        />

        <input
          type="number"
          value={form.order}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, order: e.target.value }))
          }
          className="rounded-2xl border border-slate-300 px-5 py-3 outline-none"
          placeholder="Order"
        />
      </div>

      <textarea
        value={form.bio}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, bio: e.target.value }))
        }
        rows={4}
        className="mt-4 w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
        required
      />

      <textarea
        value={form.motto}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, motto: e.target.value }))
        }
        rows={3}
        className="mt-4 w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none"
        placeholder="Motto"
      />

      <label className="mt-4 flex items-center gap-3 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              isActive: e.target.checked,
            }))
          }
        />
        Show on website
      </label>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
        >
          {isSubmitting ? 'Saving...' : 'Update Member'}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-2xl border border-red-200 px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
        >
          Delete Member
        </button>
      </div>
    </form>
  )
}