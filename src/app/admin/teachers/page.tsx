import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Pencil, User } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { DeleteTeacherButton } from '@/components/admin/DeleteTeacherButton'

export const metadata: Metadata = { title: 'Преподаватели — Администратор' }

export default async function AdminTeachersPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { sortOrder: 'asc' } })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Преподаватели</h1>
        <Button asChild className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]">
          <Link href="/admin/teachers/new">
            <Plus size={16} className="mr-2" />
            Добавить
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F5F0E8] border-b border-[#E8DFD0]">
            <tr>
              <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Преподаватель</th>
              <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden md:table-cell">Специализация</th>
              <th className="text-right px-4 py-3 text-[#9B6B4E] font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F0E8]">
            {teachers.map(teacher => (
              <tr key={teacher.id} className="hover:bg-[#F5F0E8] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E8DFD0] flex items-center justify-center">
                      <User size={16} className="text-[#9B6B4E]" />
                    </div>
                    <p className="font-medium text-[#3D1F0E]">{teacher.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-[#6B3A25]">
                  {teacher.specialization}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#9B6B4E]">
                      <Link href={`/admin/teachers/${teacher.id}/edit`}>
                        <Pencil size={14} />
                      </Link>
                    </Button>
                    <DeleteTeacherButton id={teacher.id} />
                  </div>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-[#9B6B4E]">Нет преподавателей</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
