import { prisma } from '@/lib/prisma'
import TeamMemberForm from '@/components/admin/TeamMemberForm'
import Link from 'next/link'

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <section className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Team Members</h1>
        <p className="mt-2 text-slate-600">
          Add and manage team profiles shown on the public website.
        </p>
      </div>

      <TeamMemberForm />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {members.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 md:col-span-2">
            No team members added yet.
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="rounded-[2rem] border bg-white p-5 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-200">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xl font-black text-slate-500">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-lg font-black text-slate-900">
                    {member.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {member.designation}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Order: {member.order} • {member.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {member.bio}
              </p>

              {member.motto ? (
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  “{member.motto}”
                </p>
              ) : null}
              <div className="mt-5">
  <Link
    href={`/admin/team/${member.id}`}
    className="inline-flex rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white"
  >
    Edit
  </Link>
</div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}