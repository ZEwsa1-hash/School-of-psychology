'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user?.role !== 'ADMIN') throw new Error('Unauthorized')
}

export async function markContactDone(id: string) {
  await requireAdmin()
  await prisma.contactRequest.update({ where: { id }, data: { status: 'DONE' } })
  revalidatePath('/admin/contacts')
}
