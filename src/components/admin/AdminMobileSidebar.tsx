'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import LogoutButton from '@/components/admin/LogoutButton'

type NavItem = {
  label: string
  href: string
  adminOnly?: boolean
}

type AdminMobileSidebarProps = {
  navItems: NavItem[]
  user: {
    name: string
    email: string
    role: string
  }
}

export default function AdminMobileSidebar({
  navItems,
  user,
}: AdminMobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/70 bg-white/75 px-4 py-3 shadow-lg shadow-slate-200/50 backdrop-blur-2xl lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Yatri Admin
            </p>
            <h1 className="text-lg font-black text-slate-950">Dashboard</h1>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"
            aria-label="Open admin menu"
          >
            ☰
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
      >
        <button
          type="button"
          onClick={close}
          className={`absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close admin menu overlay"
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[86%] max-w-sm transform bg-white p-5 shadow-2xl transition duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-black">
                  Y
                </div>
                <h2 className="mt-5 text-2xl font-black">Yatri Admin</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Travel CRM Dashboard
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Logged in
            </p>
            <p className="mt-2 truncate text-sm font-black text-slate-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
            <span className="mt-3 inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
              {user.role}
            </span>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4 text-sm font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
              >
                {item.label}
                <span>→</span>
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <LogoutButton />
          </div>
        </aside>
      </div>
    </>
  )
}