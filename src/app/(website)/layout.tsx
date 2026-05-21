import type { ReactNode } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'

type WebsiteLayoutProps = {
  children: ReactNode
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] text-white">
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}