export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { EnrollmentStatusSelect } from '@/components/admin/EnrollmentStatusSelect'

export const metadata: Metadata = { title: 'Записи на курсы — Администратор' }

export default async function AdminEnrollmentsPage() {
  const enrollments = await prisma.enrollment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true, course: true },
  })

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-[#3D1F0E]">Записи на курсы</h1>

      <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F0E8] border-b border-[#E8DFD0]">
              <tr>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Студент</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden md:table-cell">Курс</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Статус</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden lg:table-cell">Дата</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]">
              {enrollments.map(e => (
                <tr key={e.id} className="hover:bg-[#F5F0E8]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#3D1F0E]">{e.user.name ?? '—'}</p>
                    <p className="text-xs text-[#9B6B4E]">{e.user.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-[#3D1F0E] line-clamp-1">{e.course.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <EnrollmentStatusSelect id={e.id} status={e.status} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#9B6B4E]">
                    {formatDate(e.createdAt)}
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-[#9B6B4E]">Нет записей</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
