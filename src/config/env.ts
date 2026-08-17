import { z } from 'zod'

const envSchema = z.object({
  mode: z.enum(['development', 'production', 'test']),
})

export const env = envSchema.parse({
  mode: import.meta.env.MODE,
})
