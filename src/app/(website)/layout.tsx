import type { ReactNode } from 'react'

type WebsiteLayoutProps = {
  children: ReactNode
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-xl font-semibold">Travel SaaS</h1>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-slate-500">
          © 2026 Travel SaaS
        </div>
      </footer>
    </div>
  )
}