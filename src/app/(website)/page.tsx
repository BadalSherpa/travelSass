export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900">
        🏡 Welcome to Travel SaaS
      </h1>

      <p className="mt-4 text-lg text-slate-600">
        This is your public website homepage.
      </p>

      <div className="mt-8 flex gap-4">
        <a href="/packages" className="rounded bg-blue-600 px-4 py-2 text-white">
          Go to Packages
        </a>

        <a href="/contact" className="rounded border px-4 py-2">
          Contact Us
        </a>
      </div>
    </section>
  )
}