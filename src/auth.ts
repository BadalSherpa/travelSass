import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        })

        if (!user) {
          return null
        }

        if (!user.isActive) {
         return null
        }

        const isPasswordValid = await bcrypt.compare(
          String(credentials.password),
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
    authorized({ auth, request }) {
  const isLoggedIn = !!auth?.user
  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.startsWith('/admin')

  if (!isAdminRoute) {
    return true
  }

  if (!isLoggedIn) {
    return false
  }

  const userRole = auth?.user?.role

  // ADMIN can access everything
  if (userRole === 'ADMIN') {
    return true
  }

  // STAFF can access admin, except restricted modules
  if (userRole === 'STAFF') {
    if (pathname.startsWith('/admin/users')) {
      return false
    }

    return true
  }

  return false
}
    ,
  },
})