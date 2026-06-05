'use client'

import { FormEvent, useState } from 'react'

type UserFormValues = {
  name: string
  email: string
  role: 'ADMIN' | 'STAFF'
}

type UserFormProps = {
  initialValues: UserFormValues
  submitLabel: string
  onSubmit: (
    values: UserFormValues
  ) => Promise<{ success: boolean; error?: string }>
}

export default function UserForm({
  initialValues,
  submitLabel,
  onSubmit,
}: UserFormProps) {
  const [form, setForm] = useState<UserFormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    const result = await onSubmit(form)

    if (!result.success) {
      setErrorMessage(result.error || 'Something went wrong')
      setIsSubmitting(false)
      return
    }

    setSuccessMessage('Saved successfully')
    setIsSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 admin-card"
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
          className="w-full admin-input"
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
          className="w-full admin-input"
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
            setForm((prev) => ({
              ...prev,
              role: e.target.value as 'ADMIN' | 'STAFF',
            }))
          }
          className="w-full admin-input"
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
        className="admin-button disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}