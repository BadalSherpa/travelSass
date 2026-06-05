'use client'

import { FormEvent, useState } from 'react'

type ResetUserPasswordFormProps = {
  userId: string
}

export default function ResetUserPasswordForm({
  userId,
}: ResetUserPasswordFormProps) {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch(`/api/users/${userId}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to reset password')
        setIsSubmitting(false)
        return
      }

      setSuccessMessage('Password reset successfully.')
      setPassword('')
    } catch (error) {
      console.error(error)
      setErrorMessage('Something went wrong while resetting password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 admin-card"
    >
      <h2 className="text-xl font-semibold text-slate-900">Reset Password</h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          New Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full admin-input"
          placeholder="Enter new password"
          required
        />
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
        {isSubmitting ? 'Updating...' : 'Reset Password'}
      </button>
    </form>
  )
}