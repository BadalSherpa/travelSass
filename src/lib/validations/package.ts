import { z } from 'zod'

export const packageSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3),
  description: z.string().min(10, 'Description too short'),
  price: z.string().min(1, 'Price is required'),
  duration: z.string().optional(),
  location: z.string().optional(),
})