import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <div className="bg-[#030712] text-white">
      <section className="relative overflow-hidden px-4 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.05),_transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-400">
              Our Team
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              The people behind every journey.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Meet the passionate people building meaningful travel experiences,
              local connections, and memorable escapes.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          {teamMembers.length === 0 ? (
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-12 text-center">
              <h2 className="text-3xl font-black">Team coming soon</h2>
              <p className="mt-4 text-slate-400">
                Team members will appear here once added from admin.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="relative h-80 overflow-hidden rounded-[2rem] bg-slate-900">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-6xl font-black text-white">
                        {member.name.charAt(0)}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                        {member.designation}
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-white">
                        {member.name}
                      </h2>
                    </div>
                  </div>

                  <div className="p-3 pt-6">
                    <p className="text-sm leading-7 text-slate-400">
                      {member.bio}
                    </p>

                    {member.motto ? (
                      <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                          Motto
                        </p>
                        <p className="mt-3 text-lg font-black leading-7 text-white">
                          “{member.motto}”
                        </p>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}