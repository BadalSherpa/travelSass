export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">🔐 Login</h1>

        <form className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2"
          />

          <button className="w-full rounded bg-black px-4 py-2 text-white">
            Login
          </button>
        </form>
      </div>
    </section>
  )
}