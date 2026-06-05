import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

const footerLinks = {
  Explore: [
    { label: 'Packages', href: '/packages' },
    { label: 'Travel Videos', href: '/videos' },
    { label: 'About Us', href: '/about' },
  ],
  Company: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#02050F]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.04),_transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-black text-white backdrop-blur-xl">
                T
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  TravelSaaS
                </h2>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Explore Beyond
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              A premium travel and homestay experience platform built to help
              travelers discover curated journeys, peaceful stays, and memorable
              mountain escapes.
            </p>

            <div className="flex items-center gap-4 mt-8">
  <a
    href="https://www.facebook.com/yatriadventure/"
    className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
  >
    <FaFacebookF className="h-5 w-5" />
  </a>

  <a
    href="https://www.instagram.com/yatriadventure/"
    className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
  >
    <FaInstagram className="h-5 w-5" />
  </a>

  <a
    href="https://www.youtube.com/@yatriadventure9987"
    className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
  >
    <FaYoutube className="h-5 w-5" />
  </a>

  <a
  href="https://wa.me/+919091316662?text=Hey%20I%20am%20interested%20in%20exploring%20packages%20from%20Yatri%20Adventures"
  target="_blank"
  rel="noopener noreferrer"
  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
>
  <FaWhatsapp className="h-5 w-5" />
</a>
</div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                {title}
              </h3>

              <div className="mt-6 space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-slate-400 transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Contact
            </h3>

            <div className="mt-6 space-y-4 text-sm text-slate-400">
              <p>Darjeeling Hills, India</p>
              <p>yatriadventure@gmail.com</p>
              <p>+91 9091316662</p>
              <p>+91 6295235334</p>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Plan Your Journey
              </p>

              <h4 className="mt-3 text-xl font-black leading-tight text-white">
                Ready for your next mountain escape?
              </h4>

              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
              >
                Start Planning
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 TravelSaaS. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
