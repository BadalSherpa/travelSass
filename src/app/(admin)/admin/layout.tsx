import type { ReactNode } from 'react'
import Link from 'next/link'

type AdminLayoutProps = {
  children: ReactNode
}

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Packages', href: '/admin/packages' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Customers', href: '/admin/customers' },
  { label: 'Inquiries', href: '/admin/inquiries' },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-white p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="mt-1 text-sm text-slate-500">
              Travel SaaS CRM
            </p>
          </div>

          <nav className="space-y-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}