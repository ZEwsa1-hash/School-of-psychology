'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user?.role !== 'ADMIN') throw new Error('Unauthorized')
  return session
}

const courseSchema = z.object({
  title: z.string().min(2, 'Введите название'),
  slug: z.string().min(2, 'Введите slug'),
  description: z.string().min(10, 'Введите описание'),
  content: z.string().optional(),
  price: z.coerce.number().min(0, 'Введите цену'),
  duration: z.string().min(1, 'Введите длительность'),
  imageUrl: z.string().optional(),
  teacherId: z.string().optional(),
  published: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().default(0),
})

export async function createCourse(formData: FormData) {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const data = courseSchema.parse({
    ...raw,
    published: raw.published === 'on' || raw.published === 'true',
  })
  await prisma.course.create({
    data: {
      ...data,
      price: Math.round(data.price * 100),
      teacherId: data.teacherId || null,
      imageUrl: data.imageUrl || null,
      content: data.content || null,
    },
  })
  revalidatePath('/admin/courses')
  revalidatePath('/courses')
  redirect('/admin/courses')
}

export async function updateCourse(id: string, formData: FormData) {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const data = courseSchema.parse({
    ...raw,
    published: raw.published === 'on' || raw.published === 'true',
  })
  await prisma.course.update({
    where: { id },
    data: {
      ...data,
      price: Math.round(data.price * 100),
      teacherId: data.teacherId || null,
      imageUrl: data.imageUrl || null,
      content: data.content || null,
    },
  })
  revalidatePath('/admin/courses')
  revalidatePath('/courses')
  redirect('/admin/courses')
}

export async function deleteCourse(id: string) {
  await requireAdmin()
  await prisma.course.delete({ where: { id } })
  revalidatePath('/admin/courses')
  revalidatePath('/courses')
}
