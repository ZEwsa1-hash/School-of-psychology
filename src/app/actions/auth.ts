'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

export type RegisterData = z.infer<typeof schema>

export async function registerUser(data: RegisterData) {
  const validated = schema.parse(data)

  const existing = await prisma.user.findUnique({ where: { email: validated.email } })
  if (existing) return { success: false, error: 'Пользователь с таким email уже существует' }

  const passwordHash = await bcrypt.hash(validated.password, 12)
  await prisma.user.create({
    data: {
      name: validated.name,
      email: validated.email,
      passwordHash,
      role: 'STUDENT',
    },
  })

  return { success: true }
}
