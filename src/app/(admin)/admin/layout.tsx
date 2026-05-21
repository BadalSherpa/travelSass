import type { ReactNode } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import LogoutButton from '@/components/admin/LogoutButton'

type AdminLayoutProps = {
  children: ReactNode
}

const allNavItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Packages', href: '/admin/packages' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Customers', href: '/admin/customers' },
  { label: 'Inquiries', href: '/admin/inquiries' },
  { label: 'Users', href: '/admin/users', adminOnly: true },
  { label: 'Team', href: '/admin/team', adminOnly: true },
]

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth()

  const visibleNavItems = allNavItems.filter((item) => {
  if (item.adminOnly && session?.user?.role !== 'ADMIN') {
    return false
  }

  return true
})

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-white p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="mt-1 text-sm text-slate-500">Travel SaaS CRM</p>
          </div>

          <div className="mb-8 rounded-xl border bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Logged in as
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {session?.user?.name || 'Admin'}
            </p>
            <p className="text-xs text-slate-500">
              {session?.user?.email}
            </p>
            <p className="mt-2 inline-block rounded-full bg-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700">
              {session?.user?.role}
            </p>
          </div>

          <nav className="space-y-2 text-sm">
            {visibleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <LogoutButton />
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}