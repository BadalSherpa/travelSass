'use client'

import { useRouter } from 'next/navigation'
import UserForm from '@/components/admin/UserForm'

type EditUserFormProps = {
  userData: {
    id: string
    name: string | null
    email: string
    role: 'ADMIN' | 'STAFF'
  }
}

export default function EditUserForm({ userData }: EditUserFormProps) {
  const router = useRouter()

  return (
    <UserForm
      initialValues={{
        name: userData.name || '',
        email: userData.email,
        role: userData.role,
      }}
      submitLabel="Update User"
      onSubmit={async (values) => {
        try {
          const response = await fetch(`/api/users/${userData.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })

          const data = await response.json()

          if (!response.ok) {
            return {
              success: false,
              error: data.error || 'Failed to update user',
            }
          }

          router.push('/admin/users')
          router.refresh()

          return { success: true }
        } catch {
          return {
            success: false,
            error: 'Something went wrong while updating the user.',
          }
        }
      }}
    />
  )
}