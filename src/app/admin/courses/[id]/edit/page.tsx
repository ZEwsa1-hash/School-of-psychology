export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { updateCourse } from '@/app/actions/admin/courses'

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Редактировать курс — Администратор' }

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params
  const [course, teachers] = await Promise.all([
    prisma.course.findUnique({ where: { id } }),
    prisma.teacher.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
  if (!course) notFound()

  const update = updateCourse.bind(null, id)

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/courses" className="text-[#9B6B4E] hover:text-[#3D1F0E]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Редактировать курс</h1>
      </div>

      <form action={update} className="bg-white rounded-2xl p-6 border border-[#E8DFD0] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="title">Название *</Label>
            <Input id="title" name="title" required defaultValue={course.title} className="border-[#E8DFD0]" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input id="slug" name="slug" required defaultValue={course.slug} className="border-[#E8DFD0]" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="description">Краткое описание *</Label>
            <Textarea id="description" name="description" required defaultValue={course.description} rows={3} className="border-[#E8DFD0] resize-none" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="content">Полное описание</Label>
            <Textarea id="content" name="content" defaultValue={course.content ?? ''} rows={8} className="border-[#E8DFD0]" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="price">Цена (в рублях) *</Label>
            <Input id="price" name="price" type="number" required defaultValue={course.price / 100} className="border-[#E8DFD0]" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="duration">Длительность *</Label>
            <Input id="duration" name="duration" required defaultValue={course.duration} className="border-[#E8DFD0]" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="teacherId">Преподаватель</Label>
            <select
              id="teacherId"
              name="teacherId"
              defaultValue={course.teacherId ?? ''}
              className="w-full h-10 rounded-md border border-[#E8DFD0] bg-white px-3 text-sm"
            >
              <option value="">— Без преподавателя</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="sortOrder">Порядок сортировки</Label>
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue={course.sortOrder} className="border-[#E8DFD0]" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="imageUrl">URL изображения</Label>
            <Input id="imageUrl" name="imageUrl" type="url" defaultValue={course.imageUrl ?? ''} className="border-[#E8DFD0]" />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Checkbox id="published" name="published" defaultChecked={course.published} className="border-[#C4A882]" />
            <Label htmlFor="published" className="cursor-pointer">Опубликован</Label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]">
            Сохранить
          </Button>
          <Button asChild variant="outline" className="border-[#E8DFD0]">
            <Link href="/admin/courses">Отмена</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
