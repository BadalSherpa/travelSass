'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages' },
  { label: 'About', href: '/about' },
  { label: 'Travel Videos', href: '/videos' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const closeDrawer = () => setIsOpen(false)

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-black/60 shadow-2xl backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg font-black text-white backdrop-blur-xl transition group-hover:bg-white/20">
                T
              </div>

              <div>
                <h1 className="text-lg font-black tracking-tight text-white">
                  TravelSaaS
                </h1>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  Explore Beyond
                </p>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-slate-200"
            >
              Plan Your Trip
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:bg-white/10 lg:hidden"
            aria-label="Open Menu"
          >
            <div className="space-y-1">
              <span className="block h-[2px] w-5 rounded-full bg-white" />
              <span className="block h-[2px] w-5 rounded-full bg-white" />
              <span className="block h-[2px] w-5 rounded-full bg-white" />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 lg:hidden ${
          isOpen
            ? 'pointer-events-auto visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <div
          onClick={closeDrawer}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[84%] max-w-sm transform border-l border-white/10 bg-[#060816]/95 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">
                  TravelSaaS
                </h2>

                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">
                  Premium Travel
                </p>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white"
              >
                ✕
              </button>
            </div>

            <nav className="mt-14 flex flex-1 flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeDrawer}
                  className="group rounded-2xl border border-transparent bg-white/[0.03] px-5 py-4 transition hover:border-white/10 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-200 transition group-hover:text-white">
                      {link.label}
                    </span>

                    <span className="translate-x-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </nav>

            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Start Your Journey
              </p>

              <h3 className="mt-3 text-2xl font-black leading-tight text-white">
                Discover peaceful stays and curated escapes.
              </h3>

              <Link
                href="/contact"
                onClick={closeDrawer}
                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-slate-200"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}