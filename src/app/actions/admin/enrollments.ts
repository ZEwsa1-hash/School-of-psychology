'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type EnrollmentStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED'

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user?.role !== 'ADMIN') throw new Error('Unauthorized')
}

export async function updateEnrollmentStatus(id: string, status: EnrollmentStatus) {
  await requireAdmin()
  await prisma.enrollment.update({ where: { id }, data: { status } })
  revalidatePath('/admin/enrollments')
}
