import { prisma } from '@/lib/prisma'
import EditTeamMemberForm from '@/components/admin/EditTeamMemberForm'

type EditTeamMemberPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {
  const { id } = await params

  const member = await prisma.teamMember.findUnique({
    where: { id },
  })

  if (!member) {
    return <div className="text-red-600">Team member not found.</div>
  }

  return (
    <section className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          Edit Team Member
        </h1>
        <p className="mt-2 text-slate-600">
          Update team profile details.
        </p>
      </div>

      <EditTeamMemberForm member={member} />
    </section>
  )
}