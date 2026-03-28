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

const blogSchema = z.object({
  title: z.string().min(2, 'Введите заголовок'),
  slug: z.string().min(2, 'Введите slug'),
  excerpt: z.string().min(10, 'Введите краткое описание'),
  content: z.string().min(10, 'Введите контент'),
  imageUrl: z.string().optional(),
  published: z.coerce.boolean().default(false),
})

export async function createBlogPost(formData: FormData) {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const data = blogSchema.parse({
    ...raw,
    published: raw.published === 'on' || raw.published === 'true',
  })
  await prisma.blogPost.create({
    data: { ...data, imageUrl: data.imageUrl || null },
  })
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin()
  const raw = Object.fromEntries(formData)
  const data = blogSchema.parse({
    ...raw,
    published: raw.published === 'on' || raw.published === 'true',
  })
  await prisma.blogPost.update({
    where: { id },
    data: { ...data, imageUrl: data.imageUrl || null },
  })
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function deleteBlogPost(id: string) {
  await requireAdmin()
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}
