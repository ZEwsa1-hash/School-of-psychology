import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateTeacher } from '@/app/actions/admin/teachers'

interface Props { params: Promise<{ id: string }> }
export const metadata: Metadata = { title: 'Редактировать преподавателя — Администратор' }

export default async function EditTeacherPage({ params }: Props) {
  const { id } = await params
  const teacher = await prisma.teacher.findUnique({ where: { id } })
  if (!teacher) notFound()

  const update = updateTeacher.bind(null, id)

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/teachers" className="text-[#9B6B4E] hover:text-[#3D1F0E]"><ArrowLeft size={20} /></Link>
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Редактировать преподавателя</h1>
      </div>
      <form action={update} className="bg-white rounded-2xl p-6 border border-[#E8DFD0] space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Имя *</Label>
          <Input id="name" name="name" required defaultValue={teacher.name} className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="specialization">Специализация *</Label>
          <Input id="specialization" name="specialization" required defaultValue={teacher.specialization} className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bio">Биография *</Label>
          <Textarea id="bio" name="bio" required defaultValue={teacher.bio} rows={5} className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="photo">URL фото</Label>
          <Input id="photo" name="photo" type="url" defaultValue={teacher.photo ?? ''} className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="sortOrder">Порядок сортировки</Label>
          <Input id="sortOrder" name="sortOrder" type="number" defaultValue={teacher.sortOrder} className="border-[#E8DFD0]" />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]">Сохранить</Button>
          <Button asChild variant="outline" className="border-[#E8DFD0]">
            <Link href="/admin/teachers">Отмена</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
