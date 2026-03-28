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

const teacherSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  bio: z.string().min(10, 'Введите биографию'),
  photo: z.string().optional(),
  specialization: z.string().min(2, 'Введите специализацию'),
  sortOrder: z.coerce.number().default(0),
})

export async function createTeacher(formData: FormData) {
  await requireAdmin()
  const data = teacherSchema.parse(Object.fromEntries(formData))
  await prisma.teacher.create({
    data: { ...data, photo: data.photo || null },
  })
  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
  redirect('/admin/teachers')
}

export async function updateTeacher(id: string, formData: FormData) {
  await requireAdmin()
  const data = teacherSchema.parse(Object.fromEntries(formData))
  await prisma.teacher.update({
    where: { id },
    data: { ...data, photo: data.photo || null },
  })
  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
  redirect('/admin/teachers')
}

export async function deleteTeacher(id: string) {
  await requireAdmin()
  await prisma.teacher.delete({ where: { id } })
  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
}
