import type { ReactNode } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import LogoutButton from '@/components/admin/LogoutButton'
import AdminMobileSidebar from '@/components/admin/AdminMobileSidebar'

type AdminLayoutProps = {
  children: ReactNode
}

const allNavItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Packages', href: '/admin/packages' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Customers', href: '/admin/customers' },
  { label: 'Inquiries', href: '/admin/inquiries' },
  { label: 'Team', href: '/admin/team', adminOnly: true },
  { label: 'Users', href: '/admin/users', adminOnly: true },
]

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth()

  const visibleNavItems = allNavItems.filter((item) => {
    if (item.adminOnly && session?.user?.role !== 'ADMIN') return false
    return true
  })

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] text-slate-950">
      <AdminMobileSidebar
        navItems={visibleNavItems}
        user={{
          name: session?.user?.name || 'Admin',
          email: session?.user?.email || '',
          role: session?.user?.role || '',
        }}
      />

      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/60 bg-white/70 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-2xl lg:block">
          <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-950 p-5 text-white shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-black">
              Y
            </div>

            <h2 className="mt-5 text-2xl font-black tracking-tight">
              Yatri Admin
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Travel CRM Dashboard
            </p>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Logged in
            </p>
            <p className="mt-2 truncate text-sm font-black text-slate-900">
              {session?.user?.name || 'Admin'}
            </p>
            <p className="truncate text-xs text-slate-500">
              {session?.user?.email}
            </p>
            <span className="mt-3 inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
              {session?.user?.role}
            </span>
          </div>

          <nav className="mt-6 space-y-2">
            {visibleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-950 hover:text-white"
              >
                {item.label}
                <span className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <LogoutButton />
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pt-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}