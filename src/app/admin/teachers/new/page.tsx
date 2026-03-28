import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createTeacher } from '@/app/actions/admin/teachers'

export const metadata: Metadata = { title: 'Новый преподаватель — Администратор' }

export default function NewTeacherPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/teachers" className="text-[#9B6B4E] hover:text-[#3D1F0E]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Новый преподаватель</h1>
      </div>
      <form action={createTeacher} className="bg-white rounded-2xl p-6 border border-[#E8DFD0] space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Имя *</Label>
          <Input id="name" name="name" required className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="specialization">Специализация *</Label>
          <Input id="specialization" name="specialization" required className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bio">Биография *</Label>
          <Textarea id="bio" name="bio" required rows={5} className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="photo">URL фото</Label>
          <Input id="photo" name="photo" type="url" className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="sortOrder">Порядок сортировки</Label>
          <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" className="border-[#E8DFD0]" />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]">Создать</Button>
          <Button asChild variant="outline" className="border-[#E8DFD0]">
            <Link href="/admin/teachers">Отмена</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
