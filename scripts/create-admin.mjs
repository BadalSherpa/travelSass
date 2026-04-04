import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  const plainPassword = 'Admin@12345'

  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('Admin already exists')
    return
  }

  await prisma.user.create({
    data: {
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin created')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })