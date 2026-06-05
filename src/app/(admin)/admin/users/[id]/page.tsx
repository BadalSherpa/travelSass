import { prisma } from '@/lib/prisma'
import EditUserForm from '@/components/admin/EditUserForm'
import ResetUserPasswordForm from '@/components/admin/ResetUserPasswordForm'
import DeleteUserButton from '@/components/admin/DeleteUserButton'

type EditUserPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  if (!user) {
    return <div className="text-red-600">User not found.</div>
  }

  return (
    <section className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Edit User</h1>
        <p className="mt-2 text-slate-600">
          Update user profile and role.
        </p>
      </div>

      <EditUserForm userData={user} />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
  <ResetUserPasswordForm userId={user.id} />

  <div className="admin-card">
    <h2 className="text-xl font-semibold text-slate-900">Danger Zone</h2>
    <p className="mt-2 text-sm text-slate-600">
      Delete this user permanently if the account is no longer needed.
    </p>

    <div className="mt-6">
      <DeleteUserButton userId={user.id} />
    </div>
  </div>
</div>
    </section>
  )
}