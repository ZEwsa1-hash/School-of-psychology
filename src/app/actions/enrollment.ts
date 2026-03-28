'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function enrollCourse(courseId: string) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  })
  if (existing) return { success: false, message: 'Вы уже записаны на этот курс' }

  await prisma.enrollment.create({
    data: { userId: session.user.id, courseId, status: 'PENDING' },
  })
  return { success: true }
}
