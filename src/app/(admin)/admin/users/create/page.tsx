'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateUserPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STAFF',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to create user')
        setIsSubmitting(false)
        return
      }

      setSuccessMessage('User created successfully.')

      setTimeout(() => {
        router.push('/admin/users')
        router.refresh()
      }, 700)
    } catch (error) {
      console.error(error)
      setErrorMessage('Something went wrong while creating the user.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create User</h1>
        <p className="mt-2 text-slate-600">
          Add a new admin or staff account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Enter email address"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            placeholder="Enter password"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            value={form.role}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, role: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
          >
            <option value="STAFF">STAFF</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}

        {successMessage ? (
          <p className="text-sm text-green-600">{successMessage}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-5 py-3 text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </section>
  )
}