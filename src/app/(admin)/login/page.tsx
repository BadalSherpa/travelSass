import { auth } from '@/auth'
import LoginForm from '@/components/auth/LoginForm'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()

  if (session?.user?.role === 'ADMIN') {
    redirect('/admin')
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to access the admin dashboard.
        </p>

        <LoginForm />
      </div>
    </section>
  )
}