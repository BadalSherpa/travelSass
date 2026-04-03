# Travel SaaS

A full-stack travel and homestay SaaS platform built with **Next.js**, **TypeScript**, **PostgreSQL**, and **Prisma**.

This project includes:
- Public website
- Admin CRM panel
- Package listing from database
- Dynamic package detail pages
- Scalable SaaS-ready architecture

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM

---

## 📦 Project Setup

### 1. Create the app

```powershell
npx create-next-app@latest travel-saas

default or custom options to be slected

Select:

TypeScript → Yes
Tailwind → Yes
App Router → Yes
src directory → Yes


2. Navigate into project
cd travel-saas
3. Install dependencies
npm install @prisma/client zod react-hook-form
npm install -D prisma
🛢️ Prisma + PostgreSQL Setup
1. Initialize Prisma
npx prisma init
2. Configure .env
DATABASE_URL="your_postgresql_connection_string"

Example:

DATABASE_URL="postgresql://username:password@host/dbname?sslmode=require"
3. Update Prisma schema

Edit prisma/schema.prisma:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Package {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  price       Float
  duration    String?
  location    String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
4. Run migration
npx prisma migrate dev --name init
5. Generate client
npx prisma generate
6. Open Prisma Studio
npx prisma studio
⚙️ Local Development
Start server
npm run dev

Open:

http://localhost:3000
📁 Project Structure
travel-saas/
  prisma/
  public/
  src/
    app/
      (website)/
        page.tsx
        packages/
          page.tsx
          [slug]/page.tsx
        contact/page.tsx
      (admin)/
        admin/
          page.tsx
          packages/
            page.tsx
            create/page.tsx
        login/page.tsx
      api/
        packages/route.ts
      layout.tsx
      globals.css
    components/
    lib/
      prisma.ts
    services/
    types/
  .env
  package.json
  tsconfig.json
🧠 Prisma Helper

Create:

src/lib/prisma.ts

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

🔗 Path Alias Setup

In tsconfig.json:

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
🌐 Routes

Public:

/
/packages
/packages/[slug]
/contact

Admin:

/admin
/admin/packages
/admin/packages/create
/login
🔥 Features Implemented
Next.js App Router architecture
Route grouping (website) and (admin)
Prisma + PostgreSQL integration
Dynamic package listing
Slug-based package detail page
Admin dashboard structure
Create package API
Clean scalable folder structure

📌 Next Features
Edit & Delete package
Form validation (Zod)
Authentication
Booking system
Inquiry system
Customer management
🧪 Useful Commands

Run app:

npm run dev

Prisma Studio:

npx prisma studio

Generate client:

npx prisma generate

Migration:

npx prisma migrate dev --name update

⚠️ Notes
Do NOT commit .env
Always run migrations after schema changes
Keep business logic outside app (use lib, services)
Use slug for dynamic routes

👨‍💻 Author 
Badal Sherpa

Built as a scalable travel SaaS platform with modern full-stack architecture.