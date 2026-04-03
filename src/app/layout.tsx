import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Travel SaaS',
  description: 'Tour and travel SaaS platform',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}