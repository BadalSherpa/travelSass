export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">
        📞 Contact Page
      </h1>

      <p className="mt-4 text-slate-600">
        This form will store inquiries in DB later.
      </p>

      <form className="mt-8 space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border px-4 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2"
        />

        <textarea
          placeholder="Message"
          className="w-full border px-4 py-2"
        />

        <button className="rounded bg-black px-4 py-2 text-white">
          Submit
        </button>
      </form>
    </section>
  )
}