import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { DeleteCourseButton } from '@/components/admin/DeleteCourseButton'

export const metadata: Metadata = { title: 'Курсы — Администратор' }

function formatPrice(kopecks: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(kopecks / 100)
}

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    include: { teacher: true },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Курсы</h1>
        <Button asChild className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]">
          <Link href="/admin/courses/new">
            <Plus size={16} className="mr-2" />
            Добавить курс
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F0E8] border-b border-[#E8DFD0]">
              <tr>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Название</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden md:table-cell">Преподаватель</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden lg:table-cell">Цена</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Статус</th>
                <th className="text-right px-4 py-3 text-[#9B6B4E] font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-[#F5F0E8] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#3D1F0E]">{course.title}</p>
                    <p className="text-xs text-[#9B6B4E]">{course.duration}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#6B3A25]">
                    {course.teacher?.name ?? '—'}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#3D1F0E]">
                    {formatPrice(course.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${course.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {course.published ? 'Опубликован' : 'Черновик'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#9B6B4E] hover:text-[#3D1F0E]">
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Pencil size={14} />
                        </Link>
                      </Button>
                      <DeleteCourseButton id={course.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#9B6B4E]">
                    Курсы не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
