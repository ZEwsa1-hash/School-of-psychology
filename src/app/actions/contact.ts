'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  phone: z.string().min(10, 'Введите телефон'),
  message: z.string().optional(),
})

export type ContactFormData = z.infer<typeof schema>

export async function createContactRequest(data: ContactFormData) {
  const validated = schema.parse(data)
  await prisma.contactRequest.create({
    data: {
      name: validated.name,
      email: '',
      phone: validated.phone,
      message: validated.message ?? '',
    },
  })
  return { success: true }
}
